package errors

import "fmt"

type Http struct {
	Success     bool   `json:"success,omitempty"`
	Description string `json:"description,omitempty"`
	Metadata    string `json:"metadata,omitempty"`
	StatusCode  int    `json:"statusCode"`
}

func (e Http) Error() string {
	return fmt.Sprintf("description: %s,  metadata: %s", e.Description, e.Metadata)
}

func NewHttpError(description, metadata string, statusCode int) Http {
	return Http{
		Success:     false,
		Description: description,
		Metadata:    metadata,
		StatusCode:  statusCode,
	}
}
