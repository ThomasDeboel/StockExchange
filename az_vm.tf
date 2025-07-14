resource "azurerm_container_group" "api" {
  name                = "stonks-api"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  ip_address_type     = "Public"
  os_type             = "Linux"
  container {
    name   = "api"
    image  = docker_image.TD_api_image.name
    cpu    = "0.5"
    memory = "1.0"
    ports {
      port     = 80
      protocol = "TCP"
    }
  }
  image_registry_credential {
    server   = "tdcontainerregistry.azurecr.io"
    username = var.azure_client_id
    password = var.azure_client_secret
  }
  depends_on = [ docker_registry_image.TD_registry ]
}

resource "azurerm_container_group" "frontend" {
  name                = "stonks-frontend"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  ip_address_type     = "Public"
  os_type             = "Linux"
  container {
    name   = "frontend"
    image  = docker_image.TD_front_image.name
    cpu    = "0.5"
    memory = "1.0"
    ports {
      port     = 80
      protocol = "TCP"
    }
  }
  image_registry_credential {
    server   = "tdcontainerregistry.azurecr.io"
    username = var.azure_client_id
    password = var.azure_client_secret
  }
  depends_on = [ docker_registry_image.TD_front_registry ]
}
