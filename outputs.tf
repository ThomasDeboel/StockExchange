output "vm_public_ip" {
  value = azurerm_public_ip.td_public_ip.ip_address
  description = "The public IP address of the VM"
}