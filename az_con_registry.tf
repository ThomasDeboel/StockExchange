resource "azurerm_resource_group" "main" {
  name     = "TDResourceGroup"
  location = "East US"
}

# Azure Container Registry

resource "azurerm_container_registry" "tfcon_registry" {
  name                = "TDContainerRegistry"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Basic"
  admin_enabled       = true
}

