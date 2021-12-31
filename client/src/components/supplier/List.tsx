import React from "react";
import { useDispatch } from "react-redux";
import API from "../../API";
import { del } from "../../store/supplier/action";
import { SupplierListItem } from "./ListItem";
import { Supplier, SupplierListType } from "./Types";

export const SupplierList = ({ suppliers }: SupplierListType) => {
  const dispatch = useDispatch();
  const handleOnDelete = (sup: Supplier) => {
    dispatch(del(sup));
  };
  return (
    <div style={{ overflow: "scroll", padding: "0px 1em" }}>
      {suppliers.map((sup: Supplier) => (
        <SupplierListItem
          key={sup.id + "Hello"}
          supplier={sup}
          onDelete={() => handleOnDelete(sup)}
        />
      ))}
    </div>
  );
};
