#!/bin/bash

echo "**** BUILDING ZOME: STARTING ****"

echo "** Making sure we're in a NIX-SHELL **"
if [[ -z $IN_NIX_SHELL ]]; then
    echo "You can only build while in the NIX-SHELL."
    echo "Go to the base folder of this repo, "
    echo "where you'll find a default.nix file, "
    echo "and run 'nix-shell' in your terminal."
    echo "Then you can cd to service and build."
    exit 1
fi

echo "** Packing the DNA **"
hc dna pack workdir/dna

echo "** Packing the hApp **"
hc app pack workdir/happ

echo "** Building WASM **"
CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown

echo "**** BUILDING ZOME: FINISHED ****"
