terraform {
  required_version = ">= 1.5"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
        docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
        cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5"
    }
  }
}

# Configure the AzureRM Provider
provider "azurerm" {
  features {}
  subscription_id = var.azure_subscription_id
  client_id       = var.azure_client_id
  client_secret   = var.azure_client_secret
  tenant_id       = var.azure_tenant_id

}


# Configure Docker provider
provider "docker" {
  host = "unix://${var.docker_sock}"

  registry_auth {
    address  = azurerm_container_registry.tfcon_registry.login_server
    username = var.azure_client_id
    password = var.azure_client_secret
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}
# dotenvx run -- bash
