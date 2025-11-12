import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};
serve(async (req)=>{
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }
  try {
    const { bookId, bookText } = await req.json();
    if (!bookId || !bookText) {
      throw new Error('Missing bookId or bookText');
    }
    // Initialize Supabase client
    const supabaseClient = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
    // Update status to analyzing
    await supabaseClient.from('books').update({
      processing_status: 'analyzing'
    }).eq('id', bookId);
    console.log('Starting AI analysis for book:', bookId);
    // Call OpenRouter API for analysis
    const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');
    if (!openRouterApiKey) {
      throw new Error('OPENROUTER_API_KEY not configured');
    }
    const analysisPrompt = `Analyze this book and extract its structure. Provide a JSON response with:
                                                                                                                1. title: The book's title
                                                                                                                2. author: The book's author
                                                                                                                3. summary: A brief summary (2-3 sentences)
                                                                                                                4. chapters: Array of chapters with {number, title, summary}

                                                                                                                Book text (first 50000 chars):
                                                                                                                ${bookText.substring(0, 50000)}

                                                                                                                Return ONLY valid JSON, no other text.`;
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': Deno.env.get('SUPABASE_URL') ?? ''
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct:free',
        messages: [
          {
            role: 'user',
            content: analysisPrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      })
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
    }
    const aiResult = await response.json();
    const aiContent = aiResult.choices?.[0]?.message?.content;
    if (!aiContent) {
      throw new Error('No content in AI response');
    }
    // Parse AI response
    let analysis;
    try {
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        analysis = JSON.parse(aiContent);
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiContent);
      throw new Error('AI returned invalid JSON');
    }
    // Update book with AI analysis
    const { error: updateError } = await supabaseClient.from('books').update({
      title: analysis.title || 'Untitled',
      author: analysis.author || 'Unknown',
      ai_analysis: analysis,
      total_chapters: analysis.chapters?.length || 0,
      processing_status: 'processing_chapters'
    }).eq('id', bookId);
    if (updateError) {
      throw updateError;
    }
    // Insert chapters if provided
    if (analysis.chapters && Array.isArray(analysis.chapters)) {
      const chapters = analysis.chapters.map((chapter, index)=>({
          book_id: bookId,
          chapter_number: chapter.number || index + 1,
          title: chapter.title || `Chapter ${index + 1}`,
          content_summary: chapter.summary || '',
          created_at: new Date().toISOString()
        }));
      const { error: chaptersError } = await supabaseClient.from('book_chapters').insert(chapters);
      if (chaptersError) {
        console.error('Error inserting chapters:', chaptersError);
      }
    }
    // Mark as completed
    await supabaseClient.from('books').update({
      processing_status: 'completed'
    }).eq('id', bookId);
    console.log('AI analysis completed successfully for book:', bookId);
    return new Response(JSON.stringify({
      success: true,
      data: {
        bookId,
        chaptersCreated: analysis.chapters?.length || 0,
        analysis
      }
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 200
    });
  } catch (error) {
    console.error('AI processing error:', error);
    // Try to update book status to failed
    try {
      const { bookId } = await req.json();
      if (bookId) {
        const supabaseClient = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
        await supabaseClient.from('books').update({
          processing_status: 'failed'
        }).eq('id', bookId);
      }
    } catch (updateError) {
      console.error('Failed to update book status:', updateError);
    }
    return new Response(JSON.stringify({
      success: false,
      error: {
        message: error.message || 'AI processing failed'
      }
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 500
    });
  }
});
