#!/bin/bash

set -euo pipefail

# ======= update ubuntu linux and install git,docker,tree ==========

# define env var
SUDO=${SUDO:-"sudo"}

# update package list
$SUDO apt-get update -y

# check if docker is installed
docker --version &>/dev/null

# if not installed then install docker
if [[ $? -eq 0 ]]; then
   echo "docker already installed"
   SUDO docker --version
else
   echo "Start docker installation ..."
   $SUDO apt-get install docker.io -y

   # Enable and start docker
   $SUDO systemctl docker start
   $SUDO systemctl docker enable

   # wait a moment to ensure services is start
   sleep 5

   echo "check docker version"
   docker --version
fi

echo "check docker svc status"
systemctl is-active docker

# install git and tree
echo "install git and tree"
apt-get install git tree -y

# ===================== end of script =============================

