package routes

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"github.com/pascalPost/email-reminder/internal/dataBase"
	"github.com/pascalPost/email-reminder/internal/types"
	"github.com/swaggest/openapi-go/openapi3"
	"log"
	"log/slog"
	"net/http"
)

// ErrResponse renderer type for handling all sorts of errors.
//
// In the best case scenario, the excellent github.com/pkg/errors package
// helps reveal information on the error, setting it on Err, and in the Render()
// method, using it to set the application-specific error code in AppCode.
type ErrResponse struct {
	Err            error `json:"-"` // low-level runtime error
	HTTPStatusCode int   `json:"-"` // http response status code

	StatusText string `json:"status"`          // user-level status message
	AppCode    int64  `json:"code,omitempty"`  // application-specific error code
	ErrorText  string `json:"error,omitempty"` // application-level error message, for debugging
}

func ErrInvalidRequest(err error) render.Renderer {
	return &ErrResponse{
		Err:            err,
		HTTPStatusCode: 400,
		StatusText:     "Invalid request.",
		ErrorText:      err.Error(),
	}
}

func (e *ErrResponse) Render(w http.ResponseWriter, r *http.Request) error {
	render.Status(r, e.HTTPStatusCode)
	return nil
}

type ClientRequest types.ClientRequest

func (c *ClientRequest) Bind(r *http.Request) error {
	return nil
}

func ClientRoutes(db *dataBase.DatabaseConnection, reflector *openapi3.Reflector) chi.Router {
	r := chi.NewRouter()

	r.Get("/", getClientsHandler(db, reflector))
	r.Post("/", postClientHandler(db, reflector))

	return r
}

func getClientsHandler(db *dataBase.DatabaseConnection, reflector *openapi3.Reflector) func(w http.ResponseWriter, r *http.Request) {
	if reflector != nil {
		op, _ := reflector.NewOperationContext(http.MethodGet, "/clients")
		op.SetSummary("Returns all clients")
		op.AddRespStructure([]types.Client{})
		err := reflector.AddOperation(op)
		if err != nil {
			slog.Error("Error adding get '/clients' to oapi", "error", err)
		}
	}

	return func(w http.ResponseWriter, r *http.Request) {
		// TODO add pagination
		render.JSON(w, r, db.GetClients())
	}
}

func postClientHandler(db *dataBase.DatabaseConnection, reflector *openapi3.Reflector) func(w http.ResponseWriter, r *http.Request) {
	if reflector != nil {
		op, _ := reflector.NewOperationContext(http.MethodPost, "/clients")
		op.SetSummary("Add a new client")
		op.AddReqStructure(types.ClientRequest{})
		op.AddRespStructure(types.Client{})
		err := reflector.AddOperation(op)
		if err != nil {
			slog.Error("Error adding post '/clients' to oapi", "error", err)
		}
	}

	return func(w http.ResponseWriter, r *http.Request) {
		var clientRequest ClientRequest
		if err := render.Bind(r, &clientRequest); err != nil {
			log.Println(err)
			err := render.Render(w, r, ErrInvalidRequest(err))
			if err != nil {
				log.Println(err)
			}
			return
		}

		slog.Debug("received data: %s\n", "req", clientRequest)

		// add client to database
		clientId, err := db.AddClient(types.ClientRequest(clientRequest))
		if err != nil {
			log.Println(err)
			return
		}

		newClient, err := db.GetClient(clientId)
		if err != nil {
			log.Println(err)
			return
		}

		// add last email to database
		if err := db.AddEmailAtDate(clientId, clientRequest.LastReminder); err != nil {
			log.Println(err)
			return
		}

		render.JSON(w, r, newClient)
	}
}
