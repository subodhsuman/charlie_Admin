import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import ApiClass from "../../Api/api.js";
import SwalClass from "../../common/swal.js";
import { useNavigate } from "react-router-dom";
import _ from 'lodash';
import { clearState, loginUser } from "../../../Redux/userReducer.js";
import { useDispatch } from "react-redux";
const Login = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showEye, setShowEye] = useState(true)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email is required').email('Invalid Email Format'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: async (values) => {
            setLoading(true)
            let response = await ApiClass.postRequest('login', false, values);

            if (response?.data?.status_code == 0) {
                SwalClass.failed(response?.data?.message || '')
                setLoading(false)
                return
            }
            if (response?.data?.status_code == 1) {
                SwalClass.success(response?.data?.message || '');
                dispatch(loginUser(response?.data?.data));
                localStorage.setItem("token", response.data?.data?.token);
                resetForm();
            }
        }
    })
    

    // if (!localStorage.getItem("token")) {
    //     localStorage.clear();
    //     dispatch(clearState());
    // }
    const { values, handleSubmit, handleChange, errors, touched, resetForm } = formik;

    const changeInput = () => {
        setShowEye(!showEye);
        let element = document.getElementById('login_password');
        element.type == "text" ? element.type = "password" : element.type = "text";
    }
    return (
        <>
            <section className="auth-sec">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-sm-9 col-md-6 col-xl-4 col-xxl-3">
                            <div className="auth-box rounded">
                                <div className="d-flex p-3 justify-content-between align-items-center mb-3 border-bottom">
                                    <div className="auth-left">
                                        <h6 className="mb-2 text-capitalize">
                                            welcome to charlie exchange</h6>
                                        <p className="mb-0 text-capitalize">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 48 48" fill="var(--blue)"><path d="M24 44 6 33.7V13.75L24 4l18 9.75V33.7Zm-5.7-24.9q1.15-1.15 2.625-1.875Q22.4 16.5 24 16.5t3.075.725q1.475.725 2.625 1.875l7.65-4.5L24 7.5l-13.35 7.1Zm4.2 20.6v-8.35q-2.6-.7-4.3-2.7-1.7-2-1.7-4.65 0-.55.075-1.125t.275-1.125L9 17.1v14.85ZM24 28.5q1.9 0 3.2-1.3 1.3-1.3 1.3-3.2 0-1.9-1.3-3.2-1.3-1.3-3.2-1.3-1.9 0-3.2 1.3-1.3 1.3-1.3 3.2 0 1.9 1.3 3.2 1.3 1.3 3.2 1.3Zm1.5 11.2L39 31.95V17.1l-7.85 4.65q.2.55.275 1.125.075.575.075 1.125 0 2.65-1.7 4.65-1.7 2-4.3 2.7Z" /></svg>&nbsp;sign in
                                        </p>
                                    </div>
                                    <div className="auth-right">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="70" width="70" viewBox="0 0 48 48" fill='var(--white)'><path d="m31.15 29.95 1.6-1.6-4.4-4.4q.55-.85.925-1.775.375-.925.375-1.925 0-2.85-1.95-4.8-1.95-1.95-4.8-1.95-2.85 0-4.8 1.95-1.95 1.95-1.95 4.8 0 2.85 1.95 4.8Q20.05 27 22.9 27q1.1 0 2.075-.375.975-.375 1.925-.925ZM22.9 24.5q-1.75 0-3-1.25t-1.25-3q0-1.75 1.25-3t3-1.25q1.75 0 3 1.25t1.25 3q0 1.75-1.25 3t-3 1.25ZM3.5 42q-.65 0-1.075-.425Q2 41.15 2 40.5q0-.65.425-1.075Q2.85 39 3.5 39h41q.65 0 1.075.425Q46 39.85 46 40.5q0 .65-.425 1.075Q45.15 42 44.5 42ZM7 36q-1.2 0-2.1-.9Q4 34.2 4 33V9q0-1.2.9-2.1Q5.8 6 7 6h34q1.2 0 2.1.9.9.9.9 2.1v24q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h34V9H7v24Zm0 0V9v24Z" /></svg>
                                    </div>
                                </div>
                                <div className="auth-form p-3 border-bottom">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 48 48" fill="var(--white)"><path d="M7 40q-1.2 0-2.1-.9Q4 38.2 4 37V11q0-1.2.9-2.1Q5.8 8 7 8h34q1.2 0 2.1.9.9.9.9 2.1v26q0 1.2-.9 2.1-.9.9-2.1.9Zm17-15.1L7 13.75V37h34V13.75Zm0-3L40.8 11H7.25ZM7 13.75V11v26Z" /></svg>
                                                </span>
                                                <input type="text" className="form-control" placeholder="Enter Email" name="email" value={values.email || ''} onChange={handleChange} />
                                            </div>
                                            {errors.email && touched.email && (<span className="text-danger form_err">{errors.email}</span>)}
                                        </div>
                                        <div className="mb-3">
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 48 48" fill="var(--white)"><path d="M14 27.4q-1.4 0-2.4-1t-1-2.4q0-1.4 1-2.4t2.4-1q1.4 0 2.4 1t1 2.4q0 1.4-1 2.4t-2.4 1Zm0 8.6q-5 0-8.5-3.5T2 24q0-5 3.5-8.5T14 12q3.6 0 6.3 1.7 2.7 1.7 4.25 5.15h17.8L48 24.5l-8.35 7.65-4.4-3.2-4.4 3.2-3.75-3h-2.55q-1.25 3-3.925 4.925Q17.95 36 14 36Zm0-3q2.9 0 5.35-1.925 2.45-1.925 3.15-4.925h5.7l2.7 2.25 4.4-3.15 4.1 3.1 4.25-3.95-2.55-2.55H22.5q-.6-2.8-3-4.825Q17.1 15 14 15q-3.75 0-6.375 2.625T5 24q0 3.75 2.625 6.375T14 33Z" /></svg>
                                                </span>
                                                <input id="login_password" type="password" className="form-control" placeholder="Enter Password" name="password" value={values.password || ''} onChange={handleChange} />
                                                <span className="input-group-text">
                                                    <button type="button" className="btn p-0 border-0" style={{ backgroundColor: 'transparent' }} onClick={() => changeInput()}>
                                                        {showEye ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox='0 0 48 48' fill='var(--white)'><path d="M24 31.5q3.55 0 6.025-2.475Q32.5 26.55 32.5 23q0-3.55-2.475-6.025Q27.55 14.5 24 14.5q-3.55 0-6.025 2.475Q15.5 19.45 15.5 23q0 3.55 2.475 6.025Q20.45 31.5 24 31.5Zm0-2.9q-2.35 0-3.975-1.625T18.4 23q0-2.35 1.625-3.975T24 17.4q2.35 0 3.975 1.625T29.6 23q0 2.35-1.625 3.975T24 28.6Zm0 9.4q-7.3 0-13.2-4.15Q4.9 29.7 2 23q2.9-6.7 8.8-10.85Q16.7 8 24 8q7.3 0 13.2 4.15Q43.1 16.3 46 23q-2.9 6.7-8.8 10.85Q31.3 38 24 38Zm0-15Zm0 12q6.05 0 11.125-3.275T42.85 23q-2.65-5.45-7.725-8.725Q30.05 11 24 11t-11.125 3.275Q7.8 17.55 5.1 23q2.7 5.45 7.775 8.725Q17.95 35 24 35Z" /></svg>
                                                            :
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox='0 0 48 48' fill='var(--white)'><path d="m31.45 27.05-2.2-2.2q1.3-3.55-1.35-5.9-2.65-2.35-5.75-1.2l-2.2-2.2q.85-.55 1.9-.8 1.05-.25 2.15-.25 3.55 0 6.025 2.475Q32.5 19.45 32.5 23q0 1.1-.275 2.175-.275 1.075-.775 1.875Zm6.45 6.45-2-2q2.45-1.8 4.275-4.025Q42 25.25 42.85 23q-2.5-5.55-7.5-8.775Q30.35 11 24.5 11q-2.1 0-4.3.4-2.2.4-3.45.95L14.45 10q1.75-.8 4.475-1.4Q21.65 8 24.25 8q7.15 0 13.075 4.075Q43.25 16.15 46 23q-1.3 3.2-3.35 5.85-2.05 2.65-4.75 4.65Zm2.9 11.3-8.4-8.25q-1.75.7-3.95 1.075T24 38q-7.3 0-13.25-4.075T2 23q1-2.6 2.775-5.075T9.1 13.2L2.8 6.9l2.1-2.15L42.75 42.6ZM11.15 15.3q-1.85 1.35-3.575 3.55Q5.85 21.05 5.1 23q2.55 5.55 7.675 8.775Q17.9 35 24.4 35q1.65 0 3.25-.2t2.4-.6l-3.2-3.2q-.55.25-1.35.375T24 31.5q-3.5 0-6-2.45T15.5 23q0-.75.125-1.5T16 20.15Zm15.25 7.1Zm-5.8 2.9Z" /></svg>
                                                        }
                                                    </button>
                                                </span>
                                            </div>
                                            {errors.password && touched.password && (<span className="text-danger form_err">{errors.password}</span>)}
                                        </div>
                                        <div className="text-center">
                                            {loading ?
                                                <button className="btn " type="button" disabled>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        Loading...
                                                    </div>
                                                </button>
                                                :
                                                <input type="submit" className="btn" value="Login" />
                                            }
                                        </div>
                                    </form>
                                </div>
                                {/* <div className="forgot text-center p-3">
                                    <Link to="/forgot-password" className="text-decoration-none text-capitalize">forgot password?</Link>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Login;