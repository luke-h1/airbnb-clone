#!/bin/bash
echo What should the version be ?
read VERSION
echo Enter IP address
read TARGET
echo Enter user 
read USER 
cd ../src/api
echo "🚀 Deploying api to production"

docker build -t lhowsam/api:$VERSION .
docker push lhowsam/api:$VERSION

ssh ${USER}@${TARGET} -i /Users/lukehowsam/aws/dev*.cer "sudo docker pull lhowsam/api:$VERSION && sudo docker tag lhowsam/api:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"

echo "✅ Succesfully deployed backend to production"
