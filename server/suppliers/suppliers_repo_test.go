package suppliers

import (
	"log"
	"testing"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func InitSerivce() supplierRepo {

	db, _ := gorm.Open(sqlite.Open("testing.db"), &gorm.Config{})
	initSql := `
		DROP TABLE IF EXISTS suppliers;

		CREATE TABLE suppliers (
			id INTEGER NOT NULL PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			image VARCHAR(255) NOT NULL,
			address VARCHAR(255) NOT NULL
		);
	`
	err := db.Exec(initSql).Error
	if err != nil {
		log.Println(err)
	}
	return NewSupplierRepo(db)
}

func TestCreate(t *testing.T) {
	supSvc := InitSerivce()
	newSup, _ := supSvc.Create(Supplier{
		Name:    "Vikas",
		Image:   "RandomFile.png",
		Address: "New Address",
	})

	if newSup.ID != 1 {
		t.Errorf("error in create test")
	}
}
