package internal

type State struct {
	Db *dataBase.DatabaseConnection
	//settings *Settings
}

func NewState() *State {
	db := dataBase.NewDatabaseConnection()
	//settings := NewSettings(Db)

	return &State{
		Db: db,
		//settings:  settings,
	}
}
