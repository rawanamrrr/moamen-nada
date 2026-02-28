# Netlify Deployment Guide

## Environment Variables Setup

To deploy this engagement website to Netlify, you need to configure the following environment variables in your Netlify dashboard:

### Required Environment Variables

1. **SMTP_USER** - Your Gmail address (e.g., `engagementzeyadrawan@gmail.com`)
2. **SMTP_PASS** - Your Gmail App Password (16-character password)
3. **CONTACT_EMAIL** - Email address to receive messages (can be the same as SMTP_USER)

### Steps to Configure in Netlify

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Click **Add a variable** and add each of the following:

   ```
   Key: SMTP_USER
   Value: your-email@gmail.com
   
   Key: SMTP_PASS
   Value: your-gmail-app-password
   
   Key: CONTACT_EMAIL
   Value: your-email@gmail.com
   ```

4. Click **Save** after adding each variable

### How to Generate Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Enable 2-Step Verification if not already enabled
3. Go to **Security** → **2-Step Verification** → **App passwords**
4. Generate a new app password for "Mail"
5. Copy the 16-character password (format: `xxxx xxxx xxxx xxxx`)
6. Use this password as the value for `SMTP_PASS`

### Important Security Notes

- ✅ Environment variables are stored securely in Netlify
- ✅ Never commit `.env.local` or any file containing secrets to git
- ✅ The `.env.example` file is safe to commit (contains no real secrets)
- ✅ `.gitignore` is configured to exclude all `.env*` files except `.env.example`

### Deployment

After configuring the environment variables:

1. Commit and push your changes:
   ```bash
   git add .gitignore .env.example NETLIFY_DEPLOYMENT.md
   git commit -m "Add environment variable configuration for Netlify"
   git push origin main
   ```

2. Netlify will automatically trigger a new build
3. The build should now succeed without secrets scanning errors

### Troubleshooting

If you still encounter secrets scanning errors:

1. Ensure `.env.local` is not committed to git:
   ```bash
   git ls-files | findstr .env
   ```
   (Should only show `.env.example`)

2. If `.env.local` appears, remove it from git:
   ```bash
   git rm --cached .env.local
   git commit -m "Remove .env.local from git tracking"
   git push origin main
   ```

3. Clear Netlify build cache:
   - Go to **Site settings** → **Build & deploy** → **Clear cache and retry deploy**
