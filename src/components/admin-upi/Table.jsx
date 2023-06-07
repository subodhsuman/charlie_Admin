import React from "react";

const Table = ({ data, setViewData, updateStatus }) => {
    return (
        <>
            <div className="admin-table table-responsive">
                <table className="table align-middle table-bordered w-100" id="table-container">
                    <thead>
                        <tr>
                            <th>
                                Id
                            </th>
                            <th>
                                Upi Id
                            </th>
                            <th>
                                Enable Upi Account
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    {data?.length > 0 ?
                        <tbody>
                            {data?.map((v, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            {v?.id}
                                        </td>
                                        <td>
                                            {v?.upi_id}
                                        </td>
                                        <td>
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={v?.status == 1 ? true : false || ''} onChange={(event) => updateStatus(event.target.checked, v?.id)} />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="export-btn">
                                                <button className="btn text-capitalize" data-bs-toggle="modal" data-bs-target="#updateUpiModal" onClick={() => setViewData(v)}>
                                                    edit
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        :
                        <tbody>
                            <tr>
                                <td colSpan={4} className="text-center" style={{ color: 'var(--white)' }}>
                                    No Data Found.
                                </td>
                            </tr>
                        </tbody>
                    }


                </table>
            </div>
            {/* <Pagination pagination={pagination} handlePageClick={handlePageClick} /> */}

        </>
    )
}
export default Table;