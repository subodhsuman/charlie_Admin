import React from "react";

// import Pagination from "../Pagination";


const Table = ({ data, loader }) => {




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

    return (
        <>

            <div className="admin-table table-responsive">
                <table className="table align-middle table-bordered w-100" id="table-container">
                    <thead>
                        <tr>
                            <th>
                                <div className="d-flex justify-content-between">
                                    <span>Position</span>
                                </div>
                            </th>
                            <th>
                                <div className="d-flex justify-content-between">
                                    <span>Currency</span>
                                </div>
                            </th>
                            <th>
                                <div className="d-flex justify-content-between">
                                    <span>Quantity</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    {
                        loader
                            ? <tbody>
                                <tr>

                                    <td colSpan={10} className="text-center" >
                                        <div className="loader-outer d-flex align-items-center justify-content-center" style={{ minHeight: '30vh' }}>
                                            <div className="spinner-border" role="status" style={{ height: '70px', width: '70px' }}>
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody> :
                            <>
                                {data?.length > 0 ?
                                    <tbody>
                                        {data.map((val, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {val?.totalrows}
                                                </td>
                                                <td>
                                                    {val?.currency}
                                                </td>
                                                <td>
                                                    {val?.totalQuantit}
                                                </td>
                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                    :
                                    <tbody>
                                        <tr>
                                            <td colSpan={3} className="text-center" style={{ color: 'var(--white)' }}>
                                                No Data Found.
                                            </td>
                                        </tr>
                                    </tbody>
                                }
                            </>
                    }
                </table>

            </div>
            {/* <Pagination pagination={pagination} handlePageClick={handlePageClick} /> */}

        </>
    )
}
export default Table;