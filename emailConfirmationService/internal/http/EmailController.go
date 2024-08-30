package http

import (
	"example.com/internal/services"
	"github.com/gin-gonic/gin"
	"net/http"
)

type EmailController struct {
	service *services.ConfirmationService
}

func (e *EmailController) Confirm(c *gin.Context) {
	token := c.DefaultQuery("token", "")

	_, err := e.service.Confirm(token)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Email confirmed",
	})
}

func NewEmailController(service *services.ConfirmationService) *EmailController {
	return &EmailController{service: service}
}
