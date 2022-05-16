import axiosInstance from "../../../config/axios";

export default async function login(req, res) {

  const { email, password } = req.body;

  try{
    const user = await axiosInstance.post(`/api/auth`, { email, password })
    return res.status(200).json(user.data)
  } catch(err){
    console.log(err)
    return res.status(500).json(err.response.data)
  }

}