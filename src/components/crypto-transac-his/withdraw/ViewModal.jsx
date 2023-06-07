import React, { useState, useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from 'yup';
// import ApiClass from "../../Api/api";
// import SwalClass from "../../common/swal";
const ViewModal = ({ data }) => {
    const { currency, transfer_detail, status, chain_type, to_address, type, amount, updatedAt } = data;
    const copyTxn = (id) => {
        let add = document.getElementById(id);
        add.select();
        document.execCommand("copy")
    }
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
            <div className="modal fade common-modal" id="cryptoViewModal" tabIndex="-1" aria-labelledby="cryptoViewModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-uppercase d-flex align-items-center" id="cryptoViewModalLabel">
                              Token - {currency} </h5>
                            <button type="button" className="btn p-0 border-0" data-bs-dismiss="modal" aria-label="Close" id="cryptoViewModalBtn">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                            </button>
                        </div>
                        <div className="modal-body admin-form">
                            <div className="row">
                                <div className="col-sm-6">
                                    <p className="mb-0 mb-sm-3 fw-bold" style={{color:'var(--blue)'}}>Type</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="text-capitalize mb-3">{type}</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0 mb-sm-3 fw-bold" style={{color:'var(--blue)'}}>Quantity</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="text-capitalize mb-3">{amount}</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0 mb-sm-3 fw-bold" style={{color:'var(--blue)'}}>Chain Type</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="text-capitalize mb-3">{chain_type}</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0 mb-sm-3 fw-bold" style={{color:'var(--blue)'}}>Status</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="text-capitalize mb-3">
                                           
                                        <span className={`badge ${handleStatus(status)}`}>
                                        {status}
                                        </span> 
                                    </p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0 mb-sm-3 fw-bold" style={{color:'var(--blue)'}}>Txn Hash</p>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input-group">
                                    <input type="text" value={transfer_detail?.transactionHash || ''} id="txn-hash" className="form-control border-0 p-0" onChange={()=>{}}/>
                                        <span className="input-group-text border-0">
                                        <button className="btn p-0 border-0" style={{ backgroundColor: 'transparent' }} onClick={()=>copyTxn('txn-hash')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z" /></svg>
                                        </button>
                                        </span>
                                    </div>

                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0 mb-sm-3 fw-bold" style={{color:'var(--blue)'}}>Sender Address</p>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input-group">
                                    <input type="text" value={transfer_detail?.from || ''} id="sender-address" className="form-control border-0 p-0" onChange={()=>{}} />
                                        <span className="input-group-text border-0">
                                        <button className="btn p-0 border-0" style={{ backgroundColor: 'transparent' }} onClick={()=>copyTxn('sender-address')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z" /></svg>
                                        </button>
                                        </span>
                                    </div>

                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0 mb-sm-3 fw-bold" style={{color:'var(--blue)'}}>Destination Address</p>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input-group">
                                    <input type="text" value={to_address || ''} id="destination-address" className="form-control border-0 p-0"  onChange={()=>{}}/>
                                        <span className="input-group-text border-0">
                                        <button className="btn p-0 border-0" style={{ backgroundColor: 'transparent' }} onClick={()=>copyTxn('destination-address')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z" /></svg>
                                        </button>
                                        </span>
                                    </div>

                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0 mb-sm-3 fw-bold" style={{color:'var(--blue)'}}>Time</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="text-capitalize mb-3">{new Date(updatedAt).toLocaleString()}&nbsp;
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