import React, { useEffect, useState } from "react";
import ApiClass from "../../Api/api";
import SwalClass from "../../common/swal";
import ImageComponent from '../Utils/ImageComponent';
const Table = ({ cryptoHandler, callGetCrypto, data, active, search }) => {

    const searchList = () => {
        let result = data[active];
        if (search != "") {
            return data[active]?.filter((val) => {
                return val.symbol.toLowerCase().includes(search.toLowerCase());
            });
        } else {
            return result;
        }
    };

    const updateStatus = async (val, column) => {
        let status
        if (column == "sell") {
            status = val.sell ? 0 : 1
        }
        if (column == "buy") {
            status = val.buy ? 0 : 1
        }
        if (column == "active_status") {
            status = val.active_status ? 0 : 1
        }
        let response = await ApiClass.updateRequest(`crypto/update_status?status=${status}&id=${val.id}&column_name=${column}`, true);
        if (response?.data?.status_code == 0 || response?.data?.status == 0) {
            SwalClass.failed(response?.data?.message)
            return
        }
        if (response?.data?.status_code == 1) {
            SwalClass.success(response?.data?.message || '');
            callGetCrypto();
        }
    }

    useEffect(() => {
        searchList();
    }, [search]);

    return (
        <>
            <div className="admin-table table-responsive">
                <table className="table align-middle table-bordered w-100" id="table-container">
                    <thead>
                        <tr>
                            <th>
                                <div className="d-flex justify-content-between">
                                    <span>Image</span>
                                </div>
                            </th>
                            <th>
                                <div className="d-flex justify-content-between">
                                    <span>Currency</span>
                                </div>
                            </th>
                            <th>
                                Buy
                            </th>
                            <th>
                                Sell
                            </th>
                            <th>
                                Active Status
                            </th>
                            <th>
                                Edit
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchList()?.map((val, index) => (
                            <tr key={index}>
                                <td>
                                <ImageComponent
                                    source={val?.image}
                                    height="50"
                                    width="50"
                                />
                                    {/* <img src={val?.image} /> */}
                                </td>
                                <td>
                                    {val?.currency}
                                </td>
                                <td>
                                    <div className="form-check form-switch mb-0">
                                        <input className="form-check-input" type="checkbox" checked={val?.buy || ''} onChange={newChange=>{}} role="switch"
                                            onClick={() => updateStatus(val, "buy")}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check form-switch mb-0">
                                        <input className="form-check-input" type="checkbox" checked={val?.sell || ''} onChange={newChange=>{}} role="switch"
                                            onClick={() => updateStatus(val, "sell")}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className="form-check form-switch mb-0">
                                        <input className="form-check-input" type="checkbox" checked={val?.active_status || ''} onChange={newChange=>{}} role="switch"
                                            onClick={() => updateStatus(val, "active_status")} />
                                    </div>
                                </td>
                                <td>
                                    <div className="export-btn">
                                        <button className="btn text-capitalize" data-bs-toggle="modal" data-bs-target="#cryptolistmodal"
                                        onClick={()=>cryptoHandler(val.id)} >
                                            edit
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                    {searchList()?.length == 0 &&
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
        </>
    )
}
export default Table;