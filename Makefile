.PHONY: dev-down dev-build dev-up open

dev: dev-down dev-build dev-up 

# SIMNET
# Bring down the dev server.
dev-down:
	@echo "[Bringing down the dev sever....]"
	@docker-compose -f ./docker/docker-compose-simnet.yaml down --remove-orphans

# Build the dev server if any changes have occurred.
dev-build:
	@echo "[Building the dev server...]"
	@docker-compose -f ./docker/docker-compose-simnet.yaml build

# Run the dev server.
dev-up:
	@echo "[Running dev server...]"
	@docker-compose -f ./docker/docker-compose-simnet.yaml up -d

# Attach to the simnet container
attach-simnet:
	@docker exec -ti simnet /bin/bash
