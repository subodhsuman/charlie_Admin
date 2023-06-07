import React from "react";
import Pagination from "../Utils/Pagination";



const Table = ({data,pagination,handlePageClick,setName,getOrders,setLoader,loader,handleOnExport}) => {

    const searchBy = (e) => {
        e.preventDefault();
        setLoader(true)
        getOrders();
    }
    return (
        <>
            <div className="admin-table-wrapper">
                <div className="admin-table-heading mb-3 d-flex justify-content-between">
                    <h6 className="mb-0 text-uppercase d-flex align-items-center gap-2">
                        <img src="./images/orders1.webp" width="50px" height="50px"/> 
                        Tds on Orders
                    </h6>
                    <div className="d-flex gap-3 align-items-center">
                        <button className="btn p-0 border-0" data-bs-toggle="dropdown" data-bs-target="#exportDropdown">
                            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V28.5h3V39h30V8.9H9v10.6H6V8.9q0-1.2.9-2.1.9-.9 2.1-.9h30q1.2 0 2.1.9.9.9.9 2.1V39q0 1.2-.9 2.1-.9.9-2.1.9Zm11.65-8.35L18.4 31.4l5.9-5.9H6v-3h18.3l-5.9-5.9 2.25-2.25L30.3 24Z" /></svg>
                        </button>
                        <ul className="dropdown-menu p-0" id="exportDropdown">
                            <li>
                                <a className="dropdown-item rounded" href="#" onClick={()=>handleOnExport(0)}>Excel</a>
                            </li>
                            <li>
                                <a className="dropdown-item rounded" href="#" onClick={()=>handleOnExport(1)}>Pdf</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="admin-table table-responsive">
                    <table className="table align-middle table-bordered w-100" id="table-container">
                        <tbody>
                            <tr>
                                <td >
                                </td>
                                <td >
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
                                </td>
                                <td >
                                </td>
                                <td >
                                </td>
                                <td >
                                </td>
                                <td >
                                </td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Order Id</span>
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Total Quantity</span>
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Commission Currency</span>
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Commission value</span>
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Commission Deduct</span>
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Gst Fees Deduct</span>
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>Tds Deduct</span>
                                    </div>
                                </th>
                                <th>
                                    <div className="d-flex justify-content-between">
                                        <span>After Deduct</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        {loader ?
                        <tbody>
                                  <tr> 
                                    <td colSpan={10} className="text-center" >
                                        <div className="loader-outer d-flex align-items-center justify-content-center" style={{minHeight:'40vh'}}>
                                            <div className="spinner-border" role="status" style={{height:'70px',width:'70px'}}>
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                        </tbody>
                        :
                     <>
                       {data?.length>0?
                         <tbody>
                        {data.map((val,index)=>(
                            <tr key={index}>
                                <td>
                                    {val?.order_id}
                                </td>
                                <td>{val?.actual_qty}
                                </td>
                                <td>
                                    {val?.commission_currency}
                                </td>
                                <td>
                                    {val?.commission_value}
                                </td>
                                <td>
                                    {val?.commission_deduct}
                                </td>
                                <td>
                                    {val?.gst_fees_deduct}
                                </td>
                                <td>
                                   {val?.tds_deduct}
                                </td>
                                <td>
                               {val?.after_deduct}
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
                         </>}
                    </table>

                </div>
                <Pagination pagination={pagination} handlePageClick={handlePageClick} />
            </div>
        </>
    )
}
export default Table;