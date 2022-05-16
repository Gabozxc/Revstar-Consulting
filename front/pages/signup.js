import Head from 'next/head';
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";

import { Layout, FormSignUp } from '../components/componentsMap'
import useCheckToken from '../hooks/useCheckToken';

const SignUp = () => {
  useCheckToken();
  const router = useRouter();
  const { token } = useSelector(state => state.user);
  if (token) {
    router.push('/')
  }
  return (
    <Layout title="casa">
      <Head>
        <title>Sign Up</title>
      </Head>
      <FormSignUp />
    </Layout>
  )
}

export default SignUp;