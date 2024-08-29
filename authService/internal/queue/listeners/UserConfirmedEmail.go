package listeners

import (
	"authService/internal/dto"
	"authService/internal/repository"
	"encoding/json"
	"github.com/streadway/amqp"
	"log"
)

type UserConfirmedEmailListener struct {
	repository *repository.UserRepository
}

func NewUserRegisteredListener(
	repository *repository.UserRepository,
) *UserConfirmedEmailListener {
	return &UserConfirmedEmailListener{repository: repository}
}

func (u *UserConfirmedEmailListener) Listen(msg amqp.Delivery) {
	var data dto.UserConfirmedDTO

	if err := json.Unmarshal(msg.Body, &data); err != nil {
		log.Println("Unmarshal error:", err)
	}

	user, err := u.repository.FindByEmail(data.Email)

	if err != nil {
		log.Println("Email not found", err)
	}

	if user != nil {
		user.EmailConfirmed = true
		u.repository.Update(user)
	}

	log.Printf("Received a message: %s", msg.Body)
}
