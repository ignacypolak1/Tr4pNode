FROM python:3.11-slim

ENV HOST="0.0.0.0"
ENV PORT="8000"

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["/bin/sh", "-c", "uvicorn server.server:app --host ${HOST} --port ${PORT}"]