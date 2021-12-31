import { Supplier } from "../components/supplier/Types";

const fileUploadApi = (data: FormData) => {
  return fetch("/api/uploadImage", {
    method:"POST",
    body: data,
  }).then(data => data.json()).then(data => data.data)
}

type ReqType = {
  url: string,
  method: string,
  data: any,
};
const fetchApi = ({ url, method, data }: ReqType) => {
  let config = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (method !== "GET") {
    return fetch(url, {...config, body: JSON.stringify(data)}).then((data) => data.json());
  }
  return fetch(url, config).then((data) => data.json());
};

const API = {
  get: () =>
    fetchApi({ url: "/api/suppliers", method: "GET", data: {} }).then(
      ({ data }) => data
    ),
  add: async (sup: Supplier, formImage: FormData) => {
      const {data} = await fetchApi({ url: "/api/suppliers", method: "POST", data: sup })
      formImage.append("sup_id", data.id)
      const imageUrl = await fileUploadApi(formImage)
      return { ...data, image: imageUrl}
  },
  edit: (sup: Supplier) =>
    fetchApi({ url: "/api/suppliers", method: "PUT", data: sup }).then(
      ({ data }) => data
    ),
  delete: (sup: Supplier) =>
    fetchApi({ url: "/api/suppliers", method: "DELETE", data: sup }).then(
      ({ data }) => data
    ),
};

export default API;
