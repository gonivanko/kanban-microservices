package jwt

import (
	auth "authService/internal/auth/claims"
	"authService/internal/models"
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"os"
	"time"
)

func GenerateAuthToken(user *models.User) (string, error) {
	claims := &auth.UserClaims{
		Username: user.Username,
		Email:    user.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(1 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    "kanban-api",
		},
	}
	return jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(os.Getenv("JWT_SECRET_KEY")))
}

func ParseToken(tokenString string) (*auth.UserClaims, error) {
	secret := []byte(os.Getenv("JWT_SECRET_KEY"))

	token, err := jwt.ParseWithClaims(tokenString, &auth.UserClaims{}, func(token *jwt.Token) (interface{}, error) {
		return secret, nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(*auth.UserClaims); ok && token.Valid {
		return claims, nil
	} else {
		return nil, fmt.Errorf("invalid token")
	}
}
