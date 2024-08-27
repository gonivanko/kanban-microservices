package main

import (
	"authService/internal/config"
	"authService/internal/http/controllers"
	"authService/internal/http/middleware"
	"authService/internal/initialisation"
	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadConfig()
	db := initialisation.InitDatabase()
	container := initialisation.InitServiceContainer(db)

	r := gin.Default()
	r.Use(middleware.ErrorHandler())
	r.Use(middleware.CORSMiddleware())

	container.Invoke(func(
		userController *controllers.UserController,
	) {
		r.POST("/register", userController.Register)
		r.POST("/login", userController.Login)
		r.GET("/confirm", userController.ConfirmEmail)
		r.GET("/users/:id", userController.Show)
	})

	r.Run(":8081")
}
