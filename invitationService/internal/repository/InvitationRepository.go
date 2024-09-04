package repository

import (
	"crypto/rand"
	"encoding/hex"
	"gorm.io/gorm"
	"invitationService/internal/models"
)

type InvitationRepository struct {
	db *gorm.DB
}

func generateInviteToken() (string, error) {
	token := make([]byte, 32)
	_, err := rand.Read(token)
	if err != nil {
		return "", err
	}

	return hex.EncodeToString(token), nil
}

func (i *InvitationRepository) Create(invitation *models.Invitation) (*models.Invitation, error) {
	token, err := generateInviteToken()
	if err != nil {
		return nil, err
	}

	invitation.Token = token
	invitation.Status = "sent"
	result := i.db.Create(invitation)
	return invitation, result.Error
}

func (i *InvitationRepository) UpdateStatus(invitation *models.Invitation, status string) (*models.Invitation, error) {
	invitation.Status = status
	return invitation, i.db.Save(invitation).Error
}

func (i *InvitationRepository) GetByToken(token string) (*models.Invitation, error) {
	invitation := &models.Invitation{}
	result := i.db.Where("token = ?", token).Order("created_at desc").First(&invitation)
	return invitation, result.Error
}

func NewInvitationRepository(db *gorm.DB) *InvitationRepository {
	return &InvitationRepository{db: db}
}
