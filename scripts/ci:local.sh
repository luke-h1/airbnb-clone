#!/bin/bash
cd ..
npm ci 
npm run bootstrap
npm run format
npm run lint 
npm run build 
npm run bootstrap:prod
