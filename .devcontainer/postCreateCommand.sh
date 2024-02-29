#!/bin/bash

npm install remark remark-parse remark-stringify
# npm install -g

# curl https://sh.rustup.rs -sSf | sh
cargo install --locked term-transcript-cli --features portable-pty

echo "export GIT_PAGER=''" > ~/.bashrc