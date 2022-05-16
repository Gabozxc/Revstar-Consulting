import Link from 'next/link';
import { useSelector } from 'react-redux';
import Spinner from "./Spinner";

const ResultSearchItems = () => {
    const { articlesSearch, searching } = useSelector(state => state.invoices);
    const { id } = useSelector(state => state.user);
    return (
        <div className="shadow-gray-300 bg-gray-200 max-w-[98%] my-2 mx-auto p-2 redounded rounded shadow shadow-gray-500 text-black">
            <div className="flex justify-center items-center">
                <h1 className="text-lg text-center font-bold mr-2">Search Result:</h1>
            </div>
            <div className="">
                {searching ? <Spinner /> : <table className="table-auto mx-auto">
                    <thead>
                        <tr>
                            <th className="px-2 py-2">Quantity</th>
                            <th className="px-2 py-2">Item Name</th>
                            <th className="px-2 py-2">Purcharse Price</th>
                            <th className="px-2 py-2">VAT</th>
                            <th className="px-2 py-2">Purcharse Price With VAT</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {articlesSearch.map((invoice) => (
                            <tr key={invoice.id}>
                                <td className="px-2 py-2">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="text-sm leading-5 font-medium text-gray-900">
                                                <p className="text-black">{invoice.cantidad}</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-2 py-2">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="text-sm leading-5 font-medium text-gray-900">
                                                {invoice.userId === id ? <Link href={`/invoice/${invoice.facturaId}`}><a className="text-blue-500">{invoice.title}</a></Link> : <Link href={`/invoice/${invoice.facturaId}`}><a className="text-black">{invoice.nombre}</a></Link>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-2 py-2">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="text-sm leading-5 font-medium text-gray-900">
                                                <p className="text-black">{invoice.valorTotal}</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-2 py-2">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="text-sm leading-5 font-medium text-gray-900">
                                                <p className="text-black">${invoice.ivaTotal}</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-2 py-2">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="text-sm leading-5 font-medium text-gray-900">
                                                <p className="text-black">${invoice.precioFinal}</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )

                        )}
                    </tbody>
                </table>}
            </div>
        </div>
    );
}

export default ResultSearchItems;