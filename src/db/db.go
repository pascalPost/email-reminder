package db

import (
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
	"log"
)

// dbFile is the name of the database file
const dbFile string = "db.sqlite"
const dbFileTest string = "file::memory:?cache=shared"

// DatabaseConnection represents a connection to the database
type DatabaseConnection struct {
	handle *sql.DB
}

// newDatabaseConnection creates a new database connection for the given file
func newDatabaseConnection(file string) *DatabaseConnection {
	db, err := sql.Open("sqlite3", file)
	if err != nil {
		panic(err)
	}
	if _, err := db.Exec(createClientTable); err != nil {
		log.Fatalln(err)
	}
	//if err := CreateSettingsTable(db); err != nil {
	//	panic(err)
	//}
	//if err := CreateEmailTable(db); err != nil {
	//	panic(err)
	//}
	return &DatabaseConnection{db}
}

// NewDatabaseConnection creates a new database connection
func NewDatabaseConnection() *DatabaseConnection {
	return newDatabaseConnection(dbFile)
}

// NewTestDatabaseConnection creates a new in memory database connection for testing
func NewTestDatabaseConnection() *DatabaseConnection {
	return newDatabaseConnection(dbFileTest)
}

// Close the database connection
func (db *DatabaseConnection) Close() {
	if err := db.handle.Close(); err != nil {
		panic(err)
	}
}

//type Email struct {
//	Id       uint
//	ClientId uint
//	Time     time.Time
//}
//
//func parseQuery(rows *sql.Rows, err error) []Email {
//	if err != nil {
//		return nil
//	}
//	defer func(rows *sql.Rows) {
//		err := rows.Close()
//		if err != nil {
//			log.Println(err)
//		}
//	}(rows)
//
//	var emails []Email
//
//	for rows.Next() {
//		var e Email
//		if err := rows.Scan(&e.Id, &e.ClientId, &e.Time); err != nil {
//			log.Println(err)
//			return nil
//		}
//		emails = append(emails, e)
//	}
//
//	if err := rows.Err(); err != nil {
//		log.Println(err)
//		return nil
//	}
//	return emails
//}
//
//func (db *DatabaseConnection) GetAllEmails() []Email {
//	return parseQuery(db.handle.Query("SELECT id, client_id, sent_at FROM email"))
//}
//
//func (db *DatabaseConnection) GetEmails(clientId uint) []Email {
//	return parseQuery(db.handle.Query("SELECT id, client_id, sent_at FROM email WHERE client_id = ?", clientId))
//}
//
//func (db *DatabaseConnection) GetLastEmail(clientId uint) (*Email, error) {
//	row := db.handle.QueryRow("SELECT id, client_id, sent_at FROM email WHERE client_id = ? ORDER BY sent_at DESC LIMIT 1", clientId)
//
//	if err := row.Err(); err != nil {
//		if err == sql.ErrNoRows {
//			return nil, nil
//		}
//		return nil, err
//	}
//
//	var e Email
//	if err := row.Scan(&e.Id, &e.ClientId, &e.Time); err != nil {
//		return nil, err
//	}
//
//	return &e, nil
//}
