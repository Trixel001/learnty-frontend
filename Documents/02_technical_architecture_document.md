# Learnty Technical Architecture Document
## Version 1.0 | Software Architect Perspective

### Architecture Overview

#### System Vision
Learnty's architecture is designed as a modern, scalable, cloud-native system that leverages AI while maintaining high performance, security, and user experience across mobile and web platforms.

#### Design Principles
1. **Scalability First:** Architecture must handle 10x growth without major refactoring
2. **AI-Native Integration:** Seamless integration with multiple AI providers
3. **Mobile-First Performance:** Optimized for mobile devices with offline capabilities
4. **Security by Design:** Privacy-first architecture with data encryption
5. **Developer Productivity:** Modern tooling and development workflows

### Technology Stack Selection (2025 Standards)

#### Frontend Architecture

##### Flutter 3.32+ Framework
**Rationale for Selection:**
- **Single Codebase Advantage:** iOS, Android, and Web from one codebase <citation>8</citation>
- **Performance:** Compiled to native ARM code with minimal runtime overhead
- **AI Integration Ready:** Firebase AI Logic integration available <citation>5</citation>
- **Hot Reload:** Experimental web hot reload for rapid development <citation>5</citation>

**Architecture Patterns:**
- **Clean Architecture:** Separation of concerns with dependency injection
- **BLoC Pattern:** State management for complex UI interactions
- **Repository Pattern:** Abstract data access layer
- **Dependency Injection:** Using `get_it` for service locator pattern

**Key Flutter Features Utilization:**
```dart
// Focus Mode Implementation Example
class FocusTimerBloc extends Bloc<FocusEvent, FocusState> {
  final FocusRepository _focusRepository;
  final AudioService _audioService;
  
  Stream<int> mapEventToState(FocusEvent event) async* {
    if (event is StartFocus) {
      yield FocusInProgress(event.duration);
      await _audioService.playFocusMusic();
      // Timer implementation with pause/resume
    }
  }
}
```

#### Backend Architecture

##### Python FastAPI Framework (2025 Best Practices)
**Why FastAPI in 2025:**
- **Performance Leadership:** 3-5x faster than Django for API workloads <citation>30</citation>
- **AI Integration:** Native async support for AI API calls
- **Type Safety:** Built-in request/response validation
- **Documentation:** Automatic OpenAPI generation
- **Production Ready:** Proven scalability in enterprise environments <citation>33</citation>

**Backend Architecture Patterns:**
- **Clean Architecture:** Domain-driven design with clear boundaries
- **Repository Pattern:** Abstract database access
- **Service Layer:** Business logic isolation
- **Dependency Injection:** Using FastAPI's built-in system
- **Event-Driven Design:** Async event processing for AI tasks

```python
# Example: AI Content Processing Service
from fastapi import BackgroundTasks
from typing import List
import asyncio

class AIContentProcessor:
    def __init__(self, openai_client: OpenAIClient, database: Database):
        self.openai_client = openai_client
        self.database = database
        
    async def process_book_content(
        self, 
        book_id: str, 
        content: bytes,
        background_tasks: BackgroundTasks
    ) -> str:
        """Process book content with AI and return task ID"""
        
        # Extract text from uploaded file
        text_content = await self.extract_text(content)
        
        # Queue AI processing as background task
        background_tasks.add_task(
            self._generate_learning_roadmap, 
            book_id, 
            text_content
        )
        
        return f"processing_task_{book_id}"
    
    async def _generate_learning_roadmap(
        self, 
        book_id: str, 
        content: str
    ) -> None:
        """Background AI processing task"""
        try:
            # Generate PBL roadmap using AI
            roadmap = await self.openai_client.generate_roadmap(content)
            
            # Store in database
            await self.database.save_roadmap(book_id, roadmap)
            
            # Send notification to user
            await self.notification_service.send_completion(book_id)
            
        except Exception as e:
            await self.error_handler.handle_processing_error(book_id, e)
```

#### Database Architecture

##### PostgreSQL Primary Database
**Justification:**
- **ACID Compliance:** Critical for user data and learning progress
- **JSON Support:** Flexible schema for AI-generated content
- **Scalability:** Horizontal scaling with read replicas
- **AI Integration:** Vector extensions for semantic search (Phase 2)

**Database Schema Design:**

```sql
-- Core Tables Structure
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    subscription_tier VARCHAR(20) DEFAULT 'free'
);

CREATE TABLE books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    title VARCHAR(500) NOT NULL,
    content_hash VARCHAR(64) UNIQUE,
    file_url TEXT NOT NULL,
    processing_status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE learning_roadmaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID REFERENCES books(id),
    user_id UUID REFERENCES users(id),
    roadmap_data JSONB NOT NULL,
    completion_percentage DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE spaced_repetition_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    book_id UUID REFERENCES books(id),
    concept_text TEXT NOT NULL,
    easiness_factor DECIMAL(4,2) DEFAULT 2.50,
    repetitions INTEGER DEFAULT 0,
    interval_days INTEGER DEFAULT 0,
    next_review_date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);
```

##### Redis Caching Layer
**Purpose:**
- Session management and temporary data
- AI response caching to reduce API costs
- Real-time features (focus timer sync)
- Rate limiting and throttling

#### AI Integration Architecture

##### Multi-Provider Strategy
**Primary Providers:**
- **OpenAI GPT-4:** Content generation and analysis
- **Anthropic Claude:** Complex reasoning and safety-critical tasks
- **Google Gemini:** Backup and specialized use cases

**AI Service Architecture:**
```python
# AI Service Abstraction Layer
from abc import ABC, abstractmethod
from typing import Dict, Any

class AIServiceProvider(ABC):
    @abstractmethod
    async def generate_roadmap(self, content: str, genre: str) -> Dict[str, Any]:
        pass
    
    @abstractmethod
    async def extract_concepts(self, text: str) -> List[str]:
        pass

class OpenAIProvider(AIServiceProvider):
    def __init__(self, api_key: str):
        self.client = OpenAI(api_key=api_key)
    
    async def generate_roadmap(self, content: str, genre: str) -> Dict[str, Any]:
        prompt = self._build_roadmap_prompt(content, genre)
        response = await self.client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=2000
        )
        return self._parse_roadmap_response(response.choices[0].message.content)
    
    def _build_roadmap_prompt(self, content: str, genre: str) -> str:
        return f"""
        Act as a Senior Cognitive Analyst and Curriculum Designer.
        You are summarizing content from a {genre} book for a self-paced mobile learner.
        
        Extract 5 core, abstract principles and create a 7-day Project-Based Learning unit.
        Include a single Driving Question and break the project into 7 Small Simple Steps (S3).
        
        Content to analyze: {content[:3000]}...
        
        Respond with JSON format containing:
        - driving_question
        - core_principles (array of 5)
        - s3_milestones (array of 7 with title, description, estimated_duration)
        - assessment_criteria
        """
```

### System Architecture Diagrams

#### High-Level System Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Mobile Apps   │    │   Web Client     │    │  Admin Panel    │
│  (Flutter)      │    │   (Flutter Web)  │    │  (React/Vue)    │
└─────────┬───────┘    └──────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────┬───────────────────┬─────────┘
                         │                   │
              ┌──────────▼──────┐  ┌─────────▼──────────┐
              │   API Gateway   │  │   Load Balancer   │
              │  (CloudFlare)   │  │     (AWS ALB)     │
              └─────────┬───────┘  └─────────┬──────────┘
                        │                    │
              ┌─────────▼──────┐  ┌─────────▼──────────┐
              │   FastAPI      │  │   FastAPI Workers  │
              │   Main API     │  │   (AI Processing)  │
              └─────────┬───────┘  └─────────┬──────────┘
                        │                    │
              ┌─────────▼──────┐  ┌─────────▼──────────┐
              │   PostgreSQL   │  │      Redis        │
              │   (Primary)    │  │    (Cache)        │
              └────────────────┘  └───────────────────┘
                        │
              ┌─────────▼──────┐
              │   AWS S3       │
              │ (File Storage) │
              └────────────────┘
```

#### Microservices Breakdown
1. **User Service:** Authentication, profiles, subscription management
2. **Content Service:** Book processing, AI integration, content analysis
3. **Learning Service:** PBL generation, progress tracking, SRS scheduling
4. **Notification Service:** Real-time updates, email notifications
5. **Analytics Service:** User behavior tracking, learning metrics
6. **Payment Service:** Subscription management, billing (Phase 2)

### Security Architecture

#### Authentication & Authorization
```python
# JWT-based Authentication
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
import jwt

security = HTTPBearer()

async def get_current_user(token: str = Depends(security)) -> User:
    try:
        payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=["HS256"])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        user = await user_service.get_user_by_id(user_id)
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        
        return user
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
```

#### Data Protection Strategy
1. **Encryption at Rest:** AES-256 for database and file storage
2. **Encryption in Transit:** TLS 1.3 for all communications
3. **API Security:** Rate limiting, input validation, SQL injection prevention
4. **PII Protection:** Data minimization, anonymization, GDPR compliance
5. **AI Data Handling:** Secure API calls, response sanitization, prompt injection prevention

### Performance & Scalability

#### Performance Optimization Strategies

##### Frontend Performance
```dart
// Flutter Performance Best Practices
class OptimizedBookList extends StatelessWidget {
  const OptimizedBookList({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      // Use ListView.builder for large lists
      itemCount: books.length,
      itemBuilder: (context, index) {
        return BookListItem(
          book: books[index],
          // Lazy loading for images
          imageProvider: CachedNetworkImageProvider(books[index].coverUrl),
        );
      },
    );
  }
}

// Image Optimization with CachedNetworkImage
CachedNetworkImage(
  imageUrl: book.coverUrl,
  placeholder: (context, url) => CircularProgressIndicator(),
  errorWidget: (context, url, error) => Icon(Icons.error),
  memCacheWidth: 300, // Resize for memory efficiency
  memCacheHeight: 400,
)
```

##### Backend Performance
```python
# Async Database Operations
async def get_user_books(user_id: str) -> List[Book]:
    """Efficiently fetch user books with connection pooling"""
    async with DatabasePool() as db:
        query = """
        SELECT id, title, created_at, processing_status 
        FROM books 
        WHERE user_id = $1 
        ORDER BY created_at DESC
        LIMIT 50
        """
        return await db.fetch(query, user_id)

# Caching Strategy
from functools import lru_cache
import redis

class ContentCache:
    def __init__(self):
        self.redis_client = redis.Redis(host='localhost', port=6379, db=0)
    
    async def get_processed_content(self, content_hash: str) -> Optional[Dict]:
        cached = self.redis_client.get(f"content:{content_hash}")
        if cached:
            return json.loads(cached)
        return None
    
    async def cache_processed_content(
        self, 
        content_hash: str, 
        processed_data: Dict, 
        ttl: int = 3600
    ) -> None:
        self.redis_client.setex(
            f"content:{content_hash}", 
            ttl, 
            json.dumps(processed_data)
        )
```

#### Scaling Strategy
1. **Horizontal Scaling:** Auto-scaling groups for API servers
2. **Database Scaling:** Read replicas, connection pooling, query optimization
3. **CDN Integration:** CloudFlare for static assets and API caching
4. **Message Queues:** Redis/RabbitMQ for async processing
5. **Monitoring:** Prometheus + Grafana for performance monitoring

### Development & Deployment Architecture

#### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy Learnty

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Run tests
        run: |
          python -m pytest tests/ --cov=app --cov-report=xml
      
      - name: Flutter tests
        run: |
          flutter test
      
  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Build Docker image
        run: docker build -t learnty-api:latest .
      
      - name: Deploy to AWS ECS
        run: |
          aws ecs update-service --cluster learnty-prod --service learnty-api
```

#### Environment Configuration
- **Development:** Local Docker Compose setup
- **Staging:** AWS ECS with production-like configuration
- **Production:** Multi-AZ deployment with auto-scaling

### Monitoring & Observability

#### Application Monitoring
```python
# Structured Logging and Monitoring
import structlog
from prometheus_client import Counter, Histogram

# Metrics
api_requests_total = Counter('api_requests_total', 'Total API requests', ['method', 'endpoint'])
api_request_duration = Histogram('api_request_duration_seconds', 'API request duration')

@api_request_duration.time()
async def process_request(request: Request):
    api_requests_total.labels(method=request.method, endpoint=request.url.path).inc()
    # Process request logic
```

#### Health Checks
```python
# Health Check Endpoints
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "database": await check_database_connection(),
        "redis": await check_redis_connection(),
        "ai_services": await check_ai_services()
    }

@app.get("/ready")
async def readiness_check():
    """Kubernetes readiness probe endpoint"""
    checks = await asyncio.gather(
        check_database_connection(),
        check_redis_connection(),
        check_external_apis()
    )
    
    if all(checks):
        return {"status": "ready"}
    else:
        raise HTTPException(status_code=503, detail="Service not ready")
```

### Disaster Recovery & Backup

#### Backup Strategy
1. **Database Backups:** Daily automated backups with 30-day retention
2. **File Storage:** Cross-region replication for S3 buckets
3. **Configuration Backup:** Infrastructure as Code (Terraform) version control
4. **Recovery Testing:** Monthly DR drills and validation

#### Failure Scenarios & Response
1. **Database Failure:** Automatic failover to read replica, alert on-call engineer
2. **AI Service Outage:** Graceful degradation, fallback to cached responses
3. **High Traffic:** Auto-scaling trigger, rate limiting activation
4. **Security Incident:** Immediate isolation, security team notification

### Cost Optimization

#### Resource Optimization Strategies
1. **Serverless Functions:** AWS Lambda for bursty workloads
2. **Spot Instances:** Cost-effective compute for non-critical workloads
3. **Reserved Capacity:** 30-50% savings on predictable workloads
4. **Intelligent Caching:** Reduce AI API costs through response caching
5. **Storage Optimization:** Lifecycle policies for infrequently accessed data

### Future Architecture Considerations

#### VR Integration Readiness (Phase 3)
- **WebXR APIs:** Browser-based VR capabilities
- **3D Asset Management:** Scalable storage for VR content
- **Real-time Streaming:** Low-latency VR content delivery
- **Cross-Platform VR:** Unity/Unreal integration planning

#### AI Model Fine-tuning
- **Custom Learning Models:** Domain-specific model training
- **Edge Computing:** Local AI processing for offline capabilities
- **Model Versioning:** A/B testing framework for model improvements

---

**Document prepared by:** MiniMax Agent (Technical Architecture Team)  
**Date:** October 24, 2025  
**Next Review:** November 7, 2025