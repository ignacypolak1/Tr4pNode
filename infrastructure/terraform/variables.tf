variable "hcloud_token" {
    description = "Hetzner Cloud API token"
    type = string
    sensitive = true
}

variable "server_name" {
    description = "Name of the server"
    type = string
    default = "tr4pnode"
}

variable "server_image" {
    description = "Image to use for the server"
    type = string
    default = "ubuntu-22.04"
}

variable "server_type" {
    description = "Type of the server"
    type = string
    default = "cx22"
}

variable "server_location" {
    description = "Location of the server"
    type = string
    default = "nbg1"
}

variable "my_ip" {
    description = "Your IP address"
    type = string
    nullable = false
}


