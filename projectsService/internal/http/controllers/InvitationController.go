package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"projectsService/internal/database/models"
	"projectsService/internal/errors"
	"projectsService/internal/services"
)

type InvitationController struct {
	service *services.InvitationService
}

func (i *InvitationController) InviteUser(c *gin.Context) {
	var projectUser models.ProjectUser
	if err := c.ShouldBindJSON(&projectUser); err != nil {
		httpError := errors.NewHttpError("Invalid json body", err.Error(), http.StatusBadRequest)
		c.Error(httpError)
		return
	}

	err := i.service.InviteUser(&projectUser)
	if err != nil {
		httpError := errors.NewHttpError("Failed to invite user", err.Error(), http.StatusInternalServerError)
		c.Error(httpError)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Invite successfully sent. Please wait for user to accept invitation",
	})
}

func NewInvitationController(service *services.InvitationService) *InvitationController {
	return &InvitationController{service: service}
}
