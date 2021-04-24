# A Library of Things (aLoT)

**A Library of Things** allows its users to keep an inventory of their possessions and share them with other users of this application. It was _significantly_ inspired by [Auckland Library of Tools](https://www.aucklandlibraryoftools.com/).

> This is very much a work in progress. This readme will be updated when it has some functionality and how to use it.

aLoT is a [p2p](https://en.wikipedia.org/wiki/Peer-to-peer) application that uses [Holochain](https://holochain.org/) for its backend and [Vue.js](https://v3.vuejs.org) for its frontend.

## Prerequisites

1. Node.js v12+ installed.
1. A working Holochain development environment. [This tutorial](https://hackmd.io/@donsmith/hc-dev-tut-pt1) might be helpful in setting yours up.

## Setup

1. After cloning this repo:

    ```
    cd alot/ui
    npm install
    npm run serve
    ```

1. In a new terminal window:

    ```
    cd alot
    nix-shell .
    cd service
    CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown
    hc dna pack workdir/dna
    hc app pack workdir/happ
    hc sandbox generate workdir/happ/ --run=8888 --app-id=alot-app
    ```

1. Navigate to [http://localhost:8080](http://localhost:8080) and click the button. You should be greeted with a friendly message.

That's all for now.
