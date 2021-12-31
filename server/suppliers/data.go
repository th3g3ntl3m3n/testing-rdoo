package suppliers

// Supplier supplier ob
type Supplier struct {
	ID      int    `json:"id,omitempty"`
	Name    string `json:"name,omitempty"`
	Image   string `json:"image,omitempty"`
	Address string `json:"address,omitempty"`
}
