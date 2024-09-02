package main

import (
	"context"
	"gateway/internal/config"
)

var ctx = context.Background()

func main() {
	config.LoadConfig()
}
