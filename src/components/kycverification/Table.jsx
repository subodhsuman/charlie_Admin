import React from "react";

import Pagination from "../Utils/Pagination";
import Date from '../../common/Date.js'

const Table = ({ data, pagination, handlePageClick, setViewData, getkyc, setFname, setMname, setLname, setDate, setAddress, setCountry, setStatus, setSortbyname, setSortBy, sortby, setLoader, loader }) => {

    const newTextOnKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setLoader(true)
            getkyc();
        }
    };

    const searchBy = (e) => {
        e.preventDefault();
        setLoader(true)
        getkyc();
    }

    const sorting = (field) => {
        setSortbyname(field)
        sortby == 'asc' ? setSortBy('desc') : setSortBy('asc')
    }

    const clearDate = () => {
        document.getElementById('datepicker').reset();
        setDate('')
    }

    const handleStatus = (v) => {
        let result = {
            "pending": "bg-warning",
            "rejected": "bg-danger",
            "completed": "bg-success"
        }
        return result[v];
    };

    return (
        <>
            <div className="admin-table-wrapper">
                <div className="admin-table table-responsive">
                    <table className="table align-middle table-bordered w-100" id="table-container">
                        <tbody>
                            <tr>
                                <td >
                                    <form onSubmit={searchBy}>
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floadingName" onChange={(e) => setFname(e.target.value)} />
                                            <label htmlFor="floadingName">Search By First Name</label>
                                        </div>
                                    </form>
                                </td>
                                <td >
                                    <form onSubmit={searchBy}>
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floadingEmail" onChange={(e) => setMname(e.target.value)} />
                                            <label htmlFor="floadingEmail">Search By Middle Name</label>
                                        </div>
                                    </form>
                                </td>
                                <td >
                                    <form onSubmit={searchBy}>
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floadingEmail" onChange={(e) => setLname(e.target.value)} />
                                            <label htmlFor="floadingEmail">Search By Last Name</label>
                                        </div>
                                    </form>
                                </td>

                                <td >
                                    <form action="" id="datepicker">
                                        <div className="form-floating position-relative">
                                            <input type="date" className="form-control" pattern="\d{4}-\d{2}-\d{2}" onChange={(e) => { isNaN(parseInt(e.target.value)) ? setDate('') : setDate((e.target.value).replace(/\b0/g, '')) }} onKeyPress={newTextOnKeyDown} />

                                            <label htmlFor="floadingCreatedAt" className="d-flex justify-content-between">
                                                Search By Created At
                                            </label>
                                            <button type="button" className="btn p-0 border-0 position-absolute" style={{ top: '2px', right: '15px', zIndex: '1', background: 'transparent' }} onClick={() => clearDate()}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                                            </button>
                                        </div>
                                    </form>
                                </td>
                                <td >
                                    <form onSubmit={searchBy}>
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floadingEmail" onChange={(e) => setAddress(e.target.value)} />
                                            <label htmlFor="floadingEmail">Search By Address</label>
                                        </div>
                                    </form>
                                </td>
                                <td >
                                    <form onSubmit={searchBy}>
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floadingEmail" onChange={(e) => setCountry(e.target.value)} />
                                            <label htmlFor="floadingEmail">Search By Country</label>
                                        </div>
                                    </form>
                                </td>
                                <td >
                                    <form action="" className="status-form">
                                        <select className="form-select" aria-label=".form-select-lg" onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Choose status</option>
                                            <option value="pending">Pending</option>
                                            <option value="rejected">Rejected</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </form>
                                </td>
                                <td >

                                </td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>First Name</span>
                                        <button className="btn p-0 border-0" onClick={() => sorting('first_name')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                        </button>
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Middle Name</span>
                                        <button className="btn p-0 border-0" onClick={() => sorting('middle_name')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                        </button>
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Last Name</span>
                                        <button className="btn p-0 border-0" onClick={() => sorting('last_name')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                        </button>
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Date Of Birth</span>
                                        <button className="btn p-0 border-0" onClick={() => sorting('date_birth')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                        </button>
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Address</span>
                                        <button className="btn p-0 border-0" onClick={() => sorting('address')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                        </button>
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Country</span>
                                        <button className="btn p-0 border-0" onClick={() => sorting('country')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                        </button>
                                    </div>
                                </th>
                                <th>
                                    Verification Status
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Document</span>
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
                                        {data.map((v, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>
                                                        {v.first_name}
                                                    </td>
                                                    <td>
                                                        {v.middle_name}
                                                    </td>
                                                    <td>
                                                        {v.last_name}
                                                    </td>
                                                    <td>
                                                        {Date.getDate(v.createdAt)}
                                                    </td>
                                                    <td>
                                                        {v.address}
                                                    </td>
                                                    <td>
                                                        {v.country}
                                                    </td>
                                                    <td className="text-center">
                                                        <span className={`badge ${handleStatus(v.status)}`}>{v.status}</span>
                                                    </td>
                                                    <td className="text-center">
                                                        <button className="btn" data-bs-toggle="modal" data-bs-target="#documentModal" onClick={() => setViewData(v)}>
                                                            View
                                                        </button>
                                                    </td>

                                                </tr>
                                            )
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
                            </>
                        }
                    </table>

                </div>
                <Pagination pagination={pagination} handlePageClick={handlePageClick} />

            </div>
        </>
    )
}
export default Table;