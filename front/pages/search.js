import { useState } from 'react';
import Head from 'next/head';

import { Layout, SearchItems, SearchInvoice, ResultSearchInvoice, ResultSearchItems } from '../components/componentsMap'

export default function Home() {
  const [searchInvoice, setSearchInvoice] = useState(true)
  return (
    <Layout title="casa">
      <Head>
        <title>Search Invoice</title>
      </Head>
      <nav className='shadow-gray-300 bg-gray-200 max-w-[98%] my-2 mx-auto p-2 redounded rounded shadow shadow-gray-500 text-black text-center'>
        <button className={`mr-2 hover:underline ${searchInvoice && 'underline'}`} onClick={() => setSearchInvoice(true)}>Search by Invoice</button>
        <button className={`mr-2 hover:underline ${!searchInvoice && 'underline'}`} onClick={() => setSearchInvoice(false)}>Search by Items</button>
      </nav>
      {searchInvoice ? 
        <>
          <SearchInvoice /> 
          <ResultSearchInvoice /> 
        </> :
          <>
            <SearchItems />
            <ResultSearchItems />
          </>
      }
    </Layout>
  )
}