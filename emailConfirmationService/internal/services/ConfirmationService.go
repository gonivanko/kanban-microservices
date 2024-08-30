package services

import (
	"example.com/internal/auth/jwt"
	"example.com/internal/dto"
	"example.com/internal/models"
	"example.com/internal/queue"
	"example.com/internal/repository"
	"fmt"
	"time"
)

type ConfirmationService struct {
	repository *repository.EmailLogRepository
	sender     *queue.RabbitMQSender
}

func NewConfirmationService(
	repository *repository.EmailLogRepository,
	sender *queue.RabbitMQSender,
) *ConfirmationService {
	return &ConfirmationService{repository: repository, sender: sender}
}

func (c *ConfirmationService) Confirm(token string) (*models.EmailLog, error) {
	claims, err := jwt.ParseToken(token)
	if err != nil {
		return nil, fmt.Errorf("invalid token %v", err)
	}

	record, err := c.repository.FindByEmail(claims.Email)

	if err != nil {
		return nil, fmt.Errorf("invalid token %v", err)
	}

	if record.ExpireTime.Before(time.Now()) {
		return nil, fmt.Errorf("token expired")
	}

	c.repository.ConfirmEmail(record)
	c.sender.Send("user_confirmed_email", dto.UserConfirmedDTO{Email: record.Email})

	return record, nil
}
