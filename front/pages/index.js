import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';

import { getAllInvoices, CheckToken } from '../components/actionsMap';
import { Layout, Invoices } from '../components/componentsMap'

export default function Home() {

  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState()
  const { invoices } = useSelector(state => state.invoices);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true)
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"))
    }
    if (loading && invoices.length === 0) {
      dispatch(getAllInvoices());
    }
    if (token) {
      dispatch(CheckToken());
    }
  }, [loading])

  return (
    <Layout title="casa">
      <Head>
        <title>Home</title>
      </Head>
      <Invoices />
    </Layout>
  )
}
