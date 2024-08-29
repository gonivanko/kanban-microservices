package main

import (
	"authService/internal/config"
	"authService/internal/http/controllers"
	"authService/internal/http/middleware"
	"authService/internal/initialisation"
	"authService/internal/queue"
	"authService/internal/queue/listeners"
	"github.com/gin-gonic/gin"
	"log"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	config.LoadConfig()
	db := initialisation.InitDatabase()
	container := initialisation.InitServiceContainer(db)

	rabbitMQ := queue.NewRabbitMQ()

	err := container.Invoke(func(userConfirmedEmail *listeners.UserConfirmedEmailListener) {
		rabbitMQ.RegisterConsumer("user_confirmed_email", userConfirmedEmail.Listen)
	})
	if err != nil {
		log.Fatalf(err.Error())
		return
	}

	go func() {
		if err := rabbitMQ.StartConsuming(); err != nil {
			log.Fatalf("failed to start consuming: %v", err)
		}
	}()

	r := gin.Default()
	r.Use(middleware.ErrorHandler())
	r.Use(middleware.CORSMiddleware())

	container.Invoke(func(
		userController *controllers.UserController,
	) {
		r.POST("/register", userController.Register)
		r.POST("/login", userController.Login)
		r.GET("/users/:id", userController.Show)
	})

	r.Run(":8081")

	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)
	<-sigs

	log.Println("Shutting down...")
	rabbitMQ.Shutdown()
	if err := container.Invoke(func(shutdownFunc func()) {
		shutdownFunc()
	}); err != nil {
		log.Fatalf("Error while invoking shutdown function: %v", err)
	}
}
