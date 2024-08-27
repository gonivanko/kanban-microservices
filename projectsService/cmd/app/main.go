package main

import (
	"github.com/gin-gonic/gin"
	"log"
	"projectsService/internal/config"
	"projectsService/internal/http/controllers"
	"projectsService/internal/http/middleware"
	"projectsService/internal/initialisation"
)

func main() {
	config.LoadConfig()
	db := initialisation.InitDatabase()
	container := initialisation.InitServiceContainer(db)

	r := gin.Default()
	r.Use(middleware.ErrorHandler())

	err := container.Invoke(func(projectController *controllers.ProjectController) {
		r.GET("/projects", projectController.GetProjects)
		r.GET("/projects/:id", projectController.GetProject)
		r.POST("/projects", projectController.CreateProject)
		r.DELETE("/projects/:id", projectController.DeleteProject)
	})
	if err != nil {
		log.Fatal(err)
		return
	}

	r.Run()
}
