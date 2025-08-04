# 🚀 GCP VM Setup with Jenkins, Docker & GitHub Webhook Integration

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
