#!/usr/bin/env bash
set -e
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Installing root libs (if any)..."
# install common lib (if using npm pack or local linking)
# Install dependencies for each service
for svc in services/*; do
  if [ -d "$svc" ]; then
    echo "Installing $svc"
    (cd "$svc" && npm install)
  fi
done

echo "Building TypeScript for services..."
for svc in services/*; do
  if [ -d "$svc" ]; then
    (cd "$svc" && npm run build || true)
  fi
done

echo "Starting infrastructure (Postgres + Kafka) and services with docker-compose"
docker-compose up --build -d

echo "Running migrations for each service..."
for svc in services/*; do
  if [ -d "$svc" ]; then
    echo "Running migrations for $svc"
    (cd "$svc" && npm run migration:run || echo "migration run failed for $svc")
  fi
done

echo "Done. Services should be reachable at ports 3001..3003"
