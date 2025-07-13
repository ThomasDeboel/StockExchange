resource "azurerm_resource_group" "TD_rg" {
  name     = "TDResourceGroup"
  location = "East US"
}

resource "azurerm_virtual_network" "td_vnet" {
  name                = "TDVnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.TD_rg.location
  resource_group_name = azurerm_resource_group.TD_rg.name
}

resource "azurerm_subnet" "td_subnet" {
  name                 = "TDSubnet"
  resource_group_name  = azurerm_resource_group.TD_rg.name
  virtual_network_name = azurerm_virtual_network.td_vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_network_interface" "td_nic" {
  name                = "TDNIC"
  location            = azurerm_resource_group.TD_rg.location
  resource_group_name = azurerm_resource_group.TD_rg.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.td_subnet.id
    private_ip_address_allocation = "Dynamic"
  }
}

resource "azurerm_linux_virtual_machine" "td_vm" {
  name                = "TDLinuxVM"
  resource_group_name = azurerm_resource_group.TD_rg.name
  location            = azurerm_resource_group.TD_rg.location
  size                = "Standard_B1s"
  admin_username      = "azureuser"
  network_interface_ids = [
    azurerm_network_interface.td_nic.id,
  ]
  custom_data = file("cloud-init.yaml") # Optional: Use cloud-init for initial setup

  admin_password = "P@ssword1234!" # Change this to a secure password or use SSH keys

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
    name                 = "tdosdisk"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-focal"
    sku       = "20_04-lts"
    version   = "latest"
  }

  disable_password_authentication = false
}
