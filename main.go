package main

import (
	"email-reminder/src"
	"embed"
	"flag"
)

//go:embed all:frontend/out
var assets embed.FS

func main() {
	s := flag.Bool("server", true, "Run the server")
	if *s {
		go src.Server()
	}
	src.RunApp(assets)
}
