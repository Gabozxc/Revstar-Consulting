import axiosInstance from "../../../config/axios";

export default async function getAllInvoices(req, res) {

  try{
    const invoices = await axiosInstance.get("/api/invoice")
    if(invoices.data.invoices.length <= 0 ){
      throw new Error("No Invoices")
    }
    return res.status(200).json(invoices.data);
  } catch(err){
    console.log(err)
    return res.status(500).json(err.response)
  }

}
