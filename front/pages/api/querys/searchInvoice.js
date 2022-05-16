import axiosInstance from "../../../config/axios";

export default async function searchInvoice(req, res) {

    const { invoice } = req.body;

    try {
        const invoices = await axiosInstance.get(`http://localhost:8000/api/invoice`, {
            params:{
                filter: true,
                invoiceId: invoice.invoiceNumber,
                invoiceTitle: invoice.invoiceTitle,
                invoiceValue: invoice.invoceValue,
                invoiceVat: invoice.invoiceVat,
                invoicePaid: invoice.invoicePaid,
                invoiceItems: invoice.invoiceItems
            }
        });
        return res.status(200).json({invoices: invoices.data.invoices});
    } catch (err) {
        console.log(err.response)
        return res.status(500).json(err.response)
    }

}