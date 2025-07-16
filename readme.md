# Scouts Stock Exchange Simulator

A fun stock market simulation project for Scouts, built with Python (Flask API), ~~React~~, and Azure/Docker deployment.

## Features

- **Live Stock Simulation:** 9 fake stocks with random value changes every 30 seconds.
- **Web Dashboard:** View real-time graphs of all stocks.
- ~~**Admin Panel:** Instantly set or schedule value changes for any stock.~~
- **Manual Updates:** Update stock values via a simple web form.
- ~~**CSV Export:** Download last week’s data for any stock.~~
- **Cloud Deployment:** Runs on Azure with Docker and can be managed via Terraform.

## How It Works

- The backend (`stonks/api/`) is a Flask API that stores stock values in a SQLite database and simulates price changes.
- The frontend (~~`stocks/`~~ and `stonks/frontend/`) displays live graphs and admin controls.
- ~~Data is persisted and can be exported for analysis or fun competitions.~~

## Getting Started

### Requirements

- Docker & Docker Compose
- Python 3.12 (for local API development)
- ~~Node.js & npm (for React frontend)~~
- (Optional) Azure account for cloud deployment

### Cloud Deployment

- Uses Terraform for Azure Container Instances and Cloudflare DNS.
- See `Terraform.tf`, `az_vm.tf`, and `cloudflare.tf` for infrastructure setup.

## For Scouts

- Compete to see who can "invest" best!
- Use the admin panel to schedule fun events (e.g., "market crash" or "boom").
- Download CSVs to analyze results or make leaderboards.

## Folder Structure

- `stonks/api/` – Flask API & database
- `stonks/frontend/` – Static HTML/JS dashboard
- ~~`stocks/` – React dashboard & admin~~
- Terraform files – Cloud deployment

## License

MIT – Have fun and share improvements!
