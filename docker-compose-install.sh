#!/bin/bash

set -e
set -u

# ======= update ubuntu linux and install git,docker,tree ==========

# docker compose installation
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose

# Install Docker Compose
sudo apt install docker-compose -y

# Apply executable permissions to the binary
sudo chmod +x /usr/local/bin/docker-compose

# Check Docker Compose version
echo " 📦 Checking Docker Compose version..."
docker-compose version


# ===================== end of script =============================
