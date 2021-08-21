#!/bin/bash
echo "What should the version be ?"
read VERSION
echo "Enter IP address of AWS Lightsail instance"
read TARGET
echo "Enter user" 
read USER 
cd ../src/api
echo "🚀 Deploying api to production"

docker build -t lhowsam/airbnb-api:$VERSION .
docker push lhowsam/airbnb-api:$VERSION

ssh ${USER}@${TARGET} -i /Users/lukehowsam/aws/ireland-*.cer "sudo docker pull lhowsam/airbnb-api:$VERSION && sudo docker tag lhowsam/airbnb-api:$VERSION dokku/airbnb-api:latest && dokku deploy airbnb-api latest"

echo "✅ Succesfully deployed backend to production"
