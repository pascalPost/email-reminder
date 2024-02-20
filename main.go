package main

import (
	"changeme/src"
	"embed"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	src.Server()

	//// Create an instance of the app structure
	//app := NewApp()
	//
	//// Create application with options
	//err := wails.Run(&options.App{
	//	Title:  "email-reminder",
	//	Width:  1024,
	//	Height: 768,
	//	AssetServer: &assetserver.Options{
	//		Assets: assets,
	//	},
	//	BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
	//	OnStartup:        app.startup,
	//	Bind: []interface{}{
	//		app,
	//	},
	//})
	//
	//if err != nil {
	//	println("Error:", err.Error())
	//}
}
