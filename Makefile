.PHONY: all dev-core dev-ui clean deploy

all: 
	@echo "make dev - build development version"
	@echo "make test - run tests"
	@echo "make clean - clean up"

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
