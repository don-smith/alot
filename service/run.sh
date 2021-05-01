#!/bin/bash

echo "**** RUNNING HOLOCHAIN SANDBOX ****"

echo "** Making sure we're in a NIX-SHELL **"
if [[ -z $IN_NIX_SHELL ]]; then
    echo "You can only build while in the NIX-SHELL."
    echo "Go to the base folder of this repo, "
    echo "where you'll find a default.nix file, "
    echo "and run 'nix-shell' in your terminal."
    echo "Then you can cd to service and build."
    exit 1
fi

echo "** Generating sandbox on port 8888 for alot-app **"
hc sandbox generate workdir/happ/ --run=8888 --app-id=alot-app
