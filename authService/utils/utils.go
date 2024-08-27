package utils

import (
	"bytes"
	"html/template"
	"log"
	"path/filepath"
	"strings"
)

func Template(templateName string, data interface{}) (string, error) {
	templatePathSplit := strings.Split(templateName, ".")
	templatePath := templatePathSplit[:len(templatePathSplit)-1]
	confirmationTemplate, err := template.ParseFiles(
		filepath.Join(
			"internal",
			"resources",
			"templates",
			strings.Join(templatePath, "/"),
			templatePathSplit[len(templatePathSplit)-1]+".html",
		),
	)

	if err != nil {
		log.Println(err)
		return "", err
	}

	var body bytes.Buffer
	if err := confirmationTemplate.Execute(&body, data); err != nil {
		log.Println(err)
		return "", err
	}

	return body.String(), nil
}
