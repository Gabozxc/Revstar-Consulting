import Head from 'next/head';
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";

import { Layout, FormLogin } from '../components/componentsMap'
import useCheckToken from '../hooks/useCheckToken';

const Login = () => {
  
  useCheckToken();
  const router = useRouter();
  const { token } = useSelector(state => state.user);
  if(token){
    router.push('/')
  }
    return (
        <Layout title="casa">
          <Head>
            <title>Log in</title>
          </Head>
            <FormLogin />
        </Layout>
      )
}
 
export default Login;