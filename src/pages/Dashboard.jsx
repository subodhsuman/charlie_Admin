import React, { useEffect, useState } from "react";
import Sidebar from "../layout/Sidebar";
import Table from '../components/dashboard/Table';
import AreaCharts from "../components/DashBoardCharts/AreaCharts";
import BarCharts from "../components/DashBoardCharts/BarCharts";
import LineCharts from "../components/DashBoardCharts/LineCharts";
import PieCharts from "../components/DashBoardCharts/PieCharts";
import { useSelector } from "react-redux";
import ApiClass from '../Api/api.js'

// console.log(u);
const Dashboard = () => {
    const IsDetail = useSelector((state) => {
        return state.user.detail
    });
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [d, setD] = useState([]);
    const [status, setStatus] = useState('day');
    const [loader, setLoader] = useState(true)
    const getAdmin = async () => {
        let response = await ApiClass.getRequest(`dashboard/total`, true);

        if (response?.data?.status_code == 0) {
            return
        }
        if (response?.data?.status_code == 1) {
            setLoading(false)
            setData(response?.data?.data)
            return
        }
    }

    const getTop10 = async () => {
        let response = await ApiClass.getRequest(`dashboard/top10Coin/${status}`, true);
        
        if (response?.data?.status_code == 0) {
            return
        }
        if (response?.data?.status_code == 1) {
            setLoader(false)
            setD(response?.data?.data)
            return
        }
    }
    useEffect(() => {
        getAdmin()
    }, []);
    useEffect(() => {
        setLoader(true)
        getTop10()
    }, [status]);

    const params = ["day", "month", "week"]
    return (
        <>

            <section className="dashboard-sec">
                <div className="container-fluid">
                    <div className="dashboard-heading mb-3">
                        <h5 className="mb-0 d-flex align-items-center text-capitalize">
                            <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M11 39h7.5V26.5h11V39H37V19.5L24 9.75 11 19.5Zm-3 3V18L24 6l16 12v24H26.5V29.5h-5V42Zm16-17.65Z" /></svg>&nbsp;
                            dashboard
                        </h5>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="user-dash p-3 rounded">
                                <svg className="mb-3" xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M11.1 35.25q3.15-2.2 6.25-3.375Q20.45 30.7 24 30.7q3.55 0 6.675 1.175t6.275 3.375q2.2-2.7 3.125-5.45Q41 27.05 41 24q0-7.25-4.875-12.125T24 7q-7.25 0-12.125 4.875T7 24q0 3.05.95 5.8t3.15 5.45ZM24 25.5q-2.9 0-4.875-1.975T17.15 18.65q0-2.9 1.975-4.875T24 11.8q2.9 0 4.875 1.975t1.975 4.875q0 2.9-1.975 4.875T24 25.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.775t4.3-6.35q2.725-2.725 6.375-4.3Q19.9 4 24 4q4.15 0 7.775 1.575t6.35 4.3q2.725 2.725 4.3 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.3 6.375-2.725 2.725-6.35 4.3Q28.15 44 24 44Zm0-3q2.75 0 5.375-.8t5.175-2.8q-2.55-1.8-5.2-2.75-2.65-.95-5.35-.95-2.7 0-5.35.95-2.65.95-5.2 2.75 2.55 2 5.175 2.8Q21.25 41 24 41Zm0-18.5q1.7 0 2.775-1.075t1.075-2.775q0-1.7-1.075-2.775T24 14.8q-1.7 0-2.775 1.075T20.15 18.65q0 1.7 1.075 2.775T24 22.5Zm0-3.85Zm0 18.7Z" /></svg>
                                <h6 className="mb-2 text-capitalize">{IsDetail?.name}</h6>
                                <p className="mb-2">
                                    Id no: #{IsDetail?.id}
                                </p>
                                <p className="mb-2">
                                    Email : {IsDetail?.email}
                                </p>
                            </div>
                            <hr />
                        </div>
                        <div className="col-md-8">
                            <div className="user-dash p-3 rounded d-flex jusitfy-content-between mb-4 mb-md-0">
                                <div className="w-100">
                                    <h4 className="mb-3" style={{ color: 'var(--blue)' }}>Welcome Back</h4>
                                    <p className="mb-2" style={{ color: 'var(--white)' }}>
                                        Charlie Exchange Dashboard
                                    </p>
                                    <p className="mb-0">
                                        We will provide what you want!!
                                    </p>
                                </div>
                                <div className="w-100 text-end">

                                    <img loading="lazy" src="./images/crypto_set.webp" alt="dashboard" className="" width="160" />
                                </div>

                            </div>
                        </div>
                        <div className="col-md-5 col-lg-6 col-xxl-4">
                            <div className="user-dash p-3 rounded d-flex justify-content-between mt-md-4 mt-xxl-0">
                                <div className="w-100">
                                    <h6 className="mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 48 48" fill="var(--blue)"><path d="M10.6 35.95V19h3v16.95Zm12.1 0V19h3v16.95Zm-18.7 6v-3h40v3Zm30.4-6V19h3v16.95ZM4 16v-2.65l20-11.4 20 11.4V16Zm6.7-3h26.6Zm0 0h26.6L24 5.4Z" /></svg>
                                        &nbsp;Balance:</h6>
                                    <p className="mb-0">
                                        {loading
                                            ?
                                            <button className="btn border-0 p-0 d-flex align-items-center gap-2" type="button" disabled>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Loading...
                                            </button>
                                            :
                                            <span>${(data?.total_investment).toFixed(5)}</span> 
                                        }
                                    </p>
                                </div>
                                <div className="w-100">
                                    <h6 className="mb-2">Coin:</h6>
                                    <p className="mb-0 d-flex gap-2 align-items-center">
                                        <img src="./images/bitcoin.webp" alt="image" style={{ height: '30px', width: '30px' }} />
                                        <img src="./images/ethereum.webp" alt="image" style={{ height: '36px', width: '36px' }} />
                                        <img src="./images/tron.webp" alt="image" style={{ height: '34px', width: '34px' }} />
                                    </p>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-7 col-lg-6 col-xxl-5">
                            <div className="user-dash p-3 rounded mt-2">
                                <div className="w-100">
                                    <h5 className="mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M24 46q-5.6 0-10.8-3.3Q8 39.4 5 35.15V42H2V30h12v3H7.15q2.55 3.85 7.275 6.925Q19.15 43 24 43q3.9 0 7.375-1.5t6.05-4.075Q40 34.85 41.5 31.375 43 27.9 43 24h3q0 4.55-1.725 8.55-1.725 4-4.725 7-3 3-7 4.725Q28.55 46 24 46Zm-1.45-7.65v-2.7q-2.25-.6-3.775-1.925Q17.25 32.4 16.2 30.1l2.55-.85q.6 1.9 2.125 3t3.475 1.1q2 0 3.325-.975Q29 31.4 29 29.8q0-1.65-1.25-2.775t-4.6-2.525q-3-1.25-4.5-2.7-1.5-1.45-1.5-3.9 0-2.2 1.5-3.75 1.5-1.55 4-1.9V9.7h2.75v2.55q1.9.2 3.3 1.2t2.25 2.75l-2.4 1.15q-.75-1.4-1.85-2.1-1.1-.7-2.6-.7-1.95 0-3.075.9-1.125.9-1.125 2.45 0 1.6 1.3 2.55 1.3.95 4.2 2.15 3.45 1.45 4.9 3.05 1.45 1.6 1.45 4.15 0 1.25-.45 2.3-.45 1.05-1.275 1.8T28 35.125q-1.2.475-2.7.625v2.6ZM2 24q0-4.55 1.725-8.55 1.725-4 4.725-7 3-3 7-4.725Q19.45 2 24 2q5.6 0 10.8 3.3Q40 8.6 43 12.85V6h3v12H34v-3h6.85q-2.55-3.85-7.25-6.925Q28.9 5 24 5q-3.9 0-7.375 1.5t-6.05 4.075Q8 13.15 6.5 16.625 5 20.1 5 24Z" /></svg>
                                        &nbsp;Total Exchnage Holding</h5>
                                    <p className="mb-0">
                                        {loading
                                            ?
                                            <button className="btn border-0 p-0 d-flex align-items-center gap-2" type="button" disabled>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Loading...
                                            </button>
                                            :
                                            <span>${(data?.total_holding).toFixed(5)}</span> 
                                        }
                                    </p>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-xxl-4">
                            <div className="user-dash p-3 rounded mt-3">
                                <h5 className="mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.2 1.55-7.825t4.3-6.325L24 24V4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Z" /></svg>
                                    &nbsp;Total Comission</h5>
                                <p className="mb-2">
                                    {loading
                                        ?
                                        <button className="btn border-0 p-0 d-flex align-items-center gap-2" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Loading...
                                        </button>
                                        :
                                        <span>${(data?.total_commission).toFixed(5)}</span>  
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-xxl-4">
                            <div className="user-dash p-3 rounded mt-3">
                                <h5 className="mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M27 27q-2.5 0-4.25-1.75T21 21q0-2.5 1.75-4.25T27 15q2.5 0 4.25 1.75T33 21q0 2.5-1.75 4.25T27 27Zm-16 7q-1.25 0-2.125-.875T8 31V11q0-1.25.875-2.125T11 8h32q1.25 0 2.125.875T46 11v20q0 1.25-.875 2.125T43 34Zm5-3h22q0-2.1 1.45-3.55Q40.9 26 43 26V16q-2.1 0-3.55-1.45Q38 13.1 38 11H16q0 2.1-1.45 3.55Q13.1 16 11 16v10q2.1 0 3.55 1.45Q16 28.9 16 31Zm24 9H5q-1.25 0-2.125-.875T2 37V14h3v23h35Zm-29-9V11v20Z" /></svg>

                                    &nbsp;Total Withdraw</h5>
                                <p className="mb-2">
                                    {loading
                                        ?
                                        <button className="btn border-0 p-0 d-flex align-items-center gap-2" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Loading...
                                        </button>
                                        :
                                        <span>${(data?.total_withdraw).toFixed(5)}</span> 
                                        
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-12 col-xxl-4">
                            <div className="user-dash p-3 rounded mt-3">
                                <h5 className="mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M18 40q-6.7 0-11.35-4.65Q2 30.7 2 24q0-6.7 4.65-11.35Q11.3 8 18 8q6.7 0 11.35 4.65Q34 17.3 34 24q0 6.7-4.65 11.35Q24.7 40 18 40Zm0-3q5.4 0 9.2-3.8Q31 29.4 31 24q0-5.4-3.8-9.2Q23.4 11 18 11q-5.4 0-9.2 3.8Q5 18.6 5 24q0 5.4 3.8 9.2Q12.6 37 18 37Zm-1.5-6.5h3v-10h4v-2h-11v2h4Zm22.7-14.9-2.1-4.7-4.7-2.1 4.7-2.1L39.2 2l2.1 4.7L46 8.8l-4.7 2.1Zm0 30.4-2.1-4.7-4.7-2.1 4.7-2.1 2.1-4.7 2.1 4.7 4.7 2.1-4.7 2.1ZM18 24Z" /></svg>
                                    &nbsp;Today Total Withdraw Commission</h5>
                                <p className="mb-2">
                                    {loading
                                        ?
                                        <button className="btn border-0 p-0 d-flex align-items-center gap-2" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Loading...
                                        </button>
                                        :
                                        <span>${(data?.today_total_withdraw).toFixed(5)}</span> 
                                    }
                                </p>
                            </div>
                        </div>
                        {/* <div className="col-md-8 col-lg-12">
                                <div className="user-dash p-3 rounded mt-3">
                                  <AreaCharts/>
                                </div>
                            </div> */}
                        {/* <div className="col-lg-12">
                                
                                    <div className="row">
                                        <div className="col-md-4 col-lg-6">
                                            <div className="user-dash p-3 rounded mt-3">
                                            <BarCharts/>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-lg-6">
                                            <div className="user-dash p-3 rounded mt-3">
                                            <LineCharts/>
                                            <PieCharts/>
                                            </div>
                                        </div>
                                
                                </div>
                            </div> */}

                        <div className="col-md-8 col-lg-12">
                            <div className="user-dash p-3 rounded mt-3">
                                <div className="d-flex justify-content-between">
                                    <h5 className="mb-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M18 40q-6.7 0-11.35-4.65Q2 30.7 2 24q0-6.7 4.65-11.35Q11.3 8 18 8q6.7 0 11.35 4.65Q34 17.3 34 24q0 6.7-4.65 11.35Q24.7 40 18 40Zm0-3q5.4 0 9.2-3.8Q31 29.4 31 24q0-5.4-3.8-9.2Q23.4 11 18 11q-5.4 0-9.2 3.8Q5 18.6 5 24q0 5.4 3.8 9.2Q12.6 37 18 37Zm-1.5-6.5h3v-10h4v-2h-11v2h4Zm22.7-14.9-2.1-4.7-4.7-2.1 4.7-2.1L39.2 2l2.1 4.7L46 8.8l-4.7 2.1Zm0 30.4-2.1-4.7-4.7-2.1 4.7-2.1 2.1-4.7 2.1 4.7 4.7 2.1-4.7 2.1ZM18 24Z" /></svg>
                                        &nbsp;Top 10 Trading Coin
                                    </h5>
                                    <form action="" className="status-form">
                                        <select className="form-select" aria-label=".form-select-lg" onChange={(e) => setStatus(e.target.value)} >
                                            {params.map((v, i) => {
                                                return (
                                                    <option value={v} key={i}>{v}</option>
                                                )
                                            })}
                                        </select>
                                    </form>
                                </div>
                                <Table data={d} loader={loader} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
export default Dashboard;