import React, { useEffect, useState, useRef } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Sidebar from '../layout/Sidebar';
import JoditEditor from 'jodit-react';
import Heading from "../components/Utils/Heading";
import ApiClass from "../Api/api";
import SwalClass from "../common/swal";

const CreateTemplate = () => {
    const editor = useRef(null);

    const [loading, setLoading] = useState(false)
    const [showNote, setNote] = useState('')

    const [contentData, setContentData] = useState('');
    const [TemplateTypes, setTemplateTypes] = useState([]);

    const formik = useFormik({
        initialValues: {
            type: '',
            temp_type: '',
            content: '',
        },
        validationSchema: Yup.object({
            type: Yup.string().required('Send Type is required.'),
            temp_type: Yup.string().required('Template Type is required.'),
            content: Yup.string().required('Content is required.'),

        }),
        onSubmit: async (values) => {
            setLoading(true)
            let response = await ApiClass.postNodeRequest(`admin/template/create`, true, values);
            setLoading(false)
            if (!response?.data.hasOwnProperty("status_code")) {
                SwalClass.failed("Unable to Create at this time.")
                return
            }
            if (response?.data?.status_code == 0) {
                SwalClass.failed(response?.data?.message || '')
                resetForm()
                return
            }
            if (response?.data?.status_code == 1) {
                SwalClass.success(response?.data?.message || '');
                resetForm()
                return
            }
        }
    })
    useEffect(() => {
        if (contentData != '') {
            setFieldValue("content", contentData);
        }
    }, [contentData])
    const { values, handleSubmit, handleChange, errors, touched, resetForm, setFieldValue } = formik;


    const getTemplateTypes = async () => {
        const response = await ApiClass.getRequest(`template/types`);

        if (response?.data?.status_code == 0) {
            return
        }

        if (response?.data?.status_code == 1) {
            setTemplateTypes(response?.data?.data || {});
        }
    }
    useEffect(() => {
        getTemplateTypes();
    }, [])



    const customNote = (e) => {
        let notes = {
            "register": "Please add this keyword in Content for link and otp :- {link} and {link-token}",
            "forgot": "Please add this keyword in Content for link and otp :- {otp}",
            "login": "Please add this keyword in Content for link and otp :- {otp}",
            "withdraw": "Please add this keyword in Content for link and otp :- {otp}",
        }
        setNote(notes[e.target.value]);
    }


    return (
        <>
            <section className='dashboard-sec'>
                <div className='container-fluid'>
                    <Heading
                        text="create template"
                        image="template.webp"
                    />
                    <div className='row'>
                        <div className='col-12'>
                            <form onSubmit={handleSubmit}>
                                <div className="container-fluid rounded" style={{ backgroundColor: 'var(--side-bg)' }}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-sec p-3">
                                                <div className="mb-3">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Send Type:</label>
                                                    <select className="form-select" aria-label=".form-select-lg" name="type" value={values.type} onChange={handleChange} >
                                                        <option value="">Select Option....</option>
                                                        {TemplateTypes["sendtype"]?.map((data, index) =>
                                                            <option key={index} value={data.key}>{data.value}</option>
                                                        )}
                                                    </select>
                                                    {errors.type && touched.type && (<span className="text-danger form_err">{errors.type}</span>)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-sec p-3">
                                                <div className="mb-3">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Template Type :</label>
                                                    <select className="form-select" aria-label=".form-select-lg" name="temp_type" value={values.temp_type} onChange={(e) => { handleChange(e), customNote(e) }} >
                                                        <option value="">Select Option....</option>
                                                        {TemplateTypes["temptype"]?.map((data, index) =>
                                                            <option key={index} value={data.key} >{data.value}</option>
                                                        )}
                                                    </select>
                                                    {errors.temp_type && touched.temp_type && (<span className="text-danger form_err">{errors.temp_type}</span>)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-sec p-3">
                                                <div className="mb-3">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Add Content : :</label>
                                                    <small className="text-muted ">
                                                        <strong> Note :- </strong>
                                                        <span className="text-danger">{showNote}</span>
                                                    </small>
                                                    <JoditEditor
                                                        name="content"
                                                        value={values.content || ''}
                                                        onChange={newContent => { }}
                                                        onBlur={newContent => setContentData(newContent)}
                                                        tabIndex={1}
                                                    />

                                                    {errors.content && touched.content && (<span className="text-danger form_err">{errors.content}</span>)}

                                                </div>
                                                <div className="export-btn d-flex gap-2 mt-5">

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
                                                    <button type="button" className='btn text-capitalize' style={{ backgroundColor: 'var(--red)' }} onClick={() => { formik.resetForm(), setContentData('') }}>reset</button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div >
                        </div>

                    </div>
                </div>
            </section>

        </>
    )
}
export default CreateTemplate;