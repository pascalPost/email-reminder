package test

import (
	"bytes"
	. "email-reminder/src/db"
	"email-reminder/src/routes"
	"email-reminder/src/types"
	"encoding/json"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
	"time"
)

var db *DatabaseConnection

// TestMain sets up the in mem db and runs the tests
func TestMain(m *testing.M) {
	db = NewTestDatabaseConnection()
	defer db.Close()

	os.Exit(m.Run())
}

func TestGetClient(t *testing.T) {
	lastReminder := time.Date(2019, 2, 1, 0, 0, 0, 0, time.UTC)
	newClient := types.ClientRequest{
		FirstName:         "Max",
		LastName:          "Mustermann",
		Email:             "max@mustermann.de",
		ReminderFrequency: types.Annual,
		LastReminder:      lastReminder,
	}

	// add a client to the db
	id, err := db.AddClient(newClient)
	assert.NoError(t, err)
	assert.Condition(t, func() bool { return id > 0 }, "id should be greater than 0")

	// get the client from the db
	client, err := db.GetClient(id)
	assert.NoError(t, err)
	assert.Equal(t, newClient, types.ClientRequest{
		FirstName:         client.FirstName,
		LastName:          client.LastName,
		Email:             client.Email,
		ReminderFrequency: client.ReminderFrequency,
		LastReminder:      client.LastReminder,
	})

	// get the client from the server
	req, err := http.NewRequest("GET", "/client", nil)
	assert.NoError(t, err)

	w := httptest.NewRecorder()
	routes.ClientGetHandler(db)(w, req)
	res := w.Result()
	assert.Equal(t, 200, w.Result().StatusCode)

	var newClientResp []types.Client
	err = json.NewDecoder(res.Body).Decode(&newClientResp)
	assert.NoError(t, err)
	assert.Equal(t, 1, len(newClientResp))
	assert.Equal(t, client, &newClientResp[0])
}

func TestPostClient(t *testing.T) {
	const clintJSON = `{
			  "firstname": "John",
			  "lastname": "Doe",
			  "email": "john@doe.com",
			  "reminderFrequency": "annual",
			  "lastReminder": "2019-02-01T00:00:00.000Z"
}`

	var clientReq types.ClientRequest
	err := json.Unmarshal([]byte(clintJSON), &clientReq)

	req, err := http.NewRequest("POST", "/client",
		bytes.NewReader(
			[]byte(clintJSON)))
	assert.NoError(t, err)
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	routes.ClientPostHandler(db)(w, req)
	res := w.Result()
	assert.Equal(t, 200, w.Result().StatusCode)

	var newClientResp types.Client
	err = json.NewDecoder(res.Body).Decode(&newClientResp)
	assert.NoError(t, err)

	clientReqTest := types.ClientRequest{
		FirstName:         newClientResp.FirstName,
		LastName:          newClientResp.LastName,
		Email:             newClientResp.Email,
		ReminderFrequency: newClientResp.ReminderFrequency,
		LastReminder:      newClientResp.LastReminder,
	}
	assert.Equal(t, clientReq, clientReqTest)
}
