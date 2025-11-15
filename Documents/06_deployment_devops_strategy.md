# Learnty Deployment & DevOps Strategy
## Version 1.0 | DevOps & Infrastructure Perspective

### Executive Summary

This document outlines the comprehensive deployment and DevOps strategy for Learnty, designed to support rapid development, seamless scaling, and high availability. The strategy leverages modern cloud-native technologies, follows infrastructure-as-code principles, and implements robust monitoring and security practices aligned with 2025 industry standards.

### DevOps Philosophy & Principles

#### Core Principles
1. **Infrastructure as Code (IaC):** All infrastructure managed through code for consistency and reproducibility
2. **Continuous Integration/Continuous Deployment (CI/CD):** Automated testing and deployment pipelines
3. **Observability First:** Comprehensive monitoring, logging, and alerting from day one
4. **Security by Design:** Security integrated throughout the development lifecycle
5. **Scalability Planning:** Architecture designed for 10x growth without major changes
6. **Developer Experience:** Tools and processes that enable rapid, safe development

#### Technology Alignment with 2025 Standards
Based on latest research findings:
- **Container Orchestration:** Kubernetes with service mesh for microservices management
- **Cloud Provider:** AWS/GCP multi-cloud strategy for vendor independence
- **Monitoring:** Prometheus + Grafana + ELK stack for comprehensive observability
- **Security:** Zero-trust architecture with automated security scanning
- **AI/ML Infrastructure:** GPU-enabled nodes for AI workload processing

### Infrastructure Architecture

#### Cloud Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Internet/DNS                          │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│               CloudFlare CDN & DDoS Protection              │
│                (Global edge network)                        │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│           AWS Application Load Balancer (ALB)               │
│              (SSL termination, routing)                     │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                AWS ECS Fargate Cluster                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ FastAPI API │  │ AI Workers  │  │ WebSocket   │         │
│  │  Service    │  │  Service    │  │  Service    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                  Data Layer                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ PostgreSQL  │  │    Redis    │  │    S3       │         │
│  │  (Primary)  │  │   (Cache)   │  │ (Storage)   │         │
│  │  + Read     │  │             │  │             │         │
│  │  Replicas   │  │             │  │             │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

#### Infrastructure Components

##### 1. Compute Layer: AWS ECS Fargate
**Rationale:**
- Serverless containers eliminate server management overhead
- Auto-scaling capabilities for variable workloads
- Cost-effective for variable AI processing workloads <citation>33</citation>
- Integration with AWS AI services and GPU instances

```yaml
# ECS Task Definition Example
version: '3.8'
services:
  learnty-api:
    image: learnty/api:latest
    ports:
      - "8000:8000"
    environment:
      - ENVIRONMENT=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
    deploy:
      replicas: 2
      resources:
        limits:
          cpus: '1.0'
          memory: 2GB
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
    logging:
      driver: awslogs
      options:
        awslogs-group: /ecs/learnty-api
        awslogs-region: us-west-2
        awslogs-stream-prefix: ecs
```

##### 2. Database Layer: AWS RDS PostgreSQL + Redis
**PostgreSQL Configuration:**
- **Primary Instance:** db.r6g.large (2 vCPU, 16GB RAM)
- **Read Replicas:** 2 instances for read scaling
- **Storage:** 100GB provisioned IOPS (10,000 IOPS)
- **Backup:** Automated daily backups with 30-day retention
- **Multi-AZ:** Cross-AZ deployment for high availability

```sql
-- Database Performance Optimization
-- Connection Pool Configuration
ALTER SYSTEM SET max_connections = 200;
ALTER SYSTEM SET shared_buffers = '4GB';
ALTER SYSTEM SET effective_cache_size = '12GB';
ALTER SYSTEM SET maintenance_work_mem = '1GB';
ALTER SYSTEM SET checkpoint_completion_target = 0.9;
ALTER SYSTEM SET wal_buffers = '16MB';
ALTER SYSTEM SET default_statistics_target = 100;

-- Index Optimization for Learning Data
CREATE INDEX CONCURRENTLY idx_learning_cards_user_id 
ON spaced_repetition_cards(user_id) WHERE active = true;

CREATE INDEX CONCURRENTLY idx_projects_completion 
ON learning_roadmaps(completion_percentage) 
WHERE completion_percentage > 0;
```

##### 3. Caching Layer: Amazon ElastiCache (Redis)
**Configuration:**
- **Node Type:** cache.r6g.large (2 vCPU, 13.07GB RAM)
- **Cluster Mode:** Enabled with 3 shards
- **Replication:** Multi-AZ with automatic failover
- **Use Cases:** Session storage, AI response caching, rate limiting

```python
# Redis Configuration for Learnty
import redis
from redis.cluster import RedisCluster

class LearntyCache:
    def __init__(self):
        self.cluster = RedisCluster(
            startup_nodes=REDIS_STARTUP_NODES,
            skip_full_coverage_check=True,
            max_redirects=3,
            decode_responses=True
        )
    
    async def cache_ai_response(self, book_hash: str, response: dict, ttl: int = 3600):
        """Cache AI responses to reduce API costs"""
        cache_key = f"ai_response:{book_hash}"
        await self.cluster.setex(cache_key, ttl, json.dumps(response))
    
    async def get_cached_ai_response(self, book_hash: str) -> Optional[dict]:
        """Retrieve cached AI response"""
        cache_key = f"ai_response:{book_hash}"
        cached = await self.cluster.get(cache_key)
        return json.loads(cached) if cached else None
```

##### 4. Storage Layer: AWS S3 + CloudFront CDN
**S3 Configuration:**
- **Bucket 1:** learnty-user-uploads (book files, user content)
- **Bucket 2:** learnty-app-assets (static files, images)
- **Bucket 3:** learnty-backups (database backups, logs)

**CloudFront Distribution:**
- **Global Edge Locations:** 200+ points of presence
- **Custom Domain:** cdn.learnty.com for static assets
- **Security:** HTTPS-only, WAF protection

### Containerization & Orchestration

#### Docker Configuration

##### FastAPI Application Dockerfile
```dockerfile
# Multi-stage build for production optimization
FROM python:3.11-slim as builder

# Install build dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Create virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Production stage
FROM python:3.11-slim as production

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy virtual environment from builder
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Create non-root user
RUN useradd --create-home --shell /bin/bash app
USER app

# Copy application code
WORKDIR /app
COPY --chown=app:app . .

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Run application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

##### Flutter Web Application Dockerfile
```dockerfile
# Flutter Web Deployment
FROM node:18-alpine as build

WORKDIR /app

# Install Flutter
RUN apk add --no-cache \
    clang \
    cmake \
    ninja \
    build-base \
    curl \
    git \
    unzip

RUN curl -s https://flutter.dev/docs/get-started/install/linux | sh
ENV PATH="$PATH:/flutter/bin"
ENV FLUTTER_ROOT="/flutter"

# Copy Flutter project
COPY pubspec.yaml ./
RUN flutter pub get

# Copy source code
COPY . .

# Build web application
RUN flutter build web --release --dart-define=flutter.web.canvaskit.url=/canvaskit/

# Production server
FROM nginx:alpine

# Copy built application
COPY --from=build /app/build/web /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Kubernetes Deployment

##### FastAPI Service Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: learnty-api
  labels:
    app: learnty-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: learnty-api
  template:
    metadata:
      labels:
        app: learnty-api
    spec:
      containers:
      - name: api
        image: learnty/api:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: learnty-secrets
              key: database-url
        - name: OPENAI_API_KEY
          valueFrom:
            secretKeyRef:
              name: learnty-secrets
              key: openai-api-key
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: learnty-api-service
spec:
  selector:
    app: learnty-api
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8000
  type: ClusterIP
```

##### Auto-scaling Configuration
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: learnty-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: learnty-api
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

### CI/CD Pipeline

#### GitHub Actions Workflow

##### Main Deployment Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy Learnty

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: learnty_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
        
    - name: Set up Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        
    - name: Cache Python dependencies
      uses: actions/cache@v3
      with:
        path: ~/.cache/pip
        key: ${{ runner.os }}-pip-${{ hashFiles('**/requirements.txt') }}
        
    - name: Install Python dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
        pip install -r requirements-dev.txt
        
    - name: Run Python tests
      run: |
        pytest tests/ --cov=app --cov-report=xml --cov-report=html
        
    - name: Setup Flutter
      uses: subosito/flutter-action@v2
      with:
        flutter-version: '3.32.0'
        
    - name: Cache Flutter dependencies
      uses: actions/cache@v3
      with:
        path: |
          .flutter
          .pub-cache
        key: ${{ runner.os }}-flutter-${{ hashFiles('**/pubspec.lock') }}
        
    - name: Get Flutter dependencies
      run: flutter pub get
      
    - name: Run Flutter tests
      run: flutter test
      
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Log in to Container Registry
      uses: docker/login-action@v3
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
        
    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v5
      with:
        images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
        tags: |
          type=ref,event=branch
          type=ref,event=pr
          type=sha,prefix={{branch}}-
          type=raw,value=latest,enable={{is_default_branch}}
          
    - name: Build and push Docker image
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}
        cache-from: type=gha
        cache-to: type=gha,mode=max

  deploy-staging:
    needs: build-and-push
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    
    steps:
    - name: Deploy to staging
      run: |
        echo "Deploying to staging environment..."
        # kubectl commands for staging deployment
        
  deploy-production:
    needs: build-and-push
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    
    steps:
    - name: Deploy to production
      run: |
        echo "Deploying to production environment..."
        # kubectl commands for production deployment
        
    - name: Health check
      run: |
        curl -f https://api.learnty.com/health || exit 1
```

#### Infrastructure as Code (Terraform)

##### Main Infrastructure
```hcl
# terraform/main.tf
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
  }
  
  backend "s3" {
    bucket = "learnty-terraform-state"
    key    = "infrastructure/terraform.tfstate"
    region = "us-west-2"
    encrypt = true
  }
}

provider "aws" {
  region = var.aws_region
}

# EKS Cluster
module "eks" {
  source = "terraform-aws-modules/eks/aws"
  
  cluster_name    = var.cluster_name
  cluster_version = "1.28"
  
  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets
  
  node_groups = {
    main = {
      desired_capacity = 3
      max_capacity     = 10
      min_capacity     = 1
      
      instance_types = ["t3.medium"]
      
      k8s_labels = {
        Environment = "production"
        Application = "learnty"
      }
    }
    
    ai_workers = {
      desired_capacity = 1
      max_capacity     = 5
      min_capacity     = 0
      
      instance_types = ["p3.2xlarge"] # GPU instances for AI workloads
      
      taints = [{
        key    = "ai-workload"
        value  = "true"
        effect = "NO_SCHEDULE"
      }]
      
      k8s_labels = {
        workload-type = "ai"
        Application   = "learnty"
      }
    }
  }
  
  manage_aws_auth = false
}

# RDS PostgreSQL
resource "aws_db_instance" "learnty" {
  identifier = "learnty-postgres"
  
  engine         = "postgres"
  engine_version = "15.4"
  instance_class = "db.r6g.large"
  
  allocated_storage     = 100
  max_allocated_storage = 1000
  storage_type          = "gp3"
  storage_encrypted     = true
  
  db_name  = var.database_name
  username = var.database_username
  password = var.database_password
  
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.learnty.name
  
  backup_retention_period = 30
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  skip_final_snapshot = false
  final_snapshot_identifier = "learnty-final-snapshot-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  
  performance_insights_enabled = true
  monitoring_interval         = 60
  monitoring_role_arn         = aws_iam_role.rds_monitoring.arn
  
  tags = {
    Environment = "production"
    Application = "learnty"
  }
}
```

### Security Architecture

#### Zero-Trust Security Model

##### 1. Network Security
```yaml
# Network Policy Example
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: learnty-network-policy
spec:
  podSelector:
    matchLabels:
      app: learnty-api
  policyTypes:
  - Ingress
  - Egress
  
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 8000
      
  egress:
  - to: []
    ports:
    - protocol: TCP
      port: 5432  # PostgreSQL
    - protocol: TCP
      port: 6379  # Redis
    - protocol: TCP
      port: 443   # HTTPS
    - protocol: TCP
      port: 80    # HTTP
```

##### 2. Container Security
```dockerfile
# Security-hardened Dockerfile
FROM python:3.11-slim as production

# Security: Create non-root user
RUN groupadd --gid 1000 appgroup && \
    useradd --uid 1000 --gid appgroup --shell /bin/bash --create-home appuser

# Security: Update packages and remove unnecessary packages
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
        curl \
        ca-certificates \
        && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Security: Set proper file permissions
COPY --chown=appuser:appgroup . .
USER appuser

# Security: Run as non-root
EXPOSE 8000
USER 1000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

##### 3. Secrets Management
```python
# Kubernetes Secrets Integration
from kubernetes import client, config
from kubernetes.client.rest import ApiException
import base64

class KubernetesSecrets:
    def __init__(self):
        config.load_incluster_config()  # In-cluster config
        self.v1 = client.CoreV1Api()
    
    def get_secret(self, secret_name: str, namespace: str = "learnty") -> dict:
        """Retrieve secrets from Kubernetes"""
        try:
            secret = self.v1.read_namespaced_secret(name=secret_name, namespace=namespace)
            return {k: v for k, v in secret.data.items()}
        except ApiException as e:
            raise Exception(f"Error fetching secret: {e}")
    
    def get_database_url(self) -> str:
        """Get database URL from Kubernetes secrets"""
        secrets = self.get_secret("learnty-secrets")
        host = base64.b64decode(secrets["db-host"]).decode()
        password = base64.b64decode(secrets["db-password"]).decode()
        return f"postgresql://learnty:{password}@{host}:5432/learnty"
```

#### Security Scanning & Compliance

##### Container Security Scanning
```yaml
# .github/workflows/security-scan.yml
name: Security Scan

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Run Trivy vulnerability scanner
      uses: aquasecurity/trivy-action@master
      with:
        scan-type: 'fs'
        scan-ref: '.'
        format: 'sarif'
        output: 'trivy-results.sarif'
        
    - name: Upload Trivy scan results to GitHub Security tab
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: 'trivy-results.sarif'
        
    - name: Run Snyk security scan
      uses: snyk/actions/docker@master
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
      with:
        image: 'learnty/api:latest'
        args: '--severity-threshold=high'
```

### Monitoring & Observability

#### Application Performance Monitoring (APM)

##### Prometheus Configuration
```yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "learnty_alerts.yml"

scrape_configs:
  - job_name: 'learnty-api'
    static_configs:
      - targets: ['learnty-api-service:80']
    metrics_path: /metrics
    scrape_interval: 5s
    
  - job_name: 'redis'
    static_configs:
      - targets: ['redis:6379']
      
  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093
```

##### Grafana Dashboard Configuration
```json
{
  "dashboard": {
    "title": "Learnty Application Metrics",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} {{status}}"
          }
        ]
      },
      {
        "title": "Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "95th percentile"
          }
        ]
      },
      {
        "title": "Error Rate",
        "type": "singlestat",
        "targets": [
          {
            "expr": "rate(http_requests_total{status=~\"5..\"}[5m]) / rate(http_requests_total[5m])",
            "legendFormat": "Error Rate"
          }
        ]
      }
    ]
  }
}
```

#### Logging & Log Analysis

##### ELK Stack Configuration
```yaml
# logstash.conf
input {
  beats {
    port => 5044
  }
}

filter {
  if [fields][service] == "learnty-api" {
    grok {
      match => { "message" => "%{TIMESTAMP_ISO8601:timestamp} %{LOGLEVEL:level} %{DATA:logger} %{GREEDYDATA:message}" }
    }
    
    date {
      match => [ "timestamp", "ISO8601" ]
    }
    
    if [level] == "ERROR" {
      mutate {
        add_tag => [ "alert" ]
      }
    }
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "learnty-%{+YYYY.MM.dd}"
  }
  
  if "alert" in [tags] {
    http {
      url => "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
      http_method => "post"
      format => "json"
      mapping => {
        "text" => "Learnty Error: %{message}"
        "channel" => "#alerts"
      }
    }
  }
}
```

### Backup & Disaster Recovery

#### Database Backup Strategy

##### Automated Backup Configuration
```bash
#!/bin/bash
# backup_script.sh

# Database backup
pg_dump learnty > "/backup/learnty_$(date +%Y%m%d_%H%M%S).sql"

# Compress backup
gzip "/backup/learnty_$(date +%Y%m%d_%H%M%S).sql"

# Upload to S3
aws s3 cp "/backup/learnty_"*.sql.gz s3://learnty-backups/database/

# Clean old local backups (keep 7 days)
find /backup -name "learnty_*.sql.gz" -mtime +7 -delete

# Cross-region replication
aws s3 sync s3://learnty-backups/database/ s3://learnty-backups-dr/database/ --source-region us-west-2 --region us-east-1
```

##### Point-in-Time Recovery Testing
```bash
#!/bin/bash
# recovery_test.sh

# Create test database
createdb learnty_recovery_test

# Restore latest backup
LATEST_BACKUP=$(aws s3 ls s3://learnty-backups/database/ | sort | tail -n 1 | awk '{print $4}')
aws s3 cp s3://learnty-backups/database/$LATEST_BACKUP /tmp/
gunzip /tmp/$LATEST_BACKUP

# Restore to test database
psql learnty_recovery_test < /tmp/${LATEST_BACKUP%.gz}

# Verify data integrity
psql learnty_recovery_test -c "SELECT COUNT(*) FROM users;"
psql learnty_recovery_test -c "SELECT COUNT(*) FROM books;"

# Clean up
dropdb learnty_recovery_test
rm /tmp/$LATEST_BACKUP
```

### Performance Optimization

#### Application Performance

##### Database Query Optimization
```python
# Database connection pooling
from sqlalchemy import create_engine
from sqlalchemy.pool import QueuePool

engine = create_engine(
    DATABASE_URL,
    poolclass=QueuePool,
    pool_size=20,
    max_overflow=30,
    pool_pre_ping=True,
    pool_recycle=3600
)

# Optimized queries with proper indexing
async def get_user_learning_progress(user_id: str):
    query = """
    SELECT 
        b.title,
        lr.completion_percentage,
        COUNT(src.id) as review_cards_completed,
        MAX(src.last_reviewed_date) as last_review_date
    FROM books b
    JOIN learning_roadmaps lr ON b.id = lr.book_id
    LEFT JOIN spaced_repetition_cards src ON b.id = src.book_id 
        AND src.user_id = $1 
        AND src.repetitions > 0
    WHERE lr.user_id = $1
    GROUP BY b.id, b.title, lr.completion_percentage
    ORDER BY lr.updated_at DESC
    """
    return await database.fetch_all(query, user_id)
```

##### Caching Strategy
```python
# Multi-layer caching implementation
import asyncio
from functools import wraps

def cached_result(ttl: int = 300, key_prefix: str = ""):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Generate cache key
            cache_key = f"{key_prefix}:{func.__name__}:{hash(str(args) + str(kwargs))}"
            
            # Try Redis cache first
            cached = await redis_client.get(cache_key)
            if cached:
                return json.loads(cached)
            
            # Execute function and cache result
            result = await func(*args, **kwargs)
            await redis_client.setex(cache_key, ttl, json.dumps(result))
            
            return result
        return wrapper
    return decorator

@cached_result(ttl=3600, key_prefix="ai_content")
async def process_book_with_ai(book_content: str) -> dict:
    """Cache AI processing results for 1 hour"""
    # AI processing logic here
    return await ai_service.generate_learning_roadmap(book_content)
```

### Cost Optimization

#### Resource Optimization

##### Auto-scaling Configuration
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: learnty-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: learnty-api
  minReplicas: 2
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 60
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 70
  - type: Pods
    pods:
      metric:
        name: requests_per_second
      target:
        type: AverageValue
        averageValue: "100"
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 100
        periodSeconds: 60
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 10
        periodSeconds: 60
```

##### Spot Instance Strategy
```hcl
# Main EKS node group with spot instances
resource "aws_eks_node_group" "spot" {
  cluster_name    = aws_eks_cluster.main.name
  node_group_name = "spot"
  node_role       = aws_iam_role.eks_node_role.arn
  subnet_ids      = aws_subnet.private[*].id
  
  instance_types = ["t3.medium", "t3.large", "m5.large"]
  
  capacity_type = "SPOT"
  disk_size = 50
  
  labels = {
    workload-type = "stateless"
    spot          = "true"
  }
  
  taint {
    key    = "aws.amazon.com/spot-instance"
    value  = "true"
    effect = "NO_SCHEDULE"
  }
  
  tags = {
    Name = "learnty-spot-node"
  }
}
```

### Deployment Timeline & Milestones

#### Phase 1: Foundation (Weeks 1-4)
- [ ] CI/CD pipeline setup
- [ ] Basic Kubernetes cluster deployment
- [ ] Database and Redis setup
- [ ] Monitoring and logging infrastructure
- [ ] Security baseline implementation

#### Phase 2: Application Deployment (Weeks 5-8)
- [ ] API deployment with auto-scaling
- [ ] Frontend deployment with CDN
- [ ] AI processing pipeline setup
- [ ] Load testing and performance tuning
- [ ] Backup and disaster recovery testing

#### Phase 3: Production Readiness (Weeks 9-12)
- [ ] Security audit and penetration testing
- [ ] Compliance verification (GDPR, SOC 2)
- [ ] Performance optimization
- [ ] Documentation and runbooks
- [ ] Team training and handoff

### Conclusion

The DevOps strategy for Learnty emphasizes scalability, security, and operational excellence. By leveraging modern cloud-native technologies and following industry best practices, the infrastructure will support rapid growth while maintaining high availability and security standards.

Key success factors:
1. **Automation First:** All infrastructure and deployments automated
2. **Observability:** Comprehensive monitoring from day one
3. **Security by Design:** Security integrated throughout the lifecycle
4. **Cost Optimization:** Efficient resource utilization and scaling
5. **Developer Experience:** Tools and processes that enable rapid development

---

**Document prepared by:** MiniMax Agent (DevOps Infrastructure Team)  
**Date:** October 24, 2025  
**Next Review:** November 7, 2025