package controllers

import (
	"authService/errors"
	"authService/internal/http/requests"
	"authService/internal/services"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type UserController struct {
	userService *services.UserService
}

func NewUserController(userService *services.UserService) *UserController {
	return &UserController{userService: userService}
}

func (u *UserController) Register(c *gin.Context) {
	var request requests.RegisterRequest
	if err := c.ShouldBind(&request); err != nil {
		httpError := errors.NewHttpError("Invalid data in request", err.Error(), http.StatusUnprocessableEntity)
		c.Error(httpError)
		return
	}

	user, err := u.userService.RegisterUser(request.Email, request.Username, request.Password)
	if err != nil {
		httpError := errors.NewHttpError("Failed to register user", err.Error(), http.StatusBadRequest)
		c.Error(httpError)
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

func (u *UserController) Login(c *gin.Context) {
	var request requests.LoginRequest
	if err := c.ShouldBind(&request); err != nil {
		httpError := errors.NewHttpError("Invalid data in request", err.Error(), http.StatusUnprocessableEntity)
		c.Error(httpError)
		return
	}

	token, isAuthorized := u.userService.Authenticate(request.Login, request.Password)

	if !isAuthorized {
		httpError := errors.NewHttpError(
			"Invalid credentials or email is not confirmed",
			"",
			http.StatusUnauthorized,
		)
		c.Error(httpError)
		return
	}

	c.SetCookie("token", token, 60*60*24, "/", "", false, true)

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"token":   token,
	})
}

func (u *UserController) Show(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))

	user, err := u.userService.FindUserById(id)
	if err != nil {
		httpError := errors.NewHttpError("User not found", err.Error(), http.StatusNotFound)
		c.Error(httpError)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"user": user,
	})
}
