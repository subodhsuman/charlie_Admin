import "jodit";
import "jodit/build/jodit.min.css";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../../layout/Sidebar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ApiClass from '../../Api/api';
import SwalClass from '../../common/swal.js';
import Heading from '../../components/Utils/Heading';


const copyStringToClipboard = function (str) {
    var el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style = { position: "absolute", left: "-9999px" };
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
};

const facilityMergeFields = [
    "FacilityNumber",
    "FacilityName",
    "Address",
    "MapCategory",
    "Latitude",
    "Longitude",
    "ReceivingPlant",
    "TrunkLine",
    "SiteElevation"
];
const inspectionMergeFields = [
    "InspectionCompleteDate",
    "InspectionEventType"
];
const createOptionGroupElement = (mergeFields, optionGrouplabel) => {
    let optionGroupElement = document.createElement("optgroup");
    optionGroupElement.setAttribute("label", optionGrouplabel);
    for (let index = 0; index < mergeFields.length; index++) {
        let optionElement = document.createElement("option");
        optionElement.setAttribute("class", "merge-field-select-option");
        optionElement.setAttribute("value", mergeFields[index]);
        optionElement.text = mergeFields[index];
        optionGroupElement.appendChild(optionElement);
    }
    return optionGroupElement;
}
const buttons = [
    "undo",
    "redo",
    "|",
    "bold",
    "strikethrough",
    "underline",
    "italic",
    "|",
    "superscript",
    "subscript",
    "|",
    "align",
    "|",
    "ul",
    "ol",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "link",
    "table",
    "|",
    "hr",
    "eraser",
    "copyformat",
    "|",
    "fullsize",
    "selectall",
    "print",
    "|",
    "source",
    "|",
    {
        name: "insertMergeField",
        tooltip: "Insert Merge Field",
        iconURL: "images/merge.png",
        popup: (editor, current, self, close) => {
            function onSelected(e) {
                let mergeField = e.target.value;
                if (mergeField) {
                    console.log(mergeField);
                    editor.selection.insertNode(
                        editor.create.inside.fromHTML("{{" + mergeField + "}}")
                    );
                }
            }
            let divElement = editor.create.div("merge-field-popup");

            let labelElement = document.createElement("label");
            labelElement.setAttribute("class", "merge-field-label");
            labelElement.text = 'Merge field: ';
            divElement.appendChild(labelElement);

            let selectElement = document.createElement("select");
            selectElement.setAttribute("class", "merge-field-select");
            selectElement.appendChild(createOptionGroupElement(facilityMergeFields, "Facility"));
            selectElement.appendChild(createOptionGroupElement(inspectionMergeFields, "Inspection"));
            selectElement.onchange = onSelected;
            divElement.appendChild(selectElement);

            console.log(divElement);
            return divElement;
        }
    },
    {
        name: "copyContent",
        tooltip: "Copy HTML to Clipboard",
        iconURL: "images/copy.png",
        exec: function (editor) {
            let html = editor.value;
            copyStringToClipboard(html);
        }
    }
];

const editorConfig = {
    readonly: false,
    toolbar: true,
    spellcheck: true,
    language: "en",
    toolbarButtonSize: "medium",
    toolbarAdaptive: true,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: true,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    //defaultActionOnPaste: "insert_clear_html",
    buttons: buttons,
    uploader: {
        insertImageAsBase64URI: true
    },
    height: 300
};



function BlogCreate() {
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState([]);

    const [selectedImage, setSelectedImage] = useState([]);

    //group create upload image 
    const imageRef = useRef();
    const [image, setImage] = useState(null)
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
        setSelectedImage(result?.data?.data);
        setFieldValue('image',result?.data?.data)

        if (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage([reader.result]);
            }
        }
        return;
    }

    const clearImage = () => {
      setSelectedImage(undefined)
        setImage(null)
    }

    //submit
    const formik = useFormik({
        initialValues: {
            name: '',
            category_id: '',
            image: '',
            description: '',
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
            values.image = new_str[0];
            // var formData = new FormData();
            // formData.append("name", values.name);
            // formData.append("category_id", values.category_id);
            // // (setfile?formData.append("image",setfile):'')
            // formData.append("image", values.image);
            // formData.append("description", values.description);
            // formData.append("publish_at", values.publish_at);
            setLoading(true)
            let response = await ApiClass.postNodeRequest(`blog/create`, false, values);
            console.log({ response });
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
                clearImage()
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

    //BLog Category List get
    const CategoryList = async () => {
        let response = await ApiClass.getNodeRequest(`category/get`, true);
        if (!response.data.hasOwnProperty('status_code')) {
            SwalClass.success("Unable to fetch data at this time.");
            return;
        }

        if (response?.data?.status_code == 0) {
            return
        }

        if (response?.data?.status_code == 1) {
            setCategories(response?.data?.data || []);
        }
    }

    useEffect(() => {
        CategoryList();
    }, []);


    return (
            <section className='dashboard-sec'>
                <div className='container-fluid'>
                    <Heading text="Create Blog" 
                    image="blog.webp"
                    />
                    <div className='row'>
                        <div className='col-12'>
                            <form onSubmit={handleSubmit}>
                                <div className="container-fluid rounded" style={{ backgroundColor: 'var(--side-bg)' }}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-sec p-3">
                                                <div className="">
                                                    <label htmlFor="" className="form-label">Blog Name :</label>
                                                    <input type="text" className="form-control" id="" placeholder="Title" name="name" value={values.name || ''} onChange={handleChange} />
                                                    {errors.name && touched.name && (<span className="text-danger form_err">{errors.name}</span>)}
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-sec p-3">
                                                <div className="">
                                                    <label htmlFor="" className="form-label">Category :</label>
                                                    <select className="form-select" aria-label=".form-select-lg" name="category_id" onChange={handleChange} >
                                                        <option value="">Select Option....</option>
                                                        {categories.map((data, index) => {
                                                            return (
                                                                <option key={index} value={data.id}>{data.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    {errors.category_id && touched.category_id && (<span className="text-danger form_err">{errors.category_id}</span>)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-sec p-3">
                                                <div className="">
                                                    <label htmlFor="" className="form-label">Publish At :</label>
                                                    <input type="date" className="form-control" id="" placeholder="Enter Social" name="publish_at" value={values.publish_at || ''} onChange={handleChange} />
                                                    {errors.publish_at && touched.publish_at && (<span className="text-danger form_err">{errors.publish_at}</span>)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-sec p-3">
                                                <div className="">
                                                    <label htmlFor="" className="form-label">Image :</label>
                                                    <small className="text-muted ">
                                                        <strong> Note :- </strong>
                                                        <span className="text-danger">1. Only JPG,JPEG,PNG Image. </span>
                                                    </small>
                                                    {image ?
                                                        <div className="image-here position-relative mb-3">
                                                            <img src={image} alt="group-icon" height="100px" width="100px" />
                                                            <button type="button" className="btn p-0 border-0 position-absolute" style={{ top: '-13px', left: '89px' }} onClick={clearImage}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.8 33.3 7.2-7.2 7.2 7.2 2.1-2.1-7.2-7.2 7.2-7.2-2.1-2.1-7.2 7.2-7.2-7.2-2.1 2.1 7.2 7.2-7.2 7.2ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30ZM9 9v30V9Z" /></svg>
                                                            </button>
                                                        </div>
                                                        : <div className="add-box position-relative mb-3 d-flex align-items-center justify-content-center border" style={{ height: '100px', width: '100px', cursor: 'pointer' }} onClick={setReference}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48" fill="var(--white)"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z" /></svg>
                                                        </div>}

                                                    <input type="file" className="form-control mb-3" placeholder="Group Image" name="image"  accept="image/*"
                                                        onInput={getImage} ref={imageRef} hidden />
                                                    {errors.image && touched.image && (<span className="text-danger form_err">{errors.image}</span>)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-sec p-3">
                                                <div className="">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Add Description :</label>

                                                    <div className="BlogCreate" style={{ maxWidth: editorConfig.width, margin: "0 auto" }}>

                                                        <JoditEditor tabIndex={1}
                                                            value={values.description}
                                                            config={editorConfig} name="description"
                                                            onBlur={newContent => setContent(newContent)}
                                                        /></div>
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
                                                <button type="button" className='btn text-capitalize' style={{ backgroundColor: 'var(--red)' }} onClick={() => { formik.resetForm(), setContent(''), clearImage() }}>reset</button>
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
        

    );
}
export default BlogCreate

// const rootElement = document.getElementById("root");
// ReactDOM.render(<BlogCreate />, rootElement);
