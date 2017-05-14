import * as Web3Api from '../api/web3Api';
import {createAction} from 'redux-actions';

export const loginSellerRequest = "@@seller/LOGIN_SELLER_REQUEST";
export const loginSellerSuccess = "@@seller/LOGIN_SELLER_SUCCESS";
export const loginSellerFailure = "@@seller/LOGIN_SELLER_FAILURE";
export const fetchProductsRequest = "@@seller/FETCH_PRODUCTS_REQUEST";
export const fetchProductsSuccess = "@@seller/FETCH_PRODUCTS_SUCCESS";
export const fetchProductsFailure = "@@seller/FETCH_PRODUCTS_FAILURE";
export const createProductRequest = "@@seller/CREATE_PRODUCT_REQUEST";
export const createProductSuccess = "@@seller/CREATE_PRODUCT_SUCCESS";
export const createProductFailure = "@@seller/CREATE_PRODUCT_FAILURE";

export function loginSeller(userAddress) {
    return {
        types: [
            loginSellerRequest,
            loginSellerSuccess,
            loginSellerFailure,
        ],
        callApi: () => Web3Api.loginSeller(userAddress),
        payload: {}
    };
}

export function fetchProducts(sellerContractAddress) {
    return {
        types: [
            fetchProductsRequest,
            fetchProductsSuccess,
            fetchProductsFailure,
        ],
        callApi: () => Web3Api.getSellerProducts(sellerContractAddress),
        payload: {}
    };
}

export function createProduct(userAddress, sellerContractAddress, productName, costInWei) {
    return {
        types: [
            createProductRequest,
            createProductSuccess,
            createProductFailure,
        ],
        callApi: () => Web3Api.createProduct(userAddress, sellerContractAddress, productName, costInWei),
        payload: {}
    };
}
