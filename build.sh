#!/bin/bash

# Set environment variables for Bun
export BUN_RUNTIME=1

# Clean the .next directory
rm -rf .next

# Run the production build with Bun
bun --bun run build 