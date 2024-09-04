package dto

type InvitationDTO struct {
	User  *UserDTO `json:"user"`
	Token string   `json:"token"`
}
