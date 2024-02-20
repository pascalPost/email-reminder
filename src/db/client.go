package db

import (
	"changeme/src/types"
	"database/sql"
	"errors"
	"log"
)

// createClientTable is the SQL statement to create the client table
const createClientTable string = `
  CREATE TABLE IF NOT EXISTS client (
  id INTEGER NOT NULL PRIMARY KEY,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  email TEXT NOT NULL,
  reminder_frequency TEXT CHECK( reminder_frequency IN ('ANNUAL','SEMIANNUAL') ) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );`

// GetClients returns all clients in the database
func (db *DatabaseConnection) GetClients() []types.Client {
	rows, err := db.handle.Query("SELECT id, firstname, lastname, email, reminder_frequency, created_at  FROM client")
	if err != nil {
		log.Println(err)
		return nil
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {
			log.Println(err)
		}
	}(rows)

	var clients []types.Client

	for rows.Next() {
		var client types.Client
		var reminderFrequencyStr string
		if err := rows.Scan(&client.Id, &client.FirstName, &client.LastName, &client.Email, &reminderFrequencyStr, &client.RegistrationDate); err != nil {
			log.Println(err)
			return nil
		}
		if reminderFrequency, err := types.NewReminderFrequency(reminderFrequencyStr); err != nil {
			log.Println(err)
			return nil
		} else {
			client.ReminderFrequency = reminderFrequency
		}

		//// get last email
		//if lastEmail, err := db.GetLastEmail(client.Id); err == nil && lastEmail != nil {
		//	client.LastEmail = lastEmail.Time
		//} else {
		//	log.Println(err)
		//}

		clients = append(clients, client)
	}

	if err = rows.Err(); err != nil {
		log.Println(err)
		return nil
	}
	return clients
}

func (db *DatabaseConnection) GetClient(id uint) (*types.Client, error) {
	// TODO reduce duplicated code

	row := db.handle.QueryRow("SELECT id, firstname, lastname, email, reminder_frequency, created_at  FROM client WHERE id = ?", id)

	var client types.Client
	var reminderFrequencyStr string
	if err := row.Scan(&client.Id, &client.FirstName, &client.LastName, &client.Email, &reminderFrequencyStr, &client.RegistrationDate); err != nil {
		return nil, err
	}

	if reminderFrequency, err := types.NewReminderFrequency(reminderFrequencyStr); err != nil {
		return nil, err
	} else {
		client.ReminderFrequency = reminderFrequency
	}

	//// get last email
	//if lastEmail, err := db.GetLastEmail(id); err != nil {
	//	return &client, err
	//} else if lastEmail != nil {
	//	client.LastEmail = lastEmail.Time
	//}

	return &client, nil
}

// AddClient adds a new client to the database
func (db *DatabaseConnection) AddClient(client types.Client) (uint, error) {
	res, err := db.handle.Exec("INSERT INTO client (firstname, lastname, email, reminder_frequency) VALUES (?, ?, ?, ?)", client.FirstName, client.LastName, client.Email, client.ReminderFrequency.String())
	if err != nil {
		return 0, err
	}

	if rows, err := res.RowsAffected(); err != nil {
		return 0, err
	} else if rows == 0 {
		return 0, errors.New("no rows affected on insert")
	} else if rows > 1 {
		return 0, errors.New("more than one row affected on insert")
	}

	id, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}

	return uint(id), nil
}

func (db *DatabaseConnection) UpdateClient(client types.Client) error {
	_, err := db.handle.Exec("UPDATE client SET firstname = ?, lastname = ?, email = ?, reminder_frequency = ? WHERE id = ?", client.FirstName, client.LastName, client.Email, client.ReminderFrequency.String(), client.Id)
	return err
}

func (db *DatabaseConnection) DeleteClient(id uint) error {
	rowsAffected, err := db.handle.Exec("DELETE FROM client WHERE id = ?", id)
	log.Println("affected rows by delete: ", rowsAffected)
	return err
}
