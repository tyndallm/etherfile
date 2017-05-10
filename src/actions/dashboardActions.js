import * as Web3Api from '../api/web3Api';
import {createAction} from 'redux-actions';

export const fetchProductsRequest = "@@dashboard/FETCH_PRODUCTS_REQUEST";
export const fetchProductsSuccess = "@@dashboard/FETCH_PRODUCTS_SUCCESS";
export const fetchProductsFailure = "@@dashboard/FETCH_PRODUCTS_FAILURE";

export function fetchProducts(userAddress, username) {
    return {
        types: [
            fetchProductsRequest,
            fetchProductsSuccess,
            fetchProductsFailure,
        ],
        callApi: () => Web3Api.getUserProducts(userAddress, username),
        payload: {}
    };
}
