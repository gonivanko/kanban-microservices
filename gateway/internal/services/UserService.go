package services

import (
	"gateway/internal/dto"
	"gateway/internal/external"
)

type UserService struct {
	userGetter    external.UserGetter
	projectGetter external.ProjectGetter
}

func NewUserService(
	userGetter external.UserGetter,
	projectGetter external.ProjectGetter,
) *UserService {
	return &UserService{
		userGetter:    userGetter,
		projectGetter: projectGetter,
	}
}

func (u *UserService) GetUserProfileData(userId int) (*dto.UserProfileDTO, error) {
	user, err := u.userGetter.Get(userId)

	if err != nil {
		return nil, err
	}

	projects, err := u.projectGetter.GetAll(userId)
	if err != nil {
		return nil, err
	}

	return &dto.UserProfileDTO{
		User:     user,
		Projects: projects,
	}, nil
}
