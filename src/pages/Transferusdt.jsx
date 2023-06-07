import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import ApiClass from "../Api/api.js";
import SwalClass from '../common/swal.js'
import Heading from '../components/Utils/Heading'
import { onHandleKeyDown, onHandleKeyPress, onHandleKeyUp, onHandlePaste } from "../common/InputText.js";

function Transferusdt() {
    const [data, setData] = useState();
    const [loader, setLoader] = useState(true)
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            from_id: '',
            amount: '',
            to_id: ''
        },
        validationSchema: Yup.object({
            from_id: Yup.string().required('Must Be required.'),
            to_id: Yup.string().required('Must Be required.'),
            amount: Yup.number().required("Amount is Required.").moreThan(0, "Amount should be greater than 0."),
        }),
        onSubmit: async (values) => {
            setLoading(true)
            if (values.from_id == values.to_id) {
                return SwalClass.failed('Both user Cannot be Same');
            }
            if (values.from_id != values.to_id) {
                let response = await ApiClass.postNodeRequest(`P2P/P2POrder/P2pTransfer`, true, values);
                if (response?.data?.status_code == 1) {
                    setLoading(false)
                    SwalClass.success(response?.data?.message);
                    resetForm();
                }
                if (response?.data?.status_code == 0) {
                    setLoading(false)
                    SwalClass.failed(response?.data?.message);
                    resetForm();
                    return
                }
            }
        }
    })

    const getapi = async () => {
        // let response = await ApiClass.getNodeRequest(`P2P/P2POrder/P2pUser`, true);
        // setLoader(false);
        // if (response?.data?.status_code == 1) {
        //     SwalClass.success(response?.data?.message);
        //     setData(response?.data?.data);
        //     return
        // }
        // if (response?.data?.status_code == 0) {
        //     SwalClass.success(response?.data?.message);
        //     return
        // }
        let response = await ApiClass.getRequest(`users/get`, true);
        setLoader(false);
        if (response?.data?.status_code == 1) {
            setData(response?.data?.data?.data || []);
        }
        if (response?.data?.status_code == 0) {
            return
        }
    }

    useEffect(() => {
        setLoader(true)
        getapi()
    }, [])

    const { values, handleSubmit, handleChange, errors, touched, resetForm } = formik;
    return (
        <section className="dashboard-sec">
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center">
                    <Heading
                        text="Transfer USDT"
                        image="p2p.webp"
                    />
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={handleSubmit} className="trnsfr_usd">
                            {loader ?
                                <div className="loader-outer d-flex align-items-center justify-content-center" style={{ minHeight: '40vh' }}>
                                    <div className="spinner-border" role="status" style={{ height: '70px', width: '70px' }}>
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                :
                                <div className="row justify-content-center align-items-end">
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="staticName" className="col-form-label">Transfer From Users</label>
                                            <select className="form-select" aria-label=".form-select-lg" name="from_id" value={values.from_id || ''} onChange={handleChange}>
                                                <option value="">Select User</option>
                                                {data?.map((v, vty) => {
                                                    return (
                                                        <>
                                                            <option key={vty} value={v.id}>{v.email}{v.id}</option>
                                                        </>
                                                    )
                                                })}
                                            </select>
                                            {errors.from_id && touched.from_id && (<span className="text-danger form_err">{errors.from_id}</span>)}
                                        </div>
                                    </div>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="staticName" className="col-form-label">Amount</label>
                                            <input className="form-control" type="text" placeholder="Enter amount" name="amount" value={values.amount || ''} onChange={handleChange}
                                                onKeyPress={(e) => onHandleKeyPress(e, 2)}
                                                onKeyUp={(e) => onHandleKeyUp(e)}
                                                onKeyDown={(e) => onHandleKeyDown(e)}
                                                onPaste={(e) => onHandlePaste(e, 2)}
                                                onDragOver={(e) => e.preventDefault()} />
                                            {errors.amount && touched.amount && (<span className="text-danger form_err">{errors.amount}</span>)}
                                        </div>
                                    </div>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4 text-center">
                                        <button className="btn border-0 p-0 mb-3" type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48" fill="var(--white)"><path d="M24 44 10 30l2.1-2.1 10.4 10.4V4h3v34.3l10.4-10.4L38 30Z" /></svg></button>
                                    </div>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="staticName" className="col-form-label">To Users (Buyer)</label>
                                            <select className="form-select" aria-label=".form-select-lg" name="to_id" value={values.to_id || ''} onChange={handleChange}>
                                                <option value="">Select User</option>
                                                {data?.map((v, ind) => {
                                                    return (
                                                        <option key={ind} value={v.id}>{v.email}{v.id}</option>
                                                    )
                                                })}
                                            </select>
                                            {errors.to_id && touched.to_id && (<span className="text-danger form_err">{errors.to_id}</span>)}
                                        </div>
                                    </div>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">
                                        <div className="export-btn mb-3 text-center">
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
                                    <div className="col-md-4"></div>
                                </div>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Transferusdt