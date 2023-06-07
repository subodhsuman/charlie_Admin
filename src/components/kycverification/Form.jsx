import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import ApiClass from "../../Api/api";
import SwalClass from "../../common/swal";
import * as Yup from 'yup';
import ImageComponent from "../Utils/ImageComponent";
import _ from 'lodash';
const Form = ({ data, getkyc, setLoader }) => {
    const [loading, setLoading] = useState(false);
    const [showImage, setshowImage] = useState('')
    const { id, user_id, user, identity_type, identity_number, identity_front_path, is_identity_verify, identity_back_path, is_selfie_verify, selfie_path, country, pan_card_number, pan_card_path, is_pan_verify, identity_remark, pan_card_remark, selfie_remark, status } = data;
    // console.log(data)
    const formik = useFormik({
        initialValues: {
            user_id: '',
            nationality: '',
            selfie_status: '',
            idenity_status: '',
            pancard_status: '',
            identity_remark: '',
            pan_card_remark: '',
            selfie_remark: ''
        },
        validationSchema: Yup.object({
            identity_remark: Yup.string().when("idenity_status", {
                is: (value) => value == "0",
                then: Yup.string()
                    .required("Remark is Required")
            }),
            pan_card_remark: Yup.string().when("pancard_status", {
                is: (value) => (value == "0" && country == "India") ,
                then: Yup.string()
                    .required("Remark is Required")
            }),
            selfie_remark: Yup.string().when("selfie_status", {
                is: (value) => value == "0",
                then: Yup.string()
                    .required("Remark is Required")
            }),
        }),
        onSubmit: async (values) => {

            console.log(values);

            let params = values;
            if ((params.nationality).toLowerCase() != "india") {
                params = _.omit(params, ["pancard_status", "pan_card_remark"]);
            }
            setLoading(true)
            let response = await ApiClass.updateRequest(`userkyc/verify/${id}`, true, params);
            setLoading(false)
            if (!response?.data.hasOwnProperty("status_code")) {
                SwalClass.failed("Unable to update at this time.")
                return
            }
            if (response?.data?.status_code == 0) {
                SwalClass.failed(response?.data?.message)
                return
            }
            if (response?.data?.status_code == 1) {
                SwalClass.success(response?.data?.message);
                document.getElementById('closeDocumentForm').click()
                resetForm()
                setLoader(true)
                getkyc()
                return
            }

        }
    });
    const { values, handleSubmit, handleChange, resetForm, setFieldValue, errors, touched } = formik;
    useEffect(() => {
        if (data != undefined) {
            setFieldValue("user_id", user_id);
            setFieldValue("nationality", country);
            setFieldValue("selfie_status", is_selfie_verify);
            setFieldValue("idenity_status", is_identity_verify);
            setFieldValue("pancard_status", is_pan_verify);
            setFieldValue("identity_remark", identity_remark);
            setFieldValue("pan_card_remark", pan_card_remark);
            setFieldValue("selfie_remark", selfie_remark);
        }
    }, [data])
    return (
        <>
            <div className="modal fade common-modal" id="documentModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-uppercase d-flex align-items-center" id="exampleModalLabel">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M36.5 28v-6.5H30v-3h6.5V12h3v6.5H46v3h-6.5V28ZM18 23.95q-3.3 0-5.4-2.1-2.1-2.1-2.1-5.4 0-3.3 2.1-5.4 2.1-2.1 5.4-2.1 3.3 0 5.4 2.1 2.1 2.1 2.1 5.4 0 3.3-2.1 5.4-2.1 2.1-5.4 2.1ZM2 40v-4.7q0-1.75.875-3.175Q3.75 30.7 5.4 30q3.75-1.65 6.675-2.325Q15 27 18 27t5.9.675q2.9.675 6.65 2.325 1.65.75 2.55 2.15.9 1.4.9 3.15V40Zm3-3h26v-1.7q0-.8-.45-1.525-.45-.725-1.2-1.075-3.55-1.65-6-2.175Q20.9 30 18 30q-2.9 0-5.375.525T6.6 32.7q-.75.35-1.175 1.075Q5 34.5 5 35.3Zm13-16.05q1.95 0 3.225-1.275Q22.5 18.4 22.5 16.45q0-1.95-1.275-3.225Q19.95 11.95 18 11.95q-1.95 0-3.225 1.275Q13.5 14.5 13.5 16.45q0 1.95 1.275 3.225Q16.05 20.95 18 20.95Zm0-4.5ZM18 37Z" /></svg>&nbsp;
                                KYC Information of {user?.name} </h5>
                            <button type="button" className="btn p-0 border-0" data-bs-dismiss="modal" aria-label="Close" id="closeDocumentForm">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                            </button>
                        </div>
                        <div className="modal-body admin-form">
                            <form onSubmit={handleSubmit}>
                                <h5 className="text-capitalize mb-2">identity proof :</h5>
                                <div className="row align-items-center">
                                    <div className="col-md-6 col-lg-3">
                                        <p className="mb-2 text-capitalize">Identity Type : {identity_type}</p>
                                        <p className="mb-2">Identity No : {identity_number}</p>
                                    </div>
                                    <div className="col-md-6 col-lg-3">
                                    <button type="button" className="btn p-0 border-0" style={{backgroundColor:'transparent'}} data-bs-toggle="modal" data-bs-target="#kycImageModal" onClick={()=>setshowImage(identity_front_path)}>
                                        <ImageComponent
                                            source={identity_front_path}
                                            alt="identity-front"
                                            height="120px"
                                            width="150px"
                                            classname=""
                                        />
                                        </button>
                                    </div>
                                    <div className="col-md-6 col-lg-3">
                                    <button type="button" className="btn p-0 border-0" style={{backgroundColor:'transparent'}} data-bs-toggle="modal" data-bs-target="#kycImageModal" onClick={()=>setshowImage(identity_back_path)}>
                                        <ImageComponent
                                            source={identity_back_path}
                                            alt="identity-back"
                                            height="120px"
                                            width="150px"
                                            classname=""
                                        />
                                        </button>
                                    </div>
                                    <div className="col-md-6 col-lg-3">
                                        {is_identity_verify == "1" ?
                                            <>
                                                <p className="mb-0 text-success fw-bold">Approved</p>
                                            </>
                                            :
                                            <>
                                                <label htmlFor="">Status</label>
                                                <select className="form-select" name="idenity_status" id="" value={values.idenity_status} onChange={handleChange}>
                                                    <option value="1">Approved</option>
                                                    <option value="0">Rejected</option>
                                                </select>

                                                {(formik.values.idenity_status == 0) &&
                                                    <>
                                                        <div className="mb-3">
                                                            <label htmlFor="">Remark</label>
                                                            <input type="text" className="form-control" name="identity_remark" value={values.identity_remark} onChange={handleChange} />
                                                            {errors.identity_remark && touched.identity_remark && (<span className="text-danger form_err">{errors.identity_remark || ''}</span>)}
                                                        </div>

                                                    </>
                                                }

                                            </>
                                        }
                                    </div>
                                </div>
                                <hr />
                                {country == "India" &&
                                    <>
                                        <h5 className="text-capitalize mb-2">Pan Card Proof :</h5>
                                        <div className="row align-items-center">
                                            <div className="col-md-6 col-lg-3">
                                                <p className="mb-2 text-capitalize">PAN Card No. : {pan_card_number}</p>
                                            </div>
                                            <div className="col-md-6 col-lg-3">
                                            <button type="button" className="btn p-0 border-0" style={{backgroundColor:'transparent'}} data-bs-toggle="modal" data-bs-target="#kycImageModal" onClick={()=>setshowImage(pan_card_path)}>
                                                <ImageComponent
                                                    source={pan_card_path}
                                                    alt="pancard"
                                                    height="120px"
                                                    width="150px"
                                                    classname=""
                                                />
                                            </button>
                                            </div>
                                            <div className="col-md-6 col-lg-3">
                                            </div>
                                            <div className="col-md-6 col-lg-3">
                                                {is_pan_verify == "1" ?
                                                    <>
                                                        <p className="mb-0 text-success fw-bold">Approved</p>
                                                    </>
                                                    :
                                                    <>
                                                        
                                                        <label htmlFor="">Status</label>
                                                        <select className="form-select" name="pancard_status" id="" value={values.pancard_status} onChange={handleChange}>
                                                            <option value="1">Approved</option>
                                                            <option value="0">Rejected</option>
                                                        </select>

                                                        {(formik.values.pancard_status == 0) &&
                                                            <>
                                                                <div className="mb-3">

                                                                    <label htmlFor="">Remark</label>
                                                                    <input type="text" className="form-control" name="pan_card_remark" value={values.pan_card_remark} onChange={handleChange} />
                                                                    {errors.pan_card_remark && touched.pan_card_remark && (<span className="text-danger form_err">{errors.pan_card_remark || ''}</span>)}
                                                                </div>
                                                            </>
                                                        }
                                                    </>
                                                }
                                            </div>
                                        </div>
                                        <hr />
                                    </>
                                }
                                <h5 className="text-capitalize mb-2">Selfie proof :</h5>
                                <div className="row align-items-center">
                                    <div className="col-md-6 col-lg-3">
                                    </div>
                                    <div className="col-md-6 col-lg-3">
                                        <button type="button" className="btn p-0 border-0" style={{backgroundColor:'transparent'}} data-bs-toggle="modal" data-bs-target="#kycImageModal" onClick={()=>setshowImage(selfie_path)}>
                                            <ImageComponent
                                                source={selfie_path}
                                                alt="selfie"
                                                height="120px"
                                                width="150px"
                                                classname=""
                                            
                                            />
                                        </button>
                                      
                                    </div>
                                    <div className="col-md-6 col-lg-3">
                                    </div>
                                    <div className="col-md-6 col-lg-3">
                                        {is_selfie_verify == "1" ?
                                            <>
                                                <p className="mb-0 text-success fw-bold">Approved</p>
                                            </>
                                            :
                                            <>
                                                <label htmlFor="">Status</label>
                                                <select className="form-select" name="selfie_status" id="" value={values.selfie_status} onChange={handleChange}>
                                                    <option value="1">Approved</option>
                                                    <option value="0">Rejected</option>
                                                </select>

                                                {(formik.values.selfie_status == 0) &&
                                                    <>
                                                        <div className="mb-3">
                                                            <label htmlFor="">Remark</label>
                                                            <input type="text" className="form-control" name="selfie_remark" value={values.selfie_remark} onChange={handleChange} />
                                                            {errors.selfie_remark && touched.selfie_remark && (<span className="text-danger form_err">{errors.selfie_remark || ''}</span>)}
                                                        </div>
                                                    </>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                                <hr />
                                {status == "completed" ?
                                    ''
                                    // <div className="export-btn text-center">
                                    //     <button className="btn text-capitalize" disabled>Approved</button>
                                    // </div>
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* kyc image modal */}

            <div className="modal fade common-modal" id="kycImageModal" tabIndex="-1" aria-labelledby="kycImageModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header justify-content-end border-bottom-0">
                            {/* <h5 className="modal-title text-uppercase d-flex align-items-center" id="kycImageModalLabel">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M36.5 28v-6.5H30v-3h6.5V12h3v6.5H46v3h-6.5V28ZM18 23.95q-3.3 0-5.4-2.1-2.1-2.1-2.1-5.4 0-3.3 2.1-5.4 2.1-2.1 5.4-2.1 3.3 0 5.4 2.1 2.1 2.1 2.1 5.4 0 3.3-2.1 5.4-2.1 2.1-5.4 2.1ZM2 40v-4.7q0-1.75.875-3.175Q3.75 30.7 5.4 30q3.75-1.65 6.675-2.325Q15 27 18 27t5.9.675q2.9.675 6.65 2.325 1.65.75 2.55 2.15.9 1.4.9 3.15V40Zm3-3h26v-1.7q0-.8-.45-1.525-.45-.725-1.2-1.075-3.55-1.65-6-2.175Q20.9 30 18 30q-2.9 0-5.375.525T6.6 32.7q-.75.35-1.175 1.075Q5 34.5 5 35.3Zm13-16.05q1.95 0 3.225-1.275Q22.5 18.4 22.5 16.45q0-1.95-1.275-3.225Q19.95 11.95 18 11.95q-1.95 0-3.225 1.275Q13.5 14.5 13.5 16.45q0 1.95 1.275 3.225Q16.05 20.95 18 20.95Zm0-4.5ZM18 37Z" /></svg>&nbsp;
                                KYC Information of {user?.name} </h5> */}
                            <button type="button" className="btn p-0 border-0" data-bs-toggle="modal" data-bs-target="#documentModal" aria-label="Close" id="closeDocumentForm">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                            </button>
                        </div>
                        <div className="modal-body admin-form text-center">
                           <ImageComponent 
                              source={showImage}
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