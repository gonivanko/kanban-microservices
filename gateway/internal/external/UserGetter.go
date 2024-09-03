package external

import (
	"encoding/json"
	"fmt"
	"gateway/internal/dto"
	"io/ioutil"
	"net/http"
)

type UserGetter interface {
	Get(id int) (*dto.UserDTO, error)
}

type UserGetterAPI struct{}

func (u UserGetterAPI) Get(id int) (*dto.UserDTO, error) {
	result, err := http.Get(fmt.Sprintf("http://localhost:8081/users/%d", id))
	if err != nil {
		return nil, err
	}

	defer result.Body.Close()

	jsonBytes, err := ioutil.ReadAll(result.Body)
	if err != nil {
		return nil, err
	}

	fmt.Println(string(jsonBytes))

	var user dto.UserDTO
	err = json.Unmarshal(jsonBytes, &user)
	fmt.Println(user)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func NewUserGetterAPI() UserGetter {
	return &UserGetterAPI{}
}
