import React, { useEffect } from "react";
import Date from "../../common/Date";
const Table = ({ data, active, setViewData, searchvalue, setResetData, loader }) => {
    const searchList = () => {
        let result = data[active];
        if (searchvalue != "") {
            return data[active]?.filter((item) => {
                return (item?.currency?.toLowerCase().includes(searchvalue.toLowerCase()))
            });
        }
        else {
            return result;
        }
    };

    useEffect(() => {
        searchList();
    }, [searchvalue]);
    return (
        <>
            <div className="admin-table table-responsive">
                <table className="table align-middle table-bordered w-100" id="table-container">
                    <thead>
                        <tr>
                            <th>
                                Currency
                            </th>
                            <th>
                                Pair With
                            </th>
                            <th>
                                Total
                            </th>
                            <th>
                                Provided
                            </th>
                            <th>
                                Calculated
                            </th>
                            <th>
                                Available in Market
                            </th>
                            <th>
                                Remaining
                            </th>
                            <th>
                                Created At
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

                        <tbody>
                            {searchList()?.length != undefined ?
                                <>
                                    {searchList()?.map((val, index) => (
                                        <tr key={index}>
                                            <td>
                                                {val?.currency}
                                            </td>
                                            <td>
                                                {val?.pair_with}
                                            </td>
                                            <td>
                                                {val?.total}
                                            </td>
                                            <td>
                                                {val?.provided}
                                            </td>
                                            <td>
                                                {val?.calculated}
                                            </td>
                                            <td>
                                                {val?.available}
                                            </td>
                                            <td>
                                                {val?.remaining}
                                            </td>
                                            <td>
                                                {Date.getDate(val?.created_at)}
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button className="btn" data-bs-toggle="modal" data-bs-target="#cryptoEditModal" onClick={() => setViewData(val)}>
                                                        Edit
                                                    </button>
                                                    <button className="btn" data-bs-toggle="modal" data-bs-target="#formModal" onClick={() => setResetData(val)}>
                                                        Reset
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    }
                                </> :
                                    <tr>
                                        <td colSpan = {9} className="text-center">
                                            No data found.
                                        </td>
                                    </tr>

                            }
                        </tbody>
                    }
                </table>
            </div>
        </>
    )
}
export default Table;