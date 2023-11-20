.PHONY: all dev-core dev-ui clean deploy compose-up compose-down

all: 
	@echo "make dev - build development version"
	@echo "make test - run tests"
	@echo "make clean - clean up"

compose-up:
	@echo "Starting docker-compose"
	@docker-compose --profile app up -d

compose-down:
	@echo "Stopping docker-compose"
	@docker-compose --profile app down
install:
	@echo "Installing dependencies"
	
dev-core:
	@echo "Building development version"
	@cd src/backend/app && pnpm run dev

dev-ui:
	@echo "Building development version"
	@cd src/frontend/app && pnpm run dev

clean:
	@echo "Cleaning up"

deploy:
	@echo "Deploying"
	@okteto context use "https://cloud.okteto.com"
	@okteto deploy -n varun-dhruv --build
	
