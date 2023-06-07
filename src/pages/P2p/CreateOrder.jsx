import React from "react";
import Sidebar from "../../layout/Sidebar";
import Table from '../../components/p2p/create-order/Table';
const CreateOrder = () => {
    return(
        <>
            
                <section className="dashboard-sec">
                    <div className="container-fluid">
                        <div className="heading mb-3">
                        <h5 className='mb-0'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M24 46q-5.6 0-10.8-3.3Q8 39.4 5 35.15V42H2V30h12v3H7.15q2.55 3.85 7.275 6.925Q19.15 43 24 43q3.9 0 7.375-1.5t6.05-4.075Q40 34.85 41.5 31.375 43 27.9 43 24h3q0 4.55-1.725 8.55-1.725 4-4.725 7-3 3-7 4.725Q28.55 46 24 46Zm-1.45-7.65v-2.7q-2.25-.6-3.775-1.925Q17.25 32.4 16.2 30.1l2.55-.85q.6 1.9 2.125 3t3.475 1.1q2 0 3.325-.975Q29 31.4 29 29.8q0-1.65-1.25-2.775t-4.6-2.525q-3-1.25-4.5-2.7-1.5-1.45-1.5-3.9 0-2.2 1.5-3.75 1.5-1.55 4-1.9V9.7h2.75v2.55q1.9.2 3.3 1.2t2.25 2.75l-2.4 1.15q-.75-1.4-1.85-2.1-1.1-.7-2.6-.7-1.95 0-3.075.9-1.125.9-1.125 2.45 0 1.6 1.3 2.55 1.3.95 4.2 2.15 3.45 1.45 4.9 3.05 1.45 1.6 1.45 4.15 0 1.25-.45 2.3-.45 1.05-1.275 1.8T28 35.125q-1.2.475-2.7.625v2.6ZM2 24q0-4.55 1.725-8.55 1.725-4 4.725-7 3-3 7-4.725Q19.45 2 24 2q5.6 0 10.8 3.3Q40 8.6 43 12.85V6h3v12H34v-3h6.85q-2.55-3.85-7.25-6.925Q28.9 5 24 5q-3.9 0-7.375 1.5t-6.05 4.075Q8 13.15 6.5 16.625 5 20.1 5 24Z"/></svg>
                            &nbsp;P2p</h5>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-10 col-xl-8">
                                <div className="rounded p-3" style={{backgroundColor:'var(--side-bg)'}}>
                                    <ul className="nav nav-tabs list-crypto-tabs border-bottom-0 gap-2" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link text-capitalize active" id="buy-tab" data-bs-toggle="tab" data-bs-target="#buy" type="button" role="tab" aria-controls="buy" aria-selected="true">buy</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link text-capitalize" id="sell-tab" data-bs-toggle="tab" data-bs-target="#sell" type="button" role="tab" aria-controls="sell" aria-selected="false">sell</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade py-3 show active" id="buy" role="tabpanel" aria-labelledby="buy-tab">
                                            <form>
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <div className="input-group mb-3">
                                                                <span className="input-group-text" id="basic-addon1">Currency</span>
                                                                <select className="form-select" aria-label=".form-select-lg" onChange={(e)=>setStatus(e.target.value)}>
                                                                    <option value=""></option>
                                                                    <option value="rejected">BTC</option>
                                                                    <option value="approved">USDT</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="input-group mb-3">
                                                                <span className="input-group-text" id="basic-addon1">With Currency</span>
                                                                <select className="form-select" aria-label=".form-select-lg" onChange={(e)=>setStatus(e.target.value)}>
                                                                    <option value=""></option>
                                                                    <option value="rejected">BTC</option>
                                                                    <option value="approved">USDT</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="input-group mb-3">
                                                                <span className="input-group-text" id="basic-addon1">At Price</span>
                                                                <input type="text" className="form-control" placeholder="" />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="input-group mb-3">
                                                                <span className="input-group-text" id="basic-addon1">Min Quantity</span>
                                                                <input type="text" className="form-control" placeholder="" />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="input-group mb-3">
                                                                <span className="input-group-text" id="basic-addon1">Max Quantity</span>
                                                                <input type="text" className="form-control" placeholder="" />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-12">
                                                            <div className="export-btn text-center">
                                                                <button className="btn">Buy</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="tab-pane fade py-3" id="sell" role="tabpanel" aria-labelledby="sell-tab">
                                            <form>
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="input-group mb-3">
                                                                <span className="input-group-text" id="basic-addon1">Currency</span>
                                                                <select className="form-select" aria-label=".form-select-lg" onChange={(e)=>setStatus(e.target.value)}>
                                                                    <option value=""></option>
                                                                    <option value="rejected">BTC</option>
                                                                    <option value="approved">USDT</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="input-group mb-3">
                                                                <span className="input-group-text" id="basic-addon1">With Currency</span>
                                                                <select className="form-select" aria-label=".form-select-lg" onChange={(e)=>setStatus(e.target.value)}>
                                                                    <option value=""></option>
                                                                    <option value="rejected">BTC</option>
                                                                    <option value="approved">USDT</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="input-group mb-3">
                                                                <span className="input-group-text" id="basic-addon1">At Price</span>
                                                                <input type="text" className="form-control" placeholder="" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="input-group mb-3">
                                                                <span className="input-group-text" id="basic-addon1">Payment Type</span>
                                                                <select className="form-select" aria-label=".form-select-lg" onChange={(e)=>setStatus(e.target.value)}>
                                                                    <option value=""></option>
                                                                    <option value="rejected">BTC</option>
                                                                    <option value="approved">USDT</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="input-group mb-3">
                                                                <span className="input-group-text" id="basic-addon1">Min Quantity</span>
                                                                <input type="text" className="form-control" placeholder="" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="input-group mb-3">
                                                                <span className="input-group-text" id="basic-addon1">Max Quantity</span>
                                                                <input type="text" className="form-control" placeholder="" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="export-btn text-center">
                                                                <button className="btn">Sell</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid mt-4">
                        <div className="heading mb-3">
                            <h5 className='mb-0'>List of Orders</h5>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Table />
                            </div>
                        </div>
                    </div>
                </section>
            
        </>
    )
}
export default CreateOrder;