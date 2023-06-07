import React, { useEffect, useState } from "react";
import Heading from '../components/Utils/Heading';
import Table from "../components/manual-withdraw/Table";
import ApiClass from "../Api/api";
import SwalClass from "../common/swal.js";
import _ from "lodash";
const ManualWithdraw = () => {

    const [data, setData] = useState([])
    // const [pagination, setPagination] = useState({});
    // const [total, setTotal] = useState('');
    // const [page, setPage] = useState('');
    const [status, setStatus] = useState('');
    const [chain, setChain] = useState('');
    const [loader, setLoader] = useState(true)

    const [checkList, setCheckList] = useState([]);

    const getManual = async () => {
        let response = await ApiClass.getNodeRequest(`wallet/getWithdrawl?search_id=&chain_type=${chain}&status=${status}`, true);
        if (!response.data.hasOwnProperty("status_code")) {
            SwalClass.failed("Unable to fetch data at this time.")
            return
        }
        if (response?.data?.status_code == 0) {
            return
        }
        if (response?.data?.status_code == 1) {
            setLoader(false);
            setData(response?.data?.data);
            // setPagination({
            //     page: response?.data?.data?.current_page,
            //     last_page: response?.data?.data?.last_page
            // })
            // setTotal(response?.data?.data?.total)
            return
        }
    }
    // const handlePageClick = (e) => {
    //     setPage(e.selected + 1)
    // }
    useEffect(() => {
        setLoader(true);
        getManual()
    }, [status, chain]);

    const statusArr = ["pending", "rejected", "completed"];
    const chainArr = ["ETH", "BSC", "TRON"];


    // let c = new network.NetWork(window);
    
    // c.connect().then(async (e) => {
    //     console.log(e);
    //     console.log(c.current_account);

    //     c.switch(97).then(e => {
    //             console.log(e);
    //     });


        // bnb 56 -- test - 97
        

        // console.log(c.getChainId());
        // await testing()
    // }); // connect accounts


    const testing = async () => {

        // if(checkList.length == 0){
        //     return;
        // }


        // let isconnected = await c.connect();

        // if(!isconnected){
        //     alert('Please connect wallet')
        //     return;
        // }

        // if(c.getChainId() != 97){
        //     let chain_id  = await c.switch(97);

        //     if(chain_id != 97)
        //     {
        //         return;
        //     }
        // }

        // let token_address_amount_array = [];
        // let network_type = "";

        // _.map(data, (v,i) => {
        //     if(checkList.includes(v.id.toString())){
        //         if(i == 0){
        //             network_type = v.transaction_data?.chain_type.toLowerCase();
        //         }
               
        //         let contract_address = (["BNB","ETH","TRX"].includes(v.transaction_data?.currency)) ? "0x0000000000000000000000000000000000000000" : v.transaction_data?.contract_address;


        //         token_address_amount_array.push({
        //             "contract_address": contract_address,
        //             "user_address": v.transaction_data?.user_address,
        //             "amount": v.transaction_data?.amount_to_send,
        //             "transaction_data":v.transaction_data
        //         })
        //     }
        // });

        // let d = await c.sendBulkTransations({
        //     network_type,
        //     token_address_amount_array
        // });

        // console.log({network_type,
        //         token_address_amount_array,
        //     d});
    }

    return (
        <>
            <section className="dashboard-sec">
                <div className="container-fluid">

                    <div className="dashboard-heading mb-3 d-flex align-items-center justify-content-between">
                        <Heading
                            text="Manual Withdrawl"
                            image="Deposit_transc.webp"
                        />
                        <div className="d-flex justify-content-end gap-3 mb-3">
                            {
                                (checkList.length > 0)
                                ?
                                <div className="export-btn text-center">
                                    <button className="btn text-capitalize" onClick={testing}>Send Transactions</button>
                                    </div>
                                : ''
                            }

                            <form action="" className="status-form">
                                <select className="form-select" aria-label=".form-select-lg" onChange={(e) => { setStatus(e.target.value) }}>
                                    <option value="">Choose status</option>
                                    {statusArr.map((data, index) => {
                                        return (
                                            <option value={data} key={index}>{data}</option>
                                        )
                                    })}
                                </select>
                            </form>
                            <form action="" className="status-form">
                                <select className="form-select" aria-label=".form-select-lg" onChange={(e) => setChain(e.target.value)}>
                                    <option value="">Choose Chain Type</option>
                                    {chainArr.map((data, index) => {
                                        return (
                                            <option value={data} key={index}>{data}</option>
                                        )
                                    })}
                                </select>
                            </form>


                           
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <Table
                                data={data}
                                // pagination={pagination}
                                // handlePageClick={handlePageClick}
                                loader={loader}
                                checkList={checkList}
                                setCheckList={setCheckList}
                            />
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}
export default ManualWithdraw;