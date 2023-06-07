import React from "react";
import Pagination from "../../components/Utils/Pagination.jsx";
import ApiClass from "../../Api/api.js";


const Table = ({ data, setLoader,loader, handlePageClick,setEditData,updateEnabled ,getPages, setType, setsub_type, setslug,setsortbyname,setsortby, sortby,pagination,handleOnExport}) => {
    const newTextOnKeyDown = (event) => {
        if (event.key === 'Enter') {
            setLoader(true)
            event.preventDefault();
            // Users();
        }
    };

    const searchBy = (e) => {
        setLoader(true)
        e.preventDefault();
        getPages();
    }

    const sorting = (field) => {
        setsortbyname(field)
        sortby == 'asc' ?setsortby('desc'):setsortby('asc')
    }

  

    const clearDate = () => {
        document.getElementById('datepicker').reset();
        // setDate('')
    }

    const statusArr = ["day", "month", "week"];
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
            <div className="admin-table-wrapper">
                <div className="admin-table-heading mb-3 d-sm-flex justify-content-between">
                    <h6 className="text-uppercase d-flex align-items-center justify-content-center justify-content-sm-start mb-2 mb-sm-0">
                        Pages List
                    </h6>
                    <div className="d-flex gap-3 align-items-center justify-content-center">

                        <div>
                            <button className="btn p-0 border-0" data-bs-toggle="dropdown" data-bs-target="#exportDropdown">
                                <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V28.5h3V39h30V8.9H9v10.6H6V8.9q0-1.2.9-2.1.9-.9 2.1-.9h30q1.2 0 2.1.9.9.9.9 2.1V39q0 1.2-.9 2.1-.9.9-2.1.9Zm11.65-8.35L18.4 31.4l5.9-5.9H6v-3h18.3l-5.9-5.9 2.25-2.25L30.3 24Z" /></svg>
                            </button>
                            <ul className="dropdown-menu p-0" id="exportDropdown">
                                {/* <li>
                                    <a className="dropdown-item rounded" href="#" onClick={() => handleOnExport(0)}>Excel</a>
                                </li> */}
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
                                    {/* <form onSubmit={searchBy}>
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floadingName" />
                                            <label htmlFor="floadingName">Search By Index</label>
                                        </div>
                                    </form> */}
                                </td>
                                <td >
                                    <form onSubmit={searchBy}>
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floadingName" onChange={(e)=>setType(e.target.value)} />
                                            <label htmlFor="floadingName">Search By Page Type</label>
                                        </div>
                                    </form>
                                </td>
                                <td >
                                    <form onSubmit={searchBy}>
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floadingName"  onChange={(e)=>setslug(e.target.value)}/>
                                            <label htmlFor="floadingName">Search By Slug</label>
                                        </div>
                                    </form>
                                </td>
                                <td>
                                      <form onSubmit={searchBy}>
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floadingName" onChange={(e)=>setsub_type(e.target.value)} />
                                            <label htmlFor="floadingName">Search By Sub Type</label>
                                        </div>
                                    </form>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                               
                               
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Index</span>
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Page Type</span>
                                        <button className="btn p-0 border-0" onClick={() => sorting('type')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                        </button>
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Page Slug</span>
                                        <button className="btn p-0 border-0" onClick={() => sorting('slug')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                        </button>
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Page Sub Type</span>
                                        <button className="btn p-0 border-0" onClick={() => sorting('sub_type')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M16.1 25.5V9.7l-6 6L8 13.6l9.65-9.65 9.65 9.65-2.1 2.1-6.1-6.05V25.5Zm14.25 18.45-9.65-9.7 2.1-2.05 6 6V22.4h3v15.85l6.1-6.05 2.1 2.1Z" /></svg>
                                        </button>
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Status</span>
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Edit</span>
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>View</span>
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
                                                    <td>{v?.id}</td>
                                                    <td>{v?.type}</td>
                                                    <td>{v?.slug}</td>
                                                    <td>{v?.sub_type}</td>
                                                    <td className="text-center" style={{display: "flex",justifyContent: "center"}}>
                                                        <div className="form-check form-switch ">
                                                            <input className="form-check-input" type="checkbox" checked={v?.status == 1 ? true : false || ''} onChange={(e) => updateEnabled(e.target.checked, v?.id)} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex gap-2">
                                                        <div className="export-btn">
                                                            <button className="btn" onClick={() => setEditData(v)} data-bs-toggle="modal" data-bs-target="#pagedEditModal">
                                                                Edit
                                                            </button>
                                                        </div>
                                                        <div className="export-btn">
                                                            <button className="btn" onClick={() => setEditData(v)} data-bs-toggle="modal" data-bs-target="#deletePageModal">
                                                                Delete
                                                            </button>
                                                        </div>
                                                        </div>
                                                   
                                                    </td>
                                                    <td>
                                                        <div className="export-btn">
                                                            <button className="btn" onClick={() => setEditData(v)} data-bs-toggle="modal" data-bs-target="#formModalid">
                                                                View
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }).reverse()}

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
            
        </div>
        </>
    )
}
export default Table;