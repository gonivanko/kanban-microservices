package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"projectsService/internal/database/models"
	"projectsService/internal/errors"
	"projectsService/internal/services"
	"strconv"
)

type ProjectController struct {
	service *services.ProjectsService
}

func (p *ProjectController) GetProjects(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	paginated, meta, err := p.service.Paginate(page, limit)
	if err != nil {
		httpError := errors.NewHttpError("Failed to apply pagination", err.Error(), http.StatusBadRequest)
		c.Error(httpError)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"paginated":  paginated,
		"pagination": meta,
	})
}

func (p *ProjectController) GetProject(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	project, err := p.service.Find(id)
	if err != nil {
		httpError := errors.NewHttpError("Project not found", err.Error(), http.StatusNotFound)
		c.Error(httpError)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"project": project,
	})
}

func (p *ProjectController) CreateProject(c *gin.Context) {
	var project models.Project
	if err := c.ShouldBindJSON(&project); err != nil {
		httpError := errors.NewHttpError("Invalid json body", err.Error(), http.StatusBadRequest)
		c.Error(httpError)
		return
	}

	_, err := p.service.Create(&project)
	if err != nil {
		c.Error(err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"project": project,
	})
}

func (p *ProjectController) DeleteProject(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	project, err := p.service.Delete(id)
	if err != nil {
		httpError := errors.NewHttpError("Project not found", err.Error(), http.StatusNotFound)
		c.Error(httpError)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"project": project,
	})
}

func NewProjectController(service *services.ProjectsService) *ProjectController {
	return &ProjectController{service: service}
}
