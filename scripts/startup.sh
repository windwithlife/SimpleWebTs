#!/bin/sh

projcet_path=`node -p "require('./deploy.config.json').production.projcet_path"`
node_env=`node -p "require('./deploy.config.json').production.node_env"`
project_name=`node -p "require('./deploy.config.json').project_name"`


echo "projcet_path: " $projcet_path;
echo "node_env: " $node_env;
echo "project_name: " $project_name;

cd ${projcet_path}

start() {
    pm2_log_path_prefix=`node -p "require('./deploy.config.json').production.pm2_log_path_prefix"`
    access_file_path=${pm2_log_path_prefix}"access.log"
    error_file_path=${pm2_log_path_prefix}"error.log"

    echo "access_file_path: " $access_file_path;
    echo "error_file_path: " $error_file_path;

    export NODE_ENV=production && pm2 start .server/server/index.js --no-daemon --name ${project_name}  -i 1 -o ${access_file_path} -e ${error_file_path} --merge-logs --log-date-format "YYYY-MM-DD HH:mm:ss "
}

stop() {
	pm2 delete ${project_name}
}

restart() {
	stop
	start
}

show() {
	pm2 show ${project_name}
}

show
if [ $? -ne 0 ]; then
  start
else
  restart
fi

exit 0


