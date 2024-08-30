package repository

import (
	"example.com/internal/auth/jwt"
	"example.com/internal/dto"
	"example.com/internal/models"
	"gorm.io/gorm"
	"time"
)

type EmailLogRepository struct {
	db *gorm.DB
}

func NewEmailLogRepository(db *gorm.DB) *EmailLogRepository {
	return &EmailLogRepository{db: db}
}

func (e *EmailLogRepository) CreateRecord(user *dto.User) (*models.EmailLog, error) {
	token, _ := jwt.GenerateAuthToken(user)
	record := models.EmailLog{
		Email:      user.Email,
		Token:      token,
		ExpireTime: time.Now().AddDate(0, 0, 1),
		Used:       false,
	}

	return &record, e.db.Create(&record).Error
}

func (e *EmailLogRepository) ConfirmEmail(record *models.EmailLog) error {
	record.Used = true
	return e.db.Save(record).Error
}

func (e *EmailLogRepository) FindByEmail(email string) (*models.EmailLog, error) {
	var record models.EmailLog
	err := e.db.Where("email = ?", email).First(&record).Error
	return &record, err
}
