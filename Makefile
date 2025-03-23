VENV_DIR=exporter/.venv
PYTHON=$(VENV_DIR)/bin/python
PIP=$(VENV_DIR)/bin/pip

.PHONY: venv-install venv-update venv-activate venv-deactivate venv-clean

help:
	@echo "Usage:"
	@echo "make venv-install - Install python virtual environment with requirements"
	@echo "make venv-update - Update python virtual environment"
	@echo "make venv-activate - Activate python virtual environment"
	@echo "make venv-deactivate - Deactivate python virtual environment"
	@echo "make venv-clean - Clean python virtual environment"

venv-install:
	@test -d $(VENV_DIR) || python3 -m venv $(VENV_DIR) && $(PIP) install -r $(VENV_DIR)/../requirements.txt
	@echo "Virtual environment created and requirements installed"

venv-update:
	@test -d $(VENV_DIR) && $(PIP) install -r $(VENV_DIR)/../requirements.txt
	@echo "Virtual environment updated"

venv-clean:
	@rm -rf $(VENV_DIR)
	find . -type d -name "__pycache__" -exec rm -r {} +
	find . -type f -name "*.pyc" -delete
	@echo "Virtual environment cleaned"

run-exporter:
	@test -d $(VENV_DIR) && source $(VENV_DIR)/bin/activate
	PYTHONPATH=exporter $(PYTHON) -m app.exporter

frontend-install:
	@cd frontend && npm install

run-frontend-dev:
	@cd frontend && npm run dev

terraform-apply:
	@cd infrastructure/terraform; \
	@test ! -d .terraform && terraform init; \
	terraform apply -var "my_ip=$(shell curl -s ifconfig.me)/32" --auto-approve

terraform-destroy:
	@cd infrastructure/terraform; \
	@test ! -d .terraform && terraform init; \
	terraform destroy -var "my_ip=$(shell curl -s ifconfig.me)/32" --auto-approve