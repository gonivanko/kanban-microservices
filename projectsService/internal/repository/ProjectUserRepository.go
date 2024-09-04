package repository

import (
	"gorm.io/gorm"
	"projectsService/internal/database/models"
)

type ProjectUserRepository struct {
	db *gorm.DB
}

func (p *ProjectUserRepository) Create(model *models.ProjectUser) (*models.ProjectUser, error) {
	return model, p.db.Create(model).Error
}

func NewProjectUserRepository(db *gorm.DB) *ProjectUserRepository {
	return &ProjectUserRepository{db: db}
}
