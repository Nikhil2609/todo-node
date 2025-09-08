#!/bin/bash

cd /home/ec2-user/todo-app

npx prisma migrate deploy 

# stop server
pm2 delete todo || true

# start server
pm2 start dist/src/index.js --name todo --watch
pm2 save