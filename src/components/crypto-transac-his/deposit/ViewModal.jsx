import React, { useState, useEffect } from "react";

const ViewModal = ({ data, adminData }) => {
    const { symbol, status, chain_type, amount, updated_at, user_wallet_address, token_type } = data;
    const [sym, setSymbol] = useState("");
    const [address_, setAddress_] = useState("");

    const copyTxn = (id) => {
        let add = document.getElementById(id);
        add.select();
        document.execCommand("copy")
    }

    const chainFilter = ({ token_type, chain, symbol }) => {
        if (token_type == "SELF") {
            let result = {
                "BSC": "BNB",
                "ETH": "ETH",
                "TRX": "TRX"
            }
            return result[chain];
        } else {
            return symbol;
        }
    }

    const addressFilter = ({ chain, data }) => {

        // const custom = [
        //     {
        //         "address": "0xaFE87813A4274d81B4071886cf7907852eb16FE8",
        //         "type": "ETH"
        //     },
        //     {
        //         "address": "1NoGMk47XakAbngaQou3EX2N8h8ELJz63o",
        //         "type": "BTC"
        //     },
        //     {
        //         "address": "TLV7ovxmSNp8Kmsy6Teq2Su13ERdbE9D5e",
        //         "type": "TRON"
        //     }
        // ]
        chain = chainHandler(chain)
        let address;
        data.map((v, i) => { // data
            v.type == chain ? address = v.address : '';
        })
        return address;
    }

    const chainHandler = (v) => {
        let result = {
            "ETH" : "ETH",
            "BTC" : "BTC",
            "TRON" : "TRON",
            "BSC" : "ETH",
            "TRX" : "TRON"
        }
        return result[v];
    } 


    // useEffect(() => {
    //     // {(chain_type == "BSC"  && token_type == "SELF") ? setSymbol("BNB") : setSymbol(symbol) };
    //     // {(chain_type == "ETH"  && token_type == "SELF") ? setSymbol("ETH") : setSymbol(symbol) };
    //     // {(chain_type == "TRON"  && token_type == "SELF") ? setSymbol("TRX") : setSymbol(symbol) };

    //     // {(chain_type == "BSC") ? setAddress_(adminData[0].address) :"" };
    //     // {(symbol == "TRON"  && symbol == "TRX") ? setAddress_(adminData[2].address) : setSymbol(symbol) };
    //     // console.log(adminData);
    // }, [chain_type, token_type, adminData])

    const handleStatus = (status) => {
        let result = {
            "pending": "bg-warning",
            "rejected" : "bg-danger",
            "completed" : "bg-success"
        }
        return result[status];
    };
    return (
        <>
            <div className="modal fade common-modal" id="cryptoDepositModal" tabIndex="-1" aria-labelledby="cryptoDepositModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-uppercase d-flex align-items-center" id="cryptoDepositModalLabel">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M18 40q-6.7 0-11.35-4.65Q2 30.7 2 24q0-6.7 4.65-11.35Q11.3 8 18 8q6.7 0 11.35 4.65Q34 17.3 34 24q0 6.7-4.65 11.35Q24.7 40 18 40Zm0-3q5.4 0 9.2-3.8Q31 29.4 31 24q0-5.4-3.8-9.2Q23.4 11 18 11q-5.4 0-9.2 3.8Q5 18.6 5 24q0 5.4 3.8 9.2Q12.6 37 18 37Zm-1.5-6.5h3v-10h4v-2h-11v2h4Zm22.7-14.9-2.1-4.7-4.7-2.1 4.7-2.1L39.2 2l2.1 4.7L46 8.8l-4.7 2.1Zm0 30.4-2.1-4.7-4.7-2.1 4.7-2.1 2.1-4.7 2.1 4.7 4.7 2.1-4.7 2.1ZM18 24Z" /></svg>
                                &nbsp;
                                {chainFilter({ token_type, chain: chain_type, symbol })} </h5>
                            <button type="button" className="btn p-0 border-0" data-bs-dismiss="modal" aria-label="Close" id="cryptoDepositModalBtn">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                            </button>
                        </div>
                        <div className="modal-body admin-form">
                            <div className="row">
                                <div className="col-sm-6">
                                    <p className="mb-0 mb-sm-3 fw-bold" style={{ color: 'var(--blue)' }}>Amount</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="text-capitalize mb-3">{amount}</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0 mb-sm-3 fw-bold" style={{ color: 'var(--blue)' }}>Chain Type</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="text-capitalize mb-3">{chain_type}</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0 mb-sm-3 fw-bold" style={{ color: 'var(--blue)' }}>Status</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="text-capitalize mb-3"><span className={`badge ${handleStatus(status)}`}>{status}</span></p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0 mb-sm-3 fw-bold" style={{ color: 'var(--blue)' }}>Sender Address</p>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input-group">
                                        <input type="text" value={user_wallet_address || ''} id="sender-address_" className="form-control border-0 p-0" onChange={() => { }} />
                                        <span className="input-group-text border-0">
                                            <button className="btn p-0 border-0" style={{ backgroundColor: 'transparent' }} onClick={() => copyTxn('sender-address_')}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z" /></svg>
                                            </button>
                                        </span>
                                    </div>

                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0 mb-sm-3 fw-bold" style={{ color: 'var(--blue)' }}>Destination Address</p>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input-group">
                                        <input type="text" value={addressFilter({ chain: chain_type, data: adminData }) || ''} id="destination-address_" className="form-control border-0 p-0" onChange={() => { }} />
                                        <span className="input-group-text border-0">
                                            <button className="btn p-0 border-0" style={{ backgroundColor: 'transparent' }} onClick={() => copyTxn('destination-address_')}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z" /></svg>
                                            </button>
                                        </span>
                                    </div>

                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0 mb-sm-3 fw-bold" style={{ color: 'var(--blue)' }}>Time</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="text-capitalize mb-3">{new Date(updated_at).toLocaleString()}&nbsp;

                                    </p>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ViewModal;