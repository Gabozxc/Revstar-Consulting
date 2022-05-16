import Link from 'next/link'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { newAccount } from "../actionsMap"
import Notification from "./Notification";
import Spinner from "./Spinner";

const FormSignUp = () => {

    const dispatch = useDispatch();
    const { alert, loading } = useSelector(state => state.user);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string()
                .email("The email is not valid")
                .required("Email is required"),
            password: Yup.string()
                .required("Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm password is required"),
        }),
        onSubmit: (values) => {
            const usuario = {
                name: values.name,
                email: values.email,
                password: values.password,
            };
            dispatch(newAccount(usuario));
        },
    });

    return (
        <form className="max-w-[95%] md:max-w-[70%] lg:max-w-[50%] my-0 mx-auto my-5 p-5 shadow-gray-400 rounded bg-gray-200 shadow" onSubmit={formik.handleSubmit}>
            {loading ? <Spinner /> : <>
                {alert?.type === "Successful" ?
                    <div className='flex justify-center'>
                        <Link href="/login"><a className='inline-block p-2 my-2 mx-auto bg-blue-500 rounded text-white hover:bg-blue-400 w-full	text-center'>Log in</a></Link>
                    </div>
                    :
                    <>
                         <h1 className="text-center text-lg font-bold">CREATE ACCOUNT</h1>
                        <div className="flex flex-col mb-2 ">
                            <label htmlFor="name" className="mb-1">Name:</label>
                            <input type="text" id="name" placeholder="Your name" className="rounded p-2" value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            {formik.touched.name && formik.errors.name && (
                                <Notification type="alert" msg={formik.errors.name} classes="p-2 rounded-b" />
                            )}
                        </div>
                        <div className="flex flex-col my-2">
                            <label htmlFor="email" className="mb-1">Email:</label>
                            <input type="email" id="email" placeholder="Your name" className="rounded p-2" value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            {formik.touched.email && formik.errors.email && (
                                <Notification type="alert" msg={formik.errors.email} classes="p-2 rounded-b" />
                            )}
                        </div>
                        <div className="flex flex-col my-2">
                            <label htmlFor="password" className="mb-1">Password:</label>
                            <input type="password" id="password" placeholder="Your Password" className="rounded p-2" value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            {formik.touched.password && formik.errors.password && (
                                <Notification type="alert" msg={formik.errors.password} classes="p-2 rounded-b" />
                            )}
                        </div>
                        <div className="flex flex-col my-2">
                            <label htmlFor="confirmPassword" className="mb-1">Confirm Password:</label>
                            <input type="password" id="confirmPassword" placeholder="Confirm Password" className="rounded p-2" value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <Notification type="alert" msg={formik.errors.confirmPassword} classes="p-2 rounded-b" />
                            )}
                        </div>
                        <div className="flex flex-col my-2">
                            <input type="submit" value="Sign In" className="rounded p-2 bg-blue-500 text-white cursor-pointer hover:bg-blue-400" />
                        </div>
                    </>
                }
            </>}
            {alert && (
                <Notification type={alert.type} msg={alert.msg} classes="p-2 rounded text-center" />
            )}
        </form>
    );
}
export default FormSignUp;