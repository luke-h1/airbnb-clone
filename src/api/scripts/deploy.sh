#!/bin/bash
echo What should the version be ?
read VERSION
echo Enter IP address
read TARGET
echo Enter user 
read USER 
cd .. 
echo "🚀 Deploying api to production"

docker build -t lhowsam/airbnb-clone:$VERSION .
docker push lhowsam/airbnb-clone:$VERSION

ssh ${USER}@${TARGET} -i /Users/lukehowsam/aws/*.cer "sudo docker pull lhowsam/airbnb-api:$VERSION && sudo docker tag lhowsam/airbnb-api:$VERSION dokku/airbnb-api:$VERSION && dokku deploy airbnb-api $VERSION"

echo "✅ Succesfully deployed backend to production"
