import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Api from "../../Api/api.js";
import SwalClass from "../../common/swal.js";
import Sidebar from "../../layout/Sidebar.jsx";
import { clearState } from "../../../Redux/userReducer.js";
import { useDispatch } from "react-redux";
import { clearActive } from "../../../Redux/userActivePage.js";
const ChangePssword = ({ActivePage}) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [showEye, setShowEye] = useState(true);
    const [showEyePassWord, setShowEyePassWord] = useState(true)
    const [showEyePassWords, setShowEyePassWords] = useState(true)
    const changeInput = () => {
        setShowEye(!showEye);
        let element = document.getElementById('confirm_password_type');
        element.type == "text" ? element.type = "password" : element.type = "text";

    }
    const changeEye = () => {
        setShowEyePassWord(!showEyePassWord);
        let element = document.getElementById('password_type');
        element.type == "text" ? element.type = "password" : element.type = "text";
    }
    const changeEyes = () => {
        setShowEyePassWords(!showEyePassWords);
        let element = document.getElementById('password_types');
        element.type == "text" ? element.type = "password" : element.type = "text";
    }

    const formik = useFormik({
        initialValues: {
            old_password: '',
            new_password: '',
            confirm_password: '',
        },
        validationSchema: Yup.object({
            old_password: Yup.string().required('Old Password is required.'),
            new_password: Yup.string().required('New Password is required.').min(8, 'The password must be at least 8 characters.'),
            confirm_password: Yup.string().required('Please Confirm Your Password.').oneOf([Yup.ref('new_password'), null], 'Confirm password must be match.'),
        }),
        onSubmit: async (values) => {
            setLoading(true)
            let response = await Api.postRequest("change_password", true, values);
            setLoading(false)
            if (response?.data?.status_code == 1) {
                SwalClass.success(response?.data?.message);
                resetForm();
                dispatch(clearState())
                dispatch(clearActive())

            }
            if (response?.data?.status_code == 0) {
                SwalClass.failed(response?.data?.message);
            }
        }
    })
    const { values, handleSubmit, handleChange, errors, touched, resetForm, setFieldValue } = formik;
    return (

        <>

            <section className="dashboard-sec d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-sm-9 col-md-6 col-xl-4 col-xxl-3">
                            <div className="auth-box rounded" style={{ backgroundColor: 'var(--side-bg)' }}>
                                <div className="d-flex p-3 justify-content-between align-items-center mb-3 border-bottom">
                                    <div className="auth-left">
                                        <h6 className="mb-2 text-capitalize">
                                            Change Password?</h6>
                                        <p className="mb-0 text-capitalize">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 48 48" fill="var(--blue)"><path d="M24 44 6 33.7V13.75L24 4l18 9.75V33.7Zm-5.7-24.9q1.15-1.15 2.625-1.875Q22.4 16.5 24 16.5t3.075.725q1.475.725 2.625 1.875l7.65-4.5L24 7.5l-13.35 7.1Zm4.2 20.6v-8.35q-2.6-.7-4.3-2.7-1.7-2-1.7-4.65 0-.55.075-1.125t.275-1.125L9 17.1v14.85ZM24 28.5q1.9 0 3.2-1.3 1.3-1.3 1.3-3.2 0-1.9-1.3-3.2-1.3-1.3-3.2-1.3-1.9 0-3.2 1.3-1.3 1.3-1.3 3.2 0 1.9 1.3 3.2 1.3 1.3 3.2 1.3Zm1.5 11.2L39 31.95V17.1l-7.85 4.65q.2.55.275 1.125.075.575.075 1.125 0 2.65-1.7 4.65-1.7 2-4.3 2.7Z" /></svg>&nbsp;Change Password
                                        </p>
                                    </div>
                                    <div className="auth-right">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="70" width="70" viewBox="0 0 48 48" fill='var(--white)'><path d="M26 42.2q-3.45 0-6.7-1.3t-5.65-3.55l2.15-2.15q2 1.85 4.675 2.925Q23.15 39.2 26 39.2q6.25 0 10.725-4.475T41.2 24q0-6.25-4.475-10.725T26 8.8q-6.25 0-10.725 4.475T10.8 24v.9l3.5-3.5 2.1 2.1-7.1 7.1-7.1-7.1 2.1-2.1 3.5 3.5V24q0-3.8 1.425-7.1t3.9-5.775Q15.6 8.65 18.9 7.225 22.2 5.8 26 5.8t7.1 1.425q3.3 1.425 5.775 3.9 2.475 2.475 3.9 5.775Q44.2 20.2 44.2 24q0 7.6-5.3 12.9-5.3 5.3-12.9 5.3Zm-4-10.45q-.7 0-1.225-.525Q20.25 30.7 20.25 30v-6q0-.7.575-1.225.575-.525 1.425-.525V20q0-1.55 1.1-2.65 1.1-1.1 2.65-1.1 1.55 0 2.65 1.1 1.1 1.1 1.1 2.65v2.25q.85 0 1.425.525.575.525.575 1.225v6q0 .7-.525 1.225-.525.525-1.225.525Zm1.75-9.5h4.5V20q0-.95-.65-1.6-.65-.65-1.6-.65-.95 0-1.6.65-.65.65-.65 1.6Z" /></svg>
                                    </div>
                                </div>
                                <div className="auth-form p-3 ">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <div className="input-group">
                                                <input id="password_type" className="form-control" type="password" placeholder="Enter Old Password" name="old_password" defaultValue={values.new_password} onChange={handleChange} />
                                                <span className="input-group-text">
                                                    <button type="button" className="btn p-0 border-0" style={{ backgroundColor: 'transparent' }} onClick={() => changeEye()}>
                                                        {showEyePassWord ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox='0 0 48 48' fill='var(--white)'><path d="M24 31.5q3.55 0 6.025-2.475Q32.5 26.55 32.5 23q0-3.55-2.475-6.025Q27.55 14.5 24 14.5q-3.55 0-6.025 2.475Q15.5 19.45 15.5 23q0 3.55 2.475 6.025Q20.45 31.5 24 31.5Zm0-2.9q-2.35 0-3.975-1.625T18.4 23q0-2.35 1.625-3.975T24 17.4q2.35 0 3.975 1.625T29.6 23q0 2.35-1.625 3.975T24 28.6Zm0 9.4q-7.3 0-13.2-4.15Q4.9 29.7 2 23q2.9-6.7 8.8-10.85Q16.7 8 24 8q7.3 0 13.2 4.15Q43.1 16.3 46 23q-2.9 6.7-8.8 10.85Q31.3 38 24 38Zm0-15Zm0 12q6.05 0 11.125-3.275T42.85 23q-2.65-5.45-7.725-8.725Q30.05 11 24 11t-11.125 3.275Q7.8 17.55 5.1 23q2.7 5.45 7.775 8.725Q17.95 35 24 35Z" /></svg>
                                                            :
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox='0 0 48 48' fill='var(--white)'><path d="m31.45 27.05-2.2-2.2q1.3-3.55-1.35-5.9-2.65-2.35-5.75-1.2l-2.2-2.2q.85-.55 1.9-.8 1.05-.25 2.15-.25 3.55 0 6.025 2.475Q32.5 19.45 32.5 23q0 1.1-.275 2.175-.275 1.075-.775 1.875Zm6.45 6.45-2-2q2.45-1.8 4.275-4.025Q42 25.25 42.85 23q-2.5-5.55-7.5-8.775Q30.35 11 24.5 11q-2.1 0-4.3.4-2.2.4-3.45.95L14.45 10q1.75-.8 4.475-1.4Q21.65 8 24.25 8q7.15 0 13.075 4.075Q43.25 16.15 46 23q-1.3 3.2-3.35 5.85-2.05 2.65-4.75 4.65Zm2.9 11.3-8.4-8.25q-1.75.7-3.95 1.075T24 38q-7.3 0-13.25-4.075T2 23q1-2.6 2.775-5.075T9.1 13.2L2.8 6.9l2.1-2.15L42.75 42.6ZM11.15 15.3q-1.85 1.35-3.575 3.55Q5.85 21.05 5.1 23q2.55 5.55 7.675 8.775Q17.9 35 24.4 35q1.65 0 3.25-.2t2.4-.6l-3.2-3.2q-.55.25-1.35.375T24 31.5q-3.5 0-6-2.45T15.5 23q0-.75.125-1.5T16 20.15Zm15.25 7.1Zm-5.8 2.9Z" /></svg>
                                                        }
                                                    </button>
                                                </span>
                                            </div>
                                            {errors.old_password && touched.old_password && (<span className="text-danger form_err">{errors.old_password}</span>)}
                                        </div>
                                        <div className="mb-3">
                                            <div className="input-group ">

                                                <input id="confirm_password_type" className="form-control" type="password" placeholder="Enter New Password" name="new_password" defaultValue={values.new_password} onChange={handleChange} />
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
                                            {errors.new_password && touched.new_password && (<span className="text-danger form_err">{errors.new_password}</span>)}
                                        </div>
                                        <div className="mb-3">
                                            <div className="input-group">
                                                <input id="password_types" className="form-control" type="password" placeholder="Enter New Password" name="confirm_password" defaultValue={values.confirm_password} onChange={handleChange} />
                                                <span className="input-group-text">
                                                    <button type="button" className="btn p-0 border-0" style={{ backgroundColor: 'transparent' }} onClick={() => changeEyes()}>
                                                        {showEyePassWords ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox='0 0 48 48' fill='var(--white)'><path d="M24 31.5q3.55 0 6.025-2.475Q32.5 26.55 32.5 23q0-3.55-2.475-6.025Q27.55 14.5 24 14.5q-3.55 0-6.025 2.475Q15.5 19.45 15.5 23q0 3.55 2.475 6.025Q20.45 31.5 24 31.5Zm0-2.9q-2.35 0-3.975-1.625T18.4 23q0-2.35 1.625-3.975T24 17.4q2.35 0 3.975 1.625T29.6 23q0 2.35-1.625 3.975T24 28.6Zm0 9.4q-7.3 0-13.2-4.15Q4.9 29.7 2 23q2.9-6.7 8.8-10.85Q16.7 8 24 8q7.3 0 13.2 4.15Q43.1 16.3 46 23q-2.9 6.7-8.8 10.85Q31.3 38 24 38Zm0-15Zm0 12q6.05 0 11.125-3.275T42.85 23q-2.65-5.45-7.725-8.725Q30.05 11 24 11t-11.125 3.275Q7.8 17.55 5.1 23q2.7 5.45 7.775 8.725Q17.95 35 24 35Z" /></svg>
                                                            :
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox='0 0 48 48' fill='var(--white)'><path d="m31.45 27.05-2.2-2.2q1.3-3.55-1.35-5.9-2.65-2.35-5.75-1.2l-2.2-2.2q.85-.55 1.9-.8 1.05-.25 2.15-.25 3.55 0 6.025 2.475Q32.5 19.45 32.5 23q0 1.1-.275 2.175-.275 1.075-.775 1.875Zm6.45 6.45-2-2q2.45-1.8 4.275-4.025Q42 25.25 42.85 23q-2.5-5.55-7.5-8.775Q30.35 11 24.5 11q-2.1 0-4.3.4-2.2.4-3.45.95L14.45 10q1.75-.8 4.475-1.4Q21.65 8 24.25 8q7.15 0 13.075 4.075Q43.25 16.15 46 23q-1.3 3.2-3.35 5.85-2.05 2.65-4.75 4.65Zm2.9 11.3-8.4-8.25q-1.75.7-3.95 1.075T24 38q-7.3 0-13.25-4.075T2 23q1-2.6 2.775-5.075T9.1 13.2L2.8 6.9l2.1-2.15L42.75 42.6ZM11.15 15.3q-1.85 1.35-3.575 3.55Q5.85 21.05 5.1 23q2.55 5.55 7.675 8.775Q17.9 35 24.4 35q1.65 0 3.25-.2t2.4-.6l-3.2-3.2q-.55.25-1.35.375T24 31.5q-3.5 0-6-2.45T15.5 23q0-.75.125-1.5T16 20.15Zm15.25 7.1Zm-5.8 2.9Z" /></svg>
                                                        }
                                                    </button>
                                                </span>
                                            </div>
                                            {errors.confirm_password && touched.confirm_password && (<span className="text-danger form_err">{errors.confirm_password}</span>)}
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
                                                <input type="submit" className="btn" value="Change Password" />
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

        </>
    )
}
export default ChangePssword;