# email-reminder

This is an email reminder application written in Go (backend) and React (frontend).
Wails is used to bundle it as a desktop application.

## Pre-requisites

- Go 1.17+
- vite
- PNPM
- [Wails](https://wails.io/docs/gettingstarted/installation)

## Wails

### About

You can configure the project by editing `wails.json`. More information about the project settings can be found
here: https://wails.io/docs/reference/project-config

### Live Development

To run in live development mode, run `wails dev` in the project directory. This will run a Vite development
server that will provide very fast hot reload of your frontend changes. If you want to develop in a browser
and have access to your Go methods, there is also a dev server that runs on http://localhost:34115. Connect
to this in your browser, and you can call your Go code from devtools.

### Building

To build a redistributable, production mode package, use `wails build`.

This project uses next export to export the Next.js application to static HTML, and then uses Wails to package
the static files into a program, so some Next.js features are unsupported, see 
https://nextjs.org/docs/advanced-features/static-html-export for details.
