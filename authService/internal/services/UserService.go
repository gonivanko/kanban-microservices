package services

import (
	"authService/internal/auth/jwt"
	"authService/internal/dto"
	"authService/internal/models"
	"authService/internal/repository"
)

type UserService struct {
	repository          *repository.UserRepository
	confirmationService EmailConfirmationService
}

func NewUserService(
	repository *repository.UserRepository,
	confirmationService EmailConfirmationService,
) *UserService {
	return &UserService{
		repository:          repository,
		confirmationService: confirmationService,
	}
}

func (u *UserService) RegisterUser(email, username, password string) (*models.User, error) {
	user, err := u.repository.Create(email, username, password)
	if err != nil {
		return nil, err
	}

	token, _ := jwt.GenerateAuthToken(user)

	go u.confirmationService.Send(&dto.ConfirmationDTO{
		User:  user,
		Token: token,
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

func (u *UserService) ConfirmEmail(token string) bool {
	claims, err := jwt.ParseToken(token)
	if err != nil {
		return false
	}

	user, err := u.repository.FindByEmail(claims.Email)
	if err != nil {
		return false
	}

	user.EmailConfirmed = true
	u.repository.Update(user)

	return true
}

func (u *UserService) FindUserById(userId int) (*models.User, error) {
	return u.repository.FindById(userId)
}
