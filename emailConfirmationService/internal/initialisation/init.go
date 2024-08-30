package initialisation

import (
	"example.com/internal/http"
	"example.com/internal/models"
	"example.com/internal/queue"
	"example.com/internal/queue/listeners"
	"example.com/internal/repository"
	"example.com/internal/services"
	"fmt"
	"go.uber.org/dig"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
	"os"
)

func InitServiceContainer(db *gorm.DB) *dig.Container {
	container := dig.New()

	container.Provide(func() *gorm.DB {
		return db
	})
	container.Provide(repository.NewEmailLogRepository)
	container.Provide(queue.NewRabbitMQSender)
	container.Provide(services.NewConfirmationService)
	container.Provide(services.NewEmailConfirmationService)
	container.Provide(listeners.NewUserRegisteredListener)

	container.Provide(func(sender *queue.RabbitMQSender) func() {
		return func() {
			log.Println("Shutting down RabbitMQSender...")
			sender.Shutdown()
		}
	})

	container.Provide(http.NewEmailController)

	return container
}

func InitDatabase() *gorm.DB {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true&loc=Local",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Error connecting to database")
	}

	return db
}

func MigrateSchemas(db *gorm.DB) {
	err := db.AutoMigrate(&models.EmailLog{})
	if err != nil {
		log.Fatal("Error migrating database")
	}
}
