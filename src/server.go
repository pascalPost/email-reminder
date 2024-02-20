package src

import (
	"changeme/src/routes"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"log"
	"net/http"
)

func Server() {
	state := NewState()
	defer state.Db.Close()

	r := chi.NewRouter()
	r.Use(middleware.Logger)

	r.Mount("/client", routes.ClientRoutes(state.Db))
	//r.Mount("/email", EmailRoutes(state.db))
	//r.Mount("/setting", SettingRoutes(state.db, state.settings))

	if err := http.ListenAndServe(":3000", r); err != nil {
		log.Fatal(err)
	}
}
