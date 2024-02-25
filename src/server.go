package src

import (
	"email-reminder/src/routes"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"log"
	"net/http"
)

func Server() {
	state := NewState()
	defer state.Db.Close()

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
	}))

	r.Mount("/client", routes.ClientRoutes(state.Db))
	//r.Mount("/email", EmailRoutes(state.db))
	//r.Mount("/setting", SettingRoutes(state.db, state.settings))

	if err := http.ListenAndServe(":3000", r); err != nil {
		log.Fatal(err)
	}
}
