import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../layout/Sidebar'
import JoditEditor from 'jodit-react';
import { useFormik } from 'formik';
import ApiClass from '../Api/api.js';
import * as Yup from 'yup';
import SwalClass from '../common/swal.js';
function NewsBoard() {
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('');
    const editorConfig = {
        placeholder: "Start typing......",
        height: 300
    }

    //submit
    const formik = useFormik({
        initialValues: {
            title: '',
            social: '',
            miniDescription: '',
            description: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required.'),
            social: Yup.string().required('Social is required.'),
            miniDescription: Yup.string().required('Mini description is required.'),
            description: Yup.string().required('Description is required.')
        }),
        onSubmit: async (values) => {
            setLoading(true)
            let response = await ApiClass.postNodeRequest(`news/admin/create`, true, values);
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
    const { values, handleSubmit, handleChange, errors, touched, resetForm, setFieldValue } = formik;
    useEffect(() => {
        if (content != '') {
            setFieldValue("description", content);
        }
    }, [content])
    return (
        <>
                <section className='dashboard-sec'>
                    <div className='container-fluid'>
                        <div className="dashboard-heading mb-3">
                            <h5 className="mb-0 d-flex align-items-center text-capitalize">
                                <img src="./images/news.webp" alt="image" style={{ width: "30px", height: "30px" }} /> &nbsp;
                                CREATE NEWS
                            </h5>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <form onSubmit={handleSubmit}>
                                    <div className="container-fluid rounded" style={{ backgroundColor: 'var(--side-bg)' }}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-sec p-3">
                                                    <div className="mb-3">
                                                        <label htmlFor="" className="form-label">Title:</label>
                                                        <input type="text" className="form-control" id="" placeholder="Title" name="title" value={values.title || ''} onChange={handleChange} />
                                                        {errors.title && touched.title && (<span className="text-danger form_err">{errors.title}</span>)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-sec p-3">
                                                    <div className="mb-3">
                                                        <label htmlFor="" className="form-label">Mini Description :</label>
                                                        <input type="text" className="form-control" id="" placeholder="Mini Description " name="miniDescription" value={values.miniDescription || ''} onChange={handleChange} />
                                                        {errors.miniDescription && touched.miniDescription && (<span className="text-danger form_err">{errors.miniDescription}</span>)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-sec p-3">
                                                    <div className="mb-3">
                                                        <label htmlFor="" className="form-label">Social :</label>
                                                        <input type="text" className="form-control" id="" placeholder="Enter Social" name="social" value={values.social || ''} onChange={handleChange} />
                                                        {errors.social && touched.social && (<span className="text-danger form_err">{errors.social}</span>)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-sec p-3">
                                                    <div className="">
                                                        <label htmlFor="exampleFormControlInput1" className="form-label">Add Content : :</label>
                                                        <JoditEditor
                                                            onChange={newContent => {  }}
                                                            onBlur={newContent => setContent(newContent)}
                                                            name="description"
                                                            value={values.description || ''}
                                                            tabIndex={1}
                                                        />
                                                        {errors.description && touched.description && (<span className="text-danger form_err">{errors.description}</span>)}
                                                    </div>
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
                                                    <button type="button" className='btn text-capitalize' style={{ backgroundColor: 'var(--red)' }} onClick={()=>{formik.resetForm(),setContent('')}}>reset</button>
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

export default NewsBoard