package requests

type ProjectCreateRequest struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description" binding:"required"`
	OwnerId     uint   `json:"owner_id"`
}
