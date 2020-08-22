import {
  PRODUCT_LIST,
  PRODUCT_CATEGORY_LIST,
  PRODUCT_CATEGORY_CREATE,
  PRODUCT_CATEGORY_REMOVE,
  PRODUCT_VARIANT_LIST,
  PRODUCT_CREATE,
  PRODUCT_REMOVE,
  PRODUCT_VARIANT,
  PRODUCT_VARIANT_CREATE,
  PRODUCT_UPDATE,
  PRODUCT_VARIANT_UPDATE,
  PRODUCT_LIST_UNQUOTED,
  PRODUCT_VARIANT_UNQUOTED,
  PRODUCT_VARIANT_REMOVE,
} from "../../types/types";

export function productList(data) {
  return {
    type: PRODUCT_LIST,
    payload: data,
  };
}
export function productCategoryListing(data) {
  return {
    type: PRODUCT_CATEGORY_LIST,
    payload: data,
  };
}
export function createProductCategory(data) {
  return {
    type: PRODUCT_CATEGORY_CREATE,
    payload: data,
  };
}
export function removeProductCategory(data) {
  return {
    type: PRODUCT_CATEGORY_REMOVE,
    payload: data,
  };
}
export function createProduct(data) {
  return {
    type: PRODUCT_CREATE,
    payload: data,
  };
}
export function productVariantList(data) {
  return {
    type: PRODUCT_VARIANT_LIST,
    payload: data,
  };
}
export function removeProduct(data) {
  return {
    type: PRODUCT_REMOVE,
    payload: data,
  };
}
export function productVariant(data) {
  return {
    type: PRODUCT_VARIANT,
    payload: data,
  };
}
export function createProductVariant(data) {
  return {
    type: PRODUCT_VARIANT_CREATE,
    payload: data,
  };
}
export function productVariantUnquoted(data) {
  return {
    type: PRODUCT_VARIANT_UNQUOTED,
    payload: data,
  };
}
export function updateProduct(data) {
  return {
    type: PRODUCT_UPDATE,
    payload: data,
  };
}
export function updateProductVariant(data) {
  return {
    type: PRODUCT_VARIANT_UPDATE,
    payload: data,
  };
}
export function productListUnquoted(data) {
  return {
    type: PRODUCT_LIST_UNQUOTED,
    payload: data,
  };
}
export function removeProductVariant(data) {
  return {
    type: PRODUCT_VARIANT_REMOVE,
    payload: data,
  };
}
