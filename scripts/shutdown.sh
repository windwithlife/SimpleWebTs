#!/usr/bin/env bash
project_name=`node -p "require('./deploy.config.json').project_name"`


pm2 show ${project_name}
if [ $? -eq 0 ]; then
  pm2 delete ${project_name}
fi
