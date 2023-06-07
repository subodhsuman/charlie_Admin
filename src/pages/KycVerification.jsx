import React, { useEffect, useState } from "react";
import Sidebar from '../layout/Sidebar';
import Table from "../components/kycverification/Table";
import Form from "../components/kycverification/Form";
import Heading from "../components/Utils/Heading";

import ApiClass from '../Api/api.js';
import SwalClass from '../common/swal.js';

import {generatePDF, generateExcel} from "../common/Export.js";
// import Date from "../common/Date";
const KycVerification = () => {
    const [loader, setLoader] = useState(true)
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [total, setTotal] = useState('');
    const [page, setPage] = useState('');
    const [d,setD] = useState('');

    const [status, setStatus] = useState('pending')
    
    const [Fname, setFname] = useState('');
    const [Mname, setMname] = useState('');
    const [Lname, setLname] = useState('');
    const [date, setDate] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');

    const [sortbyname, setSortbyname] = useState('');
    const [sortby, setSortBy] = useState('');
    
    const getkyc = async() => {
        let response = await ApiClass.getRequest(`userkyc/get?status=${status}&page=${page}&first_name=${Fname}&middle_name=${Mname}&last_name=${Lname}&date_birth=${date}&address=${address}&country=${country}&sortbyname=${sortbyname}&sortby=${sortby}`,true);
       
        if(!response.data.hasOwnProperty("status_code")){
            SwalClass.failed("Unable to fetch data at this time.")
            return
        }
        if(response?.data?.status_code == 0){
            return
        }
        if(response?.data?.status_code == 1){
            setLoader(false)
            setData(response?.data?.data?.data);
            setPagination({
                page: response?.data?.data?.current_page,
                last_page: response?.data?.data?.last_page
            })
            setTotal(response?.data?.data?.total)
            return
        }
    }


    useEffect(()=>{
        setLoader(true)
        getkyc()
    },[status, date, page, sortbyname, sortby]);


    const handlePageClick = (e) => {
        setPage(e.selected+1)
    }

    const setViewData = (v) => {
        setD(v)
    }

     //export to
     const handleOnExport = async(type)=>{
        let response = await ApiClass.getRequest(`userkyc/get?status=${status}&first_name=${Fname}&middle_name=${Mname}&last_name=${Lname}&date_birth=${date}&address=${address}&country=${country}&per_page=${total}`,true);
        if(!response.data.hasOwnProperty('status_code')){
            SwalClass.failed("Unable to Export at this time.");
            return;
        }
        if(response?.data?.status_code == 0){
            SwalClass.failed(response?.data?.message)
            return
        }

        if(response?.data?.status_code == 1){

            let d = response?.data?.data?.data;

            if(d.length == 0){
                SwalClass.success("No Data to Export in Pdf/Excel.")
                return;
            }

            if(type == 0){  // Excel
                generateExcel(d);
                return;
            }

            if(type == 1){ // PDF
                let heading = ['first_name', 'middle_name', "last_name","date_birth", "address", "country"];
                let relational_keys = {
                    "heading":["name","email"],
                    "data":[
                        {
                            object:"user",
                            keys:["name"],
                            parent:""
                        },
                        {
                            object:"user",
                            keys:["email"],
                            parent:""
                        }
                    ]
                };
                return generatePDF(heading, d, `KycVerification`,relational_keys); // 
            }
        }
    }
    return(
        <>
            
                <section className="dashboard-sec px-4">
                    <div className="cotainer-fluid">
                        <div className="d-flex justify-content-between">
                            <Heading 
                                text="KYC verification"
                                image="kyc.webp"
                            />
                             <button className="btn p-0 border-0" data-bs-toggle="dropdown" data-bs-target="#exportDropdown">
                                <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V28.5h3V39h30V8.9H9v10.6H6V8.9q0-1.2.9-2.1.9-.9 2.1-.9h30q1.2 0 2.1.9.9.9.9 2.1V39q0 1.2-.9 2.1-.9.9-2.1.9Zm11.65-8.35L18.4 31.4l5.9-5.9H6v-3h18.3l-5.9-5.9 2.25-2.25L30.3 24Z" /></svg>
                            </button>
                            <ul className="dropdown-menu p-0" id="exportDropdown">
                                <li>
                                    <a className="dropdown-item rounded" href="#" onClick={()=>handleOnExport(0)}>Excel</a>
                                </li>
                                <li>
                                    <a className="dropdown-item rounded" href="#" onClick={()=>handleOnExport(1)}>Pdf</a>
                                </li>
                            </ul>
                        </div>
                      
                        <div className="row">
                            <div className="col-md-12">
                                <Table
                                    data={data}
                                    pagination={pagination}
                                    handlePageClick={handlePageClick}
                                    setViewData={setViewData}

                                    getkyc={getkyc}
                                    setFname={setFname}
                                    setMname={setMname}
                                    setLname={setLname}
                                    setDate={setDate}
                                    setAddress={setAddress}
                                    setCountry={setCountry}
                                    setStatus={setStatus}
                                    setSortbyname={setSortbyname}
                                    setSortBy={setSortBy}
                                    sortby={sortby}
                                    setLoader={setLoader}
                                    loader={loader}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <Form data={d} getkyc={getkyc} 
                setLoader={setLoader}
                 />
            
        </>
    )
}
export default KycVerification;