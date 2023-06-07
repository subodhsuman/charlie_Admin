import React, { useEffect, useState } from "react";
import Sidebar from "../layout/Sidebar";
import Table from "../components/Tds/Tabls.jsx";
import ApexCharts from 'apexcharts';
import Heading from '../components/Utils/Heading';
import CurrencyData from '../assets/json/currency.json';
import ApiClass from "../Api/api";
import SwalClass from "../common/swal";
import { generateExcel, generatePDF } from "../common/Export";


const Tds = () => {
    const [data, setData] = useState();
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState('');
    const [loader, setLoader] = useState(true)
    const [name, setName] = useState('');
    const [view, setView] = useState({});

    //Orders data get
    const getOrders = async () => {
        let response = await ApiClass.getNodeRequest(`orders/get-tds-report?page=${page}&currency=${name}`, true);

        console.log(response?.data);
        setLoader(false);
        if (response?.data?.status_code == 0) {
            return
        }
        if (response?.data?.status_code == 1) {
            setData(response?.data?.data?.data || []);
            setPagination({
                page: response?.data?.data?.current_page || 1,
                last_page: response?.data?.data?.last_page || 1,

            })
            return
        }
    }

    const handlePageClick = (e) => {
        setPage(e.selected + 1)
    }
    const handleOnExport = async (type) => {
        let response = await ApiClass.getNodeRequest(`orders/get-tds-report?page=${page}&currency=${name}`, true);

        if (!response.data.hasOwnProperty('status_code')) {
            SwalClass.success("Unable to Export at this time.");
            return;
        }

        if (response?.data?.status_code == 0) {
            SwalClass.failed(response?.data?.message)
            return
        }

        if (response?.data?.status_code == 1) {

            let d = response?.data?.data?.data;
            console.log({d});

            if (d.length == 0) {
                SwalClass.success("No Data to Export in Pdf/Excel.")
                return;
            }

            if (type == 0) {  // Excel
                generateExcel(d);
                return;
            }

            if (type == 1) { // PDF
                let heading = ['order_id', 'actual_qty', "commission_currency", "commission_value", 'commission_deduct', "gst_fees_deduct", "tds_deduct", "after_deduct"];
                // let relational_keys = {
                //     "heading": ["name"],
                //     "data": [
                //         {
                //             object: "user",
                //             keys: ["name"],
                //             parent: ""
                //         },
                //     ]
                // };
                return generatePDF(heading, d, "Tds"); // 
            }
        }
    }

    const setViewData = (data) => {
        setView(data)
    }

    useEffect(() => {
        setLoader(true)

        getOrders()
    }, [page])
    return (
        <>

            <section className="dashboard-sec">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="container-fluid">


                            </div>
                            <Table
                                getOrders={getOrders}
                                data={data}
                                pagination={pagination}
                                handlePageClick={handlePageClick}
                                setLoader={setLoader}
                                loader={loader}
                                setName={setName}
                                handleOnExport={handleOnExport}
                            />
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
export default Tds;