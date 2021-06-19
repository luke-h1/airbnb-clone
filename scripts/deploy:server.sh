#!/bin/bash
echo What should the version be ?
read VERSION
echo Enter IP address
read TARGET
echo Enter user 
read USER 
cd ../src/abb-server

echo "Deploy server to development or production environment ? (enter 'dev' or 'prod')"
read -r response
if [[ $response =~ ^([dD][eE][vV])$ ]]; then
echo "DEPLOYING BACKEND TO DEVELOPMENT ENVIRONMENT 🚀"

docker build -t lhowsam/airbnb-clone-dev:$VERSION .
docker push lhowsam/airbnb-clone-dev:$VERSION

ssh ${USER}@${TARGET} -i /Users/lukehowsam/aws/*.cer "sudo docker pull lhowsam/airbnb-clone-dev:$VERSION && sudo docker tag lhowsam/airbnb-clone-dev:$VERSION dokku/airbnb-api-dev:$VERSION && dokku deploy airbnb-api-dev $VERSION"

echo "SUCCESFULLY DEPLOYED BACKEND TO DEVOPMENT ✅"

elif [[ $response =~ ^([pP][rR][oO][dD])$ ]]; then
echo "DEPLOYING BACKEND TO PRODUCTION 😈"

docker build -t lhowsam/airbnb-clone-prod:$VERSION .
docker push lhowsam/airbnb-clone-prod:$VERSION
ssh ${USER}@${TARGET} -i /Users/lukehowsam/aws/*.cer "sudo docker pull lhowsam/airbnb-clone-prod:$VERSION && sudo docker tag lhowsam/airbnb-clone-prod:$VERSION dokku/airbnb-api-prod:$VERSION && dokku deploy airbnb-api-prod $VERSION"

echo "SUCCESFULLY DEPLOYED BACKEND TO PRODUCTION 😈"
else
echo "Bad input, not continuing with BACKEND deploy! ❌"
fi



echo "Deploying to production 🚀 🔥"
docker build -t lhowsam/airbnb-clone:$VERSION .
docker push lhowsam/airbnb-clone:$VERSION
ssh ${USER}@${TARGET} -i /Users/lukehowsam/aws/*.cer "sudo docker pull lhowsam/airbnb-clone:$VERSION && sudo docker tag lhowsam/airbnb-clone:$VERSION dokku/airbnb-api:$VERSION && dokku deploy airbnb-api $VERSION"
