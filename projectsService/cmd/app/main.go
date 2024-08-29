package main

import (
	"github.com/gin-gonic/gin"
	"projectsService/internal/config"
	"projectsService/internal/http/controllers"
	"projectsService/internal/http/middleware"
	"projectsService/internal/initialisation"
)

func main() {
	config.LoadConfig()
	db := initialisation.InitDatabase()
	initialisation.MigrateSchemas(db)
	container := initialisation.InitServiceContainer(db)

	r := gin.Default()
	r.Use(middleware.ErrorHandler())

	container.Invoke(func(projectController *controllers.ProjectController) {
		r.GET("/users/:userID/projects", projectController.GetProjects)
		r.GET("/projects/:id", projectController.GetProject)
		r.POST("/projects", projectController.CreateProject)
		r.DELETE("/projects/:id", projectController.DeleteProject)
	})

	r.Run()
}
