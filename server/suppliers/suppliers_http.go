package suppliers

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"

	"github.com/gin-gonic/gin"
)

type handlerSupplier struct {
	svc SupplierSvc
}

func NewSupplierHttp(svc SupplierSvc, api *gin.Engine) {
	handler := handlerSupplier{svc}
	router := api.Group("/api")
	router.GET("/suppliers", handler.getSuppliers)
	router.POST("/suppliers", handler.addSupplier)
	router.DELETE("/suppliers", handler.deleteSupplier)
	router.POST("/uploadImage", handler.uploadImage)

}

func (h handlerSupplier) getSuppliers(ctx *gin.Context) {

	data, err := h.svc.GetSuppliers()
	if err != nil {
		log.Println("HEY FUCKERS", err)
	}
	ctx.JSON(200, gin.H{"data": data})
}

func (h handlerSupplier) uploadImage(ctx *gin.Context) {

	form, err := ctx.MultipartForm()
	if err != nil {
		ctx.String(http.StatusBadRequest, "bad request")
		return
	}
	image := form.File["image"][0]
	if err != nil {
		ctx.String(http.StatusBadRequest, "bad request")
		return
	}

	supID := ctx.PostForm("sup_id")
	id, err := strconv.Atoi(supID)

	if err != nil {
		log.Println("eerrrrr", err)
	}

	image.Filename = fmt.Sprintf("RandomFile-%d%s", id, filepath.Ext(image.Filename))
	path := "images/" + image.Filename
	if err := os.Remove(path); err != nil {
		log.Println("Eerr", err)
	}
	ctx.SaveUploadedFile(image, path)

	updated, err := h.svc.UpdateSupplier(id, path)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"data": err})
		return
	}

	if !updated {
		ctx.JSON(http.StatusInternalServerError, gin.H{"data": updated})
		return
	}

	ctx.JSON(200, gin.H{"data": path})
}

func (h handlerSupplier) addSupplier(ctx *gin.Context) {

	var reqOb Supplier
	if err := ctx.BindJSON(&reqOb); err != nil {
		ctx.String(http.StatusBadRequest, "bad request")
		return
	}

	reqOb.Image = "RandomImage.png"

	data, err := h.svc.AddSupplier(reqOb)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"data": err})
		return
	}

	ctx.JSON(200, gin.H{"data": data})
}

func (h handlerSupplier) deleteSupplier(ctx *gin.Context) {
	var reqOb Supplier
	if err := ctx.BindJSON(&reqOb); err != nil {
		ctx.String(http.StatusBadRequest, "bad request")
		return
	}

	_, err := h.svc.DeleteSupplier(reqOb)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"data": err})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"data": "Done"})
}
