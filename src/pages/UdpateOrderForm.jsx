import React, { useState, useEffect } from "react";

const UdpateOrderForm = ({ data }) => {

    return (
        <>
                <div className="modal fade common-modal" id="ordererModal" tabIndex="-1" aria-labelledby="ordererModal" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-uppercase d-flex align-items-center" id="cryptoDepositModalLabel">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M18 40q-6.7 0-11.35-4.65Q2 30.7 2 24q0-6.7 4.65-11.35Q11.3 8 18 8q6.7 0 11.35 4.65Q34 17.3 34 24q0 6.7-4.65 11.35Q24.7 40 18 40Zm0-3q5.4 0 9.2-3.8Q31 29.4 31 24q0-5.4-3.8-9.2Q23.4 11 18 11q-5.4 0-9.2 3.8Q5 18.6 5 24q0 5.4 3.8 9.2Q12.6 37 18 37Zm-1.5-6.5h3v-10h4v-2h-11v2h4Zm22.7-14.9-2.1-4.7-4.7-2.1 4.7-2.1L39.2 2l2.1 4.7L46 8.8l-4.7 2.1Zm0 30.4-2.1-4.7-4.7-2.1 4.7-2.1 2.1-4.7 2.1 4.7 4.7 2.1-4.7 2.1ZM18 24Z" /></svg>
                                    &nbsp;
                                    Order Info
                                </h5>
                                <button type="button" className="btn p-0 border-0" data-bs-dismiss="modal" aria-label="Close" id="cryptoDepositModalBtn">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                                </button>
                            </div>
                            <div className="modal-body admin-form">
                                {data?.tds_gst != null ?
                                <div className="row">
                                    <div className="col-sm-6">
                                        <p className="mb-0 mb-sm-3 fw-bold" style={{ color: 'var(--blue)' }}>Order Id</p>
                                    </div>

                                    <div className="col-sm-6">
                                        <p className="text-capitalize mb-3">{data?.tds_gst?.order_id}</p>
                                    </div>

                                    <div className="col-sm-6">
                                        <p className="mb-0 mb-sm-3 fw-bold" style={{ color: 'var(--blue)' }}>Commission currency </p>
                                    </div>

                                    <div className="col-sm-6">
                                        <p className="text-capitalize mb-3">{data?.tds_gst?.commission_currency}</p>
                                    </div>

                                    <div className="col-sm-6">
                                        <p className="mb-0 mb-sm-3 fw-bold" style={{ color: 'var(--blue)' }}>Commission value</p>
                                    </div>

                                    <div className="col-sm-6">
                                        <p className="text-capitalize mb-3">{data?.tds_gst?.commission_value}</p>
                                    </div>

                                    <div className="col-sm-6">
                                        <p className="mb-0 mb-sm-3 fw-bold" style={{ color: 'var(--blue)' }}>Commission deduct</p>
                                    </div>

                                    <div className="col-sm-6">
                                        <p className="text-capitalize mb-3">{data?.tds_gst?.commission_deduct} {data?.tds_gst?.commission_currency}</p>
                                    </div>

                                    <div className="col-sm-6">
                                        <p className="mb-0 mb-sm-3 fw-bold" style={{ color: 'var(--blue)' }}>Gst fees deduct </p>
                                    </div>

                                    <div className="col-sm-6">
                                        <p className="text-capitalize mb-3">{data?.tds_gst?.gst_fees_deduct} {data?.tds_gst?.commission_currency}</p>
                                    </div>


                                    <div className="col-sm-6">
                                        <p className="mb-0 mb-sm-3 fw-bold" style={{ color: 'var(--blue)' }}>Tds deduct</p>
                                    </div>

                                    <div className="col-sm-6">
                                        <p className="text-capitalize mb-3">{data?.tds_gst?.tds_deduct} {data?.tds_gst?.commission_currency}</p>
                                    </div>

                                    <div className="col-sm-6">
                                        <p className="mb-0 mb-sm-3 fw-bold" style={{ color: 'var(--blue)' }}>After deduct </p>
                                    </div>

                                    <div className="col-sm-6">
                                        <p className="text-capitalize mb-3">{data?.tds_gst?.after_deduct} {data?.tds_gst?.commission_currency} &nbsp;
                                        <span className="badge bg-success text-capitalize">credit amount</span>
                                        </p>
                                    </div>
                                </div>:
                                <p className="mb-0 text-center">No Record Found.</p>
                                }
                            </div>

                        </div>
                    </div>
                </div>
        </>
    )
}
export default UdpateOrderForm;