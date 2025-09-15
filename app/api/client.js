import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://us.openfoodfacts.org/api",
  headers: {
    "User-Agent": "ELTRApp - Android/IOS - Version 0.0",
  },
});

export default apiClient;
