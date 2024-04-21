package internal

import "github.com/pascalPost/email-reminder/internal/db"

type State struct {
	Db *db.DatabaseConnection
	//settings *Settings
}

func NewState() *State {
	db := db.NewDatabaseConnection()
	//settings := NewSettings(Db)

	return &State{
		Db: db,
		//settings:  settings,
	}
}
