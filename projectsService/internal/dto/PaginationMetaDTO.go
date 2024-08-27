package dto

type PaginationMetaDTO struct {
	Page  int `json:"page"`
	Total int `json:"total"`
	Pages int `json:"pages"`
}
