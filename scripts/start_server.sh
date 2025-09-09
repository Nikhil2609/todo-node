#!/bin/bash

cd /home/ec2-user/todo-app

# stop server
pm2 delete todo || true

# start server
pm2 start dist/index.js --name todo --watch
pm2 save