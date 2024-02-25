package types

import "time"

type ClientRequest struct {
	FirstName         string            `json:"firstName"`
	LastName          string            `json:"lastName"`
	Email             string            `json:"email"`
	ReminderFrequency ReminderFrequency `json:"reminderFrequency"`
	LastReminder      time.Time         `json:"lastReminder"`
}

type Client struct {
	ClientRequest
	Id               uint      `json:"id"`
	RegistrationDate time.Time `json:"registrationDate"`
}
