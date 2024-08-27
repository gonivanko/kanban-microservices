package services

import (
	"authService/internal/dto"
	"authService/internal/repository"
	"authService/utils"
	"gopkg.in/mail.v2"
	"log"
	"os"
	"strconv"
)

type (
	EmailConfirmationService interface {
		Send(dto *dto.ConfirmationDTO) error
	}
	EmailConfirmationMailtrap struct {
		repository *repository.UserRepository
	}
)

func (e *EmailConfirmationMailtrap) Send(dto *dto.ConfirmationDTO) error {

	body, err := utils.Template("email.confirmation", dto)

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

func NewEmailConfirmationService() EmailConfirmationService {
	return &EmailConfirmationMailtrap{}
}
