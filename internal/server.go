package internal

import (
	"encoding/json"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/pascalPost/email-reminder/internal/routes"
	"github.com/swaggest/openapi-go/openapi3"
	"github.com/swaggest/swgui/v5emb"
	"log"
	"log/slog"
	"net/http"
	"os"
)

func Server() {
	c := NewConfig()

	state := NewState()
	defer state.Db.Close()

	reflector := &openapi3.Reflector{}
	reflector.Spec = &openapi3.Spec{Openapi: "3.0.3"}
	reflector.Spec.Info.
		WithTitle("email-reminder API").
		WithVersion("0.1.0").
		WithDescription("email-reminder backend allows to add new clients, set reminder dates and allows to send reminder emails to clients if they are due.")

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173", "wails://wails.localhost:*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
	}))

	r.Get("/ping", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})
	getOp, _ := reflector.NewOperationContext(http.MethodGet, "/ping")
	getOp.SetSummary("Ping to test connection")
	getOp.SetDescription("The ping endpoint can be used to test the connection to the server.")
	getOp.AddRespStructure(nil)
	err := reflector.AddOperation(getOp)
	if err != nil {
		log.Fatal(err)
	}

	r.Mount("/clients", routes.ClientRoutes(state.Db, reflector))
	//r.Mount("/emails", EmailRoutes(state.db))
	//r.Mount("/settings", SettingRoutes(state.db, state.settings))

	r.Get("/api/openapi.json", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		err := json.NewEncoder(w).Encode(reflector.Spec)
		if err != nil {
			if c.Dev {
				http.Error(w, "Internal error: "+err.Error(), http.StatusInternalServerError)
				return
			}

			http.Error(w, "Internal error", http.StatusInternalServerError)
			return
		}
	})

	if c.Dev {
		schema, err := reflector.Spec.MarshalYAML()
		if err != nil {
			log.Fatal(err)
		}

		err = os.WriteFile("./api/openapi.yaml", schema, 0666)
		if err != nil {
			log.Fatal("unable to write openapi file: " + err.Error())
		}

		// TODO fix favicon for swagger
		//r.Handle("/*", http.FileServer(http.Dir("./frontend/public/")))
		r.Mount("/api/docs", v5emb.New(
			reflector.Spec.Title(),
			"/api/openapi.json",
			"/api/docs/",
		))
		slog.Info("docs at http://localhost:3000/api/docs")
	}

	slog.Info("Starting server on port 3000")
	if err := http.ListenAndServe(":3000", r); err != nil {
		log.Fatal(err)
	}
}
