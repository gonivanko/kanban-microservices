package routes

import (
	"gateway/internal/http/controllers"
	"github.com/gin-gonic/gin"
)

func ApiRoutes(server *gin.Engine, userController *controllers.UserProfileController) {
	api := server.Group("/api")
	{
		api.GET("/user/profile", userController.Index)
		api.POST("/projects", userController.CreateProject)
	}
}
