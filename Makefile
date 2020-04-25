# Usage:
# make init-test  # create init.sql file and execute docker-compose

init-test:
	@chmod +x init.sh
	@./init.sh
	@docker-compose up --build

init-dev:
	@chmod +x init.sh
	@./init.sh
	@docker-compose up --build -d