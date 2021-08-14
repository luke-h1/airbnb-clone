#!/bin/bash

npm run format
npm run lint 
npm run build 
vc -f 
vc --prod -f
