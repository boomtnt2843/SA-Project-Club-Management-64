package main

import (
	"github.com/boomertnt210943/my-app/controller"
	"github.com/boomertnt210943/my-app/entity"
	"github.com/boomertnt210943/my-app/middlewares"
	"github.com/gin-gonic/gin"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			//Student Council Router
			protected.GET("/studentCouncils", controller.ListStudentCouncils)
			protected.GET("/studentCouncil/:id", controller.GetStudentCouncil)
			protected.GET("/studentCouncil/find_with_studentID/:ID_Student", controller.GetStudentCouncilWithStudentID)
			protected.PATCH("/studentCouncils", controller.UpdataStudentCouncil)
			protected.DELETE("/studentCouncils/:id", controller.DeleteStudentCouncil)

			//type Club Router
			protected.GET("/typeClubs", controller.ListTypeClubs)
			protected.GET("/typeClub/:id", controller.GetTypeClub)
			protected.POST("/typeClubs", controller.CreateTypeClub)
			protected.PATCH("/typeClubs", controller.UpdataTypeClub)
			protected.DELETE("/typeClubs/:id", controller.DeleteTypeClub)

			//teacher Router
			protected.GET("/teachers", controller.ListTeachers)
			protected.GET("/teacher/:id", controller.GetTeacher)
			protected.POST("/teachers", controller.CreateTeacher)
			protected.PATCH("/teachers", controller.UpdataTeacher)
			protected.DELETE("teachers/:id", controller.DeleteTeacher)

			//club Router
			protected.GET("/clubs", controller.ListClubs)
			protected.GET("/club/:id", controller.GetClub)
			protected.POST("/clubs", controller.CreateClub)
			protected.PATCH("/clubs", controller.UpdataClub)
			protected.DELETE("/clubs/:id", controller.DeleteClub)
		}
	}
	// User Routes
	r.POST("/studentCouncils", controller.CreateStudentCouncil)

	// Authentication Routes
	r.POST("/login", controller.Login)

	//run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}