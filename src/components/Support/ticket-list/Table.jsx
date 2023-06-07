import React from "react";
import Date from '../../../common/Date';
import Pagination from "../../../components/Utils/Pagination";


const Table = ({ data, pagination, handlePageClick, setViewData, getTickets, setTitle, setContent, setDate, setAuthorName, setAuthorEmail, setCategoryName, setPriority, setStatus, setSortName, setSortBy, sortBy, setLoader, loader }) => {

    const newTextOnKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setLoader(true);
            getTickets();
        }
    };

    const searchBy = (e) => {
        e.preventDefault();
        setLoader(true);
        getTickets();
    }
    const sorting = (field) => {
        setSortName(field)
        sortBy == 'asc' ? setSortBy('desc') : setSortBy('asc')
    }
    const clearDate = () => {
        document.getElementById('datepicker').reset();
        setDate('')
    }

    const handlePriority = (v) => {
        let result = {
            "low": "bg-success",
            "medium": "bg-warning",
            "high": "bg-danger"
        }
        return result[v];
    };
    const handleStatus = (v) => {
        let result = {
            "open": "bg-success",
            "close": "bg-danger",
            "inprogress": "bg-warning"
        }
        return result[v];
    }
    return (
        <>

            <div className="admin-table table-responsive">
                <table className="table align-middle table-bordered w-100" id="table-container">
                    <tbody>
                        <tr>
                            {/* <td>
                            </td> */}
                            <td>
                                <form onSubmit={searchBy}>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} />
                                        <label>Search By Title</label>
                                    </div>
                                </form>
                            </td>
                            <td>
                                <form onSubmit={searchBy}>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" onChange={(e) => setContent(e.target.value)} />
                                        <label >Search By Content</label>
                                    </div>
                                </form>
                            </td>
                            <td>
                                <form onSubmit={searchBy}>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="floadingAccNo" onChange={(e) => setCategoryName(e.target.value)} />
                                        <label htmlFor="floadingAccNo">Search By Category</label>
                                    </div>
                                </form>
                            </td>
                            <td>
                                <form action="" id="datepicker">
                                    <div className="form-floating position-relative">
                                        <input type="date" className="form-control" pattern="\d{4}-\d{2}-\d{2}" onChange={(e) => { isNaN(parseInt(e.target.value)) ? setDate('') : setDate(e.target.value.replace(/\b0/g, '')) }} onKeyPress={newTextOnKeyDown} />

                                        <label htmlFor="floadingCreatedAt" className="d-flex justify-content-between">
                                            Search By Created At
                                        </label>
                                        <button type="button" className="btn p-0 border-0 position-absolute" style={{ top: '2px', right: '15px', zIndex: '1', background: 'transparent' }} onClick={() => clearDate()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                                        </button>
                                    </div>
                                </form>

                            </td>
                            <td>
                                <form onSubmit={searchBy}>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="floadingIfsc" onChange={(e) => setAuthorName(e.target.value)} />
                                        <label htmlFor="floadingIfsc">Search By Author Name</label>
                                    </div>
                                </form>
                            </td>
                            <td>
                                <form onSubmit={searchBy}>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="floadingIfsc" onChange={(e) => setAuthorEmail(e.target.value)} />
                                        <label htmlFor="floadingIfsc">Search By Author Email</label>
                                    </div>
                                </form>

                            </td>
                            <td>
                                <form action="" className="status-form">
                                    <select className="form-select" aria-label=".form-select-lg" onChange={(e) => setPriority(e.target.value)} >
                                        <option value="">Choose Priority</option>
                                        <option value="low">Low</option>
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                    </select>
                                </form>
                            </td>
                            <td>
                                <form action="" className="status-form">
                                    <select className="form-select" aria-label=".form-select-lg" onChange={(e) => setStatus(e.target.value)}>
                                        <option value="">Choose Status</option>
                                        <option value="open">open</option>
                                        <option value="close">close</option>
                                        <option value="inprogress">in progress</option>
                                    </select>
                                </form>
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            {/* <th>
                                <div className="d-flex justify-content-between">
                                    <span>Sr No</span>
                                </div>
                            </th> */}
                            <th>
                                <div className="d-flex justify-content-between">
                                    <span>Title</span>
                                    <button className="btn p-0 border-0" onClick={() => sorting('title')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                    </button>
                                </div>
                            </th>
                            <th>
                                <div className="d-flex justify-content-between">
                                    <span>Content</span>
                                    <button className="btn p-0 border-0" onClick={() => sorting('content')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                    </button>
                                </div>
                            </th>
                            <th>
                                <div className="d-flex justify-content-between">
                                    <span>Category</span>
                                    {/* <button className="btn p-0 border-0" onClick={() => sorting('name')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                    </button> */}
                                </div>
                            </th>
                            <th>
                                <div className="d-flex justify-content-between">
                                    <span>Created At</span>
                                    <button className="btn p-0 border-0" onClick={() => sorting('created_at')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                    </button>
                                </div>

                            </th>
                            <th>
                                <div className="d-flex justify-content-between">
                                    <span>Author Name</span>
                                    <button className="btn p-0 border-0" onClick={() => sorting('author_name')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                    </button>
                                </div>

                            </th>
                            <th>
                                <div className="d-flex justify-content-between">
                                    <span>Author Email</span>
                                    <button className="btn p-0 border-0" onClick={() => sorting('author_email')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                    </button>
                                </div>

                            </th>
                            <th>
                                <div className="d-flex justify-content-between">
                                    <span>Priority</span>
                                    <button className="btn p-0 border-0" onClick={() => sorting('priority')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                    </button>
                                </div>

                            </th>
                            <th>
                                <div className="d-flex justify-content-between">
                                    <span>Status</span>
                                    <button className="btn p-0 border-0" onClick={() => sorting('status')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                    </button>
                                </div>

                            </th>
                            <th>
                                Action
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
                                    {data.map((val, index) => (
                                        <tr key={index}>
                                            {/* <td>
                                        {index + 1}
                                    </td> */}
                                            <td>
                                                {val?.title}
                                            </td>
                                            <td style={{ whiteSpace: "normal", maxWidth: '190px' }}>
                                                <p className="mb-0" style={{ wordBreak: 'break-all' }}>
                                                    {val?.content}
                                                </p>

                                            </td>
                                            <td>
                                                {val?.ticket_category?.name}
                                            </td>
                                            <td>
                                                {Date.getDate(val?.created_at)}
                                            </td>
                                            <td>
                                                {val?.author_name}
                                            </td>
                                            <td>
                                                {val?.author_email}
                                            </td>
                                            <td>
                                                <span className={`badge ${handlePriority(val?.priority)}`}>{val?.priority}</span>
                                            </td>
                                            <td>
                                                <span className={`badge ${handleStatus(val?.status)}`}>{val?.status}</span>
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button className="btn" data-bs-toggle="modal" data-bs-target="#editTicketModal" onClick={() => setViewData(val)}>
                                                        Edit
                                                    </button>
                                                    <button id={"view" + val.id} className="btn" data-bs-toggle="modal" data-bs-target="#viewTicketModal" onClick={() => setViewData(val, true)}>
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
                                        <td colSpan={10} className="text-center" style={{ color: 'var(--white)' }}>
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

        </>
    )
}
export default Table;