#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { AnalyticsInfrastructureStack } from '../lib/analytics-infrastructure-stack'

const app = new cdk.App()

new AnalyticsInfrastructureStack(app, 'AnalyticsInfrastructureStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  },
  description: 'Infrastructure for secure analytics platform'
})