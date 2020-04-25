#!/usr/bin/env bash

res=""

for file in 'admins' 'games' 'users' 'orders'
do
    res+=$(grep -o '^[^--]*' sql/schema/$file.sql)
done

echo $res > sql/init.sql