import React, { useState } from "react";
import styled from "styled-components";
import { Supplier, SupplierFormType } from "./Types";

const SupplierFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin: 5px;
  margin-left: 15px;
  background-color: white;
  box-shadow: 0px 3px 30px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 0px 1em;
`;

const Input = styled.input`
  margin-bottom: 5px;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 1em;
  font-size: 1em;
  outline: none;
`;

let supplierInit: Supplier = { name: "", address: "", image: "" };

const valueValidator = (value: string) => {
  let reg = /^([a-zA-Z0-9 _-]+)$/;
  return reg.test(value);
};

export const SupplierForm = ({ addSupplier }: SupplierFormType) => {
  const [supplier, setSupplier] = useState<Supplier>(supplierInit);
  const eb = React.useRef<HTMLInputElement>(null);
  return (
    <SupplierFormContainer
      onSubmit={(e) => {
        e.preventDefault();
        if (
          supplier.name.length === 0 &&
          supplier.address.length === 0 &&
          supplier.image.length === 0
        ) {
          alert(
            "Please fill name, address and select a image to add a supplier"
          );
          return;
        }

        if (
          !valueValidator(supplier.name) ||
          !valueValidator(supplier.address)
        ) {
          alert("can only insert characters and numeric values");
          return;
        }

        addSupplier(supplier);
        setSupplier(supplierInit);
        if (eb.current) {
          eb.current.value = "";
        }
      }}
    >
      <h3>Add new supplier</h3>
      <Input
        required={true}
        placeholder="Type supplier name here"
        value={supplier.name}
        type="text"
        onChange={(e) =>
          setSupplier((old) => ({ ...old, name: e.target.value }))
        }
      />
      <Input
        ref={eb}
        required={true}
        placeholder="select supplier photo here"
        accept="image/jpeg, image/png"
        type="file"
        onChange={(e) => {
          let image = e.target.files ? e.target.files[0] : "";
          setSupplier((old: Supplier) => ({ ...old, image }));
        }}
      />
      <Input
        required={true}
        placeholder="Type supplier address here"
        value={supplier.address}
        type="text"
        onChange={(e) =>
          setSupplier((old) => ({ ...old, address: e.target.value }))
        }
      />
      <Input type="submit" value="Submit" />
    </SupplierFormContainer>
  );
};
