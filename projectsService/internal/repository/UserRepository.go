package repository

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"projectsService/internal/dto"
)

type UserGetter interface {
	GetUser(userID uint) (*dto.UserDTO, error)
}

type UserGetterImpl struct {
	baseURL string
}

func NewUserGetter() UserGetter {
	return &UserGetterImpl{
		baseURL: os.Getenv("AUTH_SERVICE_URL"),
	}
}

func (u UserGetterImpl) GetUser(userID uint) (*dto.UserDTO, error) {
	url := fmt.Sprintf("%s/users/%d", u.baseURL, userID)
	resp, err := http.Get(url)
	if err != nil {
		return nil, errors.New("failed to get user: " + err.Error())
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusNotFound {
		return nil, errors.New("user not found")
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, errors.New("failed to read response body: " + err.Error())
	}

	var user dto.UserDTO
	if err := json.Unmarshal(body, &user); err != nil {
		return nil, errors.New("failed to unmarshal user data: " + err.Error())
	}

	return &user, nil
}
