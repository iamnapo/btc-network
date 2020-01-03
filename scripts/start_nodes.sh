#!/bin/bash

ssh snf-872411.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -r 1
ENDSSH
ssh snf-872412.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -r 2
ENDSSH
ssh snf-872414.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -r 3
ENDSSH
ssh snf-872415.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -r 4
ENDSSH
ssh snf-872416.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -r 5
ENDSSH
ssh snf-872433.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -r 6
ENDSSH
ssh snf-872783.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -r 7
ENDSSH
ssh snf-872784.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -r 8
ENDSSH
ssh snf-872785.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -r 9
ENDSSH
ssh snf-872786.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -r 10
ENDSSH
ssh snf-872787.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -r 11
ENDSSH
ssh snf-872788.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -r 12
ENDSSH
ssh snf-872789.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -r 13
ENDSSH
ssh snf-872790.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -r 14
ENDSSH
ssh snf-872791.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -r 15
ENDSSH
ssh snf-872792.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -r 16
ENDSSH
ssh snf-872793.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -r 17
ENDSSH
ssh snf-872794.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -r 18
ENDSSH
ssh snf-872795.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -r 19
ENDSSH
ssh snf-872796.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -r 20
ENDSSH

