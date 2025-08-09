# GCP VM Setup with Jenkins, Docker & GitHub Webhook Integration

---

## ✅ Step 1: Create a VM on Google Cloud

Create a Compute Engine VM from GCP Console or using CLI:

```bash
gcloud compute instances create prod-server \
  --zone=asia-south1-c \
  --machine-type=e2-medium \
  --image-family=debian-11 \
  --image-project=debian-cloud \
  --tags=allow-frontend,allow-backend,allow-admin,allow-8080 \
  --boot-disk-size=20GB
```

---

## 🔒 Step 2: Configure Firewall Rules

### 📜 View existing rules:

```bash
gcloud compute firewall-rules list
```

### ❌ Delete a rule:

```bash
gcloud compute firewall-rules delete <rule-name>
```

### ✅ Create necessary firewall rules:

```bash
gcloud compute firewall-rules create allow-jenkins \
  --direction=INGRESS \
  --priority=1000 \
  --network=default \
  --action=ALLOW \
  --rules=tcp:8080 \
  --source-ranges=0.0.0.0/0 \
  --target-tags=allow-8080

gcloud compute firewall-rules create allow-node-frontend \
  --direction=INGRESS \
  --priority=1000 \
  --network=default \
  --action=ALLOW \
  --rules=tcp:4173 \
  --source-ranges=0.0.0.0/0 \
  --target-tags=allow-frontend

gcloud compute firewall-rules create allow-node-backend \
  --direction=INGRESS \
  --priority=1000 \
  --network=default \
  --action=ALLOW \
  --rules=tcp:4000 \
  --source-ranges=0.0.0.0/0 \
  --target-tags=allow-backend

gcloud compute firewall-rules create allow-node-admin \
  --direction=INGRESS \
  --priority=1000 \
  --network=default \
  --action=ALLOW \
  --rules=tcp:4174 \
  --source-ranges=0.0.0.0/0 \
  --target-tags=allow-admin
```

---

## 🔁 Apply Target Tags to VM (Important!)

```bash
gcloud compute instances add-tags prod-server \
  --zone=asia-south1-c \
  --tags=allow-frontend,allow-backend,allow-admin,allow-8080
```

### 🧾 Verify applied tags:

```bash
gcloud compute instances describe prod-server \
  --zone=asia-south1-c \
  --format="get(tags.items)"
```

---

## 💻 Step 3: Connect to the VM & Prepare Environment

### SSH into the VM:

```bash
gcloud compute ssh prod-server --zone=asia-south1-c
```

### Update and install required tools:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git
sudo apt autoremove -y && sudo apt clean
```

### Check git version:

```bash
git --version
```

---

## ☕ Step 4: Install Java (for Jenkins)

```bash
sudo apt-get update
sudo apt-get install -y openjdk-17-jdk
```

---

## 🐳 Step 5: Install Docker

Follow official Docker install steps:
📌 [Install Docker on Debian](https://docs.docker.com/engine/install/debian/)

---

## 🔧 Step 6: Install Jenkins

📌 [Install Jenkins on Debian/Ubuntu](https://www.jenkins.io/doc/book/installing/linux/#debianubuntu)

After installation, start Jenkins and retrieve the admin password:

```bash
cat /var/lib/jenkins/secrets/initialAdminPassword
```

---

## 📁 Step 7: Prepare Project Directory

Inside the VM:

```bash
cd /
sudo mkdir app
cd app
sudo touch .env .env.development .env.production
ls -a  # to confirm files
```

---

## 🔌 Step 8: Setup Jenkins UI

1. Open `http://<EXTERNAL_IP>:8080`
2. Enter admin password from above.
3. Select "Install Suggested Plugins" (takes a few mins).
4. Create an admin user.

---

## 🛠️ Step 9: Configure Jenkins Job

1. Click **"New Item"** → enter job name → choose **Pipeline**
2. Set description, enable:

   - Discard old builds → Log Rotation: 1 build
   - Git SCM Polling

3. Under **Pipeline**, select:

   - **Pipeline Script from SCM**
   - SCM: Git
   - Repository URL: `<Your GitHub Repo URL>`

4. Click **Save**

---

## 🌐 Step 10: Setup GitHub Webhook

1. In your GitHub repository → Settings → Webhooks

2. Add webhook:

   - URL: `http://<JENKINS_EXTERNAL_IP>:8080/github-webhook/`
   - Content type: `application/json`
   - Trigger: `Just the push event`

3. Save and confirm green tick on **Recent Deliveries**

---

## 🔑 Step 11: Allow Jenkins to use Docker

SSH into the VM:

```bash
sudo usermod -aG docker jenkins
```

Restart Jenkins or reboot VM if needed.

---

## 🚀 Step 12: Test the Pipeline

- Either click **Build Now** from Jenkins
- Or make a test commit to the GitHub repo
- Check if the pipeline runs automatically

---

## ✅ Verification Checklist

| Task                           | Status |
| ------------------------------ | ------ |
| VM Created                     | ✅     |
| Firewall Rules Added           | ✅     |
| Tags Applied to VM             | ✅     |
| Jenkins Installed              | ✅     |
| Docker Installed               | ✅     |
| Jenkins + GitHub Integrated    | ✅     |
| Pipeline Created and Triggered | ✅     |

---

## 🐳 Docker Management (Post-Deployment)

### Check Running Containers

```bash
docker ps
```

### View Logs

```bash
docker logs <container_id>
```

### Check All Containers

```bash
docker ps -a
```

---

## 🍃 MongoDB Container Access

### Enter Container Shell

```bash
docker exec -it <mongodb_service_name> mongosh
```

### Authentication & Exploration

```js
use admin
db.auth("admin", "password123")
show dbs
use prod-db
show collections
db.users.find().limit(5)
```

### Grant Admin Role

```js
db.users.updateOne({ username: "Admin" }, { $set: { role: "Admin" } });
```

---

## ⚠️ Common Issue: Vite Preview Not Accessible

### Problem:

Your Vite apps bind to `localhost` inside Docker containers → not accessible from outside.

### ✅ Fix: Bind to `0.0.0.0`

#### Option 1: Modify `package.json` (Recommended)

```json
{
  "scripts": {
    "preview": "vite preview --host 0.0.0.0"
  }
}
```

#### Option 2: Add `vite.config.js`

```js
import { defineConfig } from "vite";

export default defineConfig({
  preview: {
    host: "0.0.0.0",
    port: 4173, // or 4174 for admin
  },
});
```

### Rebuild Containers

```bash
docker-compose down
docker-compose up --build
```

---

## ✅ Endpoints (After Fix)

- **Frontend** → http\://<VM-IP>:4173
- **Admin Panel** → http\://<VM-IP>:4174
- **Backend API** → http\://<VM-IP>:4000
- **Jenkins** → http\://<VM-IP>:8080

---

## 📋 Summary

This setup enables:

- GCP-hosted VM with proper firewall access
- Jenkins CI/CD pipelines with GitHub Webhook integration
- Dockerized Node.js stack (frontend, backend, admin)
- MongoDB container access
- Vite preview servers accessible via browser
- Secure and production-ready deployment environment

---

# ELK Stack Setup Guide for Node.js Applications

Complete guide to set up Elasticsearch, Logstash, Kibana, and Filebeat (ELK Stack) with a Node.js application using Docker Compose and Jenkins CI/CD on Google Cloud Platform.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Configuration Files](#configuration-files)
- [Winston Logger Setup](#winston-logger-setup)
- [Docker Configuration](#docker-configuration)
- [Jenkins Pipeline](#jenkins-pipeline)
- [Deployment](#deployment)
- [Accessing Services](#accessing-services)
- [Troubleshooting](#troubleshooting)
- [Monitoring & Maintenance](#monitoring--maintenance)

## 🔍 Overview

This setup provides:

- **Centralized logging** for Node.js applications
- **Real-time log analysis** with Kibana dashboards
- **Log parsing and enrichment** with Logstash
- **Scalable log collection** with Filebeat
- **Automated deployment** with Jenkins
- **Production-ready** Docker containerization

### Architecture Flow

```
Node.js App (Winston) → Log Files → Filebeat → Logstash → Elasticsearch → Kibana Dashboard
```

## ✅ Prerequisites

- Google Cloud Platform VM instance
- Docker & Docker Compose installed
- Jenkins with Docker plugin
- Node.js application with Winston logging
- GitHub repository with webhook configuration

### System Requirements

```bash
# Set vm.max_map_count for Elasticsearch (required)
sudo sysctl -w vm.max_map_count=262144
echo "vm.max_map_count=262144" | sudo tee -a /etc/sysctl.conf

# Verify system resources (minimum 4GB RAM recommended)
free -h
df -h
```

## 📁 Project Structure

```
your-project-root/
├── prod-server/
│   ├── src/
│   │   └── util/
│   │       └── logger.js          # Winston logger configuration
│   ├── logs/                      # Log files directory
│   │   ├── development.log
│   │   └── production.log
│   ├── Dockerfile
│   └── .env.production
├── prod-client/
├── prod-admin/
├── filebeat/
│   └── filebeat.yml               # Filebeat configuration
├── logstash/
│   ├── config/
│   │   └── logstash.yml          # Logstash main config
│   └── pipeline/
│       └── logstash.conf         # Logstash pipeline config
├── docker-compose.yml            # All services configuration
├── Jenkinsfile                   # CI/CD pipeline
└── README.md                     # This file
```

## ⚙️ Configuration Files

### 1. Winston Logger Configuration (`prod-server/src/util/logger.js`)

```javascript
import util from "util";
import { createLogger, format, transports } from "winston";
import path from "path";
import fs from "fs";
import "winston-mongodb";
import moment from "moment-timezone";
import { red, blue, yellow, green, magenta, bold } from "colorette";
import config from "../config/config.js";
import { EApplicationEnvironment } from "../constants/application.js";

const formatTimestamp = (timestamp) => {
  return moment(timestamp).tz("Asia/Kolkata").format("DD MMM YYYY HH:mm");
};

const fileLogFormat = format.printf((info) => {
  const timestamp = formatTimestamp(info.timestamp);
  const { level, message, meta = {} } = info;

  const logMeta = {};
  for (const [key, value] of Object.entries(meta)) {
    if (value instanceof Error) {
      logMeta[key] = {
        name: value.name,
        message: value.message,
        trace: value.stack || "",
      };
    } else {
      logMeta[key] = value;
    }
  }

  const logData = {
    level: level.toUpperCase(),
    message,
    timestamp,
    meta: logMeta,
  };

  return JSON.stringify(logData, null, 4);
});

const fileTransport = () => {
  const logsDir = "/app/logs";

  // Ensure logs directory exists
  try {
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true, mode: 0o755 });
      console.log(`Created logs directory: ${logsDir}`);
    }
  } catch (error) {
    console.error(`Error creating logs directory: ${error.message}`);
  }

  return [
    new transports.File({
      filename: path.join(logsDir, `${config.ENV}.log`),
      level: "info",
      format: format.combine(format.timestamp(), fileLogFormat),
    }),
  ];
};

const logger = createLogger({
  defaultMeta: { meta: {} },
  transports: [...fileTransport() /* other transports */],
});

// Startup verification log
logger.info("Winston logger initialized successfully", {
  meta: { environment: config.ENV, timestamp: new Date().toISOString() },
});

export default logger;
```

### 2. Filebeat Configuration (`filebeat/filebeat.yml`)

```yaml
filebeat.inputs:
  - type: log
    enabled: true
    paths:
      - /logs/development.log
      - /logs/production.log
    fields:
      service: backend
      application: prod-server
    fields_under_root: true
    # Handle multi-line JSON (Winston pretty-prints with 4 spaces)
    multiline.pattern: '^\{'
    multiline.negate: true
    multiline.match: after
    processors:
      - decode_json_fields:
          fields: ["message"]
          target: ""
          overwrite_keys: true
      - script:
          lang: javascript
          source: >
            function process(event) {
              var logPath = event.Get("log.file.path");
              if (logPath && logPath.includes("development.log")) {
                event.Put("environment", "development");
              } else if (logPath && logPath.includes("production.log")) {
                event.Put("environment", "production");
              }
            }

# Send to Logstash for processing
output.logstash:
  hosts: ["logstash:5044"]

setup.ilm:
  enabled: false

logging.level: info
logging.to_files: true
logging.files:
  path: /var/log/filebeat
  name: filebeat
  keepfiles: 7
  permissions: 0644
```

### 3. Logstash Pipeline Configuration (`logstash/pipeline/logstash.conf`)

```ruby
input {
  beats {
    port => 5044
  }
}

filter {
  # Parse Winston's JSON format
  if [message] {
    json {
      source => "message"
      target => "winston_data"
    }
  }

  # Extract Winston fields
  if [winston_data] {
    mutate {
      add_field => { "log_level" => "%{[winston_data][level]}" }
      add_field => { "log_message" => "%{[winston_data][message]}" }
      add_field => { "winston_timestamp" => "%{[winston_data][timestamp]}" }
    }

    # Parse Winston's custom timestamp format
    if [winston_timestamp] {
      date {
        match => [ "winston_timestamp", "dd MMM yyyy HH:mm" ]
        timezone => "Asia/Kolkata"
        target => "@timestamp"
      }
    }

    # Handle error objects in meta field
    if [winston_data][meta] {
      ruby {
        code => "
          meta = event.get('[winston_data][meta]')
          if meta.is_a?(Hash)
            meta.each do |key, value|
              if value.is_a?(Hash) && value['name'] && value['message']
                event.set('error_name', value['name'])
                event.set('error_message', value['message'])
                event.set('error_stack', value['trace']) if value['trace']
                event.set('has_error', true)
              end
              event.set(key, value)
            end
          end
        "
      }
    }
  }

  # Add metadata
  mutate {
    add_field => { "service" => "backend" }
    add_field => { "application" => "prod-server" }
  }

  # Set environment based on log file
  if [log][file][path] =~ /development\.log$/ {
    mutate { add_field => { "environment" => "development" } }
  } else if [log][file][path] =~ /production\.log$/ {
    mutate { add_field => { "environment" => "production" } }
  }

  # Cleanup
  mutate {
    remove_field => [ "host", "agent", "ecs", "input", "message", "winston_data" ]
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "backend-logs-%{+YYYY.MM.dd}"
  }

  # Debug output
  stdout { codec => rubydebug }
}
```

### 4. Logstash Main Configuration (`logstash/config/logstash.yml`)

```yaml
http.host: "0.0.0.0"
xpack.monitoring.elasticsearch.hosts: ["http://elasticsearch:9200"]
path.config: /usr/share/logstash/pipeline
```

### 5. Docker Compose Configuration (`docker-compose.yml`)

```yaml
services:
  backend:
    build:
      context: ./prod-server
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
    volumes:
      # Mount logs directory with read-write permissions
      - ./prod-server/logs:/app/logs:rw
    networks:
      - app-network
    restart: unless-stopped

  # ELK Stack Services
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    container_name: elasticsearch
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
      - bootstrap.memory_lock=true
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
    ports:
      - "9200:9200"
    networks:
      - app-network
    healthcheck:
      test:
        ["CMD-SHELL", "curl -f http://localhost:9200/_cluster/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5

  logstash:
    image: docker.elastic.co/logstash/logstash:8.11.0
    container_name: logstash
    volumes:
      - ./logstash/pipeline:/usr/share/logstash/pipeline:ro
      - ./logstash/config/logstash.yml:/usr/share/logstash/config/logstash.yml:ro
    ports:
      - "5044:5044"
    environment:
      LS_JAVA_OPTS: "-Xmx256m -Xms256m"
    networks:
      - app-network
    depends_on:
      elasticsearch:
        condition: service_healthy

  kibana:
    image: docker.elastic.co/kibana/kibana:8.11.0
    container_name: kibana
    ports:
      - "5601:5601"
    environment:
      ELASTICSEARCH_HOSTS: http://elasticsearch:9200
    networks:
      - app-network
    depends_on:
      elasticsearch:
        condition: service_healthy

  filebeat:
    image: docker.elastic.co/beats/filebeat:8.11.0
    container_name: filebeat
    user: root
    volumes:
      - ./filebeat/filebeat.yml:/usr/share/filebeat/filebeat.yml:ro
      - ./prod-server/logs:/logs:ro
      - filebeat_data:/usr/share/filebeat/data
    networks:
      - app-network
    depends_on:
      elasticsearch:
        condition: service_healthy
    command: filebeat -e -strict.perms=false

networks:
  app-network:
    driver: bridge

volumes:
  elasticsearch_data:
  filebeat_data:
```

## 🚀 Jenkins Pipeline

Add this to your Jenkins pipeline before building containers:

```groovy
stage('Prepare ELK Stack') {
    steps {
        sh '''
            echo "Setting up ELK Stack prerequisites..."

            # Set vm.max_map_count for Elasticsearch
            sudo sysctl -w vm.max_map_count=262144

            # Create logs directory on host
            mkdir -p prod-server/logs
            chmod 755 prod-server/logs

            # Set proper ownership
            sudo chown -R $USER:$USER prod-server/logs

            # Create empty log files
            touch prod-server/logs/production.log
            touch prod-server/logs/development.log
            chmod 644 prod-server/logs/*.log

            # Verify ELK configuration files exist
            ls -la filebeat/filebeat.yml
            ls -la logstash/config/logstash.yml
            ls -la logstash/pipeline/logstash.conf

            echo "ELK Stack preparation completed!"
        '''
    }
}
```

## 📦 Deployment

### 1. Deploy with Jenkins

- Push code to your repository
- Jenkins webhook will trigger automatically
- Monitor deployment in Jenkins console

### 2. Manual Deployment

```bash
# Clone repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

# Set system requirements
sudo sysctl -w vm.max_map_count=262144

# Create logs directory
mkdir -p prod-server/logs
chmod 755 prod-server/logs

# Deploy with Docker Compose
docker compose up -d --build

# Monitor deployment
docker compose ps
docker compose logs -f
```

### 3. Startup Sequence

The services start in this order:

1. **Elasticsearch** (takes 2-3 minutes)
2. **Logstash** & **Kibana**
3. **Filebeat**
4. **Application services**

## 🌐 Accessing Services

After successful deployment:

| Service           | URL                   | Purpose                |
| ----------------- | --------------------- | ---------------------- |
| **Frontend**      | `http://YOUR_IP:4173` | Main application       |
| **Admin Panel**   | `http://YOUR_IP:4174` | Admin interface        |
| **API**           | `http://YOUR_IP:4000` | Backend API            |
| **Kibana**        | `http://YOUR_IP:5601` | Log analysis dashboard |
| **Elasticsearch** | `http://YOUR_IP:9200` | Search engine API      |

## 📊 Kibana Setup

### 1. Create Index Pattern

```bash
# Check if indices are created
curl -X GET "localhost:9200/_cat/indices?v"

# Create index pattern via API
curl -X POST "localhost:5601/api/saved_objects/index-pattern/backend-logs-*" \
  -H "Content-Type: application/json" \
  -H "kbn-xsrf: true" \
  -d '{
    "attributes": {
      "title": "backend-logs-*",
      "timeFieldName": "@timestamp"
    }
  }'
```

### 2. Manual Index Pattern Setup

1. Open Kibana at `http://YOUR_IP:5601`
2. Go to **Management** → **Stack Management**
3. Click **Index Patterns** → **Create index pattern**
4. Enter pattern: `backend-logs-*`
5. Select time field: `@timestamp`
6. Click **Create index pattern**

### 3. View Logs

1. Go to **Discover** in Kibana
2. Select `backend-logs-*` index pattern
3. Set time range (Last 15 minutes, Today, etc.)
4. Your logs should appear with structured fields

## 🔧 Troubleshooting

### Common Issues

**1. Logs not appearing in VM files**

```bash
# Check Winston logger initialization
docker compose logs backend | grep "Winston logger initialized"

# Check file permissions
ls -la prod-server/logs/

# Check container logs
docker compose exec backend ls -la /app/logs/
```

**2. Elasticsearch not starting**

```bash
# Check vm.max_map_count
sysctl vm.max_map_count

# Check Elasticsearch logs
docker compose logs elasticsearch

# Check disk space
df -h
```

**3. Filebeat not reading logs**

```bash
# Check Filebeat configuration
docker compose exec filebeat filebeat test config

# Check log file permissions
docker compose exec filebeat ls -la /logs/

# Check Filebeat logs
docker compose logs filebeat
```

**4. Logstash not processing**

```bash
# Check Logstash logs
docker compose logs logstash | grep ERROR

# Test pipeline configuration
docker compose exec logstash /usr/share/logstash/bin/logstash --config.test_and_exit
```

### Debug Commands

```bash
# Check all services status
docker compose ps

# Check Elasticsearch health
curl "localhost:9200/_cluster/health?pretty"

# List Elasticsearch indices
curl "localhost:9200/_cat/indices?v"

# Search logs
curl "localhost:9200/backend-logs-*/_search?pretty&size=5"

# Check Kibana status
curl "localhost:5601/api/status"

# Force refresh indices
curl -X POST "localhost:9200/_refresh"
```

## 📈 Monitoring & Maintenance

### Log Rotation

Elasticsearch indices are created daily (`backend-logs-YYYY.MM.DD`). Implement retention policy:

```bash
# Delete indices older than 30 days
curator_cli delete_indices --filter_list '[{"filtertype":"age","source":"creation_date","direction":"older","unit":"days","unit_count":30}]'
```

### Performance Monitoring

```bash
# Monitor Elasticsearch cluster
curl "localhost:9200/_cluster/stats?pretty"

# Monitor index sizes
curl "localhost:9200/_cat/indices?v&s=store.size:desc"

# Check Logstash pipeline stats
curl "localhost:9600/_node/stats/pipelines?pretty"
```

### Backup Strategy

```bash
# Backup Elasticsearch data
docker run --rm -v elasticsearch_data:/data -v $(pwd):/backup alpine tar czf /backup/elasticsearch-backup-$(date +%Y%m%d).tar.gz /data

# Backup configuration files
tar czf elk-config-backup-$(date +%Y%m%d).tar.gz filebeat/ logstash/
```

## 🛡️ Security Considerations

### Production Hardening

1. **Enable Elasticsearch Security**

   ```yaml
   environment:
     - xpack.security.enabled=true
     - ELASTIC_PASSWORD=your-secure-password
   ```

2. **Use HTTPS**

   - Configure SSL certificates
   - Enable HTTPS for Kibana

3. **Network Security**

   - Use internal networks only
   - Implement firewall rules
   - Regular security updates

4. **Access Control**
   - Implement authentication
   - Use role-based access control
   - Regular audit logs

## 📚 Additional Resources

- [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
- [Logstash Configuration Guide](https://www.elastic.co/guide/en/logstash/current/configuration.html)
- [Kibana User Guide](https://www.elastic.co/guide/en/kibana/current/index.html)
- [Filebeat Configuration](https://www.elastic.co/guide/en/beats/filebeat/current/configuring-howto-filebeat.html)
- [Winston Logging Library](https://github.com/winstonjs/winston)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Need Help?**

- Check the troubleshooting section
- Review Docker and Jenkins logs
- Verify all configuration files are properly formatted
- Ensure system requirements are met

# GCP Load Balancer + Managed SSL Setup

## Overview

We'll use **Google Cloud Load Balancer** with **Google-managed SSL certificates** to handle:

- Domain routing with SSL termination
- Automatic SSL certificate provisioning and renewal
- High availability and performance
- No need for Nginx or Certbot containers

## Architecture

```
Internet → GCP Load Balancer (SSL termination) → Your VM:ports
```

## Step 1: DNS Configuration (Do This First)

### Add these DNS records to your domain:

```
Type: A
Name: @
Value: [LOAD-BALANCER-IP] (we'll get this later)

Type: A
Name: www
Value: [LOAD-BALANCER-IP]

Type: A
Name: client
Value: [LOAD-BALANCER-IP]

Type: A
Name: api
Value: [LOAD-BALANCER-IP]

Type: A
Name: admin
Value: [LOAD-BALANCER-IP]
```

## Step 2: Update Docker Compose (Remove Nginx/Certbot)

Keep your original ports exposed for Load Balancer to reach:

```yaml
services:
  frontend:
    build:
      context: ./prod-client
      dockerfile: Dockerfile
    ports:
      - "4173:4173" # Keep this - Load Balancer needs it
    depends_on:
      - backend
    env_file:
      - ./prod-client/.env
    networks:
      - app-network

  admin:
    build:
      context: ./prod-admin
      dockerfile: Dockerfile
    ports:
      - "4174:4173" # Keep this - Load Balancer needs it
    depends_on:
      - backend
    env_file:
      - ./prod-admin/.env
    networks:
      - app-network

  backend:
    build:
      context: ./prod-server
      dockerfile: Dockerfile
    ports:
      - "4000:4000" # Keep this - Load Balancer needs it
    depends_on:
      mongodb:
        condition: service_healthy
      mongodb-init:
        condition: service_completed_successfully
      elasticsearch:
        condition: service_healthy
    env_file:
      - ./prod-server/.env.production
    environment:
      - NODE_ENV=production
    volumes:
      - ./prod-server/logs:/app/logs:rw
    networks:
      - app-network
    restart: unless-stopped

  # Keep your existing MongoDB, ELK stack services as is
  # Remove nginx and certbot services completely
```

## Step 3: GCP Load Balancer Setup (Console Method)

### A. Create Health Checks

1. **Go to**: Compute Engine → Health checks
2. **Create Health Check** for each service:

**Backend Health Check:**

```
Name: backend-health-check
Protocol: HTTP
Port: 4000
Request path: /api/v1/system/health
Check interval: 10 seconds
Timeout: 5 seconds
Healthy threshold: 2
Unhealthy threshold: 3
```

**Frontend Health Check:**

```
Name: frontend-health-check
Protocol: HTTP
Port: 4173
Request path: /
Check interval: 10 seconds
Timeout: 5 seconds
Healthy threshold: 2
Unhealthy threshold: 3
```

**Admin Health Check:**

```
Name: admin-health-check
Protocol: HTTP
Port: 4174
Request path: /
Check interval: 10 seconds
Timeout: 5 seconds
Healthy threshold: 2
Unhealthy threshold: 3
```

### B. Create Instance Groups

1. **Go to**: Compute Engine → Instance groups
2. **Create Instance Group**:

```
Name: app-instance-group
Zone: [Your VM's zone]
Network: default
Subnetwork: default
Add your VM instance
```

### C. Create Backend Services

1. **Go to**: Network services → Load balancing → Backend services

**Backend Service:**

```
Name: backend-service
Backend type: Instance group
Protocol: HTTP
Named port: http (4000)
Instance group: app-instance-group
Health check: backend-health-check
```

**Frontend Service:**

```
Name: frontend-service
Backend type: Instance group
Protocol: HTTP
Named port: http (4173)
Instance group: app-instance-group
Health check: frontend-health-check
```

**Admin Service:**

```
Name: admin-service
Backend type: Instance group
Protocol: HTTP
Named port: http (4174)
Instance group: app-instance-group
Health check: admin-health-check
```

### D. Create SSL Certificates

1. **Go to**: Network services → Load balancing → Certificates
2. **Create SSL Certificate**:

```
Name: app-ssl-cert
Create mode: Google-managed certificate
Domains:
  - 4biddencoder.tech
  - www.4biddencoder.tech
  - client.4biddencoder.tech
  - api.4biddencoder.tech
  - admin.4biddencoder.tech
```

### E. Create URL Map

1. **Go to**: Network services → Load balancing → URL maps
2. **Create URL Map**:

```
Name: app-url-map
Default service: frontend-service
Host and path rules:
  - Hosts: api.4biddencoder.tech → backend-service
  - Hosts: admin.4biddencoder.tech → admin-service
  - Hosts: 4biddencoder.tech, www.4biddencoder.tech, client.4biddencoder.tech → frontend-service
```

### F. Create HTTPS Load Balancer

1. **Go to**: Network services → Load balancing
2. **Create Load Balancer** → Application Load Balancer (HTTP/HTTPS)
3. **Internet facing or internal only**: Internet-facing
4. **Global or regional**: Global

**Frontend Configuration:**

```
Name: app-https-lb
Protocol: HTTPS
Port: 443
Certificate: app-ssl-cert
```

**Backend Configuration:**

```
URL map: app-url-map
```

### G. HTTP to HTTPS Redirect

Create another frontend:

```
Protocol: HTTP
Port: 80
Redirect to HTTPS: Yes
```

## Step 4: GCP Load Balancer Setup (CLI Method)

If you prefer command line:

```bash
# Set variables
PROJECT_ID="your-project-id"
VM_NAME="your-vm-name"
ZONE="your-zone"

# Create health checks
gcloud compute health-checks create http backend-health-check \
    --port=4000 \
    --request-path="/api/v1/system/health"

gcloud compute health-checks create http frontend-health-check \
    --port=4173 \
    --request-path="/"

gcloud compute health-checks create http admin-health-check \
    --port=4174 \
    --request-path="/"

# Create instance group
gcloud compute instance-groups unmanaged create app-instance-group \
    --zone=$ZONE

gcloud compute instance-groups unmanaged add-instances app-instance-group \
    --instances=$VM_NAME \
    --zone=$ZONE

# Set named ports
gcloud compute instance-groups set-named-ports app-instance-group \
    --named-ports=backend:4000,frontend:4173,admin:4174 \
    --zone=$ZONE

# Create backend services
gcloud compute backend-services create backend-service \
    --protocol=HTTP \
    --port-name=backend \
    --health-checks=backend-health-check \
    --global

gcloud compute backend-services add-backend backend-service \
    --instance-group=app-instance-group \
    --instance-group-zone=$ZONE \
    --global

gcloud compute backend-services create frontend-service \
    --protocol=HTTP \
    --port-name=frontend \
    --health-checks=frontend-health-check \
    --global

gcloud compute backend-services add-backend frontend-service \
    --instance-group=app-instance-group \
    --instance-group-zone=$ZONE \
    --global

gcloud compute backend-services create admin-service \
    --protocol=HTTP \
    --port-name=admin \
    --health-checks=admin-health-check \
    --global

gcloud compute backend-services add-backend admin-service \
    --instance-group=app-instance-group \
    --instance-group-zone=$ZONE \
    --global

# Create SSL certificate
gcloud compute ssl-certificates create app-ssl-cert \
    --domains=4biddencoder.tech,www.4biddencoder.tech,client.4biddencoder.tech,api.4biddencoder.tech,admin.4biddencoder.tech \
    --global

# Create URL map
gcloud compute url-maps create app-url-map \
    --default-service=frontend-service

gcloud compute url-maps add-path-matcher app-url-map \
    --path-matcher-name=api-matcher \
    --default-service=backend-service \
    --path-rules="/*=backend-service"

gcloud compute url-maps add-host-rule app-url-map \
    --hosts=api.4biddencoder.tech \
    --path-matcher-name=api-matcher

gcloud compute url-maps add-path-matcher app-url-map \
    --path-matcher-name=admin-matcher \
    --default-service=admin-service \
    --path-rules="/*=admin-service"

gcloud compute url-maps add-host-rule app-url-map \
    --hosts=admin.4biddencoder.tech \
    --path-matcher-name=admin-matcher

# Create HTTPS proxy
gcloud compute target-https-proxies create app-https-proxy \
    --url-map=app-url-map \
    --ssl-certificates=app-ssl-cert

# Create HTTP proxy for redirect
gcloud compute target-http-proxies create app-http-proxy \
    --url-map=app-url-map

# Create global forwarding rules
gcloud compute forwarding-rules create app-https-forwarding-rule \
    --global \
    --target-https-proxy=app-https-proxy \
    --ports=443

gcloud compute forwarding-rules create app-http-forwarding-rule \
    --global \
    --target-http-proxy=app-http-proxy \
    --ports=80

# Get the Load Balancer IP
gcloud compute forwarding-rules describe app-https-forwarding-rule \
    --global \
    --format="get(IPAddress)"
```

## Step 5: Update Environment Variables

### Frontend (.env):

```env
VITE_SERVER=https://api.4biddencoder.tech
```

### Admin (.env):

```env
VITE_SERVER=https://api.4biddencoder.tech
```

### Backend (.env.production):

```env
ALLOWED_ORIGINS=https://4biddencoder.tech,https://www.4biddencoder.tech,https://client.4biddencoder.tech,https://admin.4biddencoder.tech
```

## Step 6: Update Jenkins Pipeline

Remove Nginx setup stages and update environment setup:

```groovy
stage('Setup Client Environment') {
    steps {
        dir('prod-client') {
            sh '''
                #!/bin/bash
                touch .env
                cp ${APP_DIR}/.env .env
                sed -i "s|VITE_SERVER=http://localhost:4000|VITE_SERVER=https://api.4biddencoder.tech|g" .env
            '''
        }
    }
}

stage('Setup Admin Environment') {
    steps {
        dir('prod-admin') {
            sh '''
                #!/bin/bash
                touch .env
                cp ${APP_DIR}/.env .env
                sed -i "s|VITE_SERVER=http://localhost:4000|VITE_SERVER=https://api.4biddencoder.tech|g" .env
            '''
        }
    }
}

stage('Setup Server Environment') {
    steps {
        dir('prod-server') {
            sh '''
                #!/bin/bash
                touch .env.development .env.production
                cp ${APP_DIR}/.env.development .env.development
                cp ${APP_DIR}/.env.production .env.production

                # Update CORS origins for HTTPS domains
                sed -i 's|ALLOWED_ORIGINS=.*|ALLOWED_ORIGINS=https://4biddencoder.tech,https://www.4biddencoder.tech,https://client.4biddencoder.tech,https://admin.4biddencoder.tech|g' .env.production
            '''
        }
    }
}
```

## Step 7: Firewall Rules

Ensure your VM allows traffic on the required ports:

```bash
# Allow HTTP/HTTPS traffic (if not already enabled)
gcloud compute firewall-rules create allow-app-traffic \
    --allow tcp:4000,tcp:4173,tcp:4174 \
    --source-ranges 130.211.0.0/22,35.191.0.0/16 \
    --description "Allow Load Balancer to reach app services"
```

## Benefits of This Setup:

### ✅ **Fully Managed**:

- Google handles SSL certificate provisioning, renewal, and management
- No manual certificate management needed
- Automatic scaling and load distribution

### ✅ **High Performance**:

- Google's global network and CDN
- Automatic DDoS protection
- Better latency worldwide

### ✅ **Cost Effective**:

- Pay only for what you use
- No additional SSL certificate costs
- Reduced server load (SSL termination at edge)

### ✅ **Reliability**:

- 99.95% SLA
- Health checks and automatic failover
- No single point of failure

## Final URLs:

- **Main Site**: https://4biddencoder.tech
- **Client**: https://client.4biddencoder.tech (if you want separate)
- **Admin Panel**: https://admin.4biddencoder.tech
- **API**: https://api.4biddencoder.tech
- **Kibana**: http://[VM-IP]:5601 (keep internal)

## Important Notes:

1. **SSL Certificate Provisioning**: Takes 10-60 minutes after DNS propagation
2. **Health Checks**: Make sure your apps respond to health check paths
3. **CORS**: Update your backend CORS settings for HTTPS domains
4. **Cost**: Load Balancer costs ~$18/month + traffic costs

The Load Balancer IP will be your new static IP that you point your DNS to!
Happy Logging! 🎉
