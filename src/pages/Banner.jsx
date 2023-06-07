import React, { useEffect, useState } from "react";
import Sidebar from '../layout/Sidebar';
import Form from "../components/banner/Form";
import Heading from "../components/Utils/Heading";
import ApiClass from "../Api/api";
import SwalClass from "../common/swal";
import DeleteModal from "../components/banner/DeleteModal.jsx";
const Banner = () => {
    const [data, setData] = useState([]);
    const [d, setD] = useState({})
    const banners_get = async () => {
        let response = await ApiClass.getRequest(`banner/get`, true);
        if (!response.data.hasOwnProperty('status_code')) {
            return
        }
        if (response?.data?.status_code == 1) {
            setData(response?.data?.data)
            return
        }
        if (response?.data?.status_code == 0) {
            return
        }
    }

    const change_status = async(v,i) => {
        v = v ? 1 : 0;
        let data = {
            id:i,
            status:v
        }
        let response = await ApiClass.updateRequest(`banner/update`, true, data);
        if(!response.data.hasOwnProperty("status_code")){
            return
        }
        if(response?.data?.status_code == 1){
            SwalClass.success(response?.data?.message)
            banners_get();
            return
        }
        if(response?.data?.status_code == 0){
            SwalClass.failed(response?.data?.message)
            return
        }
    }

    useEffect(() => {
        banners_get()
    }, []);
    const deletedata = (v) => {
        setD(v)
    }
    return (
        <>
            
                <section className="dashboard-sec">
                    <div className="container-fluid">
                        <div className="dashboard-heading mb-3 d-flex align-items-center justify-content-between">
                            <Heading
                                text="banner"
                                image="template.webp"
                            />
                            <button className="btn p-0 border-0" data-bs-toggle="modal" data-bs-target="#bannerModal">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--white)"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z" /></svg>
                            </button>
                        </div>
                        <div className="row">
                            {data.length != 0 && data.map((val, i) => {
                                return (
                                    <div className="col-md-6 col-xl-4 " key={i}>
                                        <div className="template-list p-sm-5">
                                            <div className="card p-4 mb-4 mb-md-0">
                                                <div className="d-flex justify-content-center text-center mb-3">
                                                    <img src={val.image} className="" alt="banner" height="150" width="200" onError={event => {
                                                        event.target.src = "./images/not-found.webp"
                                                        event.onerror = null
                                                    }} />
                                                </div>
                                                <div className="card-footer">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={val?.status == 1 ? true : false || ''} onChange={(e)=>change_status(e.target.checked, val.id)}/>
                                                        </div>
                                                        <button className="btn p-0 border-0" data-bs-toggle="modal" data-bs-target="#deleteBannerModal" onClick={()=>deletedata(val)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 48 48" fill="var(--white)"><path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z" /></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            }

                            
                        </div>
                    </div>

                </section>
                <Form banners_get={banners_get}/>
                <DeleteModal data={d} banners_get={banners_get}/>
            
        </>
    )
}
export default Banner;