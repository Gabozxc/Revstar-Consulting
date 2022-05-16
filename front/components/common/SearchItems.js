import { useState } from "react";
import { useDispatch } from "react-redux";

import {SearchItem} from "../actionsMap";

const SearchItems = () => {

    const dispatch = useDispatch();
    const [queryInvoice, setQueryInvoice] = useState({
        invoiceTitle: "",
        invoceValue: "",
        invoiceVat: "",
    });

    const sendRequest = async () => {
        await dispatch(SearchItem(queryInvoice));
    }

    return (
        <div className="shadow-gray-300 bg-gray-200 max-w-[98%] my-2 mx-auto p-2 redounded rounded shadow shadow-gray-500 text-black">
            <h1>Search Item</h1>
            <div className="flex flex-wrap items-center justify-start">
                <div className="flex-1 mr-1 my-2 flex flex-col items-center flex-nowrap">
                    <label>
                        <span className="text-gray-700">Name of the item:</span>
                    </label>
                    <input type="text" placeholder="Name of the item" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" onChange={
                        (e) => {
                            setQueryInvoice({
                                ...queryInvoice,
                                invoiceTitle: e.target.value
                            })
                        }
                    } />
                </div>
                <div className="flex-1 mr-1 my-2 flex flex-col items-center flex-nowrap">
                    <label>
                        <span className="text-gray-700">Total Price:</span>
                    </label>
                    <input type="number" placeholder="Total value" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" onChange={
                        (e) => {
                            setQueryInvoice({
                                ...queryInvoice,
                                invoceValue: e.target.value
                            })
                        }
                    } />
                </div>
                <div className="flex-1 mr-1 my-2 flex flex-col items-center flex-nowrap">
                    <label>
                        <span className="text-gray-700">Total VAT:</span>
                    </label>
                    <input type="number" placeholder="Total VAT" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" onChange={
                        (e) => {
                            setQueryInvoice({
                                ...queryInvoice,
                                invoiceVat: e.target.value
                            })
                        }
                    } />
                </div>
                <div className="flex-1 mr-1 my-2 flex flex-col items-center flex-nowrap">
                    <label>
                        <span className="text-gray-700 opacity-0">Submit</span>
                    </label>
                    <button placeholder="Total VAT" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    onClick={sendRequest}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SearchItems;