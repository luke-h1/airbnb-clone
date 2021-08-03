#!/bin/bash

npm run tsc
npm run lint 
npm run format
npm run build 
vc -f 
vc --prod -f