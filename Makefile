VENV_DIR=exporter/.venv
PYTHON=$(VENV_DIR)/bin/python
PIP=$(VENV_DIR)/bin/pip

EXPORTER_ROOT=exporter
FRONTENT_ROOT=frontend
TERRAFORM_ROOT=infrastructure/terraform

.PHONY: venv-install venv-update venv-activate venv-deactivate venv-clean

help:
	@echo ""
	@echo "CyberPot Makefile – available commands:"
	@echo ""
	@echo "  make run-exporter-dev     – run the exporter backend (Python)"
	@echo "  make run-frontend-dev     – run the frontend (React + Vite)"
	@echo ""
	@echo "  make terraform-apply      – deploy infrastructure on Hetzner (with dynamic IP detection)"
	@echo "  make terraform-destroy    – destroy Hetzner infrastructure"
	@echo ""

run-exporter-dev:
	test ! -d $(VENV_DIR) && python3 -m venv $(VENV_DIR); \
	$(PIP) install -r $(VENV_DIR)/../requirements.txt; \
	PYTHONPATH=${EXPORTER_ROOT} $(PYTHON) -m app.exporter

run-frontend-dev:
	cd ${FRONTENT_ROOT}; \
	test ! -d node_modules && npm install; \
	npm run dev

terraform-apply:
	cd ${TERRAFORM_ROOT}; \
	test ! -d .terraform && terraform init; \
	terraform apply -var "my_ip=$(shell curl -s ifconfig.me)/32" --auto-approve

terraform-destroy:
	cd ${TERRAFORM_ROOT}; \
	test ! -d .terraform && terraform init; \
	terraform destroy -var "my_ip=$(shell curl -s ifconfig.me)/32" --auto-approve