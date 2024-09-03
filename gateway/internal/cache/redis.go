package cache

import (
	"context"
	"errors"
	"fmt"
	"github.com/redis/go-redis/v9"
	"time"
)

type RedisCache struct {
	redis   *redis.Client
	context context.Context
}

func NewRedisCache(redis *redis.Client) *RedisCache {
	return &RedisCache{
		redis:   redis,
		context: context.Background(),
	}
}

func (rc *RedisCache) Set(key string, value interface{}, expiration time.Duration) error {
	return rc.redis.Set(rc.context, key, value, expiration).Err()
}

func (rc *RedisCache) Get(key string) (interface{}, error) {
	return rc.redis.Get(rc.context, key).Result()
}

func (rc *RedisCache) Remember(key string, ttl time.Duration, callback func() interface{}) (interface{}, error) {
	value, err := rc.redis.Get(rc.context, key).Result()
	if errors.Is(err, redis.Nil) {
		if err := rc.redis.Set(rc.context, key, callback(), ttl).Err(); err != nil {
			return nil, fmt.Errorf("redis set error: %w", err)
		}
		return callback(), nil
	}

	if err != nil {
		return nil, fmt.Errorf("redis get error: %w", err)
	}

	return value, nil
}
