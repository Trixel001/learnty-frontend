# Learning App Design & Implementation

**Integrated Cognitive Framework and Product Roadmap for the Native Mobile Learning App 'Learnty'**

### I. Executive Summary and The Unified Cognitive Framework

**A. The Convergent Rationale: Merging Neurobiological Universals and Applied Metalearning** The development of 'Learnty' requires a foundational framework that aligns learning activities with established cognitive science to maximize both efficiency and long-term retention. This framework is achieved by synthesizing the distinct, yet complementary, fields explored by Stanislas Dehaene and Jim Kwik. Dehaene provides the fundamental neurobiological constraints and universal mechanisms of learning, detailing why the brain learns better than current artificial intelligence systems, emphasizing principles like the role of attention, error signaling, and memory consolidation. Kwik, conversely, provides the actionable, applied metalearning strategies and psychological tools—Mindset, Motivation, and Method—that optimize these inherent biological systems. This synergy ensures that every feature deployed within Learnty is not merely engaging but is fundamentally validated for maximum synaptic impact and sustainable behavioral change. The integration creates a learning architecture built on neuroscientific rigor, addressing not only the "how" of information processing but also the psychological "why" that drives the learner to persist.

**B. Learnty’s Unique Value Proposition (UVP) and Cognitive Mandate** Learnty is conceptualized as a native mobile application (iOS/Android) and web platform designed to transform traditionally passive knowledge consumption from books (spanning genres like finance, self-help, and academic texts) into tangible competence through interactive, project-based learning (PBL). The central mandate is to transition the user from being a passive reader to an active doer, moving information from short-term working memory into semantic and procedural long-term memory. The core of the UVP lies in the AI-powered content extraction, which generates structured learning roadmaps and interactive project completion milestones. This structure forces active generation and testing of hypotheses, directly engaging the brain’s natural mechanisms for building and strengthening neural circuits. The application must be delivered as high-performance native mobile apps (built with Flutter) and a complementary web app, utilizing a Python stack (with FastAPI or Django) for the backend, necessitating a strategic technical approach that balances computational power (for AI and scheduling) with native mobile accessibility.

**C. The Synergistic Principles of the Learnty Model** The combined model integrates the Kwik Limitless Triad (Mindset, Motivation, Method) with Dehaene’s Four Pillars of Learning (Attention, Active Engagement, Error Feedback, Consolidation). This integration defines the Synergistic Mandates for feature implementation, ensuring that the psychological and neurobiological elements operate in concert to optimize the learning process.

**Synergistic Principles: Kwik-Dehaene Integration**

| Kwik Principle (Applied Mechanism) | Dehaene Principle (Neurobiological Universal) | Synergistic Mandate in Learnty |
| --- | --- | --- |
| Mindset (Beliefs, ANTs, LIEs) | Error Feedback / Fear-Free Environment | Positive Reinforcement: Frame errors as essential learning steps for corrective adjustment, not failure. |
| Motivation (P×E×S3) | Active Engagement (Hypothesis Generation, Curiosity) | PBL Engine: Use project creation (Active Engagement) driven by purpose (P) and micro-milestones (S3) to maintain momentum. |
| FASTER/MOM Methods | Attention (Filtering/Amplification) | Focus Control: Employ minimalist design and structured activity timers (Pomodoro/Flow) to optimize signal processing. |
| Review (FASTER R) | Consolidation (Spaced Rehearsal, Sleep) | Adaptive SRS: Implement automated, personalized review based on Bayesian prediction of forgetting risk. |

### II. Dehaene’s Pillars Meet Kwik’s Triad: The Integrated P-E-M-C Model

This integrated model translates abstract cognitive theory into concrete design guidelines, detailing how each pair of principles maximizes a specific stage of the learning cycle.

**A. Mindset Integration: Building Resilience Against LIEs and ANTs through Positive Feedback**

#### Error Correction and the Fear-Free Environment (Mindset + Error Feedback)

Jim Kwik highlights that learning is often limited by psychological barriers, categorized as Limited Ideas Entertained (LIEs) and Automatic Negative Thoughts (ANTs). These internal narratives about capability ("I'm too stupid," "I have a broken brain") must be dismantled. The neurobiological underpinning provided by Dehaene clarifies that this is essential because negative emotions, stress, and fear actively crush the brain's learning potential. Traditional educational systems frequently equate error feedback with punishment, which generates fear and anxiety.

Learnty must explicitly decouple error from punishment. The application must operate on the principle of *gradient descent*, treating every incorrect attempt as highly valuable information that provides the necessary directional signal for adjusting the internal mental model. The user interface must replace punitive grading systems with metrics that emphasize progress and successful correction (e.g., "Accuracy improved by 15% on the second attempt" instead of a failing score). To operationalize the dismantling of psychological barriers, the platform must integrate processes that guide the user through actively naming their limiting beliefs, gathering factual evidence to counter them, and creating new, empowering beliefs. This translates into mandatory reflection checkpoints following significant intellectual setbacks, reinforcing the necessity of mistakes as integral steps toward mastery, thereby cultivating a growth mindset where errors are viewed purely as data points for corrective change.

**B. Engagement Maximization: The Motivation Loop and Active Hypothesis Generation**

#### Active Engagement via Project-Based Learning (Motivation + Active Engagement)

Dehaene’s research categorically shows that passive learning yields negligible results, stressing that the optimal state for knowledge acquisition requires active engagement, curiosity, and continuous hypothesis generation. The central learning mechanism for Learnty, Project-Based Learning (PBL), serves as the direct implementation of this active engagement mandate, demanding that the user create and apply knowledge, forcing the brain to generate and test conceptual models.

#### Sustaining Momentum with the Motivation Formula

Sustaining this intense, active engagement requires a powerful motivational engine. Kwik’s formula defines motivation as the product of **Purpose (P), Energy (E),** and **Small Simple Steps (S3)**. The principle of Small Simple Steps (S3) is crucial for converting intimidating book content into achievable milestones. This systematic chunking directly addresses the *Zeigarnik effect*, where uncompleted tasks create a cognitive tension that sustains focus and momentum. By providing tiny, manageable victories, the brain receives consistent feedback, reinforcing the habit loop.

The synergy between active engagement and motivation creates an ideal state known as **Cognitive Flow**. Flow is achieved when there is a balance between a high challenge (the PBL goal) and the user's skill level, which is managed by the incremental S3 structure. The successful navigation of these small, focused steps ensures that the neurological changes associated with neuroplasticity occur during peak concentration and positive emotional alignment.

Furthermore, the system must continually reinforce the learner's emotional "Why"—their Purpose (P). Active learning requires immediately integrating new information into the pre-existing network of knowledge. This semantic anchoring is enforced by requiring the user to frequently answer Kwik's three dominant questions: *How can I use this?* *Why must I use this? When will I use this?*. Aligning the new skill with a personal future application maintains emotional drive and solidifies the knowledge structure.

**C. Methodological Rigor: The FASTER/MOM Methodologies as Structured Learning Pathways**

#### Attention as the Learning Gateway (Method + Attention)

Dehaene identifies attention as the "gateway to learning"; information that is not actively selected and amplified by attentional circuits will not be effectively encoded into memory. Kwik’s **FASTER** method (**F**orget, **A**ct, **S**tate, **T**each, **E**nter, **R**eview) provides the structured operational procedure for mastering this attention filter. The initial step, "Forget," is particularly vital, requiring the temporary suppression of limiting beliefs, distractions, and preconceived notions. This deliberate clearing of cognitive clutter is the necessary precondition for achieving optimal attention.

#### Mitigating Digital Supervillains

The most significant threat to the Attention pillar in a mobile environment is the modern phenomenon Kwik labels the **Digital Supervillains**: Digital Deluge (information overload), Digital Distraction (notification pings), Digital Dementia (outsourcing memory), and Digital Deduction (outsourcing critical thought). The analysis of attention reveals that the human brain cannot genuinely multitask; attempts to handle multiple cognitive tasks simultaneously cause significant performance degradation and large processing delays, consuming resources in the brain's limited "global workspace".

Therefore, Learnty's design must actively enforce monomodal attention. The architecture mandates a minimalist, austere user interface and the strict use of Focus Timers (e.g., Pomodoro/Flow state techniques) to counter Digital Distraction and Deluge. This structured approach protects the finite cognitive resources required for deep, deliberate learning. The Method of Memory (MOM), emphasizing visualization and association, will be strategically introduced in later phases to teach users how to manually create powerful mental links, leveraging the brain’s natural propensity for visual and spatial memory.

**D. Consolidation Strategy: Spaced Repetition, Review, and Predictive Modeling**

#### Automating Skills via Consolidation (Method + Consolidation)

Dehaene identifies Consolidation as the final, critical pillar, essential for automating skills (procedural memory) and transferring ephemeral knowledge into long-term semantic memory through repetition, sleep, and nightly rehearsal. This directly aligns with the "Review" (R) component of Kwik’s FASTER method. To optimize Consolidation, Learnty must integrate an adaptive **Spaced Repetition System (SRS)**.

Passive reading or restudy results in an *illusion of competence*, failing to distinguish recognition from true recollection. Consequently, the review process must prioritize **Active Recall**, forcing the user to predict or generate the answer before receiving feedback. This deliberate retrieval effort strengthens synaptic connections and reduces the effects of the forgetting curve. The use of the Pomodoro Technique, by introducing frequent breaks, maximizes the *Primacy and Recency effects*, creating more optimal learning endpoints that favor retention during study sessions.

#### The Superiority of Bayesian Scheduling

For maximum impact, the SRS must evolve beyond simple fixed-interval systems (like basic SuperMemo SM-2) and adopt Bayesian predictive modeling. Dehaene describes the brain as a sophisticated statistician, constantly estimating uncertainty and operating optimally when reasoning with probabilities. An adaptive Bayesian SRS leverages this neurobiological mechanism by estimating the specific probability that a user will forget a given knowledge unit. This data-driven approach allows for personalized review scheduling based on the highest risk of forgetting, ensuring cognitive effort is applied exactly where synaptic consolidation is most needed.

### III. The Product Roadmap: Feature Prioritization Matrix

The development roadmap is structured by weighing the cognitive impact of a feature (alignment with Dehaene’s Pillars and Kwik’s Triad) against its implementation complexity within the modern Flutter (frontend) and Python/FastAPI (backend) environment.

**A. Prioritization Framework: Weighting Cognitive Impact vs. Implementation Effort** Features are prioritized to deliver the core learning loop—Active Engagement, Error Correction, and Foundational Consolidation—in the Minimum Viable Product (MVP), reserving computationally complex, personalization-focused features for Phase 2+.

**B. Minimum Viable Product (MVP) Feature Set** The MVP focuses on establishing the core loop that transforms passive reading into active doing, leveraging high-impact, medium-to-low effort implementations.

**MVP Feature Set (High Impact / Low-Medium Effort)**

| MVP Feature | Primary Cognitive Pillar | Implementation Estimate | Justification (Impact/Ease) |
| --- | --- | --- | --- |
| Secure Registration/Book Upload | Foundation | Low | Essential structural prerequisite. |
| AI Content Extraction & PBL Roadmap Generator | Active Engagement / Systematicity | Medium | Core UVP: Generates structured S3 milestones, the primary mechanism for engagement. |
| S3 Milestone Tracking | Motivation / Active Engagement | Low | Implements Jim Kwik's Small Simple Steps (S3), leveraging the Zeigarnik effect to sustain momentum and visually represent progress. |
| Basic Spaced Repetition System (SRS) | Consolidation / Review | Medium | Non-negotiable for long-term retention (Dehaene's Consolidation). Implements SM-2 logic using the Python backend for scheduling. |
| Corrective Error Feedback UI | Mindset / Error Feedback | Low | Displays corrective progress metrics (e.g., "Successful Correction") rather than punitive failures to maintain a fear-free learning environment. |
| Digital Deluge Shield (Focus Timer) | Attention / Focus | Low-Medium | Enforces monomodal attention using Pomodoro timing, essential for overcoming Digital Distraction. |

**C. Phase 2+ Feature Set (High Impact / Higher Complexity)** Phase 2+ features focus on enhancing personalization, deep memory augmentation, and expanding social learning mechanisms, often requiring complex algorithmic implementation.

**Phase 2+ Feature Set (High Impact / Higher Complexity)**

| Phase 2+ Feature | Primary Cognitive Pillar | Implementation Estimate | Justification (Impact/Complexity) |
| --- | --- | --- | --- |
| Adaptive Bayesian SRS (Full) | Consolidation / Metacognition | High | Highly personalized review intervals based on forgetting risk, aligning with Dehaene's Bayesian optimality. |
| Custom Memory Palaces (MOM) | Method / Visualization | High | Advanced spatial memory technique that recycles innate spatial neural circuits for abstract information. |
| Team/Classroom Features | Motivation / Teach (T in FASTER) | Medium-High | Enables social learning and external validation, leveraging the power of teaching information to learn it twice. |
| Advanced AI Insight Generation | Deduction / Systematicity | High | Extracts deeper abstract rules and systematic models, enhancing critical thinking skills and composition ability. |
| Offline Mobile Access | Foundation / Energy | High | Improves energy management and universal accessibility, a major factor for sustained motivation. |

### IV. Powerful Features & Gamification Mechanics: The Addiction Loop

The application’s gamification must serve a cognitive purpose, leveraging the innate reward circuits (dopamine pathways) to drive effortful and consistent application of the learning pillars.

**A. S3 Gamification: Micro-Achievements and Momentum Tracking** The reward structure is engineered to reinforce the consistency of Small Simple Steps (S3). Large, infrequent rewards are less effective than frequent, small feedback loops that encourage daily consistency.

**Micro-Achievements:** Rewards should target daily behavioral consistency ("7-Day Focus Streak," "Milestone Completed") rather than single, overwhelming tasks. This approach engages the foundational habit loop and reinforces the momentum required for the long-term acquisition of complex skills.

**Momentum Tracking:** Visual feedback is essential. The PBL Roadmap should be rendered as a continuously filling "Mastery Bar" or a navigable path, directly leveraging the human brain’s affinity for visual clarity and predictable progress.

**"Cognitive Win" Feedback:** The system must trigger immediate positive feedback, such as a "Correction Accepted! Synapse Stronger" visual cue, immediately following a successful error correction within the SRS. This mechanism directly links the emotional reward (dopamine) to the high-effort corrective feedback process, making the challenging mental adjustment rewarding.

**B. Detailed Gamification Mechanics**

#### 1. Cognitive Flow Timers (Attention/Method)

The Focus Timer is mandated in a "Focus Mode" to prevent distraction and induce the cognitive state of Flow. The Pomodoro technique (25 minutes of work followed by 5 minutes of rest) creates the optimal intervals for intensive attention. Breaks must be structured, prompting movement and hydration actions that align with Kwik's Energy recommendations. This integration directly addresses the biological need for oxygenation and energy management, combating the mental fatigue caused by Digital Supervillains.

#### 2. Visualization and Metaphor (Method/Neuronal Recycling)

The ability to create strong mental associations is fundamental to memory. By translating the abstract project milestones into a spatial metaphor, the platform recycles the brain's evolutionarily fixed spatial navigation circuits (grid cells and the entorhinal cortex). The PBL Roadmaps should be visually rendered as a navigable "Knowledge Tree" or a "Spatial Path," enabling users to apply the Method of Loci (MOM) to mentally link sequential project steps, enhancing recall by converting abstract concepts into concrete spatial tags.

#### 3. Adaptive Reward System (Error Feedback/Mindset)

The brain's reward system generates the highest positive reinforcement when the outcome is better than predicted. Learnty’s adaptive reward system should weight experience points (XP) based on cognitive uncertainty. If the Bayesian SRS flags an item as having a "High Risk of Forgetting" and the user successfully recalls it, that action should generate a disproportionately higher reward and XP. This technique deliberately directs the user's focus and effort toward the most difficult, high-value practice (Active Recall), reinforcing the necessary behavior for synaptic consolidation.

**C. Anti-Distraction Design (Conquering the Digital Supervillains)** The native mobile interface prioritizes the protection of the Attention pillar.

**Digital Deluge/Distraction Mitigation:** The UI design must be minimalist and austere, avoiding overly decorated elements (which Dehaene notes can distract from the primary task). During the mandatory Focus Mode, all app notifications and intrusive internal navigation features must be suppressed, aligning with Kwik’s "Forget what's not urgent" directive.

**Digital Dementia Mitigation:** The system must discourage the habit of recognition over recollection. Flashcards and review prompts must always default to the question side, forcing the user to perform Active Recall (retrieval effort) before the correct solution is revealed.

**Digital Deduction Mitigation:** The PBL environment must systematically challenge the user to formulate and articulate their own abstract rules and inferences before allowing comparison with the AI-extracted systematic model. This mandatory act of self-generation trains critical thinking and counters the outsourcing of deduction to technology.

### V. Unique Cognitive Differentiators and Competitive Edge

Learnty’s competitive edge derives from its commitment to integrating profound neurocognitive principles that move beyond simple behavior modification toward fundamental cognitive augmentation.

**A. Neuronal Recycling in PBL** The concept of *neuronal recycling* explains that all cultural learning, such as reading or mathematics, is achieved by repurposing existing, evolutionarily stable neural circuits for novel functions. This mechanism is limited but highly effective when new material is structured to fit these innate circuits. The S3 PBL Roadmap is specifically designed to leverage the Spatial/Linear Bias of the parietal cortex and entorhinal cortex, regions innately predisposed to represent linear quantities, order, and spatial maps. By translating abstract concepts (financial planning steps, business growth milestones) into visual, sequential maps and spatial locations, the learning process utilizes the brain’s strong evolutionary bias for navigation and order, making the abstract concepts more robustly encoded.

Furthermore, drawing upon Dehaene's observation that in blind individuals, the visual cortex can be recycled for highly abstract tasks like mathematics, the application can introduce a strategic sensory constraint in later phases. Optional audio-only review challenges for key project concepts could be implemented. This mechanism forces the recruitment of non-visual cortical areas, strengthening the abstract representation of the knowledge unit by reducing reliance on a single sensory modality.

**B. Systematicity and Composition: Designing for Abstract Inference** Human learning is distinguished by its ability to generalize, extracting systematic, abstract rules (the "language of thought") and composing these rules to solve novel problems. Unlike current artificial intelligence systems, which Dehaene notes struggle with this systematicity, Learnty’s architecture must be engineered to promote it. The AI content generation process must be guided by prompt templates that specifically demand the extraction of generalized rules and core, abstract principles (Systematicity) rather than mere summaries of individual case studies. Crucially, the PBL structure must demand *Composition*: project outputs must require the user to integrate skills derived from multiple, non-sequential preceding milestones. This forces the learner to actively recombine previously mastered skills into a new context, aligning with the human brain’s capacity for universal reason and flexible knowledge application.

**C. Metacognition and Bayesian Testing** The brain operates as a probabilistic computer, continually estimating the certainty of its own knowledge. Learnty leverages this by actively training *Metacognition* (the ability to self-evaluate performance), a skill that plays a fundamental role in human learning. In the SRS interface, the user is required to explicitly rate their confidence—the "quality of assessment" (0-5 scale)—before the solution is revealed. This self-reflection step enhances metacognition and provides the crucial input data needed for the Bayesian SRS algorithm. By quantifying the user’s self-predicted certainty (uncertainty), the system can optimally schedule the next review interval, ensuring learning intensity is dynamically adjusted based on the cognitive estimate of forgetting risk.

### VI. Technical Integration and Deployment Blueprint (Flutter, Python/FastAPI, PostgreSQL)

**A. Backend Architecture for Scalability** The choice of the Python/FastAPI stack is a strategic necessity, driven by the computational demands of the core learning algorithms.

**Python (FastAPI/Django) Role:** Python is the industry standard for AI, machine learning (ML), and sophisticated statistical computation, making it indispensable for running the AI prompt orchestration and executing the complex SRS algorithms.

**API Framework:** FastAPI is selected as a high-performance, asynchronous API layer (with Django as a robust alternative) necessary for coordinating external LLM calls and delivering high-performance review scheduling data to the mobile client.

**Data Model Necessity:** The backend must establish a persistent data model (in a PostgreSQL database) to store the behavioral inputs necessary for adaptive learning. Critical data fields for each knowledge unit (flashcard/milestone) must include: content_id, user_id, last_reviewed_date, easiness_factor (EF), repetitions, interval (days), and confidence_score (user self-assessment, 0-5 scale).

**Technical Constraint Management:** To maintain a high-performance native experience, the core logical processing remains server-side (FastAPI/Python). The frontend utilizes the Flutter framework, which compiles to native code, to handle dynamic UI updates and ensure minimal latency.

**B. Implementing Consolidation: Detailed Spaced Repetition System (SRS) Design** The SRS is the most critical algorithmic component for achieving Dehaene’s Consolidation pillar. The MVP should adopt an adaptive framework like the SuperMemo SM-2 algorithm, providing immediate high cognitive impact.

**Detailed SRS Algorithm Implementation (Python/FastAPI)**

| Algorithm Component | Description | Technical Requirement (FastAPI/Python) |
| --- | --- | --- |
| SM-2 Core Logic | Calculates new Easiness Factor (EF) and Interval based on user's quality of assessment (0-5). | Dedicated Python utility module integrated with FastAPI and an ORM (like SQLAlchemy or SQLModel) for persistent storage of EF, Interval, and Repetitions in the PostgreSQL database. |
| Active Recall Trigger | Prompts the user to answer/rate confidence before showing the solution. | The Flutter frontend logic must enforce the confidence rating (0-5) for every review, sending this "quality" input to the FastAPI API. |
| Scheduling Endpoint | FastAPI API endpoint (/api/review/due) that queries the database for cards where nextPracticeDate <= today. | High-performance database query (PostgreSQL) is essential to quickly retrieve the next set of review items due for practice. |
| Bayesian Readiness (Phase 2) | Transition to sophisticated models like Ebisu by estimating the probability of correct response for each (user, question)-pair. | Requires integration of specialized Python ML libraries (e.g., Scikit-learn, Ebisu library) and increased server resources (High Implementation Effort). |

**C. AI Prompt Engineering Templates for PBL Content Generation** The AI integration, managed via the Python backend, is required to generate structured, action-oriented projects aligned with Kwik’s S3 and Dehaene’s Systematicity. The use of the Template Pattern is mandatory to ensure predictable, structured output.

**AI Prompt Template: Book-to-Project Transformation (FastAPI/Python LLM Integration)**

| Prompt Section | Mandate | Cognitive Alignment |
| --- | --- | --- |
| Persona & Context | "Act as a Senior Cognitive Analyst and Curriculum Designer. You are summarizing content from for a self-paced mobile learner." | Enforces analytical rigor and pedagogical focus. |
| The Core Extraction | "Extract 5 core, abstract principles (Systematicity) and the most valuable overarching skill (Composition) from this text:" | Forces extraction of rules/generalizations, promoting abstract inference. |
| PBL Generation (S3 Structure) | "Based on these principles, design a 7-day Project-Based Learning unit. Include a single Driving Question and break the project into 7 Small Simple Steps (S3)." | Aligns with Motivation (S3) and Active Engagement. |
| Assessment & Feedback | "For each S3 Milestone, define the Activity, the required Output (creation, not regurgitation), and the Assessment Criteria (focusing on corrective, non-punitive feedback)." | Aligns with Error Feedback and Active Recall. |

### VII. Conclusion and Recommendations

The framework for 'Learnty' successfully integrates Jim Kwik’s applied metalearning strategies with Stanislas Dehaene’s neurobiological universals. The resulting model is highly constrained, ensuring that every design decision serves a validated cognitive function, maximizing the efficiency of memory encoding and consolidation. The analysis confirms that the project-based learning (PBL) environment inherently fulfills the mandate for Dehaene’s Active Engagement pillar. The necessary adjuncts, such as the Focus Timer (Attention) and the Adaptive SRS (Consolidation), are critical features that must be prioritized in the MVP to establish the scientific credibility of the application. The architecture successfully leverages the FastAPI/Python stack for powerful algorithmic execution while delivering a minimalist, attention-protective, native mobile user experience via Flutter.

**Final Recommendations**

**Prioritize the Consolidation Engine:** The most impactful feature for long-term knowledge retention is the Adaptive SRS. While resource constraints require starting with SM-2, the backend must be built with immediate readiness for the high-impact Bayesian predictive scheduling algorithm (Phase 2) to leverage the brain’s optimal statistical reasoning capability.

**Enforce Monomodal Attention:** The "Digital Deluge Shield" (Focus Timer) must be a mandatory element of the MVP, strictly enforced during active sessions. Protecting the user’s "global workspace" from Digital Distraction is non-negotiable for successful information amplification and encoding.

**Mandate Metacognition:** The UI must enforce self-assessment (confidence rating) before revealing answers in the SRS. This critical step not only feeds the adaptive algorithm but also actively trains the user's metacognitive ability, fundamentally improving their self-directed learning capacity.

**Adopt Neuronal Recycling Visuals:** The MVP's PBL roadmap design must explicitly utilize spatial and linear visual metaphors. This strategy recycles the brain's strong, fixed neural bias for spatial navigation and order, anchoring abstract concepts in evolutionarily privileged circuits.

**Sources used in the report**

Stanislas Dehaene - How We Learn by Stanislas Dehaene.pdf

Limitless-Jim -Kwik.pdf

LEARNTY PROJECT.txt

mindbrained.org

jayshetty.me

jimkwik.com - Understanding What Drives You - Jim Kwik

jimkwik.com - The FASTER method for learning anything can keep you ahead of the AI curve | Jim Kwik

supersummary.com

stackoverflow.com - Best way to modify and generalize spaced repetition software - Stack Overflow

monsha.ai - 10+ Best Lesson Planning AI Prompts for Teachers [Templates & Examples] - Monsha

stackoverflow.com - java - Spaced repetition algorithm from SuperMemo (SM-2) - Stack Overflow

wegrowteachers.com - 3 AI In PBL Prompt Strategies to Support Design and Planning

reddit.com - Any tips for implementing Spaced Repetition (SRS) algorithm? Like what ANKI uses.

mitsloanedtech.mit.edu - Effective Prompts for AI: The Essentials - MIT Sloan Teaching & Learning Technologies

*Sources read but not used in the report*
