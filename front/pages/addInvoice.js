import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from "react-redux";

import { CheckToken } from '../components/actionsMap';
import { Layout, FormAddInvoices } from '../components/componentsMap'

const AddInvoice = () => {

  const router = useRouter();
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.user);

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(loading){
      dispatch(CheckToken)
      setLoading(false)
    }
    if(!token){
      router.push('/login');
    }
  } , [token, loading, dispatch, router]);

    return (
        <Layout title="casa">
          <Head>
            <title>Add Invoice</title>
          </Head>
            <FormAddInvoices />
        </Layout>
      )
}
 
export default AddInvoice;