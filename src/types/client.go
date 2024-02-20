package types

import (
	"time"
)

type Client struct {
	Id                uint
	FirstName         string
	LastName          string
	Email             string
	ReminderFrequency ReminderFrequency
	RegistrationDate  string
	LastEmail         time.Time
}

//func (c *clients) Routes() chi.Router {
//	r := chi.NewRouter()
//

//
//	r.Delete("/{id}", func(rw http.ResponseWriter, r *http.Request) {
//		idStr := chi.URLParam(r, "id")
//		log.Printf("deletion of client %v requested\n", idStr)
//		id, err := strconv.ParseUint(idStr, 10, 32)
//		if err != nil {
//			log.Println(err)
//			return
//		}
//		if err := c.Db.DeleteClient(uint(id)); err != nil {
//			log.Println(err)
//			return
//		}
//	})
//
//	r.Get("/{id}", func(rw http.ResponseWriter, r *http.Request) {
//		idStr := chi.URLParam(r, "id")
//		id, err := strconv.ParseUint(idStr, 10, 32)
//		if err != nil {
//			log.Println(err)
//			return
//		}
//
//		client, err := c.Db.GetClient(uint(id))
//		if err != nil {
//			log.Println(err)
//			return
//		}
//
//		t, _ := template.ParseFiles("templates/clientTableRow.gohtml")
//		if err := t.Execute(rw, client); err != nil {
//			log.Println(err)
//		}
//	})
//
//	r.Get("/{id}/edit", func(rw http.ResponseWriter, r *http.Request) {
//		idStr := chi.URLParam(r, "id")
//		log.Printf("edit of client %v requested\n", idStr)
//		id, err := strconv.ParseUint(idStr, 10, 32)
//		if err != nil {
//			log.Println(err)
//			return
//		}
//
//		client, err := c.Db.GetClient(uint(id))
//		if err != nil {
//			log.Println(err)
//			return
//		}
//
//		t, _ := template.ParseFiles("templates/clientTableRowEdit.gohtml")
//		if err := t.Execute(rw, client); err != nil {
//			log.Println(err)
//		}
//	})
//
//	r.Put("/{id}", func(w http.ResponseWriter, r *http.Request) {
//		// get id from url
//		idStr := chi.URLParam(r, "id")
//		log.Printf("update of client %v submitted\n", idStr)
//		id, err := strconv.ParseUint(idStr, 10, 32)
//		if err != nil {
//			log.Println(err)
//			return
//		}
//
//		// parse form
//		if err := r.ParseForm(); err != nil {
//			log.Println(err)
//			return
//		}
//
//		log.Printf("received form: %s\n", r.PostForm)
//
//		// parse reminder frequency
//		var frequency ReminderFrequency
//		if f := r.FormValue("reminderFrequency"); f == "1" {
//			frequency = SEMIANNUAL
//		} else if f == "2" {
//			frequency = ANNUAL
//		} else {
//			log.Printf("Invalid reminder frequency %s (only yearly and halfYearly allowed)\n", f)
//			return
//		}
//
//		clientUpdate := Client{
//			Id:                uint(id),
//			FirstName:         r.FormValue("firstname"),
//			LastName:          r.FormValue("lastname"),
//			Email:             r.FormValue("email"),
//			ReminderFrequency: frequency,
//		}
//
//		if err := c.Db.UpdateClient(clientUpdate); err != nil {
//			log.Println(err)
//			return
//		}
//
//		client, err := c.Db.GetClient(uint(id))
//		if err != nil {
//			log.Println(err)
//			return
//		}
//
//		t, _ := template.ParseFiles("templates/clientTableRow.gohtml")
//		if err := t.Execute(w, client); err != nil {
//			log.Println(err)
//		}
//	})
//
//	return r
//}
