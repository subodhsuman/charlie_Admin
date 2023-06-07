import React from "react";
import Date from "../../../common/Date";
import Pagination from "../../Utils/Pagination";


const Table = ({ data, pagination, handlePageClick, setName, setstatus, setDate, getP2pChatList, handleOnExport, setLoader, loader, setViewData, setBuyConfirmation, setSellConfirmation }) => {
 
    const newTextOnKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setLoader(true);
            getP2pChatList();
        }
    };

    const searchBy = (e) => {
        e.preventDefault();
        setLoader(true);
        getP2pChatList();
    }

    const sorting = (field) => {
        // setsortBy(field)
        // sort_type == 'ASC' ?setsortType('DESC'):setsortType('ASC')
    }
    const clearDate = () => {
        document.getElementById('datepicker').reset();
        setDate('')
    }


    const confirmation = ["Not Confirmed", "Confirmed"];

    const statusconfirmation = ["pending", "completed", "cancelled", "processing"];

    const handleStatus = (v) => {
        let result = {
            "partially_completed": "bg-warning",
            "cancelled": "bg-danger",
            "completed": "bg-success",
            "processing": "bg-info"
        }
        return result[v];
    }
    return (
        <>
            <div className="admin-table-wrapper">
                <div className="admin-table-heading mb-3 d-sm-flex justify-content-between">
                    <h6 className="text-uppercase d-flex align-items-center justify-content-center justify-content-sm-start mb-2 mb-sm-0">
                        <img src="./images/p2p.webp" width="45px" height="45px" />
                        P2p Trade List
                    </h6>
                    <div className="d-flex gap-3 align-items-center justify-content-center">
                        <div>
                            <button className="btn p-0 border-0" data-bs-toggle="dropdown" data-bs-target="#exportDropdown">
                                <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V28.5h3V39h30V8.9H9v10.6H6V8.9q0-1.2.9-2.1.9-.9 2.1-.9h30q1.2 0 2.1.9.9.9.9 2.1V39q0 1.2-.9 2.1-.9.9-2.1.9Zm11.65-8.35L18.4 31.4l5.9-5.9H6v-3h18.3l-5.9-5.9 2.25-2.25L30.3 24Z" /></svg>
                            </button>
                            <ul className="dropdown-menu p-0" id="exportDropdown">
                                <li>
                                    <a className="dropdown-item rounded" href="#" onClick={() => handleOnExport(0)}>Excel</a>
                                </li>
                                <li>
                                    <a className="dropdown-item rounded" href="#" onClick={() => handleOnExport(1)}>Pdf</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="admin-table table-responsive">
                    <table className="table align-middle table-bordered w-100" id="table-container">
                        <tbody>
                            <tr>
                                <td >
                                    <form onSubmit={searchBy}>
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floadingName" onChange={(e) => setName(e.target.value)} />
                                            <label htmlFor="floadingName">Search By Trade Id</label>
                                        </div>
                                    </form>
                                </td>
                                <td >
                                    <form action="" className="status-form">
                                        <select className="form-select" aria-label=".form-select-lg" onChange={(e) => setBuyConfirmation(e.target.value)} >
                                            <option value="">Choose a status...</option>
                                            {confirmation.map((v, i) => {
                                                return (
                                                    <option value={i} key={i}>{v}</option>
                                                )
                                            })}
                                        </select>
                                    </form>

                                    {/* <form onSubmit={searchBy}>
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floadingName" onChange={(e) => setMatch_id(e.target.value)} />
                                            <label htmlFor="floadingName">Search By Order_Id</label>
                                        </div>
                                    </form> */}
                                </td>
                                <td >
                                    <form action="" className="status-form">
                                        <select className="form-select" aria-label=".form-select-lg" onChange={(e) => setSellConfirmation(e.target.value)} >
                                            <option value="">Choose a status...</option>
                                            {confirmation.map((v, i) => {
                                                return (
                                                    <option value={i} key={i}>{v}</option>
                                                )
                                            })}
                                        </select>
                                    </form>
                                    {/* <form onSubmit={searchBy}>
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floadingName" onChange={(e) => setMessage(e.target.value)} />
                                            <label htmlFor="floadingName">Search By Message</label>
                                        </div>
                                    </form> */}
                                </td>
                                <td >
                                    <form action="" className="status-form">
                                        <select className="form-select" aria-label=".form-select-lg" onChange={(e) => setstatus(e.target.value)} >
                                            <option value="">Choose a status...</option>
                                            {statusconfirmation.map((v, i) => {
                                                return (
                                                    <option value={v} key={i}>{v}</option>
                                                )
                                            })}
                                        </select>
                                    </form>
                                </td>
                                <td >
                                    <form action="" id="datepicker">
                                        <div className="form-floating position-relative">
                                            <input type="date" className="form-control" pattern="\d{4}-\d{2}-\d{2}" onKeyPress={newTextOnKeyDown} onChange={(e) => { isNaN(parseInt(e.target.value)) ? setDate('') : setDate((e.target.value).replace(/\b0/g, '')) }} />

                                            <label htmlFor="floadingCreatedAt" className="d-flex justify-content-between">
                                                Search By Created At
                                            </label>
                                            <button type="button" className="btn p-0 border-0 position-absolute" style={{ top: '2px', right: '15px', zIndex: '1', background: 'transparent' }} onClick={() => clearDate()}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                                            </button>
                                        </div>
                                    </form>
                                </td>

                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Trade Id</span>
                                        {/* <button className="btn p-0 border-0" onClick={() => sorting('name')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                        </button> */}
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Buyer Confirmation</span>
                                        {/* <button className="btn p-0 border-0" onClick={() => sorting('Type')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                        </button> */}
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Seller Confirmation</span>
                                        {/* <button className="btn p-0 border-0" onClick={() => sorting('Currency')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                        </button> */}
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Status</span>
                                        {/* <button className="btn p-0 border-0" onClick={() => sorting('Quantity')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                        </button> */}
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Date</span>
                                        {/* <button className="btn p-0 border-0" onClick={() => sorting('Quantity')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                        </button> */}
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Action</span>
                                        {/* <button className="btn p-0 border-0" onClick={() => sorting('Quantity')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                        </button> */}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        {loader ?
                            <tbody>
                                <tr>

                                    <td colSpan={10} className="text-center" >
                                        <div className="loader-outer d-flex align-items-center justify-content-center" style={{ minHeight: '40vh' }}>
                                            <div className="spinner-border" role="status" style={{ height: '70px', width: '70px' }}>
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            :
                            <>
                                {data?.length > 0 ?
                                    <tbody>
                                        {data?.map((v, i) => {
                                            return (
                                                <tr key={i} >
                                                    <td>
                                                        {v?.id}
                                                    </td>
                                                    <td>
                                                        {v?.buyer_confirmation == "0" ? "Not Confirmed" : "Confirmed"}
                                                    </td>
                                                    <td>
                                                        {v?.seller_confirmation == "0" ? "Not Confirmed" : "Confirmed"}
                                                    </td>
                                                    <td className="text-capitalize text-center">
                                                        <span className={`badge ${handleStatus(v.status)}`}>{v?.status}</span>
                                                    </td>
                                                    <td>
                                                        {Date.getDate(v?.created_at)}
                                                    </td>
                                                    <td>
                                                        <div className="d-flex gap-2">
                                                            <button className="btn" data-bs-toggle="modal" data-bs-target="#chatEditModal" onClick={() => setViewData(v?.id)}>
                                                                View
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>)
                                        })}
                                    </tbody>
                                    :
                                    <tbody>
                                        <tr>
                                            <td colSpan={8} className="text-center" style={{ color: 'var(--white)' }}>
                                                No Data Found.
                                            </td>
                                        </tr>
                                    </tbody>
                                }
                            </>}
                    </table>

                </div>
                <Pagination pagination={pagination} handlePageClick={handlePageClick} />
            </div>
        </>
    )
}
export default Table;