import React from "react";
import Pagination from "../../Utils/Pagination";
import Date from "../../../common/Date";

const Table = ({data,pagination,handlePageClick,setName,setAmount,setcreated_at,getStakingUserList,setLoader,loader}) => {
    // staking/get_by_plan_id/12?per_page=10&page=1&
    console.log(data);
    const newTextOnKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setLoader(true);
            getStakingUserList();
        }   
    };

    const searchBy = (e) => {
        e.preventDefault();
        setLoader(true);
        getStakingUserList();
    }

    const sorting = (field) => {
        // setsortBy(field)
        // sort_type == 'ASC' ?setsortType('DESC'):setsortType('ASC')
    }
    const clearDate = () => {
        document.getElementById('datepicker').reset();
        setcreated_at('')
    }
    
    // const statusArr=["pending","approved","rejected"];
    return(
        <>
       
            <div className="admin-table table-responsive">
                <table className="table align-middle table-bordered w-100" id="table-container">
                    <tbody>
                        <tr>
                            <td>
                            <form onSubmit={searchBy}>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="floadingEmail" onChange={(e) => setName(e.target.value)} />
                                        <label htmlFor="floadingEmail">Search By Username</label>
                                    </div>
                                </form>
                            </td>
                            <td>
                                <form onSubmit={searchBy}>
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="floadingEmail" onChange={(e) => setAmount(e.target.value)} />
                                        <label htmlFor="floadingEmail">Search By Amount</label>
                                    </div>
                                </form>
                            </td>
                            <td >
                                    <form action="" id="datepicker">
                                        <div className="form-floating position-relative">
                                            <input type="date" className="form-control" pattern="\d{4}-\d{2}-\d{2}" onKeyPress={newTextOnKeyDown} onChange={(e) => { isNaN(parseInt(e.target.value)) ? setcreated_at('') : setcreated_at((e.target.value).replace(/\b0/g, '')) }}/>

                                            <label htmlFor="floadingCreatedAt" className="d-flex justify-content-between">
                                                Search By Created At
                                            </label>
                                            <button type="button" className="btn p-0 border-0 position-absolute" style={{ top: '2px', right: '15px', zIndex: '1', background: 'transparent' }} onClick={() => clearDate()}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                                            </button>
                                        </div>
                                    </form> 
                                </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            {/* <td></td>
                            <td></td> */}
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th>
                                User Name
                            </th>

                            <th>
                                Amount
                            </th>
                            <th>
                                Created At
                            </th>
                            <th>
                                Expiry At
                            </th>
                            <th>
                                Plan Type
                            </th>
                            <th>
                                Activation Status
                            </th>
                        </tr>
                    </thead>
                    {loader ?
                        <tbody>
                                <tr>
                                    <td colSpan={10} className="text-center">
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
                                    {val?.user?.name}
                                </td>
                            
                                <td>
                                    {val?.amount}
                                </td>
                                <td>
                                   {Date.getDate(val?.created_at)}

                                </td>
                                <td>
                                   {val?.plan_type =="fixed"?Date.getDate(val?.expiry_date):"NaN"}
                                </td>
                                <td>
                                   {val?.plan_type}
                                </td>
                                <td className="text-center"><span className={`text-center py-1 px-3 rounded fw-bold ${(val?.is_active == true ? "bg-success" : "bg-warning")}`}>
                                   {(val?.is_active == true) ? "ON" : "OFF"}
                              </span></td>
                            </tr>
                            ))
                            }
                        </tbody>
                        :
                        <tbody>
                            <tr>
                                <td colSpan={11} className="text-center" style={{color:'var(--white)'}}>
                                    No Data Found.
                                </td>
                            </tr>
                        </tbody>
                    } </>}
                </table>
             </div>
            <Pagination pagination={pagination} handlePageClick={handlePageClick} />           
        </>
    )
}
export default Table;