#!/bin/bash

composer network install --card PeerAdmin@hlfv1 --archiveFile my-basic-sample.bna

composer network start --networkName my-basic-sample --networkVersion 0.2.6 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

composer card import --file networkadmin.card

composer network ping --card admin@my-basic-sample

composer-playground -p 8081