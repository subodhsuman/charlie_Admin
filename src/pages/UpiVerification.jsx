import React, { useEffect, useState } from "react";
import Sidebar from '../layout/Sidebar'
import Table from "../components/upi-verification/Table";
import Heading from "../components/Utils/Heading";
import Form from "../components/upi-verification/Form";
import ApiClass from '../Api/api.js';
import SwalClass from '../common/swal.js';
import { generatePDF, generateExcel } from "../common/Export.js";


const UpiVerification = () => {

    // const [loader, setLoader] = useState(true)

    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({});

    const [alias, setAlias] = useState('');
    const [email, setEmail] = useState('');
    const [upi, setUpi] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const [page, setPage] = useState('');
    const [view, setView] = useState('');
    const [total, setTotal] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortName, setSortName] = useState('');

    const getUpi = async () => {
        let response = await ApiClass.getRequest(`userupi/get?status=${status}&alias=${alias}&email=${email}&upi_id=${upi}&created_at=${date}&page=${page}&sortbyname=${sortName}&sortby=${sortBy}`, true);
        // setLoader(false)
        if (!response?.data.hasOwnProperty("status_code")) {
            SwalClass.failed("Unable to fetch data at this time.")
            return;
        }
        if (response?.data?.status_code == 0) {
            return
        }
        if (response?.data?.status_code == 1) {
            setData(response?.data?.data?.data);
            setPagination({
                page: response?.data?.data?.current_page,
                last_page: response?.data?.data?.last_page
            })
            setTotal(response?.data?.data?.total || 1)

            return;
        }
    }

    const handleOnExport = async (type) => {
        let response = await ApiClass.getRequest(`userupi/get?status=${status}&alias=${alias}&email=${email}&upi_id=${upi}&created_at=${date}&page=${page}&per_page=${total}&sortbyname=${sortName}&sortby=${sortBy}`, true);
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
                let heading = ['name', 'email', "created_at", "user_verify"];
                return generatePDF(heading, d, "User Report"); // heading, data and filename
            }
        }
    }


    useEffect(() => {
        // setLoader(true)
        getUpi()
    }, [date, status,sortBy, page]);

    const handlePageClick = (e) => {
        setPage(e.selected + 1)
    }
    const setViewData = (d) => {
        setView(d)
    }
    return (
        <>
            
                <section className="dashboard-sec">
                    <div className="container-fluid">
                        <Heading
                            text="upi verification"
                            image="upi-icon.webp"
                        />
                        <div className="row">
                            <div className="col-md-12">
                                <Table
                                    data={data}
                                    pagination={pagination}
                                    handlePageClick={handlePageClick}
                                    //filters
                                    setAlias={setAlias}
                                    setEmail={setEmail}
                                    setUpi={setUpi}
                                    setDate={setDate}
                                    setStatus={setStatus}
                                    getUpi={getUpi}
                                    handleOnExport={handleOnExport}
                                    setViewData={setViewData}
                                    setSortBy={setSortBy}
                                    setSortName={setSortName}
                                    sortBy={sortBy}
                                // setLoader={setLoader}
                                // loader={loader}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <Form
                    data={view}
                    getUpi={getUpi}
                // setLoader={setLoader}
                />
            
        </>
    )
}
export default UpiVerification;