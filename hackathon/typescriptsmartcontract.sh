#!/bin/bash
cd chaincode/hackathonsmartcontract/typescript
echo ============= Clean ===========
rm -rf node_modules/
rm -rf dist/
rm package-lock.json
echo ============= Install ===========
npm install
echo ============= Build ===========
npm run build
echo ============= Finish ===========
cd ../../..
