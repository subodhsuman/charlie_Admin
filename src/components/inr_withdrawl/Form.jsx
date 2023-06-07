import React, { useEffect, useState } from "react";
import Date from "../../common/Date";
import { useFormik } from "formik";
import * as Yup from 'yup';
import SwalClass from "../../common/swal";
import ApiClass from "../../Api/api";

const Form = ({ data, getInrWithdrawList }) => {
    let { status, remark } = data;
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            status: '',
            remark: ''
        },
        validationSchema: Yup.object({
            status:Yup.string().required("Status is required."),
            remark: Yup.string().when("status", {
                is: (value) => value == "rejected",
                then: Yup.string().required("Remark is Required"),
            })
        }),
        onSubmit: async (values) => {
            // let status = data.status;

            setLoading(true)
            let response = await ApiClass.updateRequest(`Inr/withdrawal_update?id=${data?.id}&status=${values.status}&remark=${values.remark}`, true);
         
            setLoading(false)
            if (!response?.data.hasOwnProperty("status_code")) {
                SwalClass.failed('Unable to update at this time.')
                return
            }
            if (response?.data?.status_code == 0) {
                SwalClass.failed(response?.data?.message || '')
                resetForm()
                return
            }
            if (response?.data?.status_code == 1) {
                SwalClass.success(response?.data?.message || '');
                resetForm();
                document.getElementById('closewithdrawForm').click();
                getInrWithdrawList();
                return
            }
        }
    })
    const { values, handleSubmit, handleChange, errors, touched, resetForm, setFieldValue } = formik;
    useEffect(()=>{
        if(data!=undefined){
            status == "pending" ?   setFieldValue('status', '' ):   setFieldValue('status', status )
            remark != null ? setFieldValue("remark",remark) : setFieldValue("remark",'')
            
        }
    },[data])
    return (
        <>
            <div className="modal fade common-modal" id="formModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-uppercase" id="exampleModalLabel">
                                <svg xmlns="http://www.w3.org/2000/svg" height="35" width="35" viewBox="0 0 48 48" fill="var(--blue)"><path d="M28.2 42 14.5 27.8v-3.3H21q2.85 0 5-1.85t2.5-5.15H12v-3h16.25q-.65-2.4-2.675-3.95Q23.55 9 21 9h-9V6h24v3h-7.7q1.15 1 1.95 2.55.8 1.55 1.15 2.95H36v3h-4.5q-.4 4.55-3.375 7.275Q25.15 27.5 21 27.5h-2.6L32.35 42Z" /></svg>&nbsp;
                                INR Withdraw Detail Verification By {data?.user?.name}</h5>
                            <button type="button" className="btn p-0 border-0" data-bs-dismiss="modal" aria-label="Close" id="closewithdrawForm" onClick={()=>resetForm()}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                            </button>
                        </div>
                        <div className="modal-body admin-form">

                            {data?.status == "rejected" ?
                                <div className="text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="150" width="150" viewBox="0 0 48 48" fill="var(--red)"><path d="M24 34q.7 0 1.175-.475.475-.475.475-1.175 0-.7-.475-1.175Q24.7 30.7 24 30.7q-.7 0-1.175.475-.475.475-.475 1.175 0 .7.475 1.175Q23.3 34 24 34Zm.15-7.65q.65 0 1.075-.425.425-.425.425-1.075V15.2q0-.65-.425-1.075-.425-.425-1.075-.425-.65 0-1.075.425-.425.425-.425 1.075v9.65q0 .65.425 1.075.425.425 1.075.425ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 23.95q0-4.1 1.575-7.75 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24.05 4q4.1 0 7.75 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm.05-3q7.05 0 12-4.975T41 23.95q0-7.05-4.95-12T24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24.05 41ZM24 24Z" /></svg>
                                    <h6 className="text-capitalize" style={{color:'var(--red)'}}>rejected</h6>
                                </div>
                                : ""}
                            {data?.status == "completed" ?
                                <div className="text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="150" width="150" viewBox="0 0 48 48" fill="var(--blue)"><path d="m17.3 45-3.8-6.5-7.55-1.55.85-7.35L2 24l4.8-5.55-.85-7.35 7.55-1.55L17.3 3 24 6.1 30.7 3l3.85 6.55 7.5 1.55-.85 7.35L46 24l-4.8 5.6.85 7.35-7.5 1.55L30.7 45 24 41.9Zm1.35-3.95L24 38.8l5.5 2.25 3.35-5 5.85-1.5-.6-5.95 4.05-4.6-4.05-4.7.6-5.95-5.85-1.4-3.45-5L24 9.2l-5.5-2.25-3.35 5-5.85 1.4.6 5.95L5.85 24l4.05 4.6-.6 6.05 5.85 1.4ZM24 24Zm-2.15 6.65L33.2 19.4l-2.25-2.05-9.1 9-4.75-4.95-2.3 2.25Z" /></svg>
                                    <h6 className="text-capitalize" style={{color:'var(--blue)'}}>Approved</h6>
                                </div>
                                : ""}

                            {data?.status == "pending" ?
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="staticName" className="col-form-label">Name</label>
                                                <input className="form-control" type="text" name="name" value={data?.user?.name || ''} aria-label="readonly input example" readOnly />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="staticEmail" className="col-form-label">Email</label>
                                                <input className="form-control" type="text" name="email" value={data?.user?.email || ''} aria-label="readonly input example" readOnly />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="staticAmount" className="col-form-label">Amount</label>
                                                <input className="form-control" type="text" name="amount" value={data?.amount || ''} aria-label="readonly input example" readOnly />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="staticAcc" className="col-form-label">Account Number</label>
                                                <input className="form-control" type="text" name="wd_acc_no" value={data?.transfer_detail?.wd_acc_no || ''} aria-label="readonly input example" readOnly />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="staticIfsc" className="col-form-label">IFSC Code</label>
                                                <input className="form-control" type="text" name="wd_ifsc" value={data?.transfer_detail?.wd_ifsc || ''} aria-label="readonly input example" readOnly />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="staticCreated" className="col-form-label">Created At</label>
                                                <input className="form-control" type="text" name="created_at" value={Date.getDate(data?.createdAt) || ''} aria-label="readonly input example" readOnly />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="Status" className="col-form-label">Status</label>

                                                <select className="form-select" aria-label=".form-select-lg" name="status" value={values.status || ''} onChange={handleChange}>
                                                    <option value="">Choose Status...</option>
                                                    <option value="completed">Approved</option>
                                                    <option value="rejected">Rejected</option>
                                                </select>
                                                {errors.status && touched.status && (<span className="text-danger form_err">{errors.status}</span>)}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="Status" className="col-form-label">Remark</label>
                                                <input className="form-control" type="text" name="remark" value={values.remark || ''} onChange={handleChange} aria-label="readonly input example" />
                                                {errors.remark && touched.remark && (<span className="text-danger form_err">{errors.remark}</span>)}
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
                                : ""}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Form;