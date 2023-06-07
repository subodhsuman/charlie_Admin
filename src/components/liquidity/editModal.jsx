import React, { useEffect, useState } from "react";
import { onHandleKeyDown, onHandleKeyPress, onHandleKeyUp, onHandlePaste } from "../../common/InputText.js";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Api from "../../Api/api";
import SwalClass from "../../common/swal";

const EditModal = ({ cryptosedit, Users }) => {
    const [loading, setLoading] = useState(false)
    const formik = useFormik({
        initialValues: {
            currency: '',
            pair_with: '',
            provided: '',
            total: '',
        },
        validationSchema: Yup.object({
            total: Yup.string().required('Total Liquidity is required.'),
            provided: Yup.string().required('Please Provide Liquidity.'),
        }),
        onSubmit: async (values) => {
            setLoading(true)
            let response = await Api.updateRequest("liquidity/update", true, values);
            setLoading(false)
            if (response?.data?.status_code == 1) {
                SwalClass.success(response?.data?.message)
                resetForm();
                document.getElementById('closemodalForm').click()
                Users();
                return
            }
            if (response?.data?.status_code == 0) {
                SwalClass.failed(response?.data?.message)
                resetForm();
                document.getElementById('closemodalForm').click()
                return
            }
        }
    })
    const { values, handleSubmit, handleChange, errors, touched, resetForm, setFieldValue } = formik;
    useEffect(() => {
        if (cryptosedit != undefined) {
            cryptosedit.map((d) => {
                setFieldValue("currency", d.currency),
                    setFieldValue("pair_with", d.pair_with)
                return
            })
        }
    }, [cryptosedit])
    return (
        <>
            <div className="modal fade common-modal" id="cryptoEditModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-uppercase d-flex align-items-center" id="cryptoEditModalLabel">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M36.5 28v-6.5H30v-3h6.5V12h3v6.5H46v3h-6.5V28ZM18 23.95q-3.3 0-5.4-2.1-2.1-2.1-2.1-5.4 0-3.3 2.1-5.4 2.1-2.1 5.4-2.1 3.3 0 5.4 2.1 2.1 2.1 2.1 5.4 0 3.3-2.1 5.4-2.1 2.1-5.4 2.1ZM2 40v-4.7q0-1.75.875-3.175Q3.75 30.7 5.4 30q3.75-1.65 6.675-2.325Q15 27 18 27t5.9.675q2.9.675 6.65 2.325 1.65.75 2.55 2.15.9 1.4.9 3.15V40Zm3-3h26v-1.7q0-.8-.45-1.525-.45-.725-1.2-1.075-3.55-1.65-6-2.175Q20.9 30 18 30q-2.9 0-5.375.525T6.6 32.7q-.75.35-1.175 1.075Q5 34.5 5 35.3Zm13-16.05q1.95 0 3.225-1.275Q22.5 18.4 22.5 16.45q0-1.95-1.275-3.225Q19.95 11.95 18 11.95q-1.95 0-3.225 1.275Q13.5 14.5 13.5 16.45q0 1.95 1.275 3.225Q16.05 20.95 18 20.95Zm0-4.5ZM18 37Z" /></svg>&nbsp;
                                Edit Liquidity </h5>
                            <button type="button" className="btn p-0 border-0" data-bs-dismiss="modal" aria-label="Close" id="closemodalForm">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                            </button>
                        </div>
                        <div className="modal-body admin-form">
                            <form onSubmit={handleSubmit}>
                                {cryptosedit?.map((data, index) => {
                                    return (
                                        <div className="row" key={index}>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="staticEmail" className="col-form-label">CURRENCY</label>
                                                    <input className="form-control" type="text" value={values.currency} readOnly />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="staticEmail" className="col-form-label">PAIR CURRENCY</label>
                                                    <input className="form-control" type="text" value={data?.pair_with} readOnly />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="staticEmail" className="col-form-label">TOTAL LIQUIDITY</label>
                                                    <input className="form-control" type="text" placeholder="Total Liquidity" name="total"
                                                        value={values.total}
                                                        onChange={handleChange}
                                                        onKeyPress={(e) => onHandleKeyPress(e, 8)}
                                                        onKeyUp={(e) => onHandleKeyUp(e)}
                                                        onKeyDown={(e) => onHandleKeyDown(e)}
                                                        onPaste={(e) => onHandlePaste(e, 8)}
                                                        onDragOver={(e) => e.preventDefault()}
                                                    />
                                                    {errors.total && touched.total && (<span className="text-danger form_err">{errors.total}</span>)}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="staticEmail" className="col-form-label">PROVIDE LIQUIDITY</label>
                                                    <div className="input-group">
                                                        <input className="form-control" type="text" placeholder="Provide Liquidty"
                                                            value={values.provided || ''} onChange={handleChange} name="provided"
                                                            onKeyPress={(e) => onHandleKeyPress(e, 2)}
                                                            onKeyUp={(e) => onHandleKeyUp(e)}
                                                            onKeyDown={(e) => onHandleKeyDown(e)}
                                                            onPaste={(e) => onHandlePaste(e, 2)}
                                                            onDragOver={(e) => e.preventDefault()}
                                                        />
                                                        <span className="input-group-text">
                                                            <button type="button" className="btn p-0 border-0" style={{ backgroundColor: 'transparent' }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="M14.5 21q-2.7 0-4.6-1.9Q8 17.2 8 14.5q0-2.7 1.9-4.6Q11.8 8 14.5 8q2.7 0 4.6 1.9 1.9 1.9 1.9 4.6 0 2.7-1.9 4.6-1.9 1.9-4.6 1.9Zm0-3q1.45 0 2.475-1.025Q18 15.95 18 14.5q0-1.45-1.025-2.475Q15.95 11 14.5 11q-1.45 0-2.475 1.025Q11 13.05 11 14.5q0 1.45 1.025 2.475Q13.05 18 14.5 18Zm19 22q-2.7 0-4.6-1.9-1.9-1.9-1.9-4.6 0-2.7 1.9-4.6 1.9-1.9 4.6-1.9 2.7 0 4.6 1.9 1.9 1.9 1.9 4.6 0 2.7-1.9 4.6-1.9 1.9-4.6 1.9Zm0-3q1.45 0 2.475-1.025Q37 34.95 37 33.5q0-1.45-1.025-2.475Q34.95 30 33.5 30q-1.45 0-2.475 1.025Q30 32.05 30 33.5q0 1.45 1.025 2.475Q32.05 37 33.5 37Zm-23.4 3L8 37.9 37.9 8l2.1 2.1Z" /></svg>
                                                            </button>
                                                        </span>
                                                    </div>

                                                    {errors.provided && touched.provided && (<span className="text-danger form_err">{errors.provided}</span>)}
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
                                                        <input type="submit" value="Submit" className="btn" />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditModal;