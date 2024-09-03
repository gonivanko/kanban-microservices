package dto

type UserProfileDTO struct {
	User     *UserDTO              `json:"user"`
	Projects *ProjectsPaginatedDTO `json:"projects"`
}
