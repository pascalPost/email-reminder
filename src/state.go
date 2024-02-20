package src

import "changeme/src/db"

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
