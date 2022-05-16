import {configureStore} from "@reduxjs/toolkit"
import user from "./utils/reducers/user";
import invoices from "./utils/reducers/invoices";

const store = configureStore(
 {
    reducer: {
      user,
      invoices
    }
  }
);

export default store;