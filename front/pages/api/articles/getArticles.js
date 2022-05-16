import axiosInstance from "../../../config/axios";

export default async function getArticles(req, res) {

  const { id } = req.body;

  try {
      const getArticles = await axiosInstance.get(`api/articulo?facturaId=${id}`);
      return res.status(200).json(getArticles.data.articulos);
  } catch (err) {
      return res.status(500).json(err.response)
  }

}