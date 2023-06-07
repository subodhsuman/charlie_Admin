import React from "react";

const Table = ({ data, setViewData, updateStatus }) => {
    return (
        <>
            <div className="admin-table table-responsive">
                <table className="table align-middle table-bordered w-100" id="table-container">
                    <thead>
                        <tr>
                            <th>
                                S. No
                            </th>
                            <th>
                                Currency
                            </th>
                            <th>
                                Pair With
                            </th>
                            {/* <th>
                              Buy comission Status
                            </th> */}
                            <th>
                              Sell comission Status
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
                                            {i+1}
                                        </td>
                                        <td>
                                            {v?.currency}
                                        </td>
                                        <td>
                                            {v?.pair_with}
                                        </td>
                                        {/* <td>
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={v?.buy_comission_status == 1 ? true : false} onChange={(event) => updateStatus(event.target.checked, v?.id,"buy_comission_status")} />
                                            </div>
                                        </td> */}
                                        <td>
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={v?.sell_comission_status == 1 ? true : false} onChange={(event) => updateStatus(event.target.checked, v?.id,"sell_comission_status")} />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="export-btn">
                                                <button className="btn text-capitalize" data-bs-toggle="modal" data-bs-target="#updatep2pcomissionModal" onClick={() => setViewData(v)}>
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
                                <td colSpan={7} className="text-center" style={{ color: 'var(--white)' }}>
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