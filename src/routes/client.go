package routes

import (
	"changeme/src/db"
	"changeme/src/types"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"log"
	"net/http"
	"time"
)

func ClientRoutes(db *db.DatabaseConnection) chi.Router {
	r := chi.NewRouter()

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		render.JSON(w, r, db.GetClients())
	})

	r.Post("/", func(w http.ResponseWriter, r *http.Request) {
		if err := r.ParseForm(); err != nil {
			log.Println(err)
			return
		}

		log.Printf("received form: %s\n", r.PostForm)

		// parse last reminder date given in YYYY-MM format
		yearMonthStr := r.FormValue("lastReminder")
		lastReminder, err := time.Parse("2006-01", yearMonthStr)
		if err != nil {
			log.Println(err)
			return
		}
		log.Println("last reminder set to: ", lastReminder)

		// parse reminder frequency
		var frequency types.ReminderFrequency
		if f := r.FormValue("reminderFrequency"); f == "1" {
			frequency = types.SEMIANNUAL
		} else if f == "2" {
			frequency = types.ANNUAL
		} else {
			log.Printf("Invalid reminder frequency %s (only yearly and halfYearly allowed)\n", f)
			return
		}

		// add client to database
		clientId, err := db.AddClient(
			types.Client{
				FirstName:         r.FormValue("firstname"),
				LastName:          r.FormValue("lastname"),
				Email:             r.FormValue("email"),
				ReminderFrequency: frequency,
			})
		if err != nil {
			log.Println(err)
			return
		}

		newClient, err := db.GetClient(clientId)
		if err != nil {
			log.Println(err)
			return
		}

		//// add last email to database
		//if err := db.AddEmailAtDate(clientId, lastReminder); err != nil {
		//	log.Println(err)
		//	return
		//}

		render.JSON(w, r, newClient)
	})

	return r
}
