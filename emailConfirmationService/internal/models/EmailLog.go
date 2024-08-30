package models

import (
	"gorm.io/gorm"
	"time"
)

type EmailLog struct {
	gorm.Model
	Email      string    `json:"email"`
	Token      string    `json:"token"`
	ExpireTime time.Time `json:"expire_time"`
	Used       bool      `json:"used"`
}
