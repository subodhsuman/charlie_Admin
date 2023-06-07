import React, { useEffect, useState } from "react";
// import Pagination from "../Utils/Pagination.jsx";
// import Date from "../../../common/Date";

const Table = ({ data, loader, checkList, setCheckList }) => {
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
        // setDate('')
    }

    // const statusArr=["pending","approved","rejected"];
    // const [check, setCheck] = useState(false)
    const handleStatus = (status) => {
        let result = {
            "pending": "bg-warning",
            "rejected": "bg-danger",
            "completed": "bg-success"
        }
        return result[status];
    };



    //checked
    // const [isCheck, setIsCheck] = useState(false);
    // const [checkList, setCheckList] = useState([]);

    // function handleCheck(e){
    //     const {id, checked} = e.target;
    //     setCheckList([...checkList, id]);
    //     if(!checked){
    //         setCheckList(checkList.filter(item=>item != id))
    //     }
    // }
    // useEffect(()=>{
        
    //     if(isCheck){
    //         data.map((v,index)=>{
    //            setCheckList([`chain-${index}`])
    //         })
    //     }else{
    //         setCheckList([])
    //     }
    // },[isCheck])


    // selectAll: false,
    //   checkboxes: [
    //     { name: "checkbox1", checked: false },
    //     { name: "checkbox2", checked: false },
    //     { name: "checkbox3", checked: false },
    //   ],

    const [chooseAll, setChooseAll] = useState(false);
    


    const handleSelectAll = (event) => {
        let {checked} = event.target;

        var ele=document.getElementsByName('chain-checkbox');  
        
        setChooseAll(checked);

        if(checked){

            let d = [];
            for(var i=0; i< ele.length; i++){  
                ele[i].checked=true; 
                d.push(ele[i].value);
            }

            setCheckList(d);
        }else{
            for(var i=0; i < ele.length; i++){  
                ele[i].checked=false; 
            }

            setCheckList([]);
        }
    }


    const handleCheckboxChange = (event) => {
        let {checked, value} = event.target;
        let a = [];
        if(checked){
            setCheckList(checkList => [...checkList, value]);
        }else{
            a = checkList?.filter(function(item) {
                if(item !== value){
                    return value;
                }
            }) ?? [];
            setCheckList(a);
        }
    }

    useEffect(() => {
        // console.log(checkList);
        if(checkList.length < data.length && data?.length > 0 && chooseAll){
            setChooseAll(false);
        }

        if(checkList.length == data.length && data?.length > 0){
            setChooseAll(true);
        }

    }, [checkList]);

    
    return (
        <>

            <div className="admin-table table-responsive">
                <table className="table align-middle table-bordered w-100" id="table-container">

                    <thead>
                        <tr>
                            <th>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" name="selectAll" checked={chooseAll} onChange={handleSelectAll} />
                                    <label className="form-check-label">
                                        All
                                    </label>
                                </div>
                            </th>
                            <th>
                                Sr. No.
                            </th>
                            <th>
                                User Id
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Currency
                            </th>
                            <th>
                                Amount
                            </th>
                            <th>
                              Wallet Address
                            </th>
                            <th>
                               Withdraw Unique Id
                            </th>
                            <th>
                                Chain Type
                            </th>
                            <th>
                                Comission
                            </th>
                            <th>
                                Status
                            </th>
                        </tr>
                    </thead>
                    {loader ?
                        <tbody>
                            <tr>
                                <td colSpan={10} className="text-center">
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
                                        <React.Fragment key={index}>
                                        <tr>
                                            <td className="text-center">
                                                <div className="form-check">
                                                    <input value={val.id} name="chain-checkbox" className="form-check-input" type="checkbox" onChange={handleCheckboxChange} />
                                                </div>
                                            </td>
                                            <td>
                                                {index+1}
                                            </td>
                                            <td>
                                                {val.user_id}
                                            </td>
                                            <td>
                                                {val?.user?.name}
                                            </td>
                                            <td>
                                                {val?.currency}
                                            </td>
                                            <td>
                                                {val?.amount}
                                            </td>
                                            <td>
                                                {val?.to_address}
                                            </td>
                                            <td>
                                                {val?.withdraw_unique_id}
                                            </td>
                                            <td>
                                                {val?.chain_type}
                                            </td>
                                            <td>
                                                {val?.commission}
                                            </td>
                                            <td>
                                                <span className={`badge ${handleStatus(val?.status)}`}>{val?.status}</span>
                                            </td>
                                           
                                        </tr>
                                     </React.Fragment>
                                    ))
                                    }
                                </tbody>
                                :
                                <tbody>
                                    <tr>
                                        <td colSpan={11} className="text-center" style={{ color: 'var(--white)' }}>
                                            No Data Found.
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            }
                        </>}
                </table>
            </div>
            {/* <Pagination pagination={pagination} handlePageClick={handlePageClick} /> */}
        </>
    )
}
export default Table;