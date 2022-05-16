import axiosInstance from "../../../config/axios";
import verifyToken from "../../../config/checkToken";


export default async function login(req, res) {

    const { token } = req.body;
    if (token === undefined || token === null) {
        return res.status(401).json({ })
    }

    verifyToken(token);

    try {
        const usuario = await axiosInstance.get("/api/auth");
        return res.status(200).json({ data: usuario.data })
    } catch (err) {
        console.log(err)
        return res.status(401).json({ alert: { type: "Error", msg: "Token Invalid" } });
    }

}