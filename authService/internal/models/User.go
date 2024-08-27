package models

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"log"
)

type User struct {
	gorm.Model
	Username       string `json:"username"`
	Email          string `json:"email"`
	PasswordHash   string `json:"-"`
	EmailConfirmed bool   `json:"email_confirmed"`
}

func (u *User) SetPassword(password string) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalf("Failed to generate password hash: %v", err)
	}

	u.PasswordHash = string(hash)
}

func (u *User) CheckPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.PasswordHash), []byte(password))
	if err != nil {
		return false
	}

	return true
}
