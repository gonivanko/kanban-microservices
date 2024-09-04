package listeners

import (
	"encoding/json"
	"github.com/streadway/amqp"
	"invitationService/internal/dto"
	"invitationService/internal/models"
	"invitationService/internal/repository"
	"invitationService/internal/services"
	"log"
)

type UserInvitedListener struct {
	repository     *repository.InvitationRepository
	userRepository repository.UserGetter
	emailService   *services.InvitationEmailService
}

func NewUserInvitedListener(
	repository *repository.InvitationRepository,
	userRepository repository.UserGetter,
	emailService *services.InvitationEmailService,
) *UserInvitedListener {
	return &UserInvitedListener{
		repository:     repository,
		userRepository: userRepository,
		emailService:   emailService,
	}
}

func (u *UserInvitedListener) Listen(msg amqp.Delivery) {
	var invitation models.Invitation

	if err := json.Unmarshal(msg.Body, &invitation); err != nil {
		log.Println("Unmarshal error:", err)
	}

	record, err := u.repository.Create(&invitation)

	if err != nil {
		log.Println("CreateRecord error:", err)
	}

	user, err := u.userRepository.GetUser(uint(invitation.UserID))

	if err != nil {
		log.Println("GetUser error:", err)
	}

	go func() {
		err := u.emailService.Send(&dto.InvitationDTO{
			User:  user,
			Token: record.Token,
		})
		if err != nil {
			log.Println("Send error:", err)
		}
	}()

	log.Printf("Received a message: %s", msg.Body)
}
