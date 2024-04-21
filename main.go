package main

import (
	"email-reminder/internal"
	"embed"
	"flag"
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
