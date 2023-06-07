import React, { useEffect, useState } from "react";
import Sidebar from "../layout/Sidebar";
import Table from "../components/Orders/Table.jsx";
import ApexCharts from 'apexcharts';
import Heading from '../components/Utils/Heading';
import CurrencyData from '../assets/json/currency.json';
import ApiClass from "../Api/api";
import SwalClass from "../common/swal";
import { generateExcel, generatePDF } from "../common/Export";
import UdpateOrderForm from "./UdpateOrderForm";


const Users = () => {

    //   function addChart(){
    //     var options = {
    //         series: [75],
    //         chart: {
    //             height: 250,
    //             type: 'radialBar',
    //             toolbar: {
    //                 show: true
    //             }
    //         },
    //         plotOptions: {
    //             radialBar: {
    //                 startAngle: -135,
    //                 endAngle: 225,
    //                 hollow: {
    //                     margin: 0,
    //                     size: '70%',
    //                     background: 'transparent',
    //                     image: undefined,
    //                     imageOffsetX: 0,
    //                     imageOffsetY: 0,
    //                     position: 'front',
    //                     dropShadow: {
    //                         enabled: true,
    //                         top: 3,
    //                         left: 0,
    //                         blur: 4,
    //                         opacity: 0.24
    //                     }
    //                 },
    //                 track: {
    //                     // background: '#fff',
    //                     strokeWidth: '67%',
    //                     margin: 0, // margin is in pixels
    //                     dropShadow: {
    //                         enabled: true,
    //                         top: -3,
    //                         left: 0,
    //                         blur: 4,
    //                         opacity: 0.35
    //                     }
    //                 },

    //                 dataLabels: {
    //                     show: true,
    //                     name: {
    //                         offsetY: -10,
    //                         show: true,
    //                         color: 'white',
    //                         fontSize: '17px'
    //                     },
    //                     value: {
    //                         formatter: function (val) {
    //                             return parseInt(val);
    //                         },
    //                         color: '#111',
    //                         fontSize: '36px',
    //                         show: true,
    //                     }
    //                 }
    //             }
    //         },
    //         fill: {
    //             type: 'gradient',
    //             gradient: {
    //                 shade: 'dark',
    //                 type: 'horizontal',
    //                 shadeIntensity: 0.5,
    //                 gradientToColors: ['#ABE5A1'],
    //                 inverseColors: true,
    //                 opacityFrom: 1,
    //                 opacityTo: 1,
    //                 stops: [0, 100]
    //             }
    //         },
    //         stroke: {
    //             lineCap: 'round'
    //         },
    //         labels: ['Percent'],
    //     };
    //     var chart = new ApexCharts(document.querySelector("#chart"), options);
    //     chart.render();
    //     var chart2 = new ApexCharts(document.querySelector("#chart2"), options);
    //     chart2.render();
    //   }

    //     useEffect(()=>{
    //         addChart()
    //     },[])


    //states
    const [data, setData] = useState([]);
    const [optionsData, setOptionsData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState('');
    const [order_type, setOrder_type] = useState('');
    const [name, setName] = useState('');
    const [currency, setCurrency] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [at_price, setAt_price] = useState('');
    const [total_, setTotal_] = useState('');
    const [current_status, setCurrent_status] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortName, setSortName] = useState('');
    const [total, setTotal] = useState('');
    const [loader, setLoader] = useState(true)
    const [view, setView] = useState({});

    //Orders data get
    const getOrders = async () => {
        let response = await ApiClass.getRequest(`orders/get?page=${page}&name=${name}&order_type=${order_type}&currency=${currency}&created_at=${date}&quantity=${quantity}&at_price=${at_price}&total=${total_}&current_status=${current_status}&sortbyname=${sortName}&sortby=${sortBy}`, true);

        setLoader(false);
        if (!response.data.hasOwnProperty('status_code')) {
            SwalClass.success("Unable to fetch data at this time.");
            return;
        }

        if (response?.data?.status_code == 0) {
            return
        }
        if (response?.data?.status_code == 1) {
            setData(response?.data?.data?.data || []);
            setTotal(response?.data?.data?.total || 1);
            setPagination({
                page: response?.data?.data?.current_page || 1,
                last_page: response?.data?.data?.last_page || 1,

            })
            return
        }
    }

    //export tabel
    const handleOnExport = async (type) => {
        let response = await ApiClass.getRequest(`orders/get?page=${page}&name=${name}&order_type=${order_type}&currency=${currency}&created_at=${date}&quantity=${quantity}&at_price=${at_price}&total=${total_}&current_status=${current_status}&sortbyname=${sortName}&sortby=${sortBy}&per_page=${total}`, true);

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

            if (d.length == 0) {
                SwalClass.success("No Data to Export in Pdf/Excel.")
                return;
            }

            if (type == 0) {  // Excel
                generateExcel(d);
                return;
            }

            if (type == 1) { // PDF
                let heading = ['order_type', 'currency', "quantity", "at_price", 'total', "created_at", "current_status"];
                let relational_keys = {
                    "heading": ["name"],
                    "data": [
                        {
                            object: "user",
                            keys: ["name"],
                            parent: ""
                        },
                    ]
                };
                return generatePDF(heading, d, "Orders", relational_keys); // 
            }
        }
    }
    const setViewData = (data) => {
        setView(data)
    }
    useEffect(() => {
        setLoader(true)
        getOrders();
    }, [date, order_type, currency, current_status, sortBy, sortName, page]);


    const handlePageClick = (e) => {
        setPage(e.selected + 1)
    }

    //Order crypto list get
    const getOrderCryptoList = async () => {
        let response = await ApiClass.getRequest(`orders/crypto-list`, true);

        if (response?.data?.status_code == 0) {
            return
        }
        if (response?.data?.status_code == 1) {
            setOptionsData(response?.data?.data || []);
        }
    }
    useEffect(() => {
        getOrderCryptoList()
    }, [])

    return (
        <>

            <section className="dashboard-sec">
                <div className="container-fluid">
                    {/* <Heading 
                            text="Orders"
                            image="orders.webp"
                        /> */}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="container-fluid">
                                {/* <div className="row rounded mb-4 justify-content-center" style={{ background: 'var(--side-bg)' }}>
                                        <div className="col-md-7 col-xxl-4">
                                            <div className="odrerbox p-3">
                                                <form className="common-form-select">
                                                    <select className="form-select mb-3 round text-uppercase" aria-label=".form-select-lg" >
                                                        {CurrencyData.map((data,index)=>{
                                                            return(
                                                                <option value={index} className="text-uppercase" key={index}>{data.symbol}</option>

                                                            )
                                                        })}
                                                      
                                                    </select>
                                                </form>
                                                <div>
                                                    <div className="details-currency d-flex justify-content-between p-2 mb-2 rounded">
                                                        <p className="mb-0" >
                                                            Name
                                                        </p>
                                                        <p className="mb-0" >
                                                            Bitcoin
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="details-currency d-flex justify-content-between p-2 mb-2 rounded">
                                                        <p className="mb-0" >
                                                            Amount
                                                        </p>
                                                        <p className="mb-0" >
                                                            $ 7676.87
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="details-currency d-flex justify-content-between p-2 mb-2 rounded">
                                                        <p className="mb-0" >
                                                            Fee
                                                        </p>
                                                        <p className="mb-0" >
                                                            0.02%
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="details-currency d-flex justify-content-between p-2 rounded">
                                                        <p className="mb-0" >
                                                            Balance
                                                        </p>
                                                        <p className="mb-0" >
                                                            0.42 BTC
                                                        </p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-xxl-4">
                                            <div id="chart">

                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6 col-xxl-4">
                                            <div id="chart2">

                                            </div>
                                        </div>
                                    </div> */}

                            </div>
                            <Table
                                data={data}
                                pagination={pagination}
                                handlePageClick={handlePageClick}
                                setName={setName}
                                setOrder_type={setOrder_type}
                                setCurrency={setCurrency}
                                setQuantity={setQuantity}
                                setAt_price={setAt_price}
                                setTotal_={setTotal_}
                                setDate={setDate}
                                setCurrent_status={setCurrent_status}
                                getOrders={getOrders}
                                setSortBy={setSortBy}
                                setSortName={setSortName}
                                sortBy={sortBy}
                                handleOnExport={handleOnExport}
                                setLoader={setLoader}
                                loader={loader}
                                optionsData={optionsData}
                                setViewData={setViewData}
                            />
                            <UdpateOrderForm
                                data={view}
                            />
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
export default Users;