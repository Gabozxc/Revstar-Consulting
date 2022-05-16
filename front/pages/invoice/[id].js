import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";

import { Layout, FormEditInvoices, CurrentInvoices, DeleteInvoice, InvoiceStatus } from '../../components/componentsMap'

const invoiceEdit = () => {

  const router = useRouter();
  const { id } = useSelector(state => state.user);
  const { invoices, alert } = useSelector(state => state.invoices);

  const invoiceId = router.query.id;
  const [isOwner, setOwner] = useState(false)

  const invoice = invoices.find(invoice => invoice.id === invoiceId);

  useEffect(() => {
    if (invoice?.userId === id) {
      setOwner(true)
    }
  }, [])

  if (!invoice || !invoice?.id) {
    router.push('/');
    return (<h1 className='text-center text-red-500'>Invoice not found</h1>)
  }

  return (
    <Layout title="casa">
      <Head>
        <title>{invoice.title}</title>
      </Head>

      {alert && <div className='max-w-[95%] my-2 mx-auto p-2 shadow-gray-300 bg-green-500 rounded text-white'> <div>{alert.message}</div>  </div>}

      {isOwner ? <>
        <InvoiceStatus invoice={invoice} />
        <FormEditInvoices invoice={invoice} />
      </> : <InvoiceStatus invoice={invoice} />}
      <CurrentInvoices invoiceId={invoice?.id} owner={isOwner} userId={invoice?.userId} />
      {invoice?.userId === id && <DeleteInvoice invoiceId={invoiceId} userId={id} />}

    </Layout>
  )
}

export default invoiceEdit;