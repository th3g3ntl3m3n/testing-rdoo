import { GET, ADD, DEL, LOAD } from "./types";

export type InitSupplierType = {
    suppliers: [],
    loading: boolean
}

const InitSuppliers = {
    suppliers: [],
    loading: false,
}

export const supplierReducer = (state = InitSuppliers, action: any) => {
    switch(action.type) {
        case GET:
            return {...state, suppliers: action.payload, loading: false};
        case ADD:
            return {...state, loading: false, suppliers: [...state.suppliers, action.payload]}
        case DEL:
            return {...state, loading: false, suppliers: state.suppliers.filter((sup:any) => sup.id !== action.payload)}
        case LOAD:
            return {...state, loading: true}
        default:
            return state;
    }
}