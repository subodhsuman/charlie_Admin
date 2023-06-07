import React, { useState, useEffect } from "react";
import Sidebar from '../layout/Sidebar';
import Table from "../components/p2p-comission/Table";
import Form from "../components/p2p-comission/Form";
import UpdateForm from '../components/p2p-comission/UpdateForm';
import ApiClass from '../Api/api.js';
import SwalClass from "../common/swal";
const P2pComission = () => {
    const [data, setData] = useState([]);
    const [view, setView] = useState({});

    //get admin upi details
    const getComission = async () => {
        let response = await ApiClass.getNodeRequest('P2P/P2pComission/get', true);
        if (!response.data.hasOwnProperty('status_code')) {
            SwalClass.failed("Unable to fetch records at this time")
            return;
        }
        if (response?.data?.status_code == 0) {
            return
        }
        if (response?.data?.status_code == 1) {
            console.log(response?.data?.data);
            setData(response?.data?.data || []);
            return
        }
    }

    //initially called get admin upi api
    useEffect(() => {
        getComission()
    }, []);

    //update form
    const setViewData = (data) => {
        setView(data)
    }
    
    //update status
    const updateStatus = async (status, id,column) => {
        status = status ? 1 : 0;
        let response = await ApiClass.getNodeRequest(`P2P/P2pComission/update_status/${id}/${column}/${status}`, true);
        if (!response.data.hasOwnProperty('status_code')) {
            SwalClass.failed("Unable to fetch records at this time")
            return;
        }
        if (response?.data?.status_code == 0) {
            SwalClass.failed(response?.data?.message);
            return
        }
        if (response?.data?.status_code == 1) {
            SwalClass.success(response?.data?.message);
            getComission()
            return
        }
    }

    return (
        <>
            
                <section className="dashboard-sec">
                    <div className="container-fluid">
                        <div className="dashboard-heading mb-3 d-flex align-items-center justify-content-between">
                            <h5 className="mb-0 d-flex align-items-center text-capitalize">
                                <img src="./images/p2p.webp" width="45px" height="45px" />
                                Comission Detail
                            </h5>
                            <button className="btn p-0 border-0" data-bs-toggle="modal" data-bs-target="#adminp2pcomissionModal">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--white)"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z" /></svg>
                            </button>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Table
                                    data={data}
                                    setViewData={setViewData}
                                    updateStatus={updateStatus}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <Form
                    getComission={getComission}
                />
                <UpdateForm
                    data={view}
                    getComission={getComission}
                />
            
        </>
    )
}
export default P2pComission;