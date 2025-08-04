# ☁️ AWS EC2 Deployment Guide

> Enterprise-grade deployment of Claude Code on Amazon Web Services

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [AWS Setup](#aws-setup)
3. [EC2 Instance Creation](#ec2-instance-creation)
4. [Security Configuration](#security-configuration)
5. [Docker Installation](#docker-installation)
6. [Claude Code Deployment](#claude-code-deployment)
7. [Auto-Scaling Setup](#auto-scaling-setup)
8. [Monitoring with CloudWatch](#monitoring-with-cloudwatch)
9. [Cost Management](#cost-management)
10. [Production Best Practices](#production-best-practices)

## 📋 Prerequisites

- AWS Account with billing enabled
- AWS CLI installed and configured
- SSH key pair for EC2 access
- Basic understanding of AWS services
- API keys (Anthropic, etc.)

### AWS CLI Setup

```bash
# Install AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configure credentials
aws configure
# Enter: Access Key ID, Secret Access Key, Region, Output format
```

## 🏗️ AWS Setup

### 1. Create VPC (Optional - for isolation)

```bash
# Create VPC
aws ec2 create-vpc --cidr-block 10.0.0.0/16 --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=claude-vpc}]'

# Create subnet
aws ec2 create-subnet \
  --vpc-id vpc-xxx \
  --cidr-block 10.0.1.0/24 \
  --availability-zone us-east-1a \
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=claude-subnet}]'

# Create Internet Gateway
aws ec2 create-internet-gateway --tag-specifications 'ResourceType=internet-gateway,Tags=[{Key=Name,Value=claude-igw}]'

# Attach to VPC
aws ec2 attach-internet-gateway --vpc-id vpc-xxx --internet-gateway-id igw-xxx
```

### 2. Create Security Group

```bash
# Create security group
aws ec2 create-security-group \
  --group-name claude-sg \
  --description "Security group for Claude Code" \
  --vpc-id vpc-xxx

# Allow SSH
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxx \
  --protocol tcp \
  --port 22 \
  --cidr 0.0.0.0/0

# Allow HTTP
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxx \
  --protocol tcp \
  --port 80 \
  --cidr 0.0.0.0/0

# Allow HTTPS
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxx \
  --protocol tcp \
  --port 443 \
  --cidr 0.0.0.0/0
```

## 🖥️ EC2 Instance Creation

### 1. Choose Instance Type

**Recommended Instances:**
- **Development**: t3.medium (2 vCPU, 4GB RAM) ~$30/month
- **Standard**: t3.large (2 vCPU, 8GB RAM) ~$60/month
- **Performance**: c5.xlarge (4 vCPU, 8GB RAM) ~$120/month
- **GPU (for ML)**: g4dn.xlarge ~$380/month

### 2. Launch Instance via CLI

```bash
# Create instance
aws ec2 run-instances \
  --image-id ami-0c02fb55956c7d316 \
  --instance-type t3.large \
  --key-name claude-key \
  --security-group-ids sg-xxx \
  --subnet-id subnet-xxx \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=claude-code-server}]' \
  --block-device-mappings '[{"DeviceName":"/dev/sda1","Ebs":{"VolumeSize":30,"VolumeType":"gp3"}}]' \
  --user-data file://user-data.sh
```

### 3. User Data Script

Create `user-data.sh`:

```bash
#!/bin/bash
# Update system
apt-get update
apt-get upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Create claude user
useradd -m -s /bin/bash claude
usermod -aG docker claude

# Install CloudWatch agent
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
dpkg -i amazon-cloudwatch-agent.deb

# Install AWS CLI
apt-get install -y awscli

# Set up automatic security updates
apt-get install -y unattended-upgrades
echo 'Unattended-Upgrade::Automatic-Reboot "true";' >> /etc/apt/apt.conf.d/50unattended-upgrades
```

### 4. Connect to Instance

```bash
# Get instance IP
aws ec2 describe-instances \
  --filters "Name=tag:Name,Values=claude-code-server" \
  --query "Reservations[0].Instances[0].PublicIpAddress"

# SSH into instance
ssh -i claude-key.pem ubuntu@instance-ip
```

## 🔒 Security Configuration

### 1. IAM Role for EC2

```bash
# Create role
aws iam create-role \
  --role-name claude-ec2-role \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {"Service": "ec2.amazonaws.com"},
      "Action": "sts:AssumeRole"
    }]
  }'

# Attach policies
aws iam attach-role-policy \
  --role-name claude-ec2-role \
  --policy-arn arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy

aws iam attach-role-policy \
  --role-name claude-ec2-role \
  --policy-arn arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore

# Create instance profile
aws iam create-instance-profile --instance-profile-name claude-ec2-profile
aws iam add-role-to-instance-profile \
  --instance-profile-name claude-ec2-profile \
  --role-name claude-ec2-role
```

### 2. Secrets Manager for API Keys

```bash
# Store API key
aws secretsmanager create-secret \
  --name claude/api-keys \
  --secret-string '{
    "ANTHROPIC_API_KEY":"sk-ant-api03-xxx",
    "PERPLEXITY_API_KEY":"pplx-xxx",
    "GITHUB_TOKEN":"ghp_xxx"
  }'

# Grant EC2 access
aws iam put-role-policy \
  --role-name claude-ec2-role \
  --policy-name SecretsAccess \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Action": ["secretsmanager:GetSecretValue"],
      "Resource": "arn:aws:secretsmanager:*:*:secret:claude/*"
    }]
  }'
```

### 3. Security Best Practices

```bash
# Enable AWS Systems Manager Session Manager (no SSH needed)
aws ssm start-session --target instance-id

# Enable VPC Flow Logs
aws ec2 create-flow-logs \
  --resource-type VPC \
  --resource-ids vpc-xxx \
  --traffic-type ALL \
  --log-destination-type cloud-watch-logs \
  --log-group-name /aws/vpc/flowlogs
```

## 🐳 Docker Installation

### Enhanced Docker Setup

```bash
# Install Docker with specific version
VERSION_STRING=5:20.10.24~3-0~ubuntu-focal
sudo apt-get install docker-ce=$VERSION_STRING docker-ce-cli=$VERSION_STRING containerd.io

# Configure Docker daemon
sudo tee /etc/docker/daemon.json << EOF
{
  "log-driver": "awslogs",
  "log-opts": {
    "awslogs-group": "claude-docker-logs",
    "awslogs-region": "us-east-1",
    "awslogs-stream": "claude-${INSTANCE_ID}"
  },
  "storage-driver": "overlay2",
  "storage-opts": ["overlay2.override_kernel_check=true"],
  "exec-opts": ["native.cgroupdriver=systemd"]
}
EOF

sudo systemctl restart docker
```

## 🚀 Claude Code Deployment

### 1. Fetch Secrets and Deploy

```bash
# Create deployment script
cat > /home/claude/deploy.sh << 'EOF'
#!/bin/bash

# Fetch secrets from AWS
export ANTHROPIC_API_KEY=$(aws secretsmanager get-secret-value \
  --secret-id claude/api-keys \
  --query SecretString \
  --output text | jq -r .ANTHROPIC_API_KEY)

export PERPLEXITY_API_KEY=$(aws secretsmanager get-secret-value \
  --secret-id claude/api-keys \
  --query SecretString \
  --output text | jq -r .PERPLEXITY_API_KEY)

# Clone repository
git clone https://github.com/claude-code-hub/claude-code-hub.git
cd claude-code-hub/docker-vps/docker-setup

# Create .env file
cat > .env << EOL
ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY
PERPLEXITY_API_KEY=$PERPLEXITY_API_KEY
NODE_ENV=production
EOL

# Deploy with Docker Compose
docker-compose pull
docker-compose up -d

# Setup CloudWatch logs
aws logs create-log-group --log-group-name claude-docker-logs
EOF

chmod +x /home/claude/deploy.sh
sudo -u claude /home/claude/deploy.sh
```

### 2. EBS Volume for Persistence

```bash
# Create EBS volume
aws ec2 create-volume \
  --availability-zone us-east-1a \
  --size 100 \
  --volume-type gp3 \
  --tag-specifications 'ResourceType=volume,Tags=[{Key=Name,Value=claude-data}]'

# Attach to instance
aws ec2 attach-volume \
  --volume-id vol-xxx \
  --instance-id i-xxx \
  --device /dev/sdf

# Mount in instance
sudo mkfs -t ext4 /dev/xvdf
sudo mkdir /data
sudo mount /dev/xvdf /data
echo '/dev/xvdf /data ext4 defaults,nofail 0 2' | sudo tee -a /etc/fstab

# Update Docker Compose to use EBS
sudo mkdir -p /data/claude/{workspace,config,postgres,redis}
sudo chown -R claude:claude /data/claude
```

## 🔄 Auto-Scaling Setup

### 1. Create AMI

```bash
# Create image from configured instance
aws ec2 create-image \
  --instance-id i-xxx \
  --name "claude-code-ami" \
  --description "Claude Code configured AMI"
```

### 2. Launch Template

```bash
# Create launch template
aws ec2 create-launch-template \
  --launch-template-name claude-template \
  --version-description "Claude Code v1" \
  --launch-template-data '{
    "ImageId": "ami-xxx",
    "InstanceType": "t3.large",
    "KeyName": "claude-key",
    "SecurityGroupIds": ["sg-xxx"],
    "IamInstanceProfile": {"Name": "claude-ec2-profile"},
    "UserData": "base64-encoded-startup-script"
  }'
```

### 3. Auto Scaling Group

```bash
# Create Auto Scaling group
aws autoscaling create-auto-scaling-group \
  --auto-scaling-group-name claude-asg \
  --launch-template '{
    "LaunchTemplateName": "claude-template",
    "Version": "$Latest"
  }' \
  --min-size 1 \
  --max-size 5 \
  --desired-capacity 2 \
  --target-group-arns arn:aws:elasticloadbalancing:xxx \
  --health-check-type ELB \
  --health-check-grace-period 300
```

### 4. Application Load Balancer

```bash
# Create ALB
aws elbv2 create-load-balancer \
  --name claude-alb \
  --subnets subnet-xxx subnet-yyy \
  --security-groups sg-xxx

# Create target group
aws elbv2 create-target-group \
  --name claude-targets \
  --protocol HTTP \
  --port 80 \
  --vpc-id vpc-xxx \
  --health-check-enabled \
  --health-check-path /health
```

## 📊 Monitoring with CloudWatch

### 1. CloudWatch Dashboard

```json
{
  "widgets": [
    {
      "type": "metric",
      "properties": {
        "metrics": [
          ["AWS/EC2", "CPUUtilization", {"stat": "Average"}],
          [".", "NetworkIn", {"stat": "Sum"}],
          [".", "NetworkOut", {"stat": "Sum"}],
          [".", "DiskReadBytes", {"stat": "Sum"}],
          [".", "DiskWriteBytes", {"stat": "Sum"}]
        ],
        "period": 300,
        "stat": "Average",
        "region": "us-east-1",
        "title": "EC2 Instance Metrics"
      }
    },
    {
      "type": "log",
      "properties": {
        "query": "SOURCE 'claude-docker-logs' | fields @timestamp, @message | sort @timestamp desc | limit 100",
        "region": "us-east-1",
        "title": "Claude Logs"
      }
    }
  ]
}
```

### 2. CloudWatch Alarms

```bash
# CPU alarm
aws cloudwatch put-metric-alarm \
  --alarm-name claude-high-cpu \
  --alarm-description "Alarm when CPU exceeds 80%" \
  --metric-name CPUUtilization \
  --namespace AWS/EC2 \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 2

# Memory alarm (requires CloudWatch agent)
aws cloudwatch put-metric-alarm \
  --alarm-name claude-high-memory \
  --alarm-description "Alarm when memory exceeds 80%" \
  --metric-name mem_used_percent \
  --namespace CWAgent \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 2
```

### 3. Log Analysis

```bash
# Create Insights query
aws logs start-query \
  --log-group-name claude-docker-logs \
  --start-time $(date -u -d '1 hour ago' +%s) \
  --end-time $(date +%s) \
  --query-string '
    fields @timestamp, @message
    | filter @message like /ERROR/
    | stats count() by bin(5m)
  '
```

## 💰 Cost Management

### 1. Cost Optimization

```bash
# Use Spot Instances for development
aws ec2 request-spot-instances \
  --spot-price "0.03" \
  --instance-count 1 \
  --launch-specification '{
    "ImageId": "ami-xxx",
    "InstanceType": "t3.large",
    "KeyName": "claude-key",
    "SecurityGroupIds": ["sg-xxx"]
  }'

# Schedule instances
aws autoscaling put-scheduled-update-group-action \
  --auto-scaling-group-name claude-asg \
  --scheduled-action-name scale-down-night \
  --recurrence "0 22 * * *" \
  --min-size 0 \
  --max-size 0
```

### 2. Reserved Instances

For production workloads:
```bash
# Purchase Reserved Instance
aws ec2 purchase-reserved-instances-offering \
  --reserved-instances-offering-id offering-xxx \
  --instance-count 1
```

### 3. Cost Monitoring

```bash
# Set up budget alert
aws budgets create-budget \
  --account-id 123456789012 \
  --budget '{
    "BudgetName": "claude-monthly-budget",
    "BudgetLimit": {
      "Amount": "100",
      "Unit": "USD"
    },
    "TimeUnit": "MONTHLY",
    "BudgetType": "COST"
  }' \
  --notifications-with-subscribers '[{
    "Notification": {
      "NotificationType": "ACTUAL",
      "ComparisonOperator": "GREATER_THAN",
      "Threshold": 80
    },
    "Subscribers": [{
      "SubscriptionType": "EMAIL",
      "Address": "admin@example.com"
    }]
  }]'
```

## 🏭 Production Best Practices

### 1. High Availability

```yaml
# Multi-AZ deployment
regions:
  - us-east-1a
  - us-east-1b
  - us-east-1c

# Database replication
services:
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_REPLICATION_MODE=master
      - POSTGRES_REPLICATION_USER=replicator
```

### 2. Disaster Recovery

```bash
# Automated backups
cat > backup.sh << 'EOF'
#!/bin/bash
# Backup to S3
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BUCKET="s3://claude-backups"

# Backup Docker volumes
docker run --rm \
  -v claude-config:/data \
  -v $HOME/.aws:/root/.aws:ro \
  amazon/aws-cli s3 sync /data $BUCKET/config/$TIMESTAMP/

# Backup database
docker exec postgres pg_dump -U claude claude_db | \
  aws s3 cp - $BUCKET/database/claude_db_$TIMESTAMP.sql

# Create AMI
aws ec2 create-image \
  --instance-id $(ec2-metadata --instance-id | cut -d " " -f 2) \
  --name "claude-backup-$TIMESTAMP"
EOF
```

### 3. Security Hardening

```bash
# Enable GuardDuty
aws guardduty create-detector --enable

# Enable AWS Config
aws configservice put-configuration-recorder \
  --configuration-recorder name=claude-recorder,roleARN=arn:aws:iam::xxx:role/config-role

# Enable CloudTrail
aws cloudtrail create-trail \
  --name claude-trail \
  --s3-bucket-name claude-audit-logs
```

### 4. Performance Optimization

```bash
# Enable enhanced networking
aws ec2 modify-instance-attribute \
  --instance-id i-xxx \
  --ena-support

# Use placement groups
aws ec2 create-placement-group \
  --group-name claude-cluster \
  --strategy cluster
```

## 🔧 Troubleshooting

### Common Issues

**1. Instance Not Accessible**
```bash
# Check security group
aws ec2 describe-security-groups --group-ids sg-xxx

# Check network ACLs
aws ec2 describe-network-acls

# Use Systems Manager
aws ssm start-session --target i-xxx
```

**2. High Costs**
```bash
# Analyze cost
aws ce get-cost-and-usage \
  --time-period Start=2024-01-01,End=2024-01-31 \
  --granularity DAILY \
  --metrics "UnblendedCost" \
  --group-by Type=DIMENSION,Key=SERVICE
```

**3. Performance Issues**
```bash
# Enable detailed monitoring
aws ec2 monitor-instances --instance-ids i-xxx

# Check EBS performance
aws cloudwatch get-metric-statistics \
  --namespace AWS/EBS \
  --metric-name VolumeReadOps \
  --dimensions Name=VolumeId,Value=vol-xxx \
  --statistics Average \
  --start-time 2024-01-01T00:00:00Z \
  --end-time 2024-01-02T00:00:00Z \
  --period 3600
```

## 📚 Next Steps

- 🔒 Review [Security Guide](security-guide.md) for additional hardening
- 🌊 Compare with [DigitalOcean](digitalocean.md) for simpler setups
- 🎯 Explore [Kubernetes on EKS](https://aws.amazon.com/eks/) for container orchestration
- 📊 Set up [Advanced Monitoring](/performance/monitoring-usage.md)

---

Need help? Check [AWS Documentation](https://docs.aws.amazon.com/) or our [Discord](https://discord.gg/claude-code)