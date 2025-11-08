terraform {
  backend "s3" {
    bucket       = "itm-25"
    key          = "terraform.tfstate"
    region       = "eu-central-1"
    use_lockfile = true
    encrypt      = true
  }
}
