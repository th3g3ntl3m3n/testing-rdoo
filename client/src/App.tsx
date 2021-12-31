import { useEffect, useState } from "react";
import "./App.css";
import API from "./API";
import { Wrapper, FlexRow, Container, Header } from "./components/layout";
import { SupplierForm } from "./components/supplier/Form";
import { SupplierList } from "./components/supplier/List";
import { Supplier } from "./components/supplier/Types";
import {
  RootStateOrAny,
  shallowEqual,
  useDispatch,
  useSelector,
} from "react-redux";
import { add, get } from "./store/supplier/action";

function App() {
  const { suppliers }: any = useSelector<RootStateOrAny>(
    (store) => store.suppliers,
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get());
  }, []);

  const handleSetSupplier = (supplier: Supplier) => {
    let newSupplierImage = new FormData();
    newSupplierImage.append("image", supplier.image);
    dispatch(
      add({ name: supplier.name, address: supplier.address }, newSupplierImage)
    );
  };

  return (
    <Wrapper>
      <FlexRow>
        <Container>
          <Header>
            <strong>Suppliers [{suppliers.length}]</strong>
          </Header>
          <SupplierList suppliers={suppliers} />
        </Container>
        <SupplierForm
          addSupplier={(supplier: Supplier) => handleSetSupplier(supplier)}
        />
      </FlexRow>
    </Wrapper>
  );
}
export default App;
