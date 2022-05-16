import Link from 'next/link'
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router'

import { LogOut } from '../actionsMap'

const Nav = () => {

    const router = useRouter()
    const dispatch = useDispatch();

    const { token } = useSelector((state) => state.user)

    const handleLogOut = () => {
        router.push('/login')
        dispatch(LogOut());
    }

    return (
        <nav className="flex justify-between align-center md:justify-end bg-blue-600 shadow-gray-300 shadow-md p-5">
            <Link href="/"><a className='text-white bold md:mx-2 hover:underline'>Home</a></Link>
            <Link href="/search"><a className='text-white bold md:mx-2 hover:underline'>Search Invoice</a></Link>
            {token ?
                <>
                    <Link href="/addInvoice"><a className="text-white bold md:mx-2 hover:underline">Add Invoice</a></Link>
                    <Link href="/"><a className='text-white bold md:mx-2 hover:underline'onClick={handleLogOut}>Log Out</a></Link>
                </>
                :
                <>
                    <Link href="/login"><a className='text-white bold md:mx-2 hover:underline'>Log in</a></Link>
                    <Link href="/signup"><a className='text-white bold md:mx-2 hover:underline'>Sign In</a></Link>
                </>
            }
        </nav>
    );

}

export default Nav;