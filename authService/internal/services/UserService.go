package services

import (
	"authService/internal/auth/jwt"
	"authService/internal/dto"
	"authService/internal/models"
	"authService/internal/queue"
	"authService/internal/repository"
)

type UserService struct {
	repository *repository.UserRepository
	sender     *queue.RabbitMQSender
}

func NewUserService(
	repository *repository.UserRepository,
	sender *queue.RabbitMQSender,
) *UserService {
	return &UserService{
		repository: repository,
		sender:     sender,
	}
}

func (u *UserService) RegisterUser(email, username, password string) (*models.User, error) {
	user, err := u.repository.Create(email, username, password)
	if err != nil {
		return nil, err
	}

	u.sender.Send("user_registered", &dto.UserRegisteredDTO{
		Username: user.Username,
		Email:    user.Email,
	})

	return user, nil
}

func (u *UserService) Authenticate(email, password string) (string, bool) {
	user, err := u.repository.FindByEmail(email)
	if err != nil {
		return "", false
	}

	if !user.CheckPassword(password) {
		return "", false
	}

	if !user.EmailConfirmed {
		return "", false
	}

	token, _ := jwt.GenerateAuthToken(user)

	return token, true
}

func (u *UserService) FindUserById(userId int) (*models.User, error) {
	return u.repository.FindById(userId)
}
