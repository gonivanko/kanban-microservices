package services

import (
	"bytes"
	"encoding/json"
	"gateway/internal/dto"
	"gateway/internal/http/requests"
	"io/ioutil"
	"net/http"
)

type ProjectService struct{}

func (p *ProjectService) CreateProject(payload *requests.ProjectCreateRequest) (*dto.ProjectDTO, error) {
	jsonData, err := json.Marshal(payload)
	if err != nil {
		return nil, err
	}

	resp, err := http.Post(
		"http://localhost:8082/projects",
		"application/json",
		bytes.NewBuffer(jsonData),
	)

	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var project dto.ProjectDTO
	err = json.Unmarshal(body, &project)
	if err != nil {
		return nil, err
	}
	return &project, nil
}

func NewProjectService() *ProjectService {
	return &ProjectService{}
}
