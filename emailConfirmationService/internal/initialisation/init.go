package initialisation

import (
	"authService/internal/http/controllers"
	"authService/internal/models"
	"authService/internal/repository"
	"authService/internal/services"
	"fmt"
	"go.uber.org/dig"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
	"os"
)

func InitServiceContainer(db *gorm.DB) *dig.Container {
	container := dig.New()

	// Providing database
	container.Provide(func() *gorm.DB {
		return db
	})

	container.Provide(repository.NewUserRepository)
	container.Provide(services.NewEmailConfirmationService)
	container.Provide(services.NewUserService)
	container.Provide(controllers.NewUserController)

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
	err := db.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatal("Error migrating database")
	}
}
