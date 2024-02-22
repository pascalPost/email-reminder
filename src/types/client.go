package types

import "time"

type ClientRequest struct {
	FirstName         string            `json:"firstname"`
	LastName          string            `json:"lastname"`
	Email             string            `json:"email"`
	ReminderFrequency ReminderFrequency `json:"reminderFrequency"`
	LastReminder      time.Time         `json:"lastReminder"`
}

type Client struct {
	*ClientRequest
	Id               uint
	RegistrationDate time.Time `json:"registrationDate"`
}
