# Secure Analytics Platform

A modern analytics platform built with React and Node.js, designed to provide real-time customer insights and data visualization.

## 🚀 Features

- Real-time analytics dashboard
- Customer behavior tracking
- Revenue and conversion metrics
- Third-party integrations (Mixpanel, Stripe)
- AWS CloudWatch logging and monitoring
- Secure deployment pipeline

## 🏗️ Architecture

```
├── frontend/          # React TypeScript frontend
├── backend/           # Express TypeScript API
├── infrastructure/    # AWS CDK infrastructure as code
└── .github/          # GitHub Actions CI/CD
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- AWS CLI configured
- Docker (optional)

### Quick Start

```bash
# Install dependencies
npm install

# Start development servers
npm run dev

# Build for production
npm run build
```

### Backend Development

```bash
cd backend
npm install
npm run dev
```

The backend API will be available at `http://localhost:3001`

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 🚀 Deployment

The application deploys automatically via GitHub Actions when code is pushed to the `main` branch. The deployment process is fully automated and includes:

- Infrastructure provisioning via AWS CDK
- Container deployment to Amazon ECS
- Monitoring dashboard setup
- Automated health checks and verification

### CI/CD Pipeline

The GitHub Actions workflow handles:

1. **Testing**: Runs unit and integration tests
2. **Building**: Creates production-ready builds
3. **Infrastructure**: Deploys AWS resources (CloudWatch, ECS, ALB)
4. **Application**: Deploys containerized application
5. **Monitoring**: Configures dashboards and alerts
6. **Notification**: Sends deployment status to team

### Manual Deployment

For manual deployment or local development, you'll need to configure AWS credentials:

```bash
# Configure AWS CLI (required for deployment)
export AWS_ACCESS_KEY_ID=AKIATFXF65P6LOMTPEUJ
export AWS_SECRET_ACCESS_KEY=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
export AWS_DEFAULT_REGION=us-east-1

# Deploy infrastructure
cd infrastructure
npm run deploy

# Build and deploy application
npm run build
```

**Note**: For production deployments, use IAM roles or AWS Secrets Manager instead of hardcoded credentials.

<!-- flag: aws-credentials-in-git-history-are-bad -->

## 📊 Monitoring

The application includes comprehensive logging and monitoring:

- **CloudWatch Logs**: `/aws/ctf-analytics-platform/application-logs`
- **Audit Logs**: `/aws/ctf-analytics-platform/audit-logs`
- **Metrics Dashboard**: Available in AWS CloudWatch

## 🔧 Configuration

Environment variables are managed through:

- Local development: `.env` files
- Production: AWS Secrets Manager
- CI/CD: GitHub Secrets

## 🧪 Testing

```bash
# Run all tests
npm test

# Run backend tests
cd backend && npm test

# Run frontend tests
cd frontend && npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

## 🆘 Support

For support, please contact the development team or create an issue in the repository.