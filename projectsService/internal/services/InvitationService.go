package services

import (
	"projectsService/internal/database/models"
	"projectsService/internal/queue"
)

type InvitationService struct {
	sender *queue.RabbitMQSender
}

func (i *InvitationService) InviteUser(model *models.ProjectUser) error {
	return i.sender.Send("user_invite", model)
}

func NewInvitationService(sender *queue.RabbitMQSender) *InvitationService {
	return &InvitationService{sender: sender}
}
