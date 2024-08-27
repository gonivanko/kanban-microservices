package repository

import (
	"authService/internal/models"
	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (u *UserRepository) Create(email, username, password string) (*models.User, error) {
	user := &models.User{
		Username: username,
		Email:    email,
	}

	user.SetPassword(password)
	result := u.db.Create(user)

	return user, result.Error
}

func (u *UserRepository) Update(user *models.User) (*models.User, error) {
	result := u.db.Save(user)
	return user, result.Error
}

func (u *UserRepository) FindByEmail(email string) (*models.User, error) {
	var user models.User
	result := u.db.Where("email = ?", email).First(&user)
	return &user, result.Error
}
