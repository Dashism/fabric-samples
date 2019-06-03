#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error, print all commands.
set -ev

export IPPC1=${1:-"10.239.22.76"}
export IPPC2=${2:-"10.239.31.14"}

cat << EOF > .env
COMPOSE_PROJECT_NAME=net
IPPC1=$IPPC1
IPPC2=$IPPC2
EOF

echo ============= Start ===========
./start-peer2.sh

echo ============= Docker ===========
docker ps

echo ============= Pause ===========
read -p "Press enter to continue ..."

echo ============= SmartContract ===========
./smartcontract.sh