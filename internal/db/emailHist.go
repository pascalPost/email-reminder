package db

import (
	"database/sql"
	"github.com/pascalPost/email-reminder/internal/types"
	"time"
)

func (db *DatabaseConnection) CreateEmailHistTable() error {
	_, err := db.handle.Exec(`
CREATE TABLE IF NOT EXISTS email_history (
    id INTEGER PRIMARY KEY,
    client_id INTEGER NOT NULL,
    sent_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES client (id)
);`)
	return err
}

func (db *DatabaseConnection) AddEmailAtDate(clientId uint, date time.Time) error {
	_, err := db.handle.Exec("INSERT INTO email_history (client_id, sent_at) VALUES (?, ?)", clientId, date)
	return err
}

func (db *DatabaseConnection) GetLastEmail(clientId uint) (*types.Email, error) {
	row := db.handle.QueryRow("SELECT id, client_id, sent_at FROM email_history WHERE client_id = ? ORDER BY sent_at DESC LIMIT 1", clientId)

	if err := row.Err(); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	var e types.Email
	if err := row.Scan(&e.Id, &e.ClientId, &e.Time); err != nil {
		return nil, err
	}

	return &e, nil
}
