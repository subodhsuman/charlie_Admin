import React, { useEffect, useState } from "react";
import Date from "../../common/Date";
import { useFormik } from "formik";
import ApiClass from "../../Api/api";
import SwalClass from "../../common/swal";
import * as Yup from 'yup';
import ImageComponent from '../Utils/ImageComponent'
const Form = ({ data, getDeposits }) => {
    const [loading, setLoading] = useState(false)

    let { id, user, amount, created_at, txn_id, remark, status, images } = data;

    const [img, setImg] = useState('')
    const formik = useFormik({
        initialValues: {
            status: '',
            remark: ''
        },
        validationSchema: Yup.object({
            status:Yup.string().required("Status is required."),
            remark: Yup.string().when("status", {
                is: (value) => value == "rejected",
                then: Yup.string()
                    .required("Remark is Required")
            })
        }),
        onSubmit: async (values) => {
            setLoading(true)
            let response = await ApiClass.updateRequest(`Inr/deposit_update?id=${id}&status=${values.status}&remark=${values.remark}`,true);
            setLoading(false)
            if(!response?.data.hasOwnProperty("status_code")){
                SwalClass.failed("Unable to update at this time.")
                return
            }
            if(response?.data?.status_code == 0){
                SwalClass.failed(response?.data?.message)
                return
            }
            if(response?.data?.status_code == 1){
                SwalClass.success(response?.data?.message);
                document.getElementById('closeinrdepositForm').click()
                resetForm()
                getDeposits()
                setLoader(true)
                return
            }

        }
    });
    const { values, handleSubmit, handleChange, resetForm, setFieldValue, errors, touched } = formik;
    const statusArr = ["completed", "rejected"];
    useEffect(() => {
        if (data != undefined) {
            status == "pending" ?   setFieldValue('status', '' ):   setFieldValue('status', status )
            setFieldValue('remark', remark)
        }
    }, [data])
    return (
        <>
            <div className="modal fade common-modal" id="formModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-uppercase" id="exampleModalLabel">
                                <svg xmlns="http://www.w3.org/2000/svg" height="35" width="35" viewBox="0 0 48 48" fill="var(--blue)"><path d="M28.2 42 14.5 27.8v-3.3H21q2.85 0 5-1.85t2.5-5.15H12v-3h16.25q-.65-2.4-2.675-3.95Q23.55 9 21 9h-9V6h24v3h-7.7q1.15 1 1.95 2.55.8 1.55 1.15 2.95H36v3h-4.5q-.4 4.55-3.375 7.275Q25.15 27.5 21 27.5h-2.6L32.35 42Z" /></svg>&nbsp;
                                INR Deposit Detail Verification By {user?.name}</h5>
                            <button type="button" className="btn p-0 border-0" data-bs-dismiss="modal" aria-label="Close" id="closeinrdepositForm" onClick={()=>resetForm()}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                            </button>
                        </div>
                        <div className="modal-body admin-form">
                            {images?.length != 0 &&
                            <div className="row justify-content-center align-items-center pb-3 border-bottom">
                                {images?.map((v,i)=>{
                                    return(
                                        <div className="col-md-4 text-center p-3" key={i}>
                                            <button 
                                                className="p-0 border-0" 
                                                style={{backgroundColor:'transparent'}} 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#InrDepositImageModal"
                                                onClick={()=>setImg(v)}
                                            >
                                            <ImageComponent 
                                                 source={v}
                                                 alt="deposit-image"
                                                 height="150"
                                                 width="150"
                                                 classname=""
                                            />
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                            
                            }
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticName" className="col-form-label">Name</label>
                                            <input className="form-control" type="text" value={user?.name || ''} aria-label="readonly input example" readOnly />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticAmount" className="col-form-label">Amount</label>
                                            <input className="form-control" type="text" value={amount || ''} aria-label="readonly input example" readOnly />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticAmount" className="col-form-label">Txn Id</label>
                                            <input className="form-control" type="text" value={txn_id || ''} aria-label="readonly input example" readOnly />
                                        </div>
                                    </div>



                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticCreated" className="col-form-label">Created At</label>
                                            <input className="form-control" type="text" value={Date.getDate(created_at) || ''} aria-label="readonly input example" readOnly />
                                        </div>
                                    </div>
                                    {status != "completed" ?
                                        <>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="Status" className="col-form-label">Status</label>

                                                    <select className="form-select text-capitalize" aria-label=".form-select-lg" name="status" value={values.status} onChange={handleChange}>
                                                        <option value="">Choose A Status...</option>
                                                        {statusArr.map((v, i) => {
                                                            return (
                                                                <option value={v} key={i} className="text-capitalize">{v}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    {errors.status && touched.status && (<span className="text-danger form_err">{errors.status || ''}</span>)}
                                                </div>


                                            </div>
                                            {formik.values.status != "completed" &&
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label htmlFor="staticAmount" className="col-form-label">Remark</label>
                                                        <input className="form-control" type="text" name="remark" value={values.remark || ''} onChange={handleChange} aria-label="readonly input example" />
                                                        {errors.remark && touched.remark && (<span className="text-danger form_err">{errors.remark || ''}</span>)}
                                                    </div>
                                                </div>
                                            }
                                        </>
                                        : ''}

                                    {status == "completed" ?
                                        <div className="export-btn text-center">
                                            <button className="btn text-capitalize" disabled>Approved</button>
                                        </div>
                                        :
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
                                    }

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* inr deposit image modal  */}
            <div className="modal fade common-modal" id="InrDepositImageModal" tabIndex="-1" aria-labelledby="kycImageModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header justify-content-end border-bottom-0">
                            <button type="button" className="btn p-0 border-0" data-bs-toggle="modal" data-bs-target="#formModal" aria-label="Close" id="closeDocumentForm">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                            </button>
                        </div>
                        <div className="modal-body admin-form text-center">
                           <ImageComponent 
                              source={img}
                              alt=""
                              classname="img-fluid"
                           />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Form;