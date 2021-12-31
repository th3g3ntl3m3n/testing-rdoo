import { MouseEventHandler } from "react"


export type Supplier = {
    id?: Number,
    name: string,
    address: string,
    image?: any,
  }

export  type SupplierListItemType = {
    supplier: Supplier
    onDelete: MouseEventHandler<HTMLDivElement>
}


export type SupplierListType = {
    suppliers: Supplier[]
  }

export type SupplierFormType = {
    addSupplier: Function
  }