import axiosInstance from "../../../config/axios";

export default async function searchItems(req, res) {

    const { invoice } = req.body;

    try {
        const items = await axiosInstance.get(`http://localhost:8000/api/articulo`, {
            params:{
                filter: true,
                name: invoice.invoiceTitle,
                valorTotal: invoice.invoceValue,
                ivaTotal: invoice.invoiceVat,
            }
        });
        return res.status(200).json({ items: items.data.articulos });
    } catch (err) {
        console.log(err.response)
        return res.status(500).json(err.response)
    }

}