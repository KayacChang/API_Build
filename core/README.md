# API Service Documentation: Core

###### tags: `v1.0.0`

### Introduction

Core is a micro task process in the API service background.  
Which is responsible for transfer data  
from Redis cache layer to Postgres persistence layer.

### How it work

Core will observe the Redis by using `brpop`,  
when API service receive the data which need to be store,  
it will first writes data into redis cache,  
and `lpush` data into a queue call `pending:<table_name>` which is oberved by Core,  
core pick that data using `brpop` and `lpush` to another queue call `processing:<table_name>`  
After insert data successfully into postgres,  
then `lrem` that data from `processing:<table_name>`.

The `brpop` default timeout is set in `1` seconds,
if timeout occured,
the process will wait `10` seconds,
then repeated the `brpop` again.

### Error Handle

If exception occured during transfrom processing,  
the data will pending in `prcossing:<table_name>`

@TODO and send error message to admin for error tracing.

Because the data was already `brpop` from `pending:<table_name>`
so it won't blocked the process to processing next data.
