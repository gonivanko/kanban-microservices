package auth

import "github.com/golang-jwt/jwt/v5"

type UserClaims struct {
	Id       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	jwt.RegisteredClaims
}