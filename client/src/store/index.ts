import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { InitSupplierType, supplierReducer } from "./supplier/reducer";

type RootRecuderType = {
    suppliers: InitSupplierType
}

const rootReducer = combineReducers<RootRecuderType>({
    suppliers: supplierReducer
})

export default createStore(rootReducer, applyMiddleware(thunk))