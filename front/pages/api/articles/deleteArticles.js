import axiosInstance from "../../../config/axios";
import verifyToken from "../../../config/checkToken";

export default async function deleteArticles(req, res) {

    const { token, user } = req.body;

    if (token === undefined || token === null) {
        return res.status(401).json({})
    }

    verifyToken(token);

    try {
        const getArticles = await axiosInstance.delete(`http://localhost:8000/api/articulo?itemId=${user.id}&userId=${user.userId}&invoiceId=${user.invoiceId}`);
        return res.status(200).json(getArticles.data.facturaUpdate);
    } catch (err) {
        console.log(err)
        return res.status(500).json(err.response)
    }

}