variable "azure_client_id" {}
variable "azure_client_secret" {}
variable "azure_subscription_id" {}
variable "azure_tenant_id" {}
variable "docker_sock" {}
variable "cloudflare_api_token" {
    sensitive = true  
}