import axiosInstance from "../../../config/axios";
import verifyToken from "../../../config/checkToken";


export default async function newInvoice(req, res) {

    const { token, invoice } = req.body;
    if (token === undefined || token === null) {
        return res.status(401).json({})
    }
    verifyToken(token);

    //remove id of each invoice articulos 
    const invoiceReset = invoice.articulos.map(articulo => {
        articulo.cantidad = parseFloat(articulo.cantidad)
        articulo.valor = parseFloat(articulo.valor)
        articulo.valorTotal = parseInt(articulo.valorTotal)
        articulo.iva = parseInt(articulo.iva)
        articulo.ivaTotal = parseInt(articulo.ivaTotal)
        articulo.precioFinal = parseInt(articulo.precioFinal)
        delete articulo.id;
        return articulo;
    })
    invoice.articulos = invoiceReset;

    try {
        const newInvoice = await axiosInstance.post("/api/invoice", invoice);
        return res.status(200).json(newInvoice.data);
    } catch (err) {
        console.log(err)
        return res.status(500).json(err.response)
    }

}