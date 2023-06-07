import React,{useState, useEffect} from "react";

import { useFormik } from "formik";
import * as Yup from 'yup';

import ApiClass from "../../../Api/api";
import SwalClass from '../../../common/swal.js';
const EditModal = ({data, getCategory}) => {
    const [loading,setLoading] = useState(false)
    const {id, name} = data;
    const formik = useFormik({
        initialValues:{
            name:''
        },
        validationSchema:Yup.object({
            name:Yup.string().required('Category name is required.')
        }),
        onSubmit: async(values)=>{
            let response = await ApiClass.updateRequest(`ticket/category_update/${id}`,true,values);
            if(response?.data?.status_code == 0){
                SwalClass.failed(response?.data?.message);
                return
            }
            if(response?.data?.status_code == 1){
                SwalClass.success(response?.data?.message)
                document.getElementById('editCategoryModalbtn').click();
                resetForm();
                getCategory();
                return
            }
        }
    })
    const {values, handleSubmit, handleChange, errors, touched, resetForm, setFieldValue} = formik;
    useEffect(()=>{
        if(data != undefined){
            setFieldValue("name",name)
        }
    },[data])
    return(
        <>
           <div className="modal fade common-modal" id="editCategoryModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-md modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-uppercase d-flex align-items-center" id="exampleModalLabel">
                            <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M34.55 34.5q1.3 0 2.2-.95.9-.95.9-2.25t-.9-2.2q-.9-.9-2.2-.9-1.3 0-2.25.9t-.95 2.2q0 1.3.95 2.25t2.25.95Zm-.05 6.25q1.65 0 3-.7t2.3-2q-1.3-.7-2.6-1.05-1.3-.35-2.7-.35-1.4 0-2.725.35-1.325.35-2.575 1.05.95 1.3 2.275 2t3.025.7ZM24 44q-6.9-1.6-11.45-7.825Q8 29.95 8 21.9V9.95l16-6 16 6v13.5q-.7-.35-1.5-.625T37 22.45v-10.4l-13-4.8-13 4.8v9.85q0 3.8 1.225 7t3.125 5.625q1.9 2.425 4.2 4.025 2.3 1.6 4.45 2.3.3.6.9 1.35.6.75 1 1.15-.45.25-.95.375-.5.125-.95.275Zm10.65 0q-3.9 0-6.65-2.775-2.75-2.775-2.75-6.575 0-3.9 2.75-6.675t6.65-2.775q3.85 0 6.625 2.775t2.775 6.675q0 3.8-2.775 6.575Q38.5 44 34.65 44ZM24 24.05Z" /></svg>
                            &nbsp;Edit Support Category </h5>
                            <button type="button" className="btn p-0 border-0" data-bs-dismiss="modal" aria-label="Close" id="editCategoryModalbtn">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                            </button>
                        </div>
                        <div className="modal-body admin-form">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label htmlFor="staticName" className="col-form-label">Category Name</label>
                                            <input  className="form-control" type="text" name="name" value={values.name || ''} onChange={handleChange}/>
                                            {errors.name && touched.name && (<span className="text-danger form_err">{errors.name}</span>)}
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditModal;