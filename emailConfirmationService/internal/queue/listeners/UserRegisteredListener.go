package listeners

import (
	"encoding/json"
	"example.com/internal/dto"
	"example.com/internal/repository"
	"example.com/internal/services"
	"github.com/streadway/amqp"
	"log"
)

type UserRegisteredListener struct {
	service    services.EmailConfirmationService
	repository *repository.EmailLogRepository
}

func NewUserRegisteredListener(
	service services.EmailConfirmationService,
	repository *repository.EmailLogRepository,
) *UserRegisteredListener {
	return &UserRegisteredListener{service: service, repository: repository}
}

func (u *UserRegisteredListener) Listen(msg amqp.Delivery) {
	var user dto.User

	if err := json.Unmarshal(msg.Body, &user); err != nil {
		log.Println("Unmarshal error:", err)
	}

	record, err := u.repository.CreateRecord(&user)

	if err != nil {
		log.Println("CreateRecord error:", err)
	}

	go u.service.Send(&dto.ConfirmationDTO{
		User:  user,
		Token: record.Token,
	})

	log.Printf("Received a message: %s", msg.Body)
}
