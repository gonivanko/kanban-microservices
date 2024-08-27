package services

import (
	"errors"
	"projectsService/internal/database/models"
	"projectsService/internal/dto"
	"projectsService/internal/repository"
)

type ProjectsService struct {
	repository *repository.ProjectDatabaseRepository
}

func (p *ProjectsService) Paginate(page, limit int) ([]models.Project, dto.PaginationMetaDTO, error) {
	data, total, err := p.repository.Paginate(page, limit)
	if err != nil {
		return nil, dto.PaginationMetaDTO{}, errors.New("paginate error:" + err.Error())
	}

	meta := dto.PaginationMetaDTO{
		Total: total,
		Page:  page,
		Pages: (total + limit - 1) / limit,
	}

	return data, meta, nil
}

func (p *ProjectsService) Create(project *models.Project) (*models.Project, error) {
	return p.repository.Create(project)
}

func (p *ProjectsService) Delete(id int) (*models.Project, error) {
	project, err := p.repository.FindProjectById(id)
	if err != nil {
		return nil, err
	}

	return p.repository.Delete(project)
}

func (p *ProjectsService) Find(id int) (*models.Project, error) {
	return p.repository.FindProjectById(id)
}

func NewProjectsService(repository *repository.ProjectDatabaseRepository) *ProjectsService {
	return &ProjectsService{repository: repository}
}
