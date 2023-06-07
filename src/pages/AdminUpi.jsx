import React, { useState, useEffect } from "react";
import Sidebar from '../layout/Sidebar';
import Table from "../components/admin-upi/Table";
import Form from "../components/admin-upi/CreateForm";
import UpdateForm from '../components/admin-upi/UpdateForm';
import ApiClass from '../Api/api.js';
import SwalClass from "../common/swal";
const AdminUpi = () => {
    const [data, setData] = useState([]);
    const [view, setView] = useState({});

    //get admin upi details
    const getUpi = async () => {
        let response = await ApiClass.getRequest('adminupis/get', true);
        if (!response.data.hasOwnProperty('status_code')) {
            SwalClass.failed("Unable to fetch records at this time")
            return;
        }
        if (response?.data?.status_code == 0) {
            return
        }
        if (response?.data?.status_code == 1) {
            setData(response?.data?.data || []);
            return
        }
    }

    //initially called get admin upi api
    useEffect(() => {
        getUpi()
    }, []);

    //update form
    const setViewData = (data) => {
        setView(data)
    }
    
    //update status
    const updateStatus = async (status, id) => {
        status = status ? 1 : 0;
        let response = await ApiClass.updateRequest(`adminupis/status_update/${id}/${status}`, true);
        if (!response.data.hasOwnProperty('status_code')) {
            SwalClass.failed("Unable to fetch records at this time")
            return;
        }
        if (response?.data?.status_code == 0) {
            return
        }
        if (response?.data?.status_code == 1) {
            SwalClass.success(response?.data?.message);
            getUpi();
            return
        }
    }

    return (
        <>
            
                <section className="dashboard-sec">
                    <div className="container-fluid">
                        <div className="dashboard-heading mb-3 d-flex align-items-center justify-content-between">
                            <h5 className="mb-0 d-flex align-items-center text-capitalize">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M34.55 34.5q1.3 0 2.2-.95.9-.95.9-2.25t-.9-2.2q-.9-.9-2.2-.9-1.3 0-2.25.9t-.95 2.2q0 1.3.95 2.25t2.25.95Zm-.05 6.25q1.65 0 3-.7t2.3-2q-1.3-.7-2.6-1.05-1.3-.35-2.7-.35-1.4 0-2.725.35-1.325.35-2.575 1.05.95 1.3 2.275 2t3.025.7ZM24 44q-6.9-1.6-11.45-7.825Q8 29.95 8 21.9V9.95l16-6 16 6v13.5q-.7-.35-1.5-.625T37 22.45v-10.4l-13-4.8-13 4.8v9.85q0 3.8 1.225 7t3.125 5.625q1.9 2.425 4.2 4.025 2.3 1.6 4.45 2.3.3.6.9 1.35.6.75 1 1.15-.45.25-.95.375-.5.125-.95.275Zm10.65 0q-3.9 0-6.65-2.775-2.75-2.775-2.75-6.575 0-3.9 2.75-6.675t6.65-2.775q3.85 0 6.625 2.775t2.775 6.675q0 3.8-2.775 6.575Q38.5 44 34.65 44ZM24 24.05Z" /></svg>
                                &nbsp;Admin Upi Detail
                            </h5>
                            <button className="btn p-0 border-0" data-bs-toggle="modal" data-bs-target="#adminUpiModal">
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
                    getUpi={getUpi}
                />
                <UpdateForm
                    data={view}
                    getUpi={getUpi}
                />
            
        </>
    )
}
export default AdminUpi;