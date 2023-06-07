import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import ApiClass from "../../Api/api";
import SwalClass from "../../common/swal";
import _ from "lodash";

const Modal = ({ cryptoData }) => {

    const [loading, setLoading] = useState(false);

    const { values, handleSubmit, handleChange, errors, touched, setFieldValue } = useFormik({
        initialValues: {
            id: '',
            buy: '',
            buy_min: '',
            buy_max: '',
            buy_desc: '',
            buy_commission: '',
            buy_max_desc: '',
            buy_min_desc: '',
            buy_commission_type: '',
            sell: '',
            sell_commission: '',
            sell_min_desc: '',
            sell_max_desc: '',
            sell_min: '',
            sell_desc: '',
            sell_max: '',
            sell_commission_type: ''
        },
        validationSchema: Yup.object({
            buy_min: Yup.string().required('Min Limit is required.'),
            buy_max: Yup.string().required('Max Limit is required.'),
            buy_commission: Yup.string().required('Buy Commission is required.'),
            sell_commission: Yup.string().required('Sell Commission is required.'),
            buy_max_desc: Yup.string().required('Buy Max Description is required.'),
            buy_min_desc: Yup.string().required('Buy Min Description is required.'),
            buy_desc: Yup.string().required('Buy description is required.'),
            sell_min_desc: Yup.string().required('Sell Min description is required.'),
            sell_max_desc: Yup.string().required('Sell Max description is required.'),
            sell_min: Yup.string().required('Min Limit is required.'),
            sell_max: Yup.string().required('Max Limit is required.'),
            sell_desc: Yup.string().required('Sell description is required.'),
            buy: Yup.string().required('Buy Status is required.'),
            sell: Yup.string().required('Sell Status is required.')
        }),
        onSubmit: async (values) => {

            values.buy = JSON.parse(values.buy) ? 1 : 0;
            values.sell = JSON.parse(values.sell) ? 1 : 0;

            setLoading(true)
            let response = await ApiClass.updateRequest(`list-coins/update`, true, values);
            setLoading(false)
            if (!response?.data.hasOwnProperty("status_code")) {
                SwalClass.failed("Unable to Create at this time.")
                return
            }

            if (response?.data?.status_code == 0) {
                SwalClass.failed(response?.data?.message || '')
                return
            }
            if (response?.data?.status_code == 1) {
                SwalClass.success(response?.data?.message || '');
                document.getElementById('editcryptomodalbtn').click();
                return
            }
        }
    })
    useEffect(() => {
        let exists_keys = ["id","buy","buy_min","buy_max" ,"buy_desc","buy_commission","buy_max_desc","buy_min_desc","buy_commission_type","sell","sell_commission","sell_min_desc","sell_max_desc","sell_min","sell_desc","sell_max","sell_commission_type"];

        for (const key in cryptoData) {
            if(exists_keys.includes(key)){
                setFieldValue([key], cryptoData[key]);
            }
        }
    }, [cryptoData])


    return (
        <>
            <div className="modal fade common-modal" id="cryptolistmodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-uppercase d-flex align-items-center" id="exampleModalLabel">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M34.55 34.5q1.3 0 2.2-.95.9-.95.9-2.25t-.9-2.2q-.9-.9-2.2-.9-1.3 0-2.25.9t-.95 2.2q0 1.3.95 2.25t2.25.95Zm-.05 6.25q1.65 0 3-.7t2.3-2q-1.3-.7-2.6-1.05-1.3-.35-2.7-.35-1.4 0-2.725.35-1.325.35-2.575 1.05.95 1.3 2.275 2t3.025.7ZM24 44q-6.9-1.6-11.45-7.825Q8 29.95 8 21.9V9.95l16-6 16 6v13.5q-.7-.35-1.5-.625T37 22.45v-10.4l-13-4.8-13 4.8v9.85q0 3.8 1.225 7t3.125 5.625q1.9 2.425 4.2 4.025 2.3 1.6 4.45 2.3.3.6.9 1.35.6.75 1 1.15-.45.25-.95.375-.5.125-.95.275Zm10.65 0q-3.9 0-6.65-2.775-2.75-2.775-2.75-6.575 0-3.9 2.75-6.675t6.65-2.775q3.85 0 6.625 2.775t2.775 6.675q0 3.8-2.775 6.575Q38.5 44 34.65 44ZM24 24.05Z" /></svg>
                                &nbsp;Edit Listed Coin</h5>
                            <button type="button" className="btn p-0 border-0" data-bs-dismiss="modal" aria-label="Close" id="editcryptomodalbtn">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                            </button>
                        </div>
                        <div className="modal-body admin-form">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="text-center">
                                        <h5>Buy</h5>
                                    </div>
                                    <div className="col-md-6 col-xl-4">
                                        <div className="mb-3">
                                            <label htmlFor="staticName" className="col-form-label">Buy</label>
                                            <select className="form-select" aria-label=".form-select-lg" name="buy"
                                                value={values.buy || ''}
                                                onChange={handleChange}
                                            >
                                                <option value={true}>Active</option>
                                                <option value={false}>Not Active</option>
                                            </select>
                                        </div>
                                        {errors.buy && touched.buy && (<span className="text-danger form_err">{errors.buy}</span>)}
                                    </div>
                                    <div className="col-md-6 col-xl-4">
                                        <div className="mb-3">
                                            <label htmlFor="staticName" className="col-form-label">Min Limit</label>
                                            <div className="input-group">
                                                <input className="form-control" type="text" placeholder="Min" name="buy_min" value={values.buy_min || ''}
                                                    onChange={handleChange} />
                                                <span className="input-group-text">
                                                    <button type="button" className="btn p-0 border-0" style={{ backgroundColor: 'transparent' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="M22.55 42v-4.2q-2.85-.5-4.675-2.175Q16.05 33.95 15.25 31.4l2.8-1.15q.85 2.4 2.45 3.575Q22.1 35 24.35 35q2.4 0 3.95-1.2 1.55-1.2 1.55-3.3 0-2.2-1.375-3.4-1.375-1.2-5.175-2.45-3.6-1.15-5.375-3.05t-1.775-4.75q0-2.75 1.775-4.6 1.775-1.85 4.625-2.1V6h3v4.15q2.25.25 3.875 1.475T31.9 14.75l-2.8 1.2q-.7-1.6-1.875-2.325-1.175-.725-3.075-.725-2.3 0-3.65 1.05t-1.35 2.85q0 1.9 1.5 3.075 1.5 1.175 5.55 2.425 3.4 1.05 5.025 3.025Q32.85 27.3 32.85 30.3q0 3.15-1.85 5.075-1.85 1.925-5.45 2.475V42Z" /></svg>
                                                    </button>
                                                </span>
                                            </div>
                                            {errors.buy_min && touched.buy_min && (<span className="text-danger form_err">{errors.buy_min}</span>)}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-xl-4">
                                        <div className="mb-3">
                                            <label htmlFor="staticName" className="col-form-label">Max Limit</label>
                                            <div className="input-group">
                                                <input className="form-control" type="text" placeholder="Max" name="buy_max" value={values.buy_max || ''} onChange={handleChange} />
                                                <span className="input-group-text">
                                                    <button type="button" className="btn p-0 border-0" style={{ backgroundColor: 'transparent' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="M22.55 42v-4.2q-2.85-.5-4.675-2.175Q16.05 33.95 15.25 31.4l2.8-1.15q.85 2.4 2.45 3.575Q22.1 35 24.35 35q2.4 0 3.95-1.2 1.55-1.2 1.55-3.3 0-2.2-1.375-3.4-1.375-1.2-5.175-2.45-3.6-1.15-5.375-3.05t-1.775-4.75q0-2.75 1.775-4.6 1.775-1.85 4.625-2.1V6h3v4.15q2.25.25 3.875 1.475T31.9 14.75l-2.8 1.2q-.7-1.6-1.875-2.325-1.175-.725-3.075-.725-2.3 0-3.65 1.05t-1.35 2.85q0 1.9 1.5 3.075 1.5 1.175 5.55 2.425 3.4 1.05 5.025 3.025Q32.85 27.3 32.85 30.3q0 3.15-1.85 5.075-1.85 1.925-5.45 2.475V42Z" /></svg>
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticName" className="col-form-label">Buy Comission</label>
                                            <div className="d-flex gap-2">
                                                <select className="form-select" aria-label=".form-select-lg" name="buy_commission_type"
                                                    value={values.buy_commission_type || ''} onChange={handleChange}
                                                >
                                                    <option value="flat">Flat</option>
                                                    <option value="percentage">Percentage</option>
                                                </select>
                                                <div className="input-group">
                                                    <input className="form-control" type="text" placeholder="Commission" name="buy_commission" value={values.buy_commission || ''} onChange={handleChange} />
                                                    {values.buy_commission_type == "percentage" && <span className="input-group-text">
                                                        <button type="button" className="btn p-0 border-0" style={{ backgroundColor: 'transparent' }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="M14.5 21q-2.7 0-4.6-1.9Q8 17.2 8 14.5q0-2.7 1.9-4.6Q11.8 8 14.5 8q2.7 0 4.6 1.9 1.9 1.9 1.9 4.6 0 2.7-1.9 4.6-1.9 1.9-4.6 1.9Zm0-3q1.45 0 2.475-1.025Q18 15.95 18 14.5q0-1.45-1.025-2.475Q15.95 11 14.5 11q-1.45 0-2.475 1.025Q11 13.05 11 14.5q0 1.45 1.025 2.475Q13.05 18 14.5 18Zm19 22q-2.7 0-4.6-1.9-1.9-1.9-1.9-4.6 0-2.7 1.9-4.6 1.9-1.9 4.6-1.9 2.7 0 4.6 1.9 1.9 1.9 1.9 4.6 0 2.7-1.9 4.6-1.9 1.9-4.6 1.9Zm0-3q1.45 0 2.475-1.025Q37 34.95 37 33.5q0-1.45-1.025-2.475Q34.95 30 33.5 30q-1.45 0-2.475 1.025Q30 32.05 30 33.5q0 1.45 1.025 2.475Q32.05 37 33.5 37Zm-23.4 3L8 37.9 37.9 8l2.1 2.1Z" /></svg>
                                                        </button>
                                                    </span>}
                                                </div>
                                            </div>
                                            {errors.buy_commission && touched.buy_commission && (<span className="text-danger form_err">{errors.buy_commission}</span>)}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticName" className="col-form-label">Buy Min Description</label>
                                            <textarea className="form-control" name="buy_min_desc" id="" rows="2"
                                                value={values.buy_min_desc || ''}
                                                onChange={handleChange} ></textarea>
                                        </div>
                                        {errors.buy_min_desc && touched.buy_min_desc && (<span className="text-danger form_err">{errors.buy_min_desc}</span>)}
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticName" className="col-form-label">Buy Max Description</label>
                                            <textarea className="form-control" name="buy_max_desc" id="" rows="2"
                                                value={values.buy_max_desc || ''}
                                                onChange={handleChange} ></textarea>
                                        </div>
                                        {errors.buy_max_desc && touched.buy_max_desc && (<span className="text-danger form_err">{errors.buy_max_desc}</span>)}
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticName" className="col-form-label">Buy Description</label>
                                            <textarea className="form-control" name="buy_desc" id="" rows="2"
                                                value={values.buy_desc || ''}
                                                onChange={handleChange}></textarea>
                                        </div>
                                        {errors.buy_desc && touched.buy_desc && (<span className="text-danger form_err">{errors.buy_desc}</span>)}
                                    </div>
                                    <hr />
                                    <div className="text-center">
                                        <h5>Sell</h5>
                                    </div>
                                    <div className="col-md-6 col-xl-4">
                                        <div className="mb-3">
                                            <label htmlFor="staticName" className="col-form-label">Sell</label>
                                            <select className="form-select" aria-label=".form-select-lg" name="sell"
                                                value={values.sell || ''}
                                                onChange={handleChange}
                                            >
                                                <option value={true}>Active</option>
                                                <option value={false}>Not Active</option>
                                            </select>
                                        </div>
                                        {errors.sell && touched.sell && (<span className="text-danger form_err">{errors.sell}</span>)}
                                    </div>
                                    <div className="col-md-6 col-xl-4">
                                        <div className="mb-3">
                                            <label htmlFor="staticName" className="col-form-label">Min Limit</label>
                                            <div className="input-group">
                                                <input className="form-control" type="text" placeholder="Min" name="sell_min"
                                                    value={values.sell_min || ''}
                                                    onChange={handleChange} />
                                                <span className="input-group-text">
                                                    <button type="button" className="btn p-0 border-0" style={{ backgroundColor: 'transparent' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="M22.55 42v-4.2q-2.85-.5-4.675-2.175Q16.05 33.95 15.25 31.4l2.8-1.15q.85 2.4 2.45 3.575Q22.1 35 24.35 35q2.4 0 3.95-1.2 1.55-1.2 1.55-3.3 0-2.2-1.375-3.4-1.375-1.2-5.175-2.45-3.6-1.15-5.375-3.05t-1.775-4.75q0-2.75 1.775-4.6 1.775-1.85 4.625-2.1V6h3v4.15q2.25.25 3.875 1.475T31.9 14.75l-2.8 1.2q-.7-1.6-1.875-2.325-1.175-.725-3.075-.725-2.3 0-3.65 1.05t-1.35 2.85q0 1.9 1.5 3.075 1.5 1.175 5.55 2.425 3.4 1.05 5.025 3.025Q32.85 27.3 32.85 30.3q0 3.15-1.85 5.075-1.85 1.925-5.45 2.475V42Z" /></svg>
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                        {errors.sell_min && touched.sell_min && (<span className="text-danger form_err">{errors.sell_min}</span>)}
                                    </div>
                                    <div className="col-md-6 col-xl-4">
                                        <div className="mb-3">
                                            <label htmlFor="staticName" className="col-form-label">Max Limit</label>
                                            <div className="input-group">
                                                <input className="form-control" type="text" placeholder="Max" name="sell_max"
                                                    value={values.sell_max || ''}
                                                    onChange={handleChange} />
                                                <span className="input-group-text">
                                                    <button type="button" className="btn p-0 border-0" style={{ backgroundColor: 'transparent' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="M22.55 42v-4.2q-2.85-.5-4.675-2.175Q16.05 33.95 15.25 31.4l2.8-1.15q.85 2.4 2.45 3.575Q22.1 35 24.35 35q2.4 0 3.95-1.2 1.55-1.2 1.55-3.3 0-2.2-1.375-3.4-1.375-1.2-5.175-2.45-3.6-1.15-5.375-3.05t-1.775-4.75q0-2.75 1.775-4.6 1.775-1.85 4.625-2.1V6h3v4.15q2.25.25 3.875 1.475T31.9 14.75l-2.8 1.2q-.7-1.6-1.875-2.325-1.175-.725-3.075-.725-2.3 0-3.65 1.05t-1.35 2.85q0 1.9 1.5 3.075 1.5 1.175 5.55 2.425 3.4 1.05 5.025 3.025Q32.85 27.3 32.85 30.3q0 3.15-1.85 5.075-1.85 1.925-5.45 2.475V42Z" /></svg>
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                        {errors.sell_max && touched.sell_max && (<span className="text-danger form_err">{errors.sell_max}</span>)}
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticName" className="col-form-label">Sell Comission</label>
                                            <div className="d-flex gap-2">
                                                <select className="form-select" aria-label=".form-select-lg" name="sell_commission_type"
                                                    value={values.sell_commission_type || ''} onChange={handleChange}
                                                >
                                                    <option value="current">Flat</option>
                                                    <option value="percentage">Percentage</option>
                                                </select>
                                                <div className="input-group">
                                                    <input className="form-control" type="text" placeholder="Commission" name="sell_commission"
                                                        value={values.sell_commission || ''}
                                                        onChange={handleChange} />
                                                    {values.sell_commission_type == "percentage" && <span className="input-group-text">
                                                        <button type="button" className="btn p-0 border-0" style={{ backgroundColor: 'transparent' }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="M14.5 21q-2.7 0-4.6-1.9Q8 17.2 8 14.5q0-2.7 1.9-4.6Q11.8 8 14.5 8q2.7 0 4.6 1.9 1.9 1.9 1.9 4.6 0 2.7-1.9 4.6-1.9 1.9-4.6 1.9Zm0-3q1.45 0 2.475-1.025Q18 15.95 18 14.5q0-1.45-1.025-2.475Q15.95 11 14.5 11q-1.45 0-2.475 1.025Q11 13.05 11 14.5q0 1.45 1.025 2.475Q13.05 18 14.5 18Zm19 22q-2.7 0-4.6-1.9-1.9-1.9-1.9-4.6 0-2.7 1.9-4.6 1.9-1.9 4.6-1.9 2.7 0 4.6 1.9 1.9 1.9 1.9 4.6 0 2.7-1.9 4.6-1.9 1.9-4.6 1.9Zm0-3q1.45 0 2.475-1.025Q37 34.95 37 33.5q0-1.45-1.025-2.475Q34.95 30 33.5 30q-1.45 0-2.475 1.025Q30 32.05 30 33.5q0 1.45 1.025 2.475Q32.05 37 33.5 37Zm-23.4 3L8 37.9 37.9 8l2.1 2.1Z" /></svg>
                                                        </button>
                                                    </span>}
                                                </div>
                                            </div>
                                            {errors.sell_commission && touched.sell_commission && (<span className="text-danger form_err">{errors.sell_commission}</span>)}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticName" className="col-form-label">Sell Min Description</label>
                                            <textarea className="form-control" name="sell_min_desc" id="" rows="2"
                                                value={values.sell_min_desc || ''}
                                                onChange={handleChange}></textarea>
                                        </div>
                                        {errors.sell_min_desc && touched.sell_min_desc && (<span className="text-danger form_err">{errors.sell_min_desc}</span>)}
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticName" className="col-form-label">Sell Max Description</label>
                                            <textarea className="form-control" name="sell_max_desc" id="" rows="2"
                                                value={values.sell_max_desc || ''}
                                                onChange={handleChange}></textarea>
                                        </div>
                                        {errors.sell_max_desc && touched.sell_max_desc && (<span className="text-danger form_err">{errors.sell_max_desc}</span>)}
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticName" className="col-form-label">Sell Description</label>
                                            <textarea className="form-control" name="sell_desc" id="" rows="2"
                                                value={values.sell_desc || ''}
                                                onChange={handleChange}></textarea>
                                        </div>
                                        {errors.sell_desc && touched.sell_desc && (<span className="text-danger form_err">{errors.sell_desc}</span>)}
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
export default Modal;