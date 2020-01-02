#!/bin/bash

ssh snf-872411.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -s 1
ENDSSH
ssh snf-872412.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -s 2
ENDSSH
ssh snf-872414.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -s 3
ENDSSH
ssh snf-872415.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; npm i -g @iamnapo/btc-network; btc-network -o btc-network-data -s 4
ENDSSH
ssh snf-872416.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; npm i -g @iamnapo/btc-network; btc-network -o btc-network-data -s 5
ENDSSH
ssh snf-872433.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; npm i -g @iamnapo/btc-network; btc-network -o btc-network-data -s 6
ENDSSH
ssh snf-872783.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -s 7
ENDSSH
ssh snf-872784.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -s 8
ENDSSH
ssh snf-872785.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -s 9
ENDSSH
ssh snf-872786.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -s 10
ENDSSH
ssh snf-872787.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -s 11
ENDSSH
ssh snf-872788.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -s 12
ENDSSH
ssh snf-872789.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -s 13
ENDSSH
ssh snf-872790.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -s 14
ENDSSH
ssh snf-872791.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -s 15
ENDSSH
ssh snf-872792.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -s 16
ENDSSH
ssh snf-872793.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -s 17
ENDSSH
ssh snf-872794.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -s 18
ENDSSH
ssh snf-872795.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -s 19
ENDSSH
ssh snf-872796.vm.okeanos.grnet.gr -l user -i ~/.ssh/okeanos_rsa <<'ENDSSH'
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; btc-network -o btc-network-data -s 20
ENDSSH
