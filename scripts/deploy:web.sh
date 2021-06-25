#!/bin/bash
echo "Deploy frontend to development or production? (enter 'dev' or 'prod')"
read -r response
if [[ $response =~ ^([dD][eE][vV])$ ]]; then
echo "🚀 Deploying frontend to dev"
cd ../src/abb-web
npm run format 
npm run lint 
npm run tsc 
npm run build 
vc -f 
echo "✅ Succesfully deployed frontend to dev"

elif [[ $response =~ ^([pP][rR][oO][dD])$ ]]; then
echo "🚀 Deploying frontend to production"

cd ../src/abb-web
npm run format 
npm run lint 
npm run tsc 
npm run build 
vc --prod -f 

echo "✅ Succesfully deployed frontend to production"
else
echo "❌ Bad input, not continuing with frontend deploy!"
fi
