import React from "react";
import Date from "../../../common/Date";

import Pagination from "../../Utils/Pagination";


const Table = ({data, pagination, handlePageClick, setViewData}) => {
  

    const newTextOnKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            // Users();
        }   
    };

    const searchBy = (e) => {
        e.preventDefault();
        // Users();
    }

    const sorting = (field) => {
        // setsortBy(field)
        // sort_type == 'ASC' ?setsortType('DESC'):setsortType('ASC')
    }
    const clearDate = () => {
        document.getElementById('datepicker').reset();
        // setDate('')
    }
    
    // const statusArr=["pending","approved","rejected"];
    
    return(
        <>
       
            <div className="admin-table table-responsive">
                <table className="table align-middle table-bordered w-100" id="table-container">
                   
                    <thead>
                        <tr>
                            <th>
                                Id
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Created By
                            </th>
                            <th>
                                Created At
                            </th>
                            <th>
                                Updated At
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    {data?.length>0?
                    <tbody>
                        {data.map((val,index)=>(
                            <tr key={index}>
                                <td>
                                    {val?.id}
                                </td>
                                <td>
                                    {val?.name}
                                </td>
                                <td>
                                    {val?.user?.name}
                                </td>
                                <td>
                                    {Date.getDate(val?.created_at)}
                                </td>
                                
                                <td>
                                    {Date.getDate(val?.updated_at)}
                                </td>
                                <td>
                                <div className="d-flex gap-2 align-items-center">
                                    <button className="btn" data-bs-toggle="modal" data-bs-target="#editCategoryModal" onClick={() => setViewData(val)}>
                                        Edit
                                    </button>
                                    <button className="btn" data-bs-toggle="modal" data-bs-target="#deleteCategoryModal" onClick={() => setViewData(val)}>
                                        Delete
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
                                <td colSpan={6} className="text-center" style={{color:'var(--white)'}}>
                                    No Data Found.
                                </td>
                            </tr>
                        </tbody>
                    }
                </table>
               
            </div>
            <Pagination pagination={pagination} handlePageClick={handlePageClick} />
            
        </>
    )
}
export default Table;