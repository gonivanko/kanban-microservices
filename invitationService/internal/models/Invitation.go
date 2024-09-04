package models

import "gorm.io/gorm"

type Invitation struct {
	gorm.Model
	UserID    int    `json:"user_id"`
	ProjectID uint   `json:"project_id"`
	Token     string `json:"token"`
	Status    string `json:"status"`
}
