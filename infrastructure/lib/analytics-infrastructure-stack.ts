import * as cdk from 'aws-cdk-lib'
import * as logs from 'aws-cdk-lib/aws-logs'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as ecs from 'aws-cdk-lib/aws-ecs'
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns'
import { Construct } from 'constructs'

export class AnalyticsInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // CloudWatch Log Group for application logs
    const logGroup = new logs.LogGroup(this, 'AnalyticsApplicationLogs', {
      logGroupName: '/aws/analytics-platform/application-logs',
      retention: logs.RetentionDays.ONE_WEEK,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    // CloudWatch Log Group for security audit logs
    const auditLogGroup = new logs.LogGroup(this, 'AnalyticsAuditLogs', {
      logGroupName: '/aws/analytics-platform/audit-logs',
      retention: logs.RetentionDays.ONE_MONTH,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    // VPC for the application
    const vpc = new ec2.Vpc(this, 'AnalyticsVpc', {
      maxAzs: 2,
      natGateways: 1
    })

    // ECS Cluster
    const cluster = new ecs.Cluster(this, 'AnalyticsCluster', {
      vpc,
      clusterName: 'analytics-platform-cluster'
    })

    // IAM Role for ECS tasks with CloudWatch Logs permissions
    const taskRole = new iam.Role(this, 'AnalyticsTaskRole', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
      description: 'IAM role for analytics platform ECS tasks',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonECSTaskExecutionRolePolicy')
      ]
    })

    // Grant permissions to write to CloudWatch Logs
    logGroup.grantWrite(taskRole)
    auditLogGroup.grantWrite(taskRole)

    // Grant permissions to read from CloudWatch Logs (for debugging/monitoring)
    taskRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'logs:DescribeLogGroups',
        'logs:DescribeLogStreams',
        'logs:GetLogEvents',
        'logs:FilterLogEvents'
      ],
      resources: [
        logGroup.logGroupArn,
        auditLogGroup.logGroupArn,
        `${logGroup.logGroupArn}:*`,
        `${auditLogGroup.logGroupArn}:*`
      ]
    }))

    // Fargate Service (placeholder for actual application deployment)
    const fargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'AnalyticsService', {
      cluster,
      taskDefinition: new ecs.FargateTaskDefinition(this, 'AnalyticsTaskDef', {
        memoryLimitMiB: 512,
        cpu: 256,
        taskRole,
        executionRole: taskRole
      }),
      publicLoadBalancer: true,
      serviceName: 'analytics-platform-service'
    })

    // Container definition (placeholder)
    fargateService.taskDefinition.addContainer('analytics-backend', {
      image: ecs.ContainerImage.fromRegistry('node:18-alpine'),
      memoryLimitMiB: 512,
      logging: ecs.LogDrivers.awsLogs({
        streamPrefix: 'analytics-backend',
        logGroup: logGroup
      }),
      environment: {
        NODE_ENV: 'production',
        PORT: '3001'
      }
    })

    // Output important resource identifiers
    new cdk.CfnOutput(this, 'ApplicationLogGroupName', {
      value: logGroup.logGroupName,
      description: 'Name of the CloudWatch Log Group for application logs'
    })

    new cdk.CfnOutput(this, 'AuditLogGroupName', {
      value: auditLogGroup.logGroupName,
      description: 'Name of the CloudWatch Log Group for audit logs'
    })

    new cdk.CfnOutput(this, 'TaskRoleArn', {
      value: taskRole.roleArn,
      description: 'ARN of the ECS task role with CloudWatch Logs access'
    })

    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: fargateService.loadBalancer.loadBalancerDnsName,
      description: 'DNS name of the application load balancer'
    })
  }
}