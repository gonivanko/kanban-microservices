package middleware

import (
	"errors"
	"fmt"
	"gateway/internal/auth/jwt"
	"gateway/internal/cache"
	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
	"log"
	"net/http"
	"strings"
	"time"
)

func AuthRequired(cache *cache.RedisCache) gin.HandlerFunc {
	return func(c *gin.Context) {

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
			return
		}

		authHeader := c.Request.Header.Get("Authorization")
		fmt.Println(authHeader)
		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"code":    http.StatusUnauthorized,
			})
			return
		}

		token := strings.TrimPrefix(authHeader, "Bearer ")
		if token == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"code":    http.StatusUnauthorized,
			})
			return
		}

		claims, err := jwt.ParseToken(token)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"code":    http.StatusUnauthorized,
				"message": err.Error(),
			})
			return
		}

		_, err = cache.Get(token)
		if !errors.Is(err, redis.Nil) {
			log.Println("Skipping http request to get user info")
			c.Set("userId", claims.Id)
			c.Next()
			return
		}

		data, err := http.Get(fmt.Sprintf("http://localhost:8081/users/%d", claims.Id))
		log.Println("Making http request to get user info")
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"code":    http.StatusUnauthorized,
				"message": err.Error(),
			})

			return
		}

		defer data.Body.Close()

		if data.StatusCode != http.StatusOK {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"code":    http.StatusUnauthorized,
				"message": http.StatusText(data.StatusCode),
			})

			return
		}

		cache.Set(token, true, time.Until(claims.ExpiresAt.Time))
		c.Set("userId", claims.Id)
		c.Next()
	}
}
