#!/bin/bash

echo "=== EXECUTING AMPLIFY PULL ==="
amplify pull --appId d18hz90utultf5 --envName fwatcher --yes

echo "=== EXECUTING AMPLIFY CODEGEN ==="
amplify codegen

echo "=== AMPLIFY OPERATIONS COMPLETE ==="