import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Api from "../../Api/api";
import SwalClass from "../../common/swal";
import JoditEditor from 'jodit-react';

const AddMoadalPage = ({ getPages }) => {
    const [loading, setLoading] = useState(false)
    const [contents, setContent] = useState('');
    const formik = useFormik({
        initialValues: {
            type: '',
            sub_type: '',
            slug: '',
            content: '',
            extra: ''
        },
        validationSchema: Yup.object({
            type: Yup.string().required('Page Type is required.'),
            sub_type: Yup.string().required('Page Sub Type is required.'),
            slug: Yup.string().required('Page Slug  is required.'),
            content: Yup.string().required('Page Content is required.'),
        }),
        onSubmit: async (values) => {
            setLoading(true)
            let response = await Api.postRequest("pages/create", true, values);
            setLoading(false)
            if (response?.data?.status_code == 1) {
                SwalClass.success(response?.data?.message)
                resetForm();
                document.getElementById('addliquidityModalButton').click()
                getPages();
                return
            }
            if (response?.data?.status_code == 0) {
                SwalClass.failed(response?.data?.message)
                resetForm();
                document.getElementById('addliquidityModalButton').click()
                return
            }
        }
    })
    const { values, handleSubmit, handleChange, errors, touched, resetForm, setFieldValue } = formik;
    useEffect(() => {
        if (contents != '') {
            setFieldValue("content", contents);
        }
    }, [contents])
    return (
        <>
            <div className="modal fade common-modal" id="pagesCreateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-uppercase d-flex align-items-center" id="cryptoEditModalLabel">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M36.5 28v-6.5H30v-3h6.5V12h3v6.5H46v3h-6.5V28ZM18 23.95q-3.3 0-5.4-2.1-2.1-2.1-2.1-5.4 0-3.3 2.1-5.4 2.1-2.1 5.4-2.1 3.3 0 5.4 2.1 2.1 2.1 2.1 5.4 0 3.3-2.1 5.4-2.1 2.1-5.4 2.1ZM2 40v-4.7q0-1.75.875-3.175Q3.75 30.7 5.4 30q3.75-1.65 6.675-2.325Q15 27 18 27t5.9.675q2.9.675 6.65 2.325 1.65.75 2.55 2.15.9 1.4.9 3.15V40Zm3-3h26v-1.7q0-.8-.45-1.525-.45-.725-1.2-1.075-3.55-1.65-6-2.175Q20.9 30 18 30q-2.9 0-5.375.525T6.6 32.7q-.75.35-1.175 1.075Q5 34.5 5 35.3Zm13-16.05q1.95 0 3.225-1.275Q22.5 18.4 22.5 16.45q0-1.95-1.275-3.225Q19.95 11.95 18 11.95q-1.95 0-3.225 1.275Q13.5 14.5 13.5 16.45q0 1.95 1.275 3.225Q16.05 20.95 18 20.95Zm0-4.5ZM18 37Z" /></svg>&nbsp;
                                ADD PAGES </h5>
                            <button type="button" className="btn p-0 border-0" data-bs-dismiss="modal" aria-label="Close" id="addliquidityModalButton">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form
                                onSubmit={handleSubmit}
                            >
                                <div className="row" >
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticEmail" className="col-form-label">Type</label>
                                            <input className="form-control" type="text" placeholder="Enter Page type"
                                                value={values.type} onChange={handleChange} name="type"
                                            />
                                            {errors.type && touched.type && (<span className="text-danger form_err">{errors.type}</span>)}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticEmail" className="col-form-label">Sub_type</label>
                                            <input className="form-control" type="text" placeholder="Enter Page Sub_type"
                                                value={values.sub_type} onChange={handleChange} name="sub_type"
                                            />
                                            {errors.sub_type && touched.sub_type && (<span className="text-danger form_err">{errors.sub_type}</span>)}
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticEmail" className="col-form-label">Slug</label>
                                            <input className="form-control" type="text" placeholder="Enter Page Slug"
                                                value={values.slug} onChange={handleChange} name="slug"
                                            />
                                            {errors.slug && touched.slug && (<span className="text-danger form_err">{errors.slug}</span>)}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticEmail" className="col-form-label">Extra</label>
                                            <input className="form-control" type="text" placeholder="Enter Page extra"
                                                value={values.extra} onChange={handleChange} name="extra"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label htmlFor="staticEmail" className="col-form-label">content</label>
                                            <JoditEditor
                                                onBlur={newContent => setContent(newContent)}
                                                onChange={newContent => { }}
                                                value={values.content}
                                                tabIndex={1}
                                            />
                                            {errors.content && touched.content && (<span className="text-danger form_err">{errors.content}</span>)}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="export-btn d-flex gap-2 p-3">
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
                                            <button type="button" className='btn text-capitalize' style={{ backgroundColor: 'var(--red)' }} onClick={() => { formik.resetForm(), setContent('') }}>reset</button>
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
export default AddMoadalPage;