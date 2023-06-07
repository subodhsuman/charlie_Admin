import React, { useEffect, useState, useRef } from "react";
import JoditEditor from 'jodit-react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import ApiClass from "../../Api/api";
import SwalClass from "../../common/swal";
const BlogEdit = ({ data, categories, BlogList }) => {
    const [loading, setLoading] = useState(false)
    const { id, category_id, description, image, publish_at, name } = data;

    const [content, setContent] = useState('')
    const [selectedImage, setSelectedImage] = useState([]);

    //submit
    const formik = useFormik({
        initialValues: {
            category_id: '',
            description: '',
            image: '',
            name: '',
            publish_at: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Blog Name is required.'),
            category_id: Yup.string().required('Category is required.'),
            publish_at: Yup.string().required('Date is required.'),
            image: Yup.string().required('Image is required.'),
            description: Yup.string().required('Description is required.')
        }),
        onSubmit: async (values) => {
            var new_str = selectedImage.split("blog/");
            // console.log({new_str});
            // (new_str.length > 1) ? console.log("a"):console.log("b");
            (new_str.length > 1) ? values.image = new_str[1] : values.image = new_str[0];
            setLoading(true)
            let response = await ApiClass.putNodeRequest(`blog/update/${id}`, false, values);
            setLoading(false)
            if (!response?.data.hasOwnProperty("status_code")) {
                SwalClass.failed("Unable to Update at this time.")
                return
            }
            if (response?.data?.status_code == 0) {
                SwalClass.failed(response?.data?.message || '')
                resetForm()
                document.getElementById('edit-image-input').value = '';
                return
            }
            if (response?.data?.status_code == 1) {
                SwalClass.success(response?.data?.message || '');
                resetForm()
                document.getElementById('edit-image-input').value = '';
                document.getElementById("blogEditModalBTN").click();
                BlogList();
                return
            }
        }
    })

    const { values, handleSubmit, handleChange, errors, touched, resetForm, setFieldValue } = formik;

    //group create upload image 
    const imageRef = useRef();
    const [new_image, setImage] = useState(null)
    const setReference = () => {
        imageRef.current.click();
    }
    const getImage = async (e) => {
        const file = e.target?.files[0] || "";

        if (file == "") {
            return;
        }
        let imageData = new FormData();
        imageData.append("file", file);
        let header = { "Content-Type": 'multipart/form-data;' };
        var result = await ApiClass.postNodeRequest("blog/imageupload", false, imageData, header);
        if(!result?.data.hasOwnProperty("status_code")){
            SwalClass.failed("Unable to add Image at this time.")
            return
        }
        if(result?.data?.status_code == 0){
            SwalClass.failed(result?.data?.message)
            return
        }
        if(result?.data?.status_code == 1){
            setSelectedImage(result?.data?.data);
            // SwalClass.success(response?.data?.message)
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage([reader.result]);
            }
            return;
        }
        

      
    }

    const clearImage = () => {
        document.getElementById('edit-image-input').value=""
        setSelectedImage('')
        setImage('')
    }

    useEffect(() => {
        if (data != undefined) {
            setFieldValue("name", name)
            setFieldValue("description", description)
            setFieldValue("category_id", category_id)
            // setFieldValue("image", image)
            setSelectedImage(image)
            if (data.hasOwnProperty("publish_at")) {
                setFieldValue("publish_at", (new Date(publish_at).toISOString()).slice(0, 10));
            }
            setImage(image)
        }
    }, [data]);
    useEffect(()=>{
        setFieldValue("image", selectedImage)
    },[selectedImage]);

    useEffect(() => {
        if (content != '') {
            setFieldValue("description", content);
        }
    }, [content])

    return (
        <>
            <div className="modal fade common-modal" id="blogEditModalMain" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-uppercase d-flex align-items-center" id="blogEditModalLabel">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M36.5 28v-6.5H30v-3h6.5V12h3v6.5H46v3h-6.5V28ZM18 23.95q-3.3 0-5.4-2.1-2.1-2.1-2.1-5.4 0-3.3 2.1-5.4 2.1-2.1 5.4-2.1 3.3 0 5.4 2.1 2.1 2.1 2.1 5.4 0 3.3-2.1 5.4-2.1 2.1-5.4 2.1ZM2 40v-4.7q0-1.75.875-3.175Q3.75 30.7 5.4 30q3.75-1.65 6.675-2.325Q15 27 18 27t5.9.675q2.9.675 6.65 2.325 1.65.75 2.55 2.15.9 1.4.9 3.15V40Zm3-3h26v-1.7q0-.8-.45-1.525-.45-.725-1.2-1.075-3.55-1.65-6-2.175Q20.9 30 18 30q-2.9 0-5.375.525T6.6 32.7q-.75.35-1.175 1.075Q5 34.5 5 35.3Zm13-16.05q1.95 0 3.225-1.275Q22.5 18.4 22.5 16.45q0-1.95-1.275-3.225Q19.95 11.95 18 11.95q-1.95 0-3.225 1.275Q13.5 14.5 13.5 16.45q0 1.95 1.275 3.225Q16.05 20.95 18 20.95Zm0-4.5ZM18 37Z" /></svg>&nbsp;
                                Edit Blog </h5>
                            <button type="button" className="btn p-0 border-0" data-bs-dismiss="modal" aria-label="Close" id="blogEditModalBTN">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticEmail" className="col-form-label">Blog Name</label>
                                            <input className="form-control" type="text" placeholder="Blog Name" name="name" value={values.name || ''} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticEmail" className="col-form-label">Category</label>
                                            <select className="form-select" aria-label=".form-select-lg" name="category_id" value={values.category_id || ''} onChange={handleChange}>
                                                {categories.length != 0 &&
                                                    categories.map((data, index) => {
                                                        return (
                                                            <option value={data.id || ''} key={index}>{data.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticEmail" className="col-form-label">Publish At</label>
                                            <input className="form-control" id="publish_date" type="date" placeholder="Date" name="publish_at" value={values.publish_at || ''} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="staticEmail" className="col-form-label">Image</label>
                                            {new_image ?
                                                <div className="image-here position-relative mb-3">
                                                    <img src={new_image} alt="group-icon" height="100px" width="100px" />
                                                    <button type="button" className="btn p-0 border-0 position-absolute" style={{ top: '-13px', left: '89px' }} onClick={clearImage}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.8 33.3 7.2-7.2 7.2 7.2 2.1-2.1-7.2-7.2 7.2-7.2-2.1-2.1-7.2 7.2-7.2-7.2-2.1 2.1 7.2 7.2-7.2 7.2ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30ZM9 9v30V9Z" /></svg>
                                                    </button>
                                                </div>
                                                : <div className="add-box position-relative mb-3 d-flex align-items-center justify-content-center border" style={{ height: '100px', width: '100px', cursor: 'pointer' }} onClick={setReference}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48" fill="var(--white)"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z" /></svg>
                                                </div>}

                                            <input id="edit-image-input" type="file" className="form-control mb-3" placeholder="Group Image" name="image" onChange={handleChange} accept="image/*"
                                                onInput={getImage} ref={imageRef} hidden />
                                            {errors.image && touched.image && (<span className="text-danger form_err">{errors.image}</span>)}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label htmlFor="staticEmail" className="col-form-label">Description</label>
                                            <JoditEditor
                                                onBlur={newContent => setContent(newContent)}
                                                onChange={newContent => { }}
                                                name="description"
                                                value={values.description || ''}
                                                tabIndex={1}
                                            />
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default BlogEdit;