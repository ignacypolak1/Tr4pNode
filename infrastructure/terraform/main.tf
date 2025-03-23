resource "hcloud_firewall" "cyberpot_fw" {
  name = "cyberpot-fw"

  rule {
    direction = "in"
    protocol = "tcp"
    port = "22"
    source_ips = ["0.0.0.0/0"]
  }

  rule {
    direction = "in"
    protocol = "tcp"
    port = "2222"
    source_ips = [var.my_ip]
  }

  rule {
    direction = "in"
    protocol = "tcp"
    port = "3000"
    source_ips = [var.my_ip]
  }

  rule {
    direction = "in"
    protocol = "tcp"
    port = "3001"
    source_ips = [var.my_ip]
  }
}

resource "hcloud_ssh_key" "default" {
  name = "local-key"
  public_key = file("~/.ssh/id_rsa.pub")
}

resource "hcloud_server" "cyberpot" {
  name = var.server_name
  image = var.server_image
  server_type = var.server_type
  location = var.server_location
  ssh_keys = [hcloud_ssh_key.default.id]
  firewall_ids = [hcloud_firewall.cyberpot_fw.id]
   user_data = <<-EOF
   #cloud-config

    package_update: true
    package_upgrade: true

    packages:
    - docker.io
    - docker-compose

    runcmd:
    - sed -i 's/#Port 22/Port 2222/' /etc/ssh/sshd_config
    - systemctl restart sshd
    - systemctl enable docker
    - systemctl start docker
    EOF
}

resource "null_resource" "setup_ufw" {
  depends_on = [ hcloud_server.cyberpot ]

  connection {
    type = "ssh"
    user = "root"
    private_key = file("~/.ssh/id_rsa")
    host = hcloud_server.cyberpot.ipv4_address
    port = 2222
  }

    provisioner "remote-exec" {
      inline = [
        "ufw allow from ${var.my_ip} to any port 2222 proto tcp",
        "ufw allow from ${var.my_ip} to any port 3000 proto tcp",
        "ufw allow from ${var.my_ip} to any port 3001 proto tcp",
        "ufw allow 22/tcp",
        "ufw --force enable"
      ]
    }
}