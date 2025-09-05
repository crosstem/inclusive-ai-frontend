# Git
GIT_REVISION ?= $(shell git rev-parse --short HEAD)
GIT_TAG ?= $(shell git describe --tags --abbrev=0 --always | sed -e s/v//g)

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
.DEFAULT_GOAL := help

.PHONY: install-deps-dev
install-deps-dev: ## install dependencies for development
	@# https://pnpm.io/installation
	@which pnpm || npm install -g pnpm
	pnpm install

.PHONY: format-check
format-check: ## format check
	@echo "Yet to implement"

.PHONY: format
format: ## format code
	@echo "Yet to implement"

.PHONY: lint
lint: ## lint
	pnpm lint
	pnpm typecheck

.PHONY: test
test: ## run tests
	@echo "Yet to implement"

.PHONY: build
build: ## build applications
	pnpm build

.PHONY: ci-test
ci-test: install-deps-dev format-check lint test build ## run CI test

.PHONY: run
run: ## run applications
	pnpm dev

.PHONY: update
update: ## update dependencies
	pnpm update --latest
