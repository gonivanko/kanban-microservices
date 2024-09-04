package services

import (
	"gopkg.in/mail.v2"
	"invitationService/internal/dto"
	"invitationService/utils"
	"log"
	"os"
	"strconv"
)

type InvitationEmailService struct{}

func (e *InvitationEmailService) Send(dto *dto.InvitationDTO) error {

	body, err := utils.Template("invitation.invitation", dto)

	if err != nil {
		log.Println(err)
		return err
	}

	m := mail.NewMessage()
	m.SetHeader("From", os.Getenv("MAIL_FROM"))
	m.SetHeader("To", dto.User.Email)
	m.SetHeader("Subject", "Email confirmation")
	m.SetBody("text/html", body)

	port, _ := strconv.Atoi(os.Getenv("SMTP_PORT"))

	d := mail.NewDialer(
		os.Getenv("SMTP_HOST"),
		port,
		os.Getenv("SMTP_LOGIN"),
		os.Getenv("SMTP_PASSWORD"),
	)

	return d.DialAndSend(m)
}

func NewInvitationEmailService() *InvitationEmailService {
	return &InvitationEmailService{}
}
