import React,{useState,useEffect} from "react";
import Sidebar from '../layout/Sidebar';
import Table from '../components/inr_deposit/Table';
import Form from "../components/inr_deposit/Form";
import ApiClass from "../Api/api.js";
import SwalClass from "../common/swal";
import { generateExcel, generatePDF } from "../common/Export";
const INRDeposit = () => {
       //states
       const [name,setName] = useState('')
       const [amount,setAmount] = useState('')
       const [account,setAccount] = useState('')
       const [txnId, setTxnId] = useState('') 
       const [Ifsc,setIfsc] = useState('')
       const [date,setDate] = useState('')
       const [sortby, setsortBy] = useState('')
       const [sort_type,setsortType] = useState('')
       const [status,setStatus] = useState('')
       const [total, setTotal] = useState('');
       const [update_status,setUpdateStatus] = useState('')
       const [id,setId] = useState('')
       const [data,setData] = useState([]);
       const [pagination,setPagination] = useState({});
       const [d,setD] = useState({});

       const [UniqueId, setUniqueId] = useState('')
       const [page,setPage] = useState('')
   
   
       //Users API
       const getDeposits = async() => {
           let response = await ApiClass.getRequest(`Inr/deposit_get?page=${page}&name=${name}&amount=${amount}&deposit_unique_id=${UniqueId}&txn_id=${txnId}&account_no=${account}&ifsc_code=${Ifsc}&created_at=${date}&sortby=${sortby}&sort_type=${sort_type}&status=${status}`);
        if(!response.data.hasOwnProperty("status_code")){
            SwalClass.failed('Unable to fetch data at this time.')
            return;
        }
           if(response?.data?.status_code == 1){
               setData(response?.data?.data?.data);
               setPagination({
                    page:response?.data?.data?.current_page,
                    last_page:response?.data?.data?.last_page
                });
                setTotal(response?.data?.data?.total)
                setPage('')
               return
           }
           if(response?.data?.status_code == 204){
               setData('')
               setPagination('')
               return
           }
       }
   
       //Initially called api
       // useEffect(()=>{
       //     Users();
       // },[]);
   
       //sorting based on status
      
   
       //api called whenever page changes
       useEffect(()=>{
            getDeposits()
       },[page,sortby, sort_type, date, status]);
   
       //api called during sorting
      
   
    
   
       //update status on change
       useEffect(()=>{
           if(id!='' && update_status!=''){
               updateUser();
           }
       },[id,update_status])
       //handling pagination
       const handlePageClick = (e) => {
           setPage((e.selected)+1);
       }
       //data to be send to form
       const setViewData = (Vdata) => {
           setD(Vdata)
       }
   
       //updating user status
       const updateUser = async() => {
           let response = await Api.updateRequest(`users/update/${id}`,{update_status});
           if(response?.data?.status_code == 200){
               SwalClass.success(response?.data?.message)
               Users();
               setUpdateStatus('')
               document.getElementById('closeForm').click();
               return
           }
           if(response?.data?.status_code == 204){
               SwalClass.failed(response?.data?.message)
               return
           }
           
       }
   
       //export to
       const handleOnExport = async(type)=>{
        let response = await ApiClass.getRequest(`Inr/deposit_get?&name=${name}&amount=${amount}&txn_id=${txnId}&account_no=${account}&ifsc_code=${Ifsc}&deposit_unique_id=${UniqueId}&created_at=${date}&sortby=${sortby}&sort_type=${sort_type}&status=${status}&per_page=${total}`,true);
        if(!response.data.hasOwnProperty('status_code')){
            SwalClass.failed("Unable to Export at this time.");
            return;
        }
        if(response?.data?.status_code == 0){
            SwalClass.failed(response?.data?.message)
            return
        }

        if(response?.data?.status_code == 1){

            let d = response?.data?.data?.data;

            if(d.length == 0){
                SwalClass.success("No Data to Export in Pdf/Excel.")
                return;
            }

            if(type == 0){  // Excel
                generateExcel(d);
                return;
            }

            if(type == 1){ // PDF
                let heading = ['amount', 'txn_id', "created_at", "status"];
                let relational_keys = {
                    "heading":["name"],
                    "data":[
                        {
                            object:"user",
                            keys:["name"],
                            parent:""
                        }
                    ]
                };
                return generatePDF(heading, d, `InrDeposit`,relational_keys); // 
            }
        }
           
       }
    return(
        <>  
            
            <section className="dashboard-sec">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <Table 
                              data={data} 
                                pagination={pagination} 
                                handlePageClick={handlePageClick} 
                                setViewData={setViewData} 
                                getDeposits={getDeposits} 
                                setName={setName}
                                setAmount={setAmount} 
                                setAccount={setAccount}
                                setIfsc={setIfsc}
                                setDate={setDate}
                                setTxnId={setTxnId}

                                
                                setsortBy={setsortBy}
                                setsortType={setsortType}
                                sort_type={sort_type}

                                handleOnExport={handleOnExport}

                                setPage={setPage}
                                setStatus={setStatus}
                                setId={setId}
                                setUniqueId={setUniqueId}
                            />
                          
                        </div>
                    </div>
                </div>
            </section>
            <Form 
                data={d}
                getDeposits={getDeposits}
            />
            
        </>
    )
}
export default INRDeposit;