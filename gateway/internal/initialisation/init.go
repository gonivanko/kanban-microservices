package initialisation

import "github.com/redis/go-redis/v9"

func initCache() *redis.Client {
	return redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
}
