data "cloudflare_zones" "my_zone" {
    name = "redops.be"
}

# A record for api
resource "cloudflare_dns_record" "api" {
    zone_id = data.cloudflare_zones.my_zone.result[0].id
    name    = "api.${data.cloudflare_zones.my_zone.result[0].name}"
    type    = "A"
    content   = azurerm_container_group.api.ip_address
    ttl     = 1
    proxied = true
    depends_on = [ azurerm_container_group.api, azurerm_container_group.frontend ]
}

# A record for api
resource "cloudflare_dns_record" "frontend" {
    zone_id = data.cloudflare_zones.my_zone.result[0].id
    name    = "stonks.${data.cloudflare_zones.my_zone.result[0].name}"
    type    = "A"
    content   = azurerm_container_group.frontend.ip_address
    ttl     = 1
    proxied = true
    depends_on = [ azurerm_container_group.api, azurerm_container_group.frontend ]
}
