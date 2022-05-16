import { useRouter } from 'next/router'
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from 'nanoid'

import { EditInvoice, getArticles } from "../actionsMap"
import Spinner from "./Spinner"

const FormEditInvoices = ({ invoice }) => {

    const router = useRouter()
    const id = router.query.id
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.invoices);
    const user = useSelector(state => state.user);

    const [inputs, setInputs] = useState([])

    const [title, setTitle] = useState(invoice?.title);
    const [error, setError] = useState(false)
    const [pagado, setPagado] = useState(invoice?.pagado);

    const addInput = () => {
        setInputs([...inputs, {
            nombre: "",
            cantidad: "",
            valor: "",
            valorTotal: "",
            iva: "",
            ivaTotal: "",
            precioFinal: "",
            id: nanoid(),
        }])
    }

    const createInvoice = async () => {
        //check if all inputs are filled
        let allFilled = true;
        inputs.forEach(input => {
            if (input.nombre === "" || input.cantidad === "" || input.iva === "" || input.valor === "") {
                allFilled = false;
            }
        })
        if (title === '' || title === null) {
            allFilled = false
        }
        if (allFilled) {
            setError(false)
            await dispatch(EditInvoice({ title, pagado: pagado, articulos: inputs, id: id, userId: user.id }))
            dispatch(getArticles(id))
        } else {
            setError(true)
        }
    }

    return (
        <form className="max-w-[95%] my-2 mx-auto p-2 shadow-gray-300 bg-gray-200 rounded">
            {error &&
                <div className="max-w-[95%] md:max-w-[30%] bg-red-500 text-white rounded p-2">
                    <p>Please fill all the inputs</p>
                </div>
            }
            <h2 className="text-lg">Edit Invoice</h2>
            {loading ? <Spinner /> :
                <div className='pl-2'>
                    <div className="flex flex-wrap items-center justify-start">
                        <div className="flex-1 mr-1 my-2 flex items-center flex-nowrap">
                            <label>
                                <span className="text-gray-700">Title Invoice:</span>
                            </label>
                            <input type="text" id="title_invoice" placeholder="Title Invoice" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" value={title} onChange={e => setTitle(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        <div className=" flex-1 mr-1 my-2">
                            <select className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                value={pagado}
                                onChange={e => setPagado(e.target.value)}
                                disabled={loading}
                            >
                                <option value={true}>Paid</option>
                                <option value={false}>Not Paid</option>
                            </select>
                        </div>
                        <div className="flex-1 mr-1 my-2">
                            <button
                                className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                type="button"
                                onClick={addInput}
                            >
                                Add new Product
                            </button>
                        </div>
                        <div className="flex-1 mr-1 my-2">
                            <button
                                className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                type="button"
                                onClick={createInvoice}
                            >
                                Update Invoice
                            </button>
                        </div>
                    </div>
                    {inputs.map((input) => (
                        <div key={input.id} className="flex flex-wrap items-center">
                            <div className="flex-1 mr-1 my-2">
                                <label
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                    htmlFor={input.id}
                                >
                                    Product Name
                                </label>
                                <input
                                    className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    id={input.id}
                                    type="text"
                                    placeholder="Nombre"
                                    value={input.nombre}
                                    onChange={(e) => {
                                        setInputs(inputs.map((input) => {
                                            if (input.id === e.target.id) {
                                                input.nombre = e.target.value;
                                            }
                                            return input;
                                        }
                                        ))
                                    }
                                    }
                                    required
                                />
                            </div>
                            <div className="flex-1 mr-1 my-2">
                                <label
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                >
                                    quantity
                                </label>
                                <input
                                    className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    id={input.id}
                                    type="number"
                                    placeholder="quantity"
                                    value={input.cantidad}
                                    onChange={(e) => {
                                        setInputs(inputs.map((input) => {
                                            if (input.id === e.target.id) {
                                                input.cantidad = e.target.value;
                                                input.valorTotal = input.valor * e.target.value
                                                input.ivaTotal = input.iva / 100 * input.valorTotal
                                                input.precioFinal = input.valorTotal + input.ivaTotal
                                            }
                                            return input;
                                        }
                                        ))
                                    }
                                    }
                                    required
                                />
                            </div>
                            <div className="flex-1 mr-1 my-2">
                                <label
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                >
                                    Purchase price
                                </label>
                                <input
                                    className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    id={input.id}
                                    type="number"
                                    placeholder="Purchase price"
                                    value={input.valor}
                                    onChange={(e) => {
                                        setInputs(inputs.map((input) => {
                                            if (input.id === e.target.id) {
                                                input.valor = e.target.value;
                                                input.valorTotal = e.target.value * input.cantidad;
                                                input.ivaTotal = input.iva / 100 * input.valorTotal
                                                input.precioFinal = input.valorTotal + input.ivaTotal
                                            }
                                            return input;
                                        }
                                        ))
                                    }
                                    }
                                    required
                                />
                            </div>
                            <div className="flex-1 mr-1 my-2">
                                <label
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                >
                                    Total Price
                                </label>
                                <input
                                    className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    id={input.id}
                                    type="text"
                                    placeholder="Total price"
                                    value={input.valorTotal}
                                    disabled
                                />
                            </div>
                            <div className="flex-1 mr-1 my-2">
                                <label
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                >
                                    % of vat to be added
                                </label>
                                <input
                                    className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    id={input.id}
                                    type="number"
                                    placeholder="16"
                                    value={input.iva}
                                    onChange={(e) => {
                                        setInputs(inputs.map((input) => {
                                            if (input.id === e.target.id) {
                                                input.iva = e.target.value;
                                                input.ivaTotal = e.target.value / 100 * input.valorTotal
                                                input.precioFinal = input.valorTotal + input.ivaTotal
                                            }
                                            return input;
                                        }
                                        ))
                                    }
                                    }
                                    required
                                />
                            </div>
                            <div className="flex-1 mr-1 my-2">
                                <label
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                >
                                    VAT
                                </label>
                                <input
                                    className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    id={input.id}
                                    type="number"
                                    placeholder="Vat"
                                    value={input.ivaTotal}
                                    disabled
                                />
                            </div>
                            <div className="flex-1 mr-1 my-2">
                                <label
                                    className="block text-sm font-medium leading-5 text-gray-700"
                                >
                                    Total Price + Vat
                                </label>
                                <input
                                    className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    id={input.id}
                                    type="number"
                                    placeholder="Total Price + vat"
                                    value={input.precioFinal}
                                    disabled
                                />
                            </div>
                            {/* remove input */}
                            <div className="flex-1 mr-1 my-2 ">
                                <label
                                    className="block text-sm font-medium leading-5 text-gray-700 opacity-0"
                                >
                                    Remove input
                                </label>
                                <button
                                    className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 "
                                    type="button"
                                    onClick={() => {
                                        setInputs(inputs.filter((inputOld) => inputOld.id !== input.id))
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>}
        </form>
    );

}

export default FormEditInvoices;