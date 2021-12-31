package main

import (
	"fmt"
	"log"

	sup "trd/suppliers"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Supplier struct {
	ID      int    `json:"id,omitempty"`
	Name    string `json:"name,omitempty"`
	Image   string `json:"image,omitempty"`
	Address string `json:"address,omitempty"`
}

func main() {

	db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
	if err != nil {
		log.Println("ERR DB CONNECT", err)
	}

	api := gin.Default()
	api.Use(static.Serve("/", static.LocalFile("./dist", true)))

	api.Static("/images", "./images")
	api.GET("/", func(c *gin.Context) {
		c.File("dist/index.html")
	})
	supplierRepo := sup.NewSupplierRepo(db)
	supplierSvc := sup.NewSupplierSvc(supplierRepo)
	sup.NewSupplierHttp(supplierSvc, api)

	if err := api.Run(":9898"); err != nil {
		fmt.Errorf("error in starting server %v", err)
	}
}
