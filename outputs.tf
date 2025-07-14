output "azure_frontend_ip" {
  value = azurerm_container_group.frontend.ip_address
  
}
output "azure_api_ip" {
  value = azurerm_container_group.api.ip_address
}
