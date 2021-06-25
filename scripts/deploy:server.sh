
#!/bin/bash
echo What should the version be ?
read VERSION
echo Enter IP address
read TARGET
echo Enter user 
read USER 
cd ../src/abb-server

echo "Which environment do you want to deploy to ?"
read -r response

if [[ $response =~ ^([dD][eE][vV])$ ]]; then
echo "🚀 Deploying backend to dev"

docker build -t lhowsam/airbnb-clone-dev:$VERSION .
docker push lhowsam/airbnb-clone-dev:$VERSION

ssh ${USER}@${TARGET} -i /Users/lukehowsam/aws/*.cer "sudo docker pull lhowsam/airbnb-clone-dev:$VERSION && sudo docker tag lhowsam/airbnb-clone-dev:$VERSION dokku/airbnb-api-dev:$VERSION && dokku deploy airbnb-api-dev $VERSION"

echo "✅ Succesfully deployed backend to dev"

elif [[ $response =~ ^([pP][rR][oO][dD])$ ]]; then
echo "🚀 Deploying backend to production"

docker build -t lhowsam/airbnb-clone-prod:$VERSION .
docker push lhowsam/airbnb-clone-prod:$VERSION

ssh ${USER}@${TARGET} -i /Users/lukehowsam/aws/*.cer "sudo docker pull lhowsam/airbnb-clone-prod:$VERSION && sudo docker tag lhowsam/airbnb-clone-prod:$VERSION dokku/airbnb-api-prod:$VERSION && dokku deploy airbnb-api-prod $VERSION"

echo "✅ Succesfully deployed backend to production"
else
echo "❌ Bad input, not continuing with backend deploy!"
fi
