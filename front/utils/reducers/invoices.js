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
  SSEARCHING_ITEMS_FAILURE,
  CLEAN_ALERT
} from "../types/invoicesTypes";

const initialState = {
  error: false,
  loading: true,
  searching: false,
  alert: null,
  invoices: [],
  currentArticles: [],
  invoicesSearch: [],
  articlesSearch: []
};

const invoices = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_ARTICLES:
    case EDIT_INVOICE:
    case DELETE_INVOICE:
    case GET_INVOICES:
    case GET_ARTICLES:
    case NEW_INVOICE:
      return {
        ...state,
        loading: true,
        alert: null,
      };
    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        loading: false,
        invoices: action.payload,
        error: false
      };
    case GET_INVOICES_FAILURE:
      return {
        ...state,
        loading: false,
        alert: action.payload,
        invoices: action.payload,
        error: true,
        currentArticles: []
      };
    case NEW_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        alert: null,
        invoices: [...state.invoices, action.payload],
        error: false
      };
    case GET_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        currentArticles: action.payload,
        error: false
      };
    case DELETE_ARTICLES_FAILURE:
    case EDIT_INVOICE_FAILURE:
    case DELETE_INVOICE_FAILURE:
    case GET_ARTICLES_FAILURE:
    case NEW_INVOICE_FAILURE:
      return {
        ...state,
        loading: false,
        alert: action.payload,
        error: true,
      };
    case DELETE_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        alert: {type:"Success", msg:"Successfully invoice eliminated"},
        invoices: state.invoices.filter(
          (invoice) => invoice.id !== action.payload
        ),
        error: false
      };
    case EDIT_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        alert: { type: "success", message: "Invoice updated" },
        invoices: state.invoices.map((invoice) =>
          invoice.id === action.payload.id
            ? { ...invoice, ...action.payload }
            : invoice
        ),
        currentArticles: [...state.currentArticles, ...action.payload.invoice.articulos],
        error: false
      };
    case DELETE_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        alert: null,
        currentArticles: state.currentArticles.filter(
          (article) => article.id !== action.payload.article
        ),
        invoices: state.invoices.map((invoice) =>
          invoice.id === action.payload.invoice.id
            ? { ...invoice, ...action.payload.invoice }
            : invoice
        ),
        error: false
      };
    case SEARCHING_ITEMS:
    case SEARCHING_INVOICE:
      return {
        ...state,
        searching: true,
        error: false,
        alert: null,
      };
    case SEARCHING_INVOICE_SUCCESS:
      return {
        ...state,
        searching: false,
        invoicesSearch: action.payload,
      };
    case SEARCHING_INVOICE_FAILURE:
      return {
        ...state,
        searching: false,
        invoicesSearch: [],
        error: true,
        alert: action.payload,
      };
    case SEARCHING_ITEMS_SUCCESS:
      return {
        ...state,
        searching: false,
        articlesSearch: action.payload,
      };
    case CLEAN_ALERT:
      return {
        ...state,
        alert: null,
        error: false,
      };
      default:
        return state;
  }
};

export default invoices;