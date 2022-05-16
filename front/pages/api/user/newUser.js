import axiosInstance from "../../../config/axios";

export default async function newUser(req, res) {

  const { name, email, password } = req.body;

  try{
    const newUser = await axiosInstance.post("/api/user", { name, email, password })
    return res.status(200).json(newUser.data.alert);
  } catch(err){
    console.log(err)
    return res.status(500).json(err.response.data)
  }

}
