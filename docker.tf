resource "docker_registry_image" "TD_registry" {
    name = docker_image.TD_api_image.name
    keep_remotely = true
    depends_on = [ azurerm_container_registry.tfcon_registry, docker_image.TD_api_image ]
}
resource "docker_registry_image" "TD_front_registry" {
    name = docker_image.TD_front_image.name
    keep_remotely = true
    depends_on = [ azurerm_container_registry.tfcon_registry, docker_image.TD_front_image ]
  
}

resource "docker_image" "TD_api_image" {
  name = "${azurerm_container_registry.tfcon_registry.login_server}/api:latest"
  build {
    context    = "./stonks/api/"
  }
  depends_on = [ azurerm_container_registry.tfcon_registry ]
}

resource "docker_image" "TD_front_image" {
  name = "${azurerm_container_registry.tfcon_registry.login_server}/frontend:latest"
  build {
    context    = "./stonks/frontend/"
  }
  depends_on = [ azurerm_container_registry.tfcon_registry ]
}
