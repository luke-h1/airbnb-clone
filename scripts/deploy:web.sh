#!/bin/bash
echo "Which environment do you want to deploy to ?"
read -r response
cd ../src/abb-web

if [[ $response =~ ^([dD][eE][vV])$ ]]; then
echo "🚀 Deploying frontend to dev"
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
