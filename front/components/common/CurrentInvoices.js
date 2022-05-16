import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Spinner from "./Spinner"
import { getArticles, DeleteArticles } from "../actionsMap"

const CurrentInvoices = ({ invoiceId, owner, userId }) => {

    const [donwloadData, setLoading] = useState(false)
    const dispatch = useDispatch();
    const { currentArticles, loading } = useSelector(state => state.invoices);

    useEffect(() => {
        setLoading(true)
        if (donwloadData) {
            dispatch(getArticles(invoiceId));
        }
    }, [donwloadData])
    
    const deleteItem = (id) => {
        dispatch(DeleteArticles({id, userId, invoiceId}))
    }

    return (
        <div className="max-w-[95%] my-2 mx-auto p-2 shadow-gray-300 bg-gray-200 rounded">
            <h1 className="text-lg">Items</h1>
            <div className="flex flex-col">
                {loading ? <Spinner /> : <>
                    {currentArticles.map(article => (
                        <div className="flex flex-col my-2 text-center" key={article.id}>
                            <div className="flex flex-row">
                                <div className="flex-1">
                                    <h2 className="text-sm">Product Name:</h2>
                                    <h2 className="text-sm">{article.nombre}</h2>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-sm">Quantity:</h2>
                                    <h2 className="text-sm">{article.cantidad}</h2>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-sm">Purchase price:</h2>
                                    <h2 className="text-sm">{article.valor}</h2>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-sm">Total Price:</h2>
                                    <h2 className="text-sm">{article.valorTotal}</h2>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-sm">% vat to be added:</h2>
                                    <h2 className="text-sm">{article.iva}</h2>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-sm">VAT</h2>
                                    <h2 className="text-sm">{article.ivaTotal}</h2>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-sm">Total Price + Vat</h2>
                                    <h2 className="text-sm">{article.precioFinal}</h2>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-sm">Total Price + Vat</h2>
                                    <h2 className="text-sm">{article.precioFinal}</h2>
                                </div>
                                {owner && <div className="flex-1">
                                    <button className="bg-red-500 p-2 text-white rounded" onClick={() => deleteItem(article.id)}>Delete Item</button>
                                </div>}
                            </div>
                        </div>
                    ))}</>}
            </div>
        </div>
    )
}

export default CurrentInvoices;