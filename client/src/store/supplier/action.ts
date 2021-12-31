import API from "../../API"
import { Supplier } from "../../components/supplier/Types"
import { LOAD, GET, DEL, ADD } from "./types"


export const get = () => (dispatch: any) => {
    dispatch({type: LOAD})
    API.get().then(data => dispatch({type: GET, payload: data}))
}

export const del = (sup: Supplier) => (dispatch : any, getState: any) => {
    const suppliers = getState().suppliers;
    dispatch({type: LOAD})
    API.delete(sup).then(data => {
        dispatch({type: DEL, payload: data === "Done" ? sup.id : -1})        
    })
}

export const add = (sup: Supplier, image: FormData) => (dispatch: any) => {
    dispatch({type: LOAD})
    API.add(sup, image).then(data => dispatch({type: ADD, payload: data}))
}