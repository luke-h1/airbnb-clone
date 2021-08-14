#!/bin/bash
cd ../src/client
npm run format
npm run lint 
npm run build 
vc -f 
vc --prod -f
