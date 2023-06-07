import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../layout/Sidebar';
import Heading from "../components/Utils/Heading";
import ApiClass from "../Api/api";
import SwalClass from "../common/swal";
import Modal from '../components/template/Modal.jsx'
import Pagination from '../components/Utils/Pagination';



const Template = () => {

    const [TemplateGet, setTemplateGet] = useState([]);
    const [value, setvalue] = useState('')
    const [TemplateTypes, setTemplateTypes] = useState({});
    const [type, setType] = useState('');
    const [temp_type, setTemp_type] = useState('');
    const [getStatus, setGetStatus] = useState('');
    const [page,setPage] = useState('');
    const [pagination,setPagination] = useState({});

    const getTemplate = async () => {
        const response = await ApiClass.getRequest(`template/get?type=${type}&temp_type=${temp_type}&status=${getStatus}&page=${page}`, true);

        if (!response.data.hasOwnProperty('status_code')) {
            SwalClass.success("Unable to fetch data at this time.");
            return;
        }

        if (response?.data?.status_code == 0) {
            return
        }

        if (response?.data?.status_code == 1) {
            setTemplateGet(response?.data?.data?.data || []);
            setPagination({
                page: response?.data?.data?.current_page || 1,
                last_page: response?.data?.data?.last_page || 1
            })
            return
        }
    }

    const handlePageClick = (e) => {
        setPage(e.selected+1)
    }

    const contentData = (value) => {
        setvalue(value)
    }

    const updateTemplate = async (status, id) => {
        status = status == true ? 0 : 1;

        let response = await ApiClass.updateRequest(`template/update?id=${id}&status=${status}`, true);
        if (response?.data?.status_code == 0) {
            SwalClass.failed(response?.data?.message)
            return
        }
        if (response?.data?.status_code == 1) {
            SwalClass.success(response?.data?.message);
            getTemplate()
            return
        }

    }
    const deleteTemplate = async (id) => {

        let response = await ApiClass.deleteRequest(`template/delete/?id=${id}`, true);
        if (response?.data?.status_code == 0) {
            SwalClass.failed(response?.data?.message)
            return
        }
        if (response?.data?.status_code == 1) {
            SwalClass.success(response?.data?.message);
            getTemplate()
            return
        }

    }
    useEffect(() => {
        getTemplate();
    }, [type, temp_type, getStatus,page])


    const getTemplateTypes = async () => {
        const response = await ApiClass.getRequest(`template/types`);
        if (response?.data?.status_code == 0) {
            return
        }

        if (response?.data?.status_code == 1) {
            if (response?.data?.data !== undefined) {
                setTemplateTypes(response?.data?.data);
            }
    
            return
        }
    }

    useEffect(() => {
       
        getTemplateTypes()
    }, [])


    const searchBy = (e) => {
        e.preventDefault();
        setLoader(true)
        getTemplate();
    }


    const handleReset = () => {
        setType("");
        setTemp_type("");
        setGetStatus("")
    }


    return (
        <>
            
                <section className="dashboard-sec">
                    <div className="container-fluid">
                        <Heading
                            text="template list"
                            image="template.webp"
                        />
                        <div className="row mb-3">
                            <div className="col-sm-6 col-xl-3">
                                <div className="p-3">

                                    <form action="" className="status-form" onSubmit={searchBy}>
                                        <label htmlFor="">Send Type:</label>
                                        <select className="form-select" aria-label=".form-select-lg" value={type} onChange={(e) => setType(e.target.value)}>
                                            <option value="">Select Option....</option>
                                            {TemplateTypes["sendtype"]?.map((data, index) =>
                                                <option key={index} value={data.key}>{data.value}</option>
                                            )}
                                        </select>
                                    </form>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xl-3">
                                <div className="p-3">

                                    <form action="" className="status-form" onSubmit={searchBy}>
                                        <label htmlFor="">Template Type:</label>
                                        <select className="form-select" aria-label=".form-select-lg" value={temp_type} onChange={(e) => setTemp_type(e.target.value)}>
                                            <option value="">Select Option....</option>
                                            {TemplateTypes["temptype"]?.map((data, index) =>
                                                <option key={index} value={data?.key}>{data?.value}</option>
                                            )}
                                        </select>
                                    </form>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xl-3">
                                <div className="p-3">

                                    <form action="" className="status-form" onSubmit={searchBy}>
                                        <label htmlFor="">Status:</label>
                                        <select className="form-select" aria-label=".form-select-lg" value={getStatus} onChange={(e) => setGetStatus(e.target.value)}>
                                            <option value="">Select Option....</option>
                                            <option value="1">active</option>
                                            <option value="0">inactive</option>
                                        </select>
                                    </form>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xl-3">
                                <div className="p-3">
                                    <p className="mb-0">Remove Filter:</p>
                                    <div className="export-btn">
                                        <button type="button" className='btn text-capitalize' style={{ backgroundColor: 'var(--blue)' }} onClick={(e)=>handleReset(e)}>reset</button>
                                    </div>
                                </div>
                            </div>



                        </div>
                        <div className="row">

                            {TemplateGet.length != 0 ?
                                <>
                                    {TemplateGet?.map((data, index) => {
                                        return (
                                            <div className="col-md-6 col-lg-4 col-xxl-3" key={index}>
                                                <div className="template-list p-sm-2">

                                                    <div className="card p-4 mb-4 mb-md-0">

                                                        {/* <div key={index} className="text-end export-btn">
                                                            <button className="btn text-capitalize">edit</button>
                                                        </div> */}
                                                        <div className="card-body text-center">
                                                            <h5 className="card-title">{data?.type}</h5>
                                                            <p className="card-text">{data?.temp_type}</p>
                                                        </div>
                                                        <div className="card-footer">
                                                            <div className="d-flex justify-content-between">
                                                                <button className="btn p-0 border-0" onClick={() => contentData(data?.content)} data-bs-toggle="modal" data-bs-target="#TemplateModal">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--white)"><path d="m13.15 34.85 14.5-7.15 7.15-14.5-14.5 7.15ZM24 26q-.85 0-1.425-.575Q22 24.85 22 24q0-.85.575-1.425Q23.15 22 24 22q.85 0 1.425.575Q26 23.15 26 24q0 .85-.575 1.425Q24.85 26 24 26Zm0 18q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                                                                </button>


                                                                <div className="form-check form-switch">
                                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={data?.status == 1?true:false || ''} onChange={newChange=>{}}  onClick={() => updateTemplate(data?.status, data?.id)} />
                                                                </div>

                                                                <button className="btn p-0 border-0" onClick={() => deleteTemplate(data?.id)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--white)"><path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z" /></svg>
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                   )})}
                                </>
                                :
                                <div className="d-flex align-items-center justify-content-center" style={{height:'90px'}}>
                                    <p className='mb-0 fs-5' >No data found.</p>
                                </div>
                            }
                        </div>
                        <div className="p-2">

                        <Pagination pagination={pagination} handlePageClick={handlePageClick} />
                        </div>
                    </div>
                   

                </section>
                <Modal value={value} />
            
        </>
    )
}
export default Template;