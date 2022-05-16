import Link from 'next/link';
import { useSelector } from 'react-redux';
import Spinner from "./Spinner";

const Invoices = () => {
    const { invoices, loading } = useSelector(state => state.invoices);
    const { id } = useSelector(state => state.user);
    return (
        <div className="shadow-gray-300 bg-gray-200 max-w-[98%] my-2 mx-auto p-2 redounded rounded shadow shadow-gray-500 text-black">
            <div className="flex justify-center items-center">
                <h1 className="text-lg text-center font-bold mr-2">All invoices</h1>
            </div>
            <div className="">
                {loading ? <Spinner /> : <table className="table-auto mx-auto">
                    <thead>
                        <tr>
                            <th className="px-2 py-2">Invoice ID</th>
                            <th className="px-2 py-2">Invoice Name</th>
                            <th className="px-2 py-2">Quantity</th>
                            <th className="px-2 py-2">Total price</th>
                            <th className="px-2 py-2">Paid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => (
                            <tr key={invoice.id}>
                                <td className="px-2 py-2">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="text-sm leading-5 font-medium text-gray-900">
                                                <p className="text-black">#{invoice.id}</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-2 py-2">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="text-sm leading-5 font-medium text-gray-900">
                                                {invoice.userId === id ? <Link href={`/invoice/${invoice.id}`}><a className="text-blue-500">{invoice.title}</a></Link> : <Link href={`/invoice/${invoice.id}`}><a className="text-black">{invoice.title}</a></Link>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-2 py-2">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="text-sm leading-5 font-medium text-gray-900">
                                                <p className="text-black">{invoice.items}</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-2 py-2">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="text-sm leading-5 font-medium text-gray-900">
                                                <p className="text-black">${invoice.totalValue}</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-2 py-2">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="text-sm leading-5 font-medium text-gray-900">
                                                <p className="text-black">{invoice.pagado ? "Yes" : "No"}</p>
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

export default Invoices;