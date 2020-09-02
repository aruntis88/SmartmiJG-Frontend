import {
  PRODUCT_LIST,
  PRODUCT_CATEGORY_LIST,
  PRODUCT_CATEGORY_CREATE,
  PRODUCT_CATEGORY_REMOVE,
  PRODUCT_CREATE,
  PRODUCT_VARIANT_LIST,
  PRODUCT_REMOVE,
  PRODUCT_VARIANT,
  PRODUCT_VARIANT_UNQUOTED,
  PRODUCT_VARIANT_CREATE,
  PRODUCT_UPDATE,
  PRODUCT_VARIANT_UPDATE,
  PRODUCT_LIST_UNQUOTED,
  PRODUCT_VARIANT_REMOVE,
} from "../../types/types";

const initialState = {
  productList: [],
};
export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload,
        createProduct: false,
        removeProduct: false,
        createProductVariant: false,
        updateProduct: false,
      };
    case PRODUCT_CATEGORY_LIST:
      return {
        ...state,
        productCategoryList: action.payload,
      };
    case PRODUCT_CATEGORY_CREATE:
      return {
        ...state,
        createProductCategory: action.payload,
      };
    case PRODUCT_CATEGORY_REMOVE:
      return {
        ...state,
        removeProductCategory: action.payload,
      };
    case PRODUCT_CREATE:
      return {
        ...state,
        createProduct: action.payload,
      };
    case PRODUCT_VARIANT_LIST:
      return {
        ...state,
        productVariantList: action.payload,
        createProductVariant: false,
        updateProductVariant: false,
        removeProductVariant: false,
      };
    case PRODUCT_REMOVE:
      return {
        ...state,
        removeProduct: action.payload,
      };
    case PRODUCT_VARIANT:
      return {
        ...state,
        productVariant: action.payload,
        createProductVariant: false,
        updateProductVariant: false,
        removeProductVariant: false,
      };
    case PRODUCT_VARIANT_UNQUOTED:
      return {
        ...state,
        productVariantUnquoted: action.payload,
      };
    case PRODUCT_VARIANT_CREATE:
      return {
        ...state,
        createProductVariant: action.payload,
      };
    case PRODUCT_UPDATE:
      return {
        ...state,
        updateProduct: action.payload,
      };
    case PRODUCT_VARIANT_UPDATE:
      console.log("vvvvgggggggggggggg", action.payload);
      return {
        ...state,
        updateProductVariant: action.payload,
      };
    case PRODUCT_LIST_UNQUOTED:
      return {
        ...state,
        productListUnquoted: action.payload,
      };
    case PRODUCT_VARIANT_REMOVE:
      return {
        ...state,
        removeProductVariant: action.payload,
      };
    default:
      return state;
  }
}
export const getProduct = (state) => state.productList;
export const getProductCategory = (state) => state.productCategoryList;
export const getProductCategoryCreate = (state) => state.createProductCategory;
export const getProductCategoryRemove = (state) => state.removeProductCategory;
export const getProductCreate = (state) => state.createProduct;
export const getProductRemove = (state) => state.removeProduct;
export const getProductVariantList = (state) => state.productVariantList;
export const getProductVariant = (state) => state.productVariant;
export const getProductVariantUnquoted = (state) =>
  state.productVariantUnquoted;
export const getCreateProductVariant = (state) => state.createProductVariant;
export const getProductUpdate = (state) => state.updateProduct;
export const getProductVariantUpdate = (state) => state.updateProductVariant;
export const getProductListUnquoted = (state) => state.productListUnquoted;
export const getProductVariantRemove = (state) => state.removeProductVariant;
