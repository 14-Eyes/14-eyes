import client from "./client";

const getProduct = (barcode) => {
  const productURL = "/v0/product/" + barcode.data + ".json";

  return client.get(productURL);
};

export default {
  getProduct,
};
