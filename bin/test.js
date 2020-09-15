#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { TestStack } = require('../lib/test-stack');

const app = new cdk.App();
new TestStack(app, 'TestStack');
