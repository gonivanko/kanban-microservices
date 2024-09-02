package jwt

import (
	"fmt"
	auth "gateway/internal/auth/claims"
	"github.com/golang-jwt/jwt/v5"
	"os"
)

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
