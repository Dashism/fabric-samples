#!/bin/bash
echo Install Composer
npm install -g composer-cli@latest
echo Install Composer Rest Server
npm install -g composer-rest-server@latest
echo Install Generator Hyperledger Composer
npm install -g generator-hyperledger-composer@latest
echo Install Composer Playground
npm install -g composer-playground@latest
echo Download Fabric-Samples
curl -sSL http://bit.ly/2ysbOFE | bash -s