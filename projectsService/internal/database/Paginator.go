package database

import "gorm.io/gorm"

type Paginator struct {
	db *gorm.DB
}

func NewPaginator(db *gorm.DB) *Paginator {
	return &Paginator{db: db}
}

func (p *Paginator) Paginate(page, limit int) *gorm.DB {
	return p.db.Limit(limit).Offset((page - 1) * limit)
}
