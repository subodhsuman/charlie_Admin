import React, { useEffect, useState } from "react";
import Sidebar from '../layout/Sidebar';
import Table from "../components/pages/Table";
import Heading from "../components/Utils/Heading";
import ApiClass from "../Api/api";
import SwalClass from "../common/swal";
import Form from "../../src/components/pages/Form.jsx"
import EditModal from '../components/pages/EditModal';
import DeleteModal from "../components/pages/DeleteModal";
import AddMoadalPage from "../components/pages/AddMoadalPage";
import {generatePDF, generateExcel} from "../common/Export.js";

const Pages = () => {
    const [page, setPage] = useState('')
    const [loader, setLoader] = useState(true)
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState(undefined);
    const [senddata, setSenddata] = useState('')
    const [type, setType] = useState('');
    const [sub_type, setsub_type] = useState('');
    const [slug, setslug] = useState('');
    const [sortbyname, setsortbyname] = useState('');
    const [sortby, setsortby] = useState('');
    const [total,setTotal] = useState('');


    const handlePageClick = (e) => {
        setPage(e.selected + 1);
    }
    const getPages = async () => {
     
        let res = await ApiClass.getRequest(`pages/get?page=${page}&type=${type}&sub_type=${sub_type}&slug=${slug}&sortbyname=${sortbyname}&sortby=${sortby}`, true);
        setLoader(false)
        if (res?.data?.status_code == 1) {

            setData(res?.data?.data?.data || []);
            setPagination({
                page: res?.data?.data?.current_page || 1,
                last_page: res?.data?.data?.last_page || 1
            })
            setTotal(res?.data?.data?.total || 1)
            return
        }
    }
    const updateEnabled = async (status, id) => {

        status = status ? 1 : 0;
        let response = await ApiClass.updateRequest(`pages/status_update?id=${id}&status=${status}`);
        if (response?.data?.status_code == 0) {
            SwalClass.failed(response?.data?.message)
            return
        }
        if (response?.data?.status_code == 1) {
            SwalClass.success(response?.data?.message);
            getPages()
            return
        }
    }

    const handleOnExport = async(v)=>{
        let response = await ApiClass.getRequest(`pages/get?type=${type}&sub_type=${sub_type}&slug=${slug}&sortbyname=${sortbyname}&sortby=${sortby}&per_page=${total}`, true);
        console.log({response});
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

            if(v == 0){  // Excel
                generateExcel(d);
                return;
            }

            if(v == 1){ // PDF
                let heading = ['type', 'slug', "sub_type","content"];
                return generatePDF(heading, d, "User Report"); // heading, data and filename
            }
        }
    }

    useEffect(() => {
        setLoader(true)
        getPages()
    }, [page, sortbyname, sortby]);
    const setEditData = async (v) => {
        setSenddata(v)
    }

    return (
        <>
            
                <section className="dashboard-sec">
                    <div className="container-fluid">
                        <div className="d-flex justify-content-between align-items-center">
                            <Heading
                                text="pages"
                                image="pages.webp"
                            />
                            <div className="d-flex align-items-center gap-2">
                                <button className="btn p-0 border-0" data-bs-toggle="modal" data-bs-target="#pagesCreateModal"  >
                                    <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--white)"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Table
                                    data={data}
                                    pagination={pagination}
                                    setLoader={setLoader}
                                    handlePageClick={handlePageClick}
                                    updateEnabled={updateEnabled}
                                    status={status}
                                    loader={loader}
                                    setEditData={setEditData}
                                    getPages={getPages}
                                    setType={setType}
                                    setsub_type={setsub_type}
                                    setslug={setslug}
                                    setsortbyname={setsortbyname}
                                    setsortby={setsortby}
                                    sortby={sortby}
                                    handleOnExport={handleOnExport}

                                />
                            </div>
                        </div>
                    </div>
                </section>
                <Form senddata={senddata} />
                <EditModal senddata={senddata} getPages={getPages} />
                <DeleteModal senddata={senddata} getPages={getPages} />
                <AddMoadalPage getPages={getPages}/>
            
        </>
    )
}
export default Pages;