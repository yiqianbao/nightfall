#!/usr/bin/env bash

# Exit script as soon as a command fails.
set -o errexit

cd zkp-utils && npm ci && \
cd ../zkp && npm ci && \

# Lists of all existing proofs
echo -e '\033[32mLists of all existing proofs :\033[m'
cd code/gm17/ && ls -1 -d */ && cd ../../
while true; do
    read -p "Do you want to recreate all proofs? (y/n) : " yn
    case $yn in
        [Yy]* ) npm run setup-all && cd ../; break;;
        [Nn]* ) read -p "Would you like to recreate any specific proof? (y/n) : " decision
                if [ "$decision" = "y" ] || [ "$decision" = "Y"  ]; then
                    read -p "Type the name of the proof : " proof
                    npm run setup -- -i gm17/$proof"/" && cd ../;
                fi
                exit;;
        * ) echo "Please answer yes or no.";;
    esac
done