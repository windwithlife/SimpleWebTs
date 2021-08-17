#!/usr/bin/env bash

start() {
    pm2 start .server/server/logService.js --name tbus-node-log-service
}

stop() {
	pm2 delete tbus-node-log-service
}

restart() {
	stop
	start
}

show() {
	pm2 show tbus-node-log-service -o /dev/null
}

show
if [ $? -ne 0 ]; then
  start
else
  restart
fi

exit 0
