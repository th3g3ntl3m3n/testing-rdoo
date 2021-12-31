package suppliers

import (
	"fmt"

	"gorm.io/gorm"
)

// SupplierRepo database operations for suppliers
type SupplierRepo interface {
	Create(supplier Supplier) (*Supplier, error)
	Delete(supplier Supplier) (bool, error)
	GetAll() ([]Supplier, error)
	Update(id int, imagePath string) (bool, error)
}

type supplierRepo struct {
	db *gorm.DB
}

func NewSupplierRepo(db *gorm.DB) supplierRepo {
	return supplierRepo{db}
}

func (obj supplierRepo) Create(supplier Supplier) (*Supplier, error) {
	if err := obj.db.Create(&supplier).Error; err != nil {
		return nil, fmt.Errorf("error while creating supplier")
	}

	return &supplier, nil
}
func (obj supplierRepo) Delete(supplier Supplier) (bool, error) {
	if err := obj.db.Delete(&supplier).Error; err != nil {
		return false, fmt.Errorf("error while creating supplier")
	}

	return true, nil
}

func (obj supplierRepo) GetAll() ([]Supplier, error) {
	var suppliers []Supplier
	if err := obj.db.Find(&suppliers).Error; err != nil {
		return nil, fmt.Errorf("error while creating supplier")
	}

	return suppliers, nil
}

func (obj supplierRepo) Update(id int, imagePath string) (bool, error) {

	if err := obj.db.Exec("UPDATE suppliers SET image = ? WHERE id = ?", imagePath, id).Error; err != nil {
		return false, fmt.Errorf("unable to update image path")
	}

	return true, nil
}
