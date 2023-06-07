import React, { useState, useEffect } from "react";
//layouts
import Sidebar from "../layout/Sidebar";
import Table from "../components/users/Table";
import Form from "../components/users/Form";
import Heading from '../components/Utils/Heading';
//api
import ApiClass from '../Api/api.js';
import SwalClass from "../common/swal";
import { generatePDF, generateExcel } from "../common/Export.js";
import _ from "lodash";
import UserModal from "../components/users/UsersModal";

const Users = () => {
    //states
    const [page, setPage] = useState('');
    const [pagination, setPagination] = useState({});
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const [total, setTotal] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortName, setSortName] = useState('');
    const [uniqueId, setUniqueId] = useState('');
    const [view,setView] = useState({});

    //initial api
    const getUsers = async () => {
        let response = await ApiClass.getRequest(`users/get?page=${page}&name=${name}&email=${email}&date=${date}&status=${status}&user_unique_id=${uniqueId}&sortbyname=${sortName}&sortby=${sortBy}`, true);
        if (!response.data.hasOwnProperty('status_code')) {
            SwalClass.failed("Unable to fetch records at this time");
            return;
        }
        if (response?.data?.status_code == 0) {
            return
        }

        if (response?.data?.status_code == 1) {
            setData(response?.data?.data?.data || []);
            setPagination({
                page: response?.data?.data?.current_page || 1,
                last_page: response?.data?.data?.last_page || 1
            })
            setTotal(response?.data?.data?.total || 1)
            return
        }
    }

    useEffect(() => {
        getUsers()
    }, [date, status, sortBy]);

    //on page change
    useEffect(() => {
        if (page != '') {
            getUsers()
        }
    }, [page]);

    //on pagination click
    const handlePageClick = (e) => {
        setPage(e.selected + 1)
    }
    const setViewData = (data) => {
        setView(data)
    }

    //update enabled
    const updateEnabled = async (status, id) => {

        status = status ? 1 : 0;
        let response = await ApiClass.updateRequest(`users/update_status/${id}/${status}`);
        if (response?.data?.status_code == 0) {
            SwalClass.failed(response?.data?.message)
            return
        }
        if (response?.data?.status_code == 1) {
            SwalClass.success(response?.data?.message);
            getUsers()
            return
        }
    }


    //export to
    const handleOnExport = async (type) => {
        let response = await ApiClass.getRequest(`users/get?name=${name}&email=${email}&date=${date}&status=${status}&user_unique_id=${uniqueId}&per_page=${total}&sortbyname=${sortName}&sortby=${sortBy}`, true);
        if (!response.data.hasOwnProperty('status_code')) {
            SwalClass.failed("Unable to Export at this time.");
            return;
        }
        if (response?.data?.status_code == 0) {
            SwalClass.failed(response?.data?.message)
            return
        }

        if (response?.data?.status_code == 1) {

            let d = response?.data?.data?.data;

            if (d.length == 0) {
                SwalClass.success("No Data to Export in Pdf/Excel.")
                return;
            }

            if (type == 0) {  // Excel
                generateExcel(d);
                return;
            }

            if (type == 1) { // PDF
                let heading = ['name', 'email', "created_at", "status"];
                return generatePDF(heading, d, "User Report"); // heading, data and filename
            }
        }
    }
    return (
        <>
            
                <section className="dashboard-sec">
                    <div className="container-fluid">
                        <div className="d-flex justify-content-between align-items-center">
                            <Heading
                                text="list of users"
                                image="users.webp"
                            />
                            <div className="d-flex align-items-center gap-2">
                                <button className="btn p-0 border-0" data-bs-toggle="modal" data-bs-target="#adduserModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--white)"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z" /></svg>
                                </button>
                                <button className="btn p-0 border-0" data-bs-toggle="dropdown" data-bs-target="#exportDropdown">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V28.5h3V39h30V8.9H9v10.6H6V8.9q0-1.2.9-2.1.9-.9 2.1-.9h30q1.2 0 2.1.9.9.9.9 2.1V39q0 1.2-.9 2.1-.9.9-2.1.9Zm11.65-8.35L18.4 31.4l5.9-5.9H6v-3h18.3l-5.9-5.9 2.25-2.25L30.3 24Z" /></svg>
                                </button>
                                <ul className="dropdown-menu p-0" id="exportDropdown">
                                    <li>
                                        <a className="dropdown-item rounded" href="#" onClick={() => handleOnExport(0)}>Excel</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item rounded" href="#" onClick={() => handleOnExport(1)}>Pdf</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <Table
                                    data={data}
                                    pagination={pagination}
                                    handlePageClick={handlePageClick}
                                    //filters
                                    setViewData={setViewData}
                                    getUsers={getUsers}
                                    setName={setName}
                                    setEmail={setEmail}
                                    setDate={setDate}
                                    setStatus={setStatus}
                                    updateEnabled={updateEnabled}
                                    setUniqueId={setUniqueId}
                                    setSortBy={setSortBy}
                                    setSortName={setSortName}
                                    sortBy={sortBy}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <Form getUsers={getUsers} />
                <UserModal view={view} />
            
        </>
    )
}
export default Users;