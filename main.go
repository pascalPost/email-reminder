package main

import (
	"embed"
	"flag"
	"github.com/pascalPost/email-reminder/internal"
)

//go:embed all:frontend/out
var assets embed.FS

func main() {
	s := flag.Bool("server", true, "Run the server")
	if *s {
		go internal.Server()
	}
	internal.RunApp(assets)
}
