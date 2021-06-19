
#!/bin/bash
echo "Deploy to dev or prod ? (enter 'dev' or 'prod')"
read -r response
if [[ $response =~ ^([dD][eE][vV])$ ]]; then
echo "DEPLOYING FRONTEND TO DEV"
cd ../src/abb-web
npm run format 
npm run lint 
npm run tsc 
npm run build 
vc -f 
echo "SUCCESFULLY DEPLOYED FRONTEND TO DEV ✅"

elif [[ $response =~ ^([pP][rR][oO][dD])$ ]]; then
echo "DEPLOYING FRONTEND TO PROD"

cd ../src/abb-web
npm run format 
npm run lint 
npm run tsc 
npm run build 
vc --prod -f 

echo "SUCCESFULLY DEPLOYED FRONTEND TO PRODUCTION ✅"
else
echo "Bad input, not continuing with frontend deploy! ❌"
fi
