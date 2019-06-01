#!/bin/bash

FABRIC_CA_SERVER_CA_CERTFILE=/etc/hyperledger/hackathon-ca-server-config/ca.org1.example.com-cert.pem
PK_NAME=$(basename /etc/hyperledger/hackathon-ca-server-config/*_sk)
FABRIC_CA_SERVER_CA_KEYFILE=/etc/hyperledger/hackathon-ca-server-config/"${PK_NAME}"