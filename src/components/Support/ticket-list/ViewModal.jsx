import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import ApiClass from '../../../Api/api';
import * as Yup from 'yup';
import SwalClass from '../../../common/swal.js';
import Date from '../../../common/Date';
const ViewModal = ({  data, getTickets, getComments, Comment }) => {
    // if (data) { data = allData.find(val => data?.id == val.id) }
//    console.log(data.length);
    const { id, user, status, priority, content, title, images, created_at } = data;
    const { ticket_comments } = Comment;

    const [loading, setLoading] = useState(false);
    const [File, setFile] = useState('')

    
    
    const formik = useFormik({
        initialValues: {
            comment: '',
        },
        validationSchema: Yup.object({
            comment: Yup.string().required('Comment is required'),
        }),
        onSubmit: async (values) => {
            let data = new FormData();
            data.append("comment", values.comment);
            data.append("ticket_id", id);
            data.append("file", File);
            setLoading(true)
            let response = await ApiClass.postRequest(`ticket/comment_create`, true, data);

            if (!response?.data.hasOwnProperty("status_code")) {
                SwalClass.failed("Unable to Add comment at this time.");
                return
            }
            if (response?.data?.status_code == 0) {
                SwalClass.failed(response?.data?.message);
                setLoading(false)
                setViewData()
                document.getElementById('image-file').value = '';
                resetForm()
                return
            }
            if (response?.data?.status_code == 1) {
                SwalClass.success(response?.data?.message);
                setLoading(false)
                document.getElementById('image-file').value = '';
                getTickets();
                getComments(id)
                resetForm();
                return
            }
        }
    })
    const { values, handleSubmit, handleChange, errors, touched, resetForm } = formik;

    return (
        <>
            <div className="modal fade common-modal" id="viewTicketModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-uppercase d-flex align-items-center" id="exampleModalLabel">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M34.55 34.5q1.3 0 2.2-.95.9-.95.9-2.25t-.9-2.2q-.9-.9-2.2-.9-1.3 0-2.25.9t-.95 2.2q0 1.3.95 2.25t2.25.95Zm-.05 6.25q1.65 0 3-.7t2.3-2q-1.3-.7-2.6-1.05-1.3-.35-2.7-.35-1.4 0-2.725.35-1.325.35-2.575 1.05.95 1.3 2.275 2t3.025.7ZM24 44q-6.9-1.6-11.45-7.825Q8 29.95 8 21.9V9.95l16-6 16 6v13.5q-.7-.35-1.5-.625T37 22.45v-10.4l-13-4.8-13 4.8v9.85q0 3.8 1.225 7t3.125 5.625q1.9 2.425 4.2 4.025 2.3 1.6 4.45 2.3.3.6.9 1.35.6.75 1 1.15-.45.25-.95.375-.5.125-.95.275Zm10.65 0q-3.9 0-6.65-2.775-2.75-2.775-2.75-6.575 0-3.9 2.75-6.675t6.65-2.775q3.85 0 6.625 2.775t2.775 6.675q0 3.8-2.775 6.575Q38.5 44 34.65 44ZM24 24.05Z" /></svg>
                                &nbsp;Ticket Info</h5>
                            <button type="button" className="btn p-0 border-0" data-bs-dismiss="modal" aria-label="Close" id="viewTicketModalbtn">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                            </button>
                        </div>
                        <div className="modal-body admin-form">
                            <p className='mb-2 text-capitalize'>Name : {user?.name}</p>
                            <p className='mb-2 text-capitalize'>Status : <span className='badge bg-success'>{status}</span></p>
                            <p className='mb-2 text-capitalize'>Priority : <span className='badge bg-success'>{priority}</span></p>
                            <p className='mb-2 text-capitalize'>Title : {title}</p>

                            <p className="text-capitalize mb-1">Username :{user?.name}</p>
                            <p className='text-capitalize mb-1'>comment : <span className='mb-0' style={{ color: 'var(--light-gray)', fontSize: '14px' }}>{content}</span></p>
                            {images != undefined &&
                                images.map((v, i) => {
                                    return (
                                        <img src={v} alt="image" height="70px" width="70px" key={i} />
                                    )
                                })
                            }
                            <p className='text-capitalize mb-1'>Date : <span className='mb-0' style={{ color: 'var(--light-gray)', fontSize: '14px' }}>{Date.getDate(created_at)}</span></p>
                            {ticket_comments?.length != 0 &&
                                <div className="comment-box p-3 border rounded mb-2" style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                                    {ticket_comments?.map((v, i) => {
                                        return (
                                            <div key={i}>
                                                <div className="comments" >
                                                    <p className="text-capitalize mb-1">Username :{v?.user?.name}</p>
                                                    <p className='text-capitalize mb-1'>comment : <span className='mb-0' style={{ color: 'var(--light-gray)', fontSize: '14px' }}>{v.comment}</span></p>
                                                    {v.image.length > 0 &&
                                                        <img src={v.image} alt="image" height="70px" width="70px" />
                                                    }
                                                    <p className='text-capitalize mb-1'>Date : <span className='mb-0' style={{ color: 'var(--light-gray)', fontSize: '14px' }}>{Date.getDate(v.created_at)}</span></p>
                                                </div>
                                                <hr />
                                            </div>
                                        )
                                    })}

                                </div>
                            }


                            <hr />
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="" className="">Add Reply : </label>
                                <textarea name="comment" className='form-control mb-2' id="" rows="5" onChange={handleChange} value={values.comment}></textarea>
                                {errors.comment && touched.comment && (<p className="text-danger form_err mb-2">{errors.comment}</p>)}
                                <label htmlFor="" className="">Attatchment : </label>
                                <input id="image-file" type="file" name='file' className='form-control mb-3'
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
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
                            </form>

                            {/* <form onSubmit={handleSubmit}>
                        <div className="row">
                            
                            <div className="col-md-12">
                                <div className="mb-3">
                                    <label htmlFor="staticName" className="col-form-label">Select Priority</label>
                                        <select className="form-select mb-3 text-capitalize" aria-label=".form-select-lg" name="priority" value={values.priority || ''} onChange={handleChange}>
                                            {priorityArr.map((v,i)=>{
                                                return(
                                                    <option className="text-capitalize" value={v} key={i} >{v}</option>
                                                )
                                            })}
                                            
                                        </select>
                                </div>
                            </div>
                            
                            <div className="col-md-12">
                                <div className="mb-3">
                                    <label htmlFor="staticName" className="col-form-label">Select Status</label>
                                        <select className="form-select mb-3 text-capitalize" aria-label=".form-select-lg" name="status" value={values.status || ''} onChange={handleChange} >
                                            {statusArr.map((v,i)=>{
                                                return(
                                                    <option className="text-capitalize" value={v} key={i} >{v}</option>
                                                )
                                            })}
                                            
                                        </select>
                                </div>
                            </div>
                            
                            <div className="col-md-12">
                                <div className="export-btn text-center">
                                    {loading?
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
                    </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewModal;