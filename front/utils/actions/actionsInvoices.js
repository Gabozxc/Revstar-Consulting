import axios from 'axios';

import {
  GET_INVOICES,
  GET_INVOICES_SUCCESS,
  GET_INVOICES_FAILURE,
  NEW_INVOICE,
  NEW_INVOICE_SUCCESS,
  NEW_INVOICE_FAILURE,
  EDIT_INVOICE,
  EDIT_INVOICE_SUCCESS,
  EDIT_INVOICE_FAILURE,
  DELETE_INVOICE,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAILURE,
  GET_ARTICLES,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILURE,
  DELETE_ARTICLES,
  DELETE_ARTICLES_SUCCESS,
  DELETE_ARTICLES_FAILURE,
  SEARCHING_INVOICE,
  SEARCHING_INVOICE_SUCCESS,
  SEARCHING_INVOICE_FAILURE,
  SEARCHING_ITEMS,
  SEARCHING_ITEMS_SUCCESS,
  SEARCHING_ITEMS_FAILURE,
} from "../types/invoicesTypes.js";

export const getAllInvoices = () => {
  return async (dispatch) => {
    dispatch(getInvoices());
    try {
      const AllInvoices = await axios.post('/api/invoices/getAllInvoices');
      return dispatch(getInvoicesSuccess(AllInvoices.data.invoices));
    } catch (err) {
      console.log(err)
      return dispatch(getInvoicesFailure([]));
    }
  };
};

const getInvoices = () => ({
  type: GET_INVOICES,
})

const getInvoicesSuccess = (invoices) => ({
  type: GET_INVOICES_SUCCESS,
  payload: invoices,
})

const getInvoicesFailure = (error) => ({
  type: GET_INVOICES_FAILURE,
  payload: error,
})

export const newInvoice = (invoice) => {
  return async (dispatch) => {
    dispatch(newInvoiceRequest());
    const token = localStorage.getItem("token");
    try {
      const newInvoice = await axios.post('/api/invoices/newInvoice', { invoice, token });
      return dispatch(newInvoiceSuccess(newInvoice.data.factura));
    } catch (err) {
      console.log(err)
      return dispatch(newInvoiceFailure(["none"]));
    }
  }
}

const newInvoiceRequest = () => ({
  type: NEW_INVOICE,
})

const newInvoiceSuccess = (invoice) => ({
  type: NEW_INVOICE_SUCCESS,
  payload: invoice
})

const newInvoiceFailure = (error) => ({
  type: NEW_INVOICE_FAILURE,
  payload: error,
})

export const getArticles = (id) => {
  return async (dispatch) => {
    dispatch(getArticlesRequest());
    try {
      const articles = await axios.post('/api/articles/getArticles', { id: id });
      return dispatch(getArticlesSucces(articles.data));
    } catch (err) {
      console.log(err)
      return dispatch(getArticlesFailure(err.response));
    }
  }
}

const getArticlesRequest = () => ({
  type: GET_ARTICLES,
})

const getArticlesSucces = (articles) => ({
  type: GET_ARTICLES_SUCCESS,
  payload: articles,
})

const getArticlesFailure = (error) => ({
  type: GET_ARTICLES_FAILURE,
  payload: error,
})

export const DeleteInvoice = (invoice) => {
  return async (dispatch) => {
    dispatch(deleteInvoiceRequest());
    const token = localStorage.getItem("token");
    try {
      const deletedInvoice = await axios.post('/api/invoices/deleteInvoice', { token: token, invoice: invoice })
      return dispatch(deleteInvoiceSuccess(deletedInvoice.data.factura.id));
    } catch (err) {
      console.log(err)
      return dispatch(deleteInvoiceFailure(err.response));
    }
  }
}

const deleteInvoiceRequest = () => ({
  type: DELETE_INVOICE,
})

const deleteInvoiceSuccess = (invoice) => ({
  type: DELETE_INVOICE_SUCCESS,
  payload: invoice,
})

const deleteInvoiceFailure = (error) => ({
  type: DELETE_INVOICE_FAILURE,
  payload: error
})

export const EditInvoice = (invoice) => {
  return async (dispatch) => {
    dispatch(editInvoiceRequest());
    const token = localStorage.getItem("token");
    try {
      const invoiceEdit = await axios.post('/api/invoices/editInvoices', { invoice, token });
      invoiceEdit.data.factura.invoice = invoice;
      return dispatch(editInvoiceSuccess(invoiceEdit.data.factura));
    } catch (err) {
      console.log(err)
      return dispatch(editInvoiceFailure(err.response));
    }
  }
}

const editInvoiceRequest = () => ({
  type: EDIT_INVOICE,
})

const editInvoiceSuccess = (invoice) => ({
  type: EDIT_INVOICE_SUCCESS,
  payload: invoice,
})

const editInvoiceFailure = (error) => ({
  type: EDIT_INVOICE_FAILURE,
  payload: error,
})

export const DeleteArticles = (user) => {
  return async (dispatch) => {
    dispatch(deletArticleRequest());
    const token = localStorage.getItem("token");
    try {
      const invoiceEdit = await axios.post('/api/articles/deleteArticles', { user, token });
      return await dispatch(deletArticleSuccess({ article: user.id, invoice: invoiceEdit.data }));
    } catch (err) {
      console.log(err)
      return dispatch(deletArticleFailure(err));
    }
  }
}

const deletArticleRequest = () => ({
  type: DELETE_ARTICLES,
})

const deletArticleSuccess = (invoice) => ({
  type: DELETE_ARTICLES_SUCCESS,
  payload: invoice,
})

const deletArticleFailure = (err) => ({
  type: DELETE_ARTICLES_FAILURE,
  payload: invoice,
})

export const SearchInvoices = (invoice) => {
  return async (dispatch) => {
    dispatch(searchingInvoice());
    try {
      const searchInvoices = await axios.post('/api/querys/searchInvoice', { invoice });
      return dispatch(searchingInvoiceSuccess(searchInvoices.data.invoices));
    } catch (err) {
      console.log(err)
      return dispatch(searchingInvoiceFailure(err.response));
    }
  }
}

const searchingInvoice = () => ({
  type: SEARCHING_INVOICE,
})
const searchingInvoiceSuccess = (invoices) => ({
  type: SEARCHING_INVOICE_SUCCESS,
  payload: invoices,
})
const searchingInvoiceFailure = (error) => ({
  type: SEARCHING_INVOICE_FAILURE,
  payload: error,
})

export const SearchItem = (invoice) => {
  return async (dispatch) => {
    dispatch(searchingItems());
    try {
      const searchItems = await axios.post('/api/querys/searchItems', { invoice });
      return dispatch(searchingItemsSuccess(searchItems.data.items));
    } catch (err) {
      console.log(err)
      return dispatch(searchingItemsFailure(err.response));
    }
  }
}

const searchingItems = () => ({
  type: SEARCHING_ITEMS,
})

const searchingItemsSuccess = (items) => ({
  type: SEARCHING_ITEMS_SUCCESS,
  payload: items,
})

const searchingItemsFailure = (data) => ({
  type: SEARCHING_ITEMS_FAILURE,
  payload: data,
})