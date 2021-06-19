#!/bin/bash
echo What should the version be ?
read VERSION
echo Enter IP address
read TARGET
echo Enter user 
read USER 
cd ../src/abb-server

echo "Deploy server to development or production? (enter 'dev' or 'prod')"
read -r response
if [[ $response =~ ^([dD][eE][vV])$ ]]; then
echo "DEPLOYING SERVER TO DEVELOPMENT 🚀"

docker build -t lhowsam/airbnb-clone-dev:$VERSION .
docker push lhowsam/airbnb-clone-dev:$VERSION

ssh ${USER}@${TARGET} -i /Users/lukehowsam/aws/*.cer "sudo docker pull lhowsam/airbnb-clone-dev:$VERSION && sudo docker tag lhowsam/airbnb-clone-dev:$VERSION dokku/airbnb-api-dev:$VERSION && dokku deploy airbnb-api-dev $VERSION"

echo "SUCCESFULLY DEPLOYED SERVER TO DEV ✅"

elif [[ $response =~ ^([pP][rR][oO][dD])$ ]]; then
echo "DEPLOYING SERVER TO PRODUCTION 🚀"

docker build -t lhowsam/airbnb-clone-prod:$VERSION .
docker push lhowsam/airbnb-clone-prod:$VERSION

ssh ${USER}@${TARGET} -i /Users/lukehowsam/aws/*.cer "sudo docker pull lhowsam/airbnb-clone-prod:$VERSION && sudo docker tag lhowsam/airbnb-clone-prod:$VERSION dokku/airbnb-api-prod:$VERSION && dokku deploy airbnb-api-prod $VERSION"

echo "SUCCESFULLY DEPLOYED SERVER TO PRODUCTION 🚀"
else
echo "Bad input, not continuing with SERVER deploy! ❌"
fi
