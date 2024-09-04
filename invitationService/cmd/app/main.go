package main

import (
	"github.com/gin-gonic/gin"
	"invitationService/internal/config"
	"invitationService/internal/http/controllers"
	"invitationService/internal/initialisation"
	"invitationService/internal/queue"
	"invitationService/internal/queue/listeners"
	"log"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	config.LoadConfig()
	db := initialisation.InitDatabase()
	initialisation.MigrateSchemas(db)
	container := initialisation.InitServiceContainer(db)

	rabbitMQ := queue.NewRabbitMQ()

	err := container.Invoke(func(userRegisteredListener *listeners.UserInvitedListener) {
		rabbitMQ.RegisterConsumer("user_invite", userRegisteredListener.Listen)
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
	container.Invoke(func(invitationController *controllers.InvitationConfirmationController) {
		r.GET("/confirm", invitationController.ConfirmInvitation)
	})

	r.Run(":8083")

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
