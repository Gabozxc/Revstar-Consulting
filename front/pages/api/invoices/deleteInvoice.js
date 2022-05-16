import axiosInstance from "../../../config/axios";
import verifyToken from "../../../config/checkToken";

export default async function deleteInvoice(req, res) {

    const { token, invoice } = req.body;
    if (token === undefined || token === null) {
        return res.status(401).json({})
    }
    verifyToken(token);

    const id = invoice.id
    const userId = invoice.userId

    try {
        const deleteInvoice = await axiosInstance.delete(`/api/invoice?id=${id}&userId=${userId}`);
        return res.status(200).json(deleteInvoice.data);
    } catch (err) {
        console.log(err.response)
        return res.status(500).json(err.response)
    }

}