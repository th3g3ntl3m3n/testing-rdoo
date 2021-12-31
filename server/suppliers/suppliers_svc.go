package suppliers

type SupplierSvc interface {
	AddSupplier(supplier Supplier) (*Supplier, error)
	DeleteSupplier(supplier Supplier) (bool, error)
	GetSuppliers() ([]Supplier, error)
	UpdateSupplier(id int, imagePath string) (bool, error)
}

type supplierSvc struct {
	repo SupplierRepo
}

func NewSupplierSvc(repo SupplierRepo) supplierSvc {
	return supplierSvc{repo}
}

func (svc supplierSvc) AddSupplier(supplier Supplier) (*Supplier, error) {
	return svc.repo.Create(supplier)
}
func (svc supplierSvc) DeleteSupplier(supplier Supplier) (bool, error) {
	return svc.repo.Delete(supplier)
}
func (svc supplierSvc) GetSuppliers() ([]Supplier, error) {
	return svc.repo.GetAll()
}
func (svc supplierSvc) UpdateSupplier(id int, imagePath string) (bool, error) {
	return svc.repo.Update(id, imagePath)
}
