import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import ApiClass from "../../Api/api";
import SwalClass from "../../common/swal";
import { onHandleKeyDown, onHandleKeyPress, onHandleKeyUp, onHandlePaste } from "../../common/InputText.js";
const UpdateForm = ({ data, getComission }) => {

    const { id,currency,pair_with, sell_min, sell_max,  sell_comission, sell_comission_type, sell_comission_status, status } = data;

    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            // buy_min: "",
            // buy_max: "",
            sell_min: "",
            sell_max: "",
            // buy_comission: "",
            sell_comission: "",
            // buy_comission_type: "",
            sell_comission_type: "",
            // buy_comission_status: "",
            sell_comission_status: "",
            status: "",
        },
        validationSchema: Yup.object({
            // buy_min: Yup.string().required('Buy minimum is required.'),
            // buy_max: Yup.string().required('Buy maximum is required.'),
            sell_min: Yup.string().required('Sell minimum is required.'),
            sell_max: Yup.string().required('Sell Maximum is required.'),
            // buy_comission: Yup.string().required('Buy Comission is required.'),
            sell_comission: Yup.string().required('Sell Comission is required.'),
            // buy_comission_type: Yup.string().required('Buy Comission Type is required.'),
            sell_comission_type: Yup.string().required('Sell Comission Type is required.'),
            // buy_comission_status: Yup.string().required('Buy Comission Status is required.'),
            sell_comission_status: Yup.string().required('Sell Comission Status is required.'),
            status: Yup.string().required('Status is required.'),
        }),
        onSubmit: async (values) => {
            setLoading(true)
            let response = await ApiClass.putNodeRequest(`P2P/P2pComission/update_comission/${id}`, true, values);
            setLoading(false)
            if (!response?.data.hasOwnProperty("status_code")) {
                SwalClass.failed("Unable to update at this time.")
                return
            }

            if (response?.data?.status_code == 0) {
                SwalClass.failed(response?.data?.message || 'Failed To Update Comission')
                resetForm()
                return
            }
            if (response?.data?.status_code == 1) {
                SwalClass.success(response?.data?.message || 'Successfully Updated Comission');
                document.getElementById('closeP2pUpdateForm').click();
                getComission();
                return
            }
        }
    })
    const { values, handleSubmit, handleChange, errors, touched, resetForm, setFieldValue } = formik;

    //setting field value
    useEffect(() => {
        if (data != undefined) {
            // setFieldValue("buy_min", buy_min)
            // setFieldValue("buy_max", buy_max)
            setFieldValue("sell_min", sell_min)
            setFieldValue("sell_max", sell_max)
            // setFieldValue("buy_comission", buy_comission)
            setFieldValue("sell_comission", sell_comission)
            // setFieldValue("buy_comission_type", buy_comission_type)
            setFieldValue("sell_comission_type", sell_comission_type)
            // setFieldValue("buy_comission_status", buy_comission_status)
            setFieldValue("sell_comission_status", sell_comission_status)
            setFieldValue("status", status)

        }
    }, [data]);
    return (
        <div className="modal fade common-modal" id="updatep2pcomissionModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-uppercase d-flex align-items-center" id="exampleModalLabel">
                            <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M34.55 34.5q1.3 0 2.2-.95.9-.95.9-2.25t-.9-2.2q-.9-.9-2.2-.9-1.3 0-2.25.9t-.95 2.2q0 1.3.95 2.25t2.25.95Zm-.05 6.25q1.65 0 3-.7t2.3-2q-1.3-.7-2.6-1.05-1.3-.35-2.7-.35-1.4 0-2.725.35-1.325.35-2.575 1.05.95 1.3 2.275 2t3.025.7ZM24 44q-6.9-1.6-11.45-7.825Q8 29.95 8 21.9V9.95l16-6 16 6v13.5q-.7-.35-1.5-.625T37 22.45v-10.4l-13-4.8-13 4.8v9.85q0 3.8 1.225 7t3.125 5.625q1.9 2.425 4.2 4.025 2.3 1.6 4.45 2.3.3.6.9 1.35.6.75 1 1.15-.45.25-.95.375-.5.125-.95.275Zm10.65 0q-3.9 0-6.65-2.775-2.75-2.775-2.75-6.575 0-3.9 2.75-6.675t6.65-2.775q3.85 0 6.625 2.775t2.775 6.675q0 3.8-2.775 6.575Q38.5 44 34.65 44ZM24 24.05Z" /></svg>
                            &nbsp;Update Details on the Currency-{currency} of Pair-{pair_with}  </h5>
                        <button type="button" className="btn p-0 border-0" data-bs-dismiss="modal" aria-label="Close" id="closeP2pUpdateForm">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                        </button>
                    </div>
                    <div className="modal-body admin-form">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                {/* <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="staticName" className="col-form-label">buy_min</label>
                                        <input className="form-control" type="text" placeholder="buy_min" name="buy_min"
                                            value={values.buy_min || ''}
                                            onChange={handleChange}
                                            onKeyPress={(e) => onHandleKeyPress(e, 8)}
                                            onKeyUp={(e) => onHandleKeyUp(e)}
                                            onKeyDown={(e) => onHandleKeyDown(e)}
                                            onPaste={(e) => onHandlePaste(e, 8)}
                                            onDragOver={(e) => e.preventDefault()}
                                        />
                                        {errors.buy_min && touched.buy_min && (<span className="text-danger form_err">{errors.buy_min}</span>)}
                                    </div>
                                </div> */}
                                {/* <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="staticName" className="col-form-label">buy_max</label>
                                        <input className="form-control" type="text" placeholder="buy_max" name="buy_max"
                                            value={values.buy_max || ''}
                                            onChange={handleChange}
                                            onKeyPress={(e) => onHandleKeyPress(e, 8)}
                                            onKeyUp={(e) => onHandleKeyUp(e)}
                                            onKeyDown={(e) => onHandleKeyDown(e)}
                                            onPaste={(e) => onHandlePaste(e, 8)}
                                            onDragOver={(e) => e.preventDefault()}
                                        />
                                        {errors.buy_max && touched.buy_max && (<span className="text-danger form_err">{errors.buy_max}</span>)}
                                    </div>
                                </div> */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="staticName" className="col-form-label">sell_min</label>
                                        <input className="form-control" type="text" placeholder="sell_min" name="sell_min"
                                            value={values.sell_min || ''}
                                            onChange={handleChange}
                                            onKeyPress={(e) => onHandleKeyPress(e, 8)}
                                            onKeyUp={(e) => onHandleKeyUp(e)}
                                            onKeyDown={(e) => onHandleKeyDown(e)}
                                            onPaste={(e) => onHandlePaste(e, 8)}
                                            onDragOver={(e) => e.preventDefault()}
                                        />
                                        {errors.sell_min && touched.sell_min && (<span className="text-danger form_err">{errors.sell_min}</span>)}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="staticName" className="col-form-label">sell_max</label>
                                        <input className="form-control" type="text" placeholder="sell_max" name="sell_max"
                                            value={values.sell_max || ''}
                                            onChange={handleChange}
                                            onKeyPress={(e) => onHandleKeyPress(e, 8)}
                                            onKeyUp={(e) => onHandleKeyUp(e)}
                                            onKeyDown={(e) => onHandleKeyDown(e)}
                                            onPaste={(e) => onHandlePaste(e, 8)}
                                            onDragOver={(e) => e.preventDefault()}
                                        />
                                        {errors.sell_max && touched.sell_max && (<span className="text-danger form_err">{errors.sell_max}</span>)}
                                    </div>
                                </div>
                                {/* <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="staticName" className="col-form-label">buy_comission</label>
                                        <input className="form-control" type="text" placeholder="buy_comission" name="buy_comission"
                                            value={values.buy_comission || ''}
                                            onChange={handleChange}
                                            onKeyPress={(e) => onHandleKeyPress(e, 8)}
                                            onKeyUp={(e) => onHandleKeyUp(e)}
                                            onKeyDown={(e) => onHandleKeyDown(e)}
                                            onPaste={(e) => onHandlePaste(e, 8)}
                                            onDragOver={(e) => e.preventDefault()}
                                        />
                                        {errors.buy_comission && touched.buy_comission && (<span className="text-danger form_err">{errors.buy_comission}</span>)}
                                    </div>
                                </div> */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="staticName" className="col-form-label">sell_comission</label>
                                        <input className="form-control" type="text" placeholder="sell_comission" name="sell_comission"
                                            value={values.sell_comission || ''}
                                            onChange={handleChange}
                                            onKeyPress={(e) => onHandleKeyPress(e, 8)}
                                            onKeyUp={(e) => onHandleKeyUp(e)}
                                            onKeyDown={(e) => onHandleKeyDown(e)}
                                            onPaste={(e) => onHandlePaste(e, 8)}
                                            onDragOver={(e) => e.preventDefault()}
                                        />
                                        {errors.sell_comission && touched.sell_comission && (<span className="text-danger form_err">{errors.sell_comission}</span>)}
                                    </div>
                                </div>
                                {/* <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="staticName" className="col-form-label">Buy Comission Type</label>
                                        <select className="form-select mb-3" aria-label=".form-select-lg" name="buy_comission_type" value={values.buy_comission_type || ''} onChange={handleChange}>
                                            <option value="percentage">Percentage</option>
                                            <option value="flat">Flat</option>
                                        </select>
                                        {errors.buy_comission_type && touched.buy_comission_type && (<span className="text-danger form_err">{errors.buy_comission_type}</span>)}
                                    </div>
                                </div> */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="staticName" className="col-form-label">Sell Comission Type</label>
                                        <select className="form-select mb-3" aria-label=".form-select-lg" name="sell_comission_type" value={values.sell_comission_type || ''} onChange={handleChange}>
                                            <option value="percentage">Percentage</option>
                                            <option value="flat">Flat</option>
                                        </select>
                                        {errors.sell_comission_type && touched.sell_comission_type && (<span className="text-danger form_err">{errors.sell_comission_type}</span>)}
                                    </div>
                                </div>
                                {/* <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="staticName" className="col-form-label">Buy Comission Status</label>
                                        <select className="form-select" aria-label=".form-select-lg" name="buy_comission_status" value={values.buy_comission_status || ''} onChange={handleChange}>
                                            <option value="">Select Status</option>
                                            <option value="1">Active</option>
                                            <option value="0">InActive</option>
                                        </select>
                                        {errors.buy_comission_status && touched.buy_comission_status && (<span className="text-danger form_err">{errors.buy_comission_status}</span>)}
                                    </div>
                                </div> */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="staticName" className="col-form-label">Sell Comission Status</label>
                                        <select className="form-select" aria-label=".form-select-lg" name="sell_comission_status" value={values.sell_comission_status || ''} onChange={handleChange}>
                                            <option value="">Select Status</option>
                                            <option value="1">Active</option>
                                            <option value="0">InActive</option>
                                        </select>
                                        {errors.sell_comission_status && touched.sell_comission_status && (<span className="text-danger form_err">{errors.sell_comission_status}</span>)}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="staticName" className="col-form-label">Status</label>
                                        <select className="form-select" aria-label=".form-select-lg" name="status" value={values.status || ''} onChange={handleChange}>
                                            <option value="">Select Status</option>
                                            <option value="1">Active</option>
                                            <option value="0">InActive</option>
                                        </select>
                                        {errors.status && touched.status && (<span className="text-danger form_err">{errors.status}</span>)}
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
    )
}
export default UpdateForm;