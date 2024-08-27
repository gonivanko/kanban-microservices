package dto

import "authService/internal/models"

type ConfirmationDTO struct {
	User  *models.User
	Token string
}
