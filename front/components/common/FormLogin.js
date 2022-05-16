import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { LogIn } from "../actionsMap"
import Notification from "./Notification";
import Spinner from "./Spinner";

const FormLogin = () => {
    const dispatch = useDispatch();
    const { alert, loading } = useSelector(state => state.user);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("The email is not valid")
                .required("Email is required"),
            password: Yup.string()
                .required("Password is required"),
        }),
        onSubmit: (values) => {
            const usuario = {
                name: values.name,
                email: values.email,
                password: values.password,
            };
            dispatch(LogIn(usuario));
        },
    });

    return (
        <form className="max-w-[95%] md:max-w-[70%] lg:max-w-[50%] my-0 mx-auto my-5 p-5 shadow-gray-400 rounded bg-gray-200 shadow" onSubmit={formik.handleSubmit}>
            {loading ? <Spinner /> : <>
                <h1 className="text-center text-lg font-bold">Log In</h1>
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
                    <input type="submit" value="Log In" className="rounded p-2 bg-blue-500 text-white cursor-pointer hover:bg-blue-400" />
                </div>
            </>}
            {alert && (
                <Notification type={alert.type} msg={alert.msg} classes="p-2 rounded text-center" />
            )}
        </form>
    );
}
export default FormLogin;