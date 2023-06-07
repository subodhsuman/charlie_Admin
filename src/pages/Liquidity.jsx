import React, { useState } from 'react'
import Table from '../components/liquidity/Table';
import Api from "../Api/api.js";
import { useEffect } from 'react';
import EditModal from '../components/liquidity/editModal';
import Heading from '../components/Utils/Heading';
import AddModal from '../components/liquidity/addModal.jsx'
import SwalClass from '../common/swal';
import currency from "../assets/json//currency.json"
const Liquidity = () => {


    const [active, setActive] = useState('BTC')
    const [cryptos, setAllcrypto] = useState([])
    const [cryptosedit, setAllcryptoedit] = useState('')
    const [searchvalue, setSearchvalue] = useState('')
    const [Currencyoptions, setCurrencyoptions] = useState('')
    const [loader, setLoader] = useState(true)

    const Users = async () => {
        let response = await Api.getRequest(`liquidity/get`, true);
        if (!response.data.hasOwnProperty("status_code")) {
            SwalClass.failed("Unable to fetch data at this time.")
            return
        }
        if (response?.data?.status_code == 0) {
            return
        }
        if (response?.data?.status_code == 1) {
            setAllcrypto(response?.data?.data);
            setLoader(false);
            return
        }
    }

    useEffect(() => {
        Users()
    }, [])


    const setViewData = async (v) => {
        var result = await Api.getRequest("liquidity/get/" + v?.symbol, true);
        if (result?.data?.status_code == 1) {
            setAllcryptoedit(result?.data?.data)
        }

    }
    const setResetData = async (v) => {

        var result = await Api.updateRequest("liquidity/reset", true, { id: v?.id });
        if (result.data.status_code == 1) {
            SwalClass.success(result.data.message)
            Users()
            return;
        }
        if (result.data.status_code == 0) {
            SwalClass.failed(result.data.message)
            return;
        }

    }
    const addliquidy = async (v) => {
        var result = await Api.getRequest("liquidity/symbol", true);
        if (result.data.status_code == 1) {
            setCurrencyoptions(result.data.data);
        }

    }
    return (
        <>
                <section className="dashboard-sec">
                    <div className="container-fluid">
                        <div className="d-flex justify-content-between align-items-center">
                            <Heading
                                text="Liquidity"
                                image="liq.webp"
                            />

                            <div className="d-flex align-items-center gap-2">
                                <button className="btn p-0 border-0" data-bs-toggle="modal" data-bs-target="#addliquidityModal" onClick={() => { addliquidy() }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--white)"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z" /></svg>
                                </button>

                            </div>
                        </div>
                        {/* {cryptos.length != undefined ? <> */}
                            {/* {loader ? <div className="loader-outer d-flex align-items-center justify-content-center" style={{ minHeight: '40vh' }}>
                                <div className="spinner-border" role="status" style={{ height: '70px', width: '70px' }}>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> : */}
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="d-sm-flex justify-content-between align-items-center mb-3">
                                            <ul className="nav nav-tabs list-crypto-tabs border-bottom-0 justify-content-center mb-3 jusitfy-content-sm-start" id="liquidityTab" role="tablist">
                                                {currency?.map((data, index) => {
                                                    return (
                                                        <li className="nav-item" role="presentation" key={index}>
                                                            <button
                                                                className={`nav-link text-uppercase ${active == data?.symbol ? 'active' : ''}`}
                                                                id={`${data?.symbol}-tab`}
                                                                data-bs-toggle="tab"
                                                                data-bs-target={`#${data?.symbol}`}
                                                                type="button"
                                                                role="tab"
                                                                aria-controls={data?.symbol}
                                                                aria-selected="true"
                                                                onClick={() => { setActive(data?.symbol) }}
                                                            >
                                                                {data?.symbol}
                                                            </button>
                                                        </li>
                                                    )
                                                })}
                                                <li className="nav-item" role="presentation" >
                                                            <button
                                                                className={`nav-link text-uppercase ${active == 'self' ? 'active' : ''}`}
                                                                id={`self-tab`}
                                                                data-bs-toggle="tab"
                                                                data-bs-target={`#self`}
                                                                type="button"
                                                                role="tab"
                                                                aria-controls={'self'}
                                                                aria-selected="true"
                                                                onClick={() => { setActive('self') }}
                                                            >
                                                                self
                                                            </button>
                                                        </li>
                                            </ul>
                                            <div className="search-group">
                                                <div className="input-group border">
                                                    <input type="text" className="form-control border-0" placeholder="Search" aria-label="Search" aria-describedby=""

                                                        onChange={(e) => setSearchvalue(e.target.value)}
                                                    />
                                                    <span className="input-group-text border-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="19" width="19" viewBox="0 0 48 48" fill="var(--gray)"><path d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z" /></svg>
                                                    </span>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="tab-content" id="myTabContent">
                                            {/* {currency?.map((v, i) => {
                                                return ( */}

                                                    {/* <div
                                                        // className={`tab-pane fade ${active == v.symbol || 'self' ? 'active show' : ''}`}
                                                        id={v.symbol}
                                                        role="tabpanel"
                                                        aria-labelledby={`${v.symbol}-tab`}
                                                        key={i}
                                                    > */}
                                                        <Table data={cryptos} active={active} searchvalue={searchvalue} setViewData={setViewData} setResetData={setResetData} loader={loader} setLoader={setLoader}/>
                                                    {/* </div> */}
                                                {/* )
                                            })} */}


                                        </div>
                                    </div>
                                    {/* </div> */}
                                </div>
                        {/* </> :
                            <>
                                <p className="text-center">No Record Found</p>
                            </>} */}

                    </div>
                </section>
                <EditModal cryptosedit={cryptosedit || []} Users={Users} />
                <AddModal Currencyoptions={Currencyoptions || []} cryptos={currency || []} Users={Users} />
    
        </>
    )
}

export default Liquidity