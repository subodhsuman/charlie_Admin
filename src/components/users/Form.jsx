import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import ApiClass from "../../Api/api";
import SwalClass from "../../common/swal";

const Form = ({ }) => {
    const [loading, setLoading] = useState(false);
    const [showEye, setShowEye] = useState(true);
    const [showEyePassWord, setShowEyePassWord] = useState(true)

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
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            referral: '',
            role: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required').max(20, 'Name should not be greater than 20 characters.'),
            email: Yup.string().required('Email is required').email('Invalid Email Format'),
            password: Yup.string().required('Password is required').min(8, 'The password must be at least 8 characters.'),
            confirm_password: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password'), null], 'Confirm password must be match'),
            referral: Yup.string().min(10, 'Referral must be atleast 10 characters.').max(10, 'Referral should not be greater than 10 characters.'),
            role: Yup.string().required('Role is required')
        }),
        onSubmit: async (values) => {
            setLoading(true)
            let response = await ApiClass.postRequest('users/create', true, values);
            setLoading(false)
            if (response?.data?.status_code == 0) {
                SwalClass.failed(response?.data?.message || '');
                return
            }
            if (response?.data?.status_code == 1) {
                SwalClass.success(response?.data?.message || '');
                document.getElementById('userformClose').click();
                getUsers();
                resetForm();
                return
            }
        }
    })
    const { values, handleSubmit, handleChange, errors, touched, resetForm } = formik;
    return (
        <>
            <div className="modal fade common-modal" id="adduserModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-uppercase d-flex align-items-center" id="exampleModalLabel">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M36.5 28v-6.5H30v-3h6.5V12h3v6.5H46v3h-6.5V28ZM18 23.95q-3.3 0-5.4-2.1-2.1-2.1-2.1-5.4 0-3.3 2.1-5.4 2.1-2.1 5.4-2.1 3.3 0 5.4 2.1 2.1 2.1 2.1 5.4 0 3.3-2.1 5.4-2.1 2.1-5.4 2.1ZM2 40v-4.7q0-1.75.875-3.175Q3.75 30.7 5.4 30q3.75-1.65 6.675-2.325Q15 27 18 27t5.9.675q2.9.675 6.65 2.325 1.65.75 2.55 2.15.9 1.4.9 3.15V40Zm3-3h26v-1.7q0-.8-.45-1.525-.45-.725-1.2-1.075-3.55-1.65-6-2.175Q20.9 30 18 30q-2.9 0-5.375.525T6.6 32.7q-.75.35-1.175 1.075Q5 34.5 5 35.3Zm13-16.05q1.95 0 3.225-1.275Q22.5 18.4 22.5 16.45q0-1.95-1.275-3.225Q19.95 11.95 18 11.95q-1.95 0-3.225 1.275Q13.5 14.5 13.5 16.45q0 1.95 1.275 3.225Q16.05 20.95 18 20.95Zm0-4.5ZM18 37Z" /></svg>&nbsp;
                                Add New User </h5>
                            <button type="button" className="btn p-0 border-0" data-bs-dismiss="modal" aria-label="Close" id="userformClose">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                            </button>
                        </div>
                        <div className="modal-body admin-form">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticName" className="col-form-label">Name</label>
                                            <input className="form-control" type="text" placeholder="Enter Name" name="name" defaultValue={values.name} onChange={handleChange} />
                                            {errors.name && touched.name && (<span className="text-danger form_err">{errors.name}</span>)}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticEmail" className="col-form-label">Email</label>
                                            <input className="form-control" type="text" placeholder="Enter Email" name="email" defaultValue={values.email} onChange={handleChange} />
                                            {errors.email && touched.email && (<span className="text-danger form_err">{errors.email}</span>)}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticPassword" className="col-form-label">Password</label>
                                            <div className="input-group">
                                                <input id="password_type" className="form-control" type="password" placeholder="Enter Password" name="password" defaultValue={values.password} onChange={handleChange} />
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
                                            {errors.password && touched.password && (<span className="text-danger form_err">{errors.password}</span>)}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticConfirmPassword" className="col-form-label">Confirm Password</label>
                                            <div className="input-group">
                                            <input id="confirm_password_type" className="form-control" type="password" placeholder="Confirm Password" name="confirm_password" defaultValue={values.confirm_password} onChange={handleChange} />
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
                                           
                                            {errors.confirm_password && touched.confirm_password && (<span className="text-danger form_err">{errors.confirm_password}</span>)}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticReferral" className="col-form-label">ReferralBy</label>
                                            <input className="form-control" type="text" placeholder="Enter Referral" name="referral" defaultValue={values.referral} onChange={handleChange} />
                                            {errors.referral && touched.referral && (<span className="text-danger form_err">{errors.referral}</span>)}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="Status" className="col-form-label">Role</label>

                                            <select className="form-select" aria-label=".form-select-lg" name="role" value={values.role || ''} onChange={handleChange}>
                                                <option value="">Select User Type...</option>
                                                <option value="user">User</option>
                                                <option value="subadmin">Sub-Admin</option>
                                            </select>
                                                 {errors.role && touched.role && (<span className="text-danger form_err">{errors.role}</span>)}
                                        </div>

                                    </div>
                                    <div className="col-md-12">
                                        <div className="export-btn text-center">
                                            {loading ?
                                                <button className="btn" type="button" disabled>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        Loading...
                                                    </div>
                                                </button>
                                                :
                                                <input type="submit" className="btn" value="Submit" />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Form;