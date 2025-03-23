output "cyberpot_ip" {
    description = "Public IPv4 address of the VPS"
    value = hcloud_server.cyberpot.ipv4_address
}

output "ssh_command" {
    description = "SSH command to connect"
    value = "ssh -p 2222 root@${hcloud_server.cyberpot.ipv4_address}"
}