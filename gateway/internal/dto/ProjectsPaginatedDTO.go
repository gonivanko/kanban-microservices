package dto

type ProjectsPaginatedDTO struct {
	Projects   []*ProjectDTO      `json:"paginated"`
	Pagination *PaginationMetaDTO `json:"pagination"`
}
