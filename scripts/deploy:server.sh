#!/bin/bash
echo What should the version be ?
read VERSION
echo Enter IP address
read TARGET
echo Enter user 
read USER 
cd ../src/api

echo "🚀 Deploying api to production"

docker build -t lhowsam/airbnb-clone-prod:$VERSION .
docker push lhowsam/airbnb-clone-prod:$VERSION

ssh ${USER}@${TARGET} -i /Users/lukehowsam/aws/*.cer "sudo docker pull lhowsam/airbnb-clone-prod:$VERSION && sudo docker tag lhowsam/airbnb-clone-prod:$VERSION dokku/airbnb-api-prod:$VERSION && dokku deploy airbnb-api-prod $VERSION"

echo "✅ Succesfully deployed backend to production"
