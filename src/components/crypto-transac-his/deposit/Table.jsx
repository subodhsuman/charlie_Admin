import React from "react";
import Date from "../../../common/Date";
import Pagination from "../../Utils/Pagination";


const Table = ({ data, pagination, handlePageClick, setName, setAmount, setDate, setStatus, setSymbol, getCryptoDeposit, setSortBy, setSortName, sortBy, setLoader, loader, setWaddress,setViewData,setUniqueId }) => {

    const newTextOnKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setLoader(true)
            getCryptoDeposit();
        }
    };

    const searchBy = (e) => {
        e.preventDefault();
        setLoader(true)
        getCryptoDeposit();
    }

    const sorting = (field) => {
        setSortName(field)
        sortBy == 'asc' ? setSortBy('desc') : setSortBy('asc')
    }
    const clearDate = () => {
        document.getElementById('datepicker').reset();
        setDate('')
    }

    const checkStatus = (status) => {
        let result = {
            "pending": "bg-warning",
            "rejected": "bg-danger",
            "completed": "bg-success"
        }
        return result[status];
    };
    

    return (
        <>
            <div className="admin-table table-responsive">
                <table className="table align-middle table-bordered w-100" id="table-container">
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <form onSubmit={searchBy}>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="floadingName" onChange={(e) => setSymbol(e.target.value)} />
                                        <label htmlFor="floadingName">Search By Symbol</label>
                                    </div>
                                </form>
                            </td>
                            <td>
                                <form onSubmit={searchBy}>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="floadingName"  />
                                        <label htmlFor="floadingName">Search By Chain Type</label>
                                    </div>
                                </form>
                            </td>

                            <td >
                                <form onSubmit={searchBy}>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="floadingName" onChange={(e) => setName(e.target.value)} />
                                        <label htmlFor="floadingName">Search By Name</label>
                                    </div>
                                </form>
                            </td>
                            <td >
                                <form onSubmit={searchBy}>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="floadingEmail" onChange={(e) => setAmount(e.target.value)} />
                                        <label htmlFor="floadingEmail">Search By Amount</label>
                                    </div>
                                </form>
                            </td>
                            <td >
                                <form onSubmit={searchBy}>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="floadingEmail" onChange={(e) => setUniqueId(e.target.value)} />
                                        <label htmlFor="floadingEmail">Search By Unique Id</label>
                                    </div>
                                </form>
                            </td>
                            <td >
                                <form action="" className="status-form">
                                    <select className="form-select" aria-label=".form-select-lg" onChange={(e) => setStatus(e.target.value)} >
                                        <option value="">Choose status</option>
                                        <option value="pending">pending</option>
                                        <option value="completed">completed</option>
                                        <option value="rejected">rejected</option>
                                    </select>
                                </form>
                            </td>

                            <td >
                                <form action="" id="datepicker">
                                    <div className="form-floating position-relative">
                                        <input type="date" className="form-control" pattern="\d{4}-\d{2}-\d{2}" onKeyPress={newTextOnKeyDown} onChange={(e) => { isNaN(parseInt(e.target.value)) ? setDate('') : setDate((e.target.value).replace(/\b0/g, '')) }} />

                                        <label htmlFor="floadingCreatedAt" className="d-flex justify-content-between">
                                            Search By Date
                                        </label>
                                        <button type="button" className="btn p-0 border-0 position-absolute" style={{ top: '2px', right: '15px', zIndex: '1', background: 'transparent' }} onClick={() => clearDate()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                                        </button>
                                    </div>
                                </form>
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th>
                                Graph
                            </th>
                            <th>
                                <div className="d-flex justify-content-between">
                                    <span>Symbol</span>
                                    <button className="btn p-0 border-0" onClick={() => sorting('symbol')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                    </button>
                                </div>
                            </th>
                            <th>
                                <div className="d-flex justify-content-between">
                                    <span>Chain Type</span>
                                </div>
                            </th>
                            <th>
                                <div className="d-flex justify-content-between">
                                    <span>Name</span>
                                    <button className="btn p-0 border-0" onClick={() => sorting('name')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                    </button>
                                </div>
                            </th>
                            <th>
                                <div className="d-flex justify-content-between">
                                    <span>Amount</span>
                                    <button className="btn p-0 border-0" onClick={() => sorting('amount')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                    </button>
                                </div>
                            </th>
                            <th>
                                <div className="d-flex justify-content-between">
                                    <span>Deposit Unique Id</span>
                                    <button className="btn p-0 border-0" onClick={() => sorting('deposit_unique_id')}>
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
                                <div className="d-flex justify-content-between">
                                    <span>Date</span>
                                    <button className="btn p-0 border-0" onClick={() => sorting('created_at')}>
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
                                            <td>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 38.184 38.184">
                                                    <path
                                                        id="Icon_open-arrow-circle-top"
                                                        data-name="Icon open-arrow-circle-top"
                                                        d="M18,4.5,31.5,18h-9V31.5h-9V18h-9Z"
                                                        transform="translate(44.548 19.092) rotate(135)"
                                                        fill="#34c38f"
                                                    />
                                                </svg>
                                            </td>

                                            <td>
                                                {val?.symbol}
                                            </td>
                                            <td>
                                                {val?.chain_type}
                                            </td>
                                            <td>
                                                {val?.user?.name}
                                            </td>
                                            <td>
                                                {val?.amount}
                                            </td>
                                            <td>
                                                {val?.deposit_unique_id}
                                            </td>
                                            <td className="text-center"><span className={`badge ${checkStatus(val?.status)}`}>
                                                {val?.status}</span>
                                            </td>
                                            <td>
                                                {Date.getDate(val?.created_at)}
                                            </td>
                                            <td>
                                                <div className="export-btn">
                                                    <button className="btn" data-bs-toggle="modal" data-bs-target="#cryptoDepositModal" onClick={()=>setViewData(val)}>View</button>
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