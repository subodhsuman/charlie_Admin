import React, { useState, useEffect } from 'react'
import Sidebar from '../layout/Sidebar';
import WalletData from '../assets/json/wallets.json';
import Heading from '../components/Utils/Heading';
import ApiClass from '../Api/api';
import SwalClass from '../common/swal';

function Wallet() {
    const [loading, setLoading] = useState(true)
    const [change, setChange] = useState(false);
    const [data, setData] = useState(false);

    //Wallet List get
    const WalletList = async () => {
        let response = await ApiClass.getRequest(`wallet/get`, true);
        setLoading(false)
        if (!response?.data.hasOwnProperty('status_code')) {
            SwalClass.success("Unable to fetch data at this time.");
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

    useEffect(() => {
        WalletList();
    }, []);


    //copy address function
    const copyText = (id) => {
        let add = document.getElementById(`address-${id}`);
        add.select();
      
        document.execCommand("copy")
        document.getElementById(`btn-${id}`).innerHTML = "Copied!";


        // After 2 second Copied change to Copy
        setTimeout(() => {
            document.getElementById(`btn-${id}`).innerHTML = "Copy";
        }, 2000);
    };

    return (
        <>
            
                <section className='dashboard-sec'>
                    <div className='container-fluid'>
                        <div className="d-flex gap-2 align-items-center">
                            <Heading
                                text="wallet"
                                image="wallet.webp"
                            />
                            <button className='btn p-0 border-0 mb-3' onClick={() => setChange(!change)}>
                                {change ?
                                    <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox='0 0 48 48' fill='var(--white)'><path d="m31.45 27.05-2.2-2.2q1.3-3.55-1.35-5.9-2.65-2.35-5.75-1.2l-2.2-2.2q.85-.55 1.9-.8 1.05-.25 2.15-.25 3.55 0 6.025 2.475Q32.5 19.45 32.5 23q0 1.1-.275 2.175-.275 1.075-.775 1.875Zm6.45 6.45-2-2q2.45-1.8 4.275-4.025Q42 25.25 42.85 23q-2.5-5.55-7.5-8.775Q30.35 11 24.5 11q-2.1 0-4.3.4-2.2.4-3.45.95L14.45 10q1.75-.8 4.475-1.4Q21.65 8 24.25 8q7.15 0 13.075 4.075Q43.25 16.15 46 23q-1.3 3.2-3.35 5.85-2.05 2.65-4.75 4.65Zm2.9 11.3-8.4-8.25q-1.75.7-3.95 1.075T24 38q-7.3 0-13.25-4.075T2 23q1-2.6 2.775-5.075T9.1 13.2L2.8 6.9l2.1-2.15L42.75 42.6ZM11.15 15.3q-1.85 1.35-3.575 3.55Q5.85 21.05 5.1 23q2.55 5.55 7.675 8.775Q17.9 35 24.4 35q1.65 0 3.25-.2t2.4-.6l-3.2-3.2q-.55.25-1.35.375T24 31.5q-3.5 0-6-2.45T15.5 23q0-.75.125-1.5T16 20.15Zm15.25 7.1Zm-5.8 2.9Z" /></svg>

                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox='0 0 48 48' fill='var(--white)'><path d="M24 31.5q3.55 0 6.025-2.475Q32.5 26.55 32.5 23q0-3.55-2.475-6.025Q27.55 14.5 24 14.5q-3.55 0-6.025 2.475Q15.5 19.45 15.5 23q0 3.55 2.475 6.025Q20.45 31.5 24 31.5Zm0-2.9q-2.35 0-3.975-1.625T18.4 23q0-2.35 1.625-3.975T24 17.4q2.35 0 3.975 1.625T29.6 23q0 2.35-1.625 3.975T24 28.6Zm0 9.4q-7.3 0-13.2-4.15Q4.9 29.7 2 23q2.9-6.7 8.8-10.85Q16.7 8 24 8q7.3 0 13.2 4.15Q43.1 16.3 46 23q-2.9 6.7-8.8 10.85Q31.3 38 24 38Zm0-15Zm0 12q6.05 0 11.125-3.275T42.85 23q-2.65-5.45-7.725-8.725Q30.05 11 24 11t-11.125 3.275Q7.8 17.55 5.1 23q2.7 5.45 7.775 8.725Q17.95 35 24 35Z" /></svg>

                                }
                            </button>
                        </div>

                        {/* Gas Fees Wallets */}
                        <div className='row' >
                            <div className="col-sm-6 col-xxl-3 mb-3">
                                <div className='wallet-dash d-flex align-items-center gap-3 p-2 rounded' style={{ backgroundColor: "var(--side-bg)", minHeight: '90px' }} >

                                    {loading ?
                                        <button className="btn border-0 w-100" type="button" disabled>
                                            <div className="d-flex align-items-center justify-content-center gap-2">
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Loading...
                                            </div>
                                        </button>
                                        :
                                        <>
                                            <div>
                                                <img src="./images/user.webp" alt="image" style={{ width: "30px", height: "30px" }} />
                                            </div>
                                            <div className='w-100'>
                                                <p className="mb-0" >
                                                    {data?.user?.name} &nbsp;&nbsp;&nbsp;
                                                    <span style={{color:"red"}}>Gas Fees Wallets :-</span>
                                                </p>
                                                <p className="mb-0" >
                                                    {data?.user?.email}
                                                </p>
                                                <p className="mb-0" >
                                                    {data?.user?.id}
                                                </p>
                                            </div>
                                        </>

                                    }

                                </div>
                            </div>
                            {loading ?
                                <>
                                    {WalletData.map((v, i) => {
                                        return (
                                            <div className="col-sm-6 col-xxl-3 mb-3" key={i}>
                                                <div className='wallet-dash d-flex align-items-center gap-3 p-2  rounded' style={{ backgroundColor: "var(--side-bg)", minHeight: '90px' }}>
                                                    <button className="btn border-0 w-100" type="button" disabled>
                                                        <div className="d-flex align-items-center justify-content-center gap-2">
                                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                            Loading...
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </> :
                                <>
                                    {data.length != 0 && data?.wallet?.map((v, i) => {
                                        return (
                                            <div className="col-sm-6 col-xxl-3 mb-3" key={i}>
                                                <div className='wallet-dash d-flex align-items-center gap-3 p-2  rounded' style={{ backgroundColor: "var(--side-bg)" }}>
                                                    <div>
                                                        <img
                                                            loading='lazy'
                                                            src={v?.image}
                                                            style={{ height: "25px", width: "25px" }}
                                                            alt={"coin"}
                                                            className="img-fluid tkn-logo"
                                                            onError={event => {
                                                                event.target.src = "./images/not-found.webp"
                                                                event.onerror = null
                                                            }}
                                                        />
                                                    </div>
                                                    <div className='w-100'>
                                                        <p className="mb-2 text-capitalize">{v?.type} Wallet</p>
                                                        <div className="input-group mb-1">
                                                            <input type={change ? "text" : "password"} className="form-control" value={v?.address} id={`address-${v.type}`} aria-label="Username" aria-describedby="basic-addon1" readOnly />
                                                           {change && <span className="input-group-text p-0 border-start" id="basic-addon1">
                                                                <button id={`btn-${v.type}`} className='btn border-0' onClick={() => copyText(v?.type)}>Copy</button>
                                                            </span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                            }
                        </div>

                        {/* Deposit Wallets */}
                        
                        <div className='row align-items-center' >
                            <div className="col-sm-6 col-xxl-3 mb-3">
                            <div className='wallet-dash align-items-center gap-3 p-2 rounded' style={{ backgroundColor: "var(--side-bg)", minHeight: '90px' }} >
                                <span style={{color:"red"}}>Deposit Wallets :-</span><br />
                                <p>ETH And BSC wallet have same address</p>
                            </div>
                            </div>
                            {loading ?
                                <>
                                    {WalletData.map((v, i) => {
                                        return (
                                            <div className="col-sm-6 col-xxl-3 mb-3" key={i}>
                                                <div className='wallet-dash d-flex align-items-center gap-3 p-2  rounded' style={{ backgroundColor: "var(--side-bg)", minHeight: '90px' }}>
                                                    <button className="btn border-0 w-100" type="button" disabled>
                                                        <div className="d-flex align-items-center justify-content-center gap-2">
                                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                            Loading...
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </> :
                                <>
                                     
                                    {data.length != 0 && data?.deposit_wallets?.map((v, i) => {
                                        return (
                                            <div className="col-sm-6 col-xxl-3 mb-3" key={i}>
                                                <div className='wallet-dash d-flex align-items-center gap-3 p-2  rounded' style={{ backgroundColor: "var(--side-bg)" }}>
                                                    <div>
                                                        <img
                                                            loading='lazy'
                                                            src={v?.image}
                                                            style={{ height: "25px", width: "25px" }}
                                                            alt={"coin"}
                                                            className="img-fluid tkn-logo"
                                                            onError={event => {
                                                                event.target.src = "./images/not-found.webp"
                                                                event.onerror = null
                                                            }}
                                                        />
                                                    </div>
                                                    <div className='w-100'>
                                                        <p className="mb-2 text-capitalize">{v?.type} Wallet</p>
                                                        <div className="input-group mb-1">
                                                            <input type={change ? "text" : "password"} className="form-control" value={v?.address} id={`address-${v.type}1`} aria-label="Username" aria-describedby="basic-addon1" readOnly />
                                                           {change && <span className="input-group-text p-0 border-start" id="basic-addon1">
                                                                <button id={`btn-${v.type}1`} className='btn border-0' onClick={() => copyText(`${v?.type}1`)}>Copy</button>
                                                            </span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </>
                            }
                        </div>

                    </div>
                </section>


            
        </>
    )
}

export default Wallet