#!/usr/bin/env node

/**
 * Deploy helper script for Cloudflare Workers
 * Works in headless environments without browser access
 * 
 * Usage:
 *   node scripts/deploy.js
 */

const fs = require('fs');
const path = require('path');

const apiToken = process.env.CLOUDFLARE_API_TOKEN;

if (!apiToken) {
  console.error('\n❌ CLOUDFLARE_API_TOKEN not set!\n');
  console.error('To deploy to Cloudflare, you need to set your API token.\n');
  console.error('Steps:\n');
  console.error('1. Visit: https://dash.cloudflare.com/profile/api-tokens');
  console.error('2. Create a new token with scope: "Workers (Write)" + "Workers Routes (Write)"\n');
  console.error('3. Copy the token and set it:\n');
  console.error('   export CLOUDFLARE_API_TOKEN="your_token_here"');
  console.error('   npm run deploy\n');
  console.error('   OR create .env file with:');
  console.error('   CLOUDFLARE_API_TOKEN=your_token_here\n');
  process.exit(1);
}

console.log('✅ CLOUDFLARE_API_TOKEN found. Proceeding with deployment...\n');

// Deploy using wrangler
const { execSync } = require('child_process');

try {
  console.log('📦 Building...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('\n🚀 Deploying to Cloudflare...');
  execSync('npm exec -- wrangler deploy --compatibility-flags nodejs_compat', { 
    stdio: 'inherit',
    env: { ...process.env, CLOUDFLARE_API_TOKEN: apiToken }
  });
  
  console.log('\n✅ Deployment successful!\n');
} catch (error) {
  console.error('\n❌ Deployment failed\n');
  process.exit(1);
}
