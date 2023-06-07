import React from "react";
import Date from "../../common/Date";
import Pagination from "../Utils/Pagination.jsx";;


const Table = ({ data, setViewData,pagination, handlePageClick, getUsers, setName, setEmail, setDate, setStatus, updateEnabled, setUniqueId, setSortBy,setSortName,sortBy }) => {



    const newTextOnKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            getUsers();
        }
    };

    const searchBy = (e) => {
        e.preventDefault();
        getUsers();
    }

    const sorting = (field) => {
        setSortName(field)
        sortBy == 'asc' ? setSortBy('desc'): setSortBy('asc')
    }
    const clearDate = () => {
        document.getElementById('datepicker').reset();
        setDate('')
    }


    return (
        <>
            <div className="admin-table-wrapper">
                <div className="admin-table table-responsive">
                    <table className="table align-middle table-bordered w-100" id="table-container">
                        <tbody>
                            <tr scope="row">
                                <td scope="col">
                                    <form onSubmit={searchBy}>
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floadingName" onChange={(e)=>setUniqueId(e.target.value)}  />
                                            <label htmlFor="floadingName">Search By Unique Id</label>
                                        </div>
                                    </form>
                                </td>
                                <td scope="col">
                                    <form onSubmit={searchBy}>
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floadingName" onChange={(e) => setName(e.target.value)} />
                                            <label htmlFor="floadingName">Search By Name</label>
                                        </div>
                                    </form>
                                </td>
                                <td scope="col">
                                    <form onSubmit={searchBy}>
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floadingEmail" onChange={(e) => setEmail(e.target.value)} />
                                            <label htmlFor="floadingEmail">Search By Email</label>
                                        </div>
                                    </form>
                                </td>

                                <td scope="col">
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
                                <td scope="col">
                                    <form action="" className="status-form">
                                        <select className="form-select" aria-label=".form-select-lg" onChange={(e) => { setStatus(e.target.value); }}>
                                            <option value="">Choose A Status</option>
                                            <option value="verified">Verified</option>
                                            <option value="unverified">Unverified</option>
                                        </select>
                                    </form>
                                </td>
                                <td scope="col">
                                </td>
                                <td scope="col">
                                </td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr scope="row">
                                <th scope="col">
                                    <div className="d-flex justify-content-between">
                                        <span>Unique Id</span>
                                        <button className="btn p-0 border-0" onClick={() => sorting('user_unique_id')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                        </button>
                                    </div>
                                </th>
                                <th scope="col">
                                    <div className="d-flex justify-content-between">
                                        <span>Name</span>
                                        <button className="btn p-0 border-0" onClick={() => sorting('name')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                        </button>
                                    </div>
                                </th>
                                <th scope="col">
                                    <div className="d-flex justify-content-between">
                                        <span>Email</span>
                                        <button className="btn p-0 border-0" onClick={() => sorting('email')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                        </button>
                                    </div>
                                </th>
                                <th scope="col">
                                    <div className="d-flex justify-content-between">
                                        <span>Date</span>
                                        <button className="btn p-0 border-0" onClick={() => sorting('created_at')}>

                                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                        </button>
                                    </div>
                                </th>
                                <th scope="col">
                                    Status
                                </th>
                                <th scope="col">
                                    Enable/Disable
                                </th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {data?.length > 0 ?
                            <tbody>
                                {data.map((val, index) => (
                                    <tr key={index}>
                                        <td>
                                            {val?.user_unique_id}
                                        </td>
                                        <td className="text-capitalize">
                                            {val?.name}
                                        </td>
                                        <td>
                                            {val?.email}
                                        </td>
                                        <td className="text-center">
                                            {Date.getDate(val?.created_at)}
                                        </td>

                                        <td className="text-center">
                                            <span className={`badge ${val?.status == true ? 'bg-success' : 'bg-danger'}`}>{val?.status ? 'Verified' : 'Unverified'}</span>
                                        </td>
                                        <td>
                                            <div className="form-check form-switch d-flex justify-content-center">
                                                <input className="form-check-input" type="checkbox" checked={val?.status || ''} onChange={(e) => updateEnabled(e.target.checked, val?.id)} />
                                            </div>
                                        </td>
                                        <td>
                                    <div className="export-btn">
                                        <button className="btn" data-bs-toggle="modal" data-bs-target="#userViewModal" onClick={() => setViewData(val)} >
                                            View
                                        </button>
                                    </div>
                                </td>
                                    </tr>
                                ))
                                }
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
                    </table>

                </div>
                <Pagination pagination={pagination} handlePageClick={handlePageClick} />

            </div>
        </>
    )
}
export default Table;