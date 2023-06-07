import React,{useEffect,useState} from "react";
import Sidebar from "../layout/Sidebar";
import Table from '../components/inr_withdrawl/Table';
import ApiClass from "../Api/api";
import SwalClass from "../common/swal";
import { generateExcel,generatePDF } from "../common/Export";
import Form from '../components/inr_withdrawl/Form';
const INR_WITHDRAWL = () => {
     //states
     const [data,setData] = useState([]);
     const [pagination,setPagination] = useState({});
     const [page, setPage] = useState('');
     const [name, setName] = useState('');
     const [email, setEmail] = useState('');
     const [amount, setAmount] = useState('');
     const [date, setDate] = useState('');
     const [status, setStatus] = useState('');
     const [account_number, setAccount_number] = useState('');
     const [ifsc_code, setIfsc_code] = useState('');
     const [total, setTotal] = useState('');
     const [loader, setLoader] = useState(true);
     const [sortBy, setSortBy] = useState('');
     const [sortName, setSortName] = useState('');
     const [UniqueId, setUniqueId] = useState('')
     const [form ,setForm] = useState({});
     //INR withdraw list data get
     const getInrWithdrawList = async() => {
         let response = await ApiClass.getRequest(`Inr/withdrawal_get?page=${page}&name=${name}&email=${email}&amount=${amount}&wd_acc_no=${account_number}&wd_ifsc=${ifsc_code}&withdraw_unique_id=${UniqueId}&created_at=${date}&status=${status}&sortbyname=${sortName}&sortby=${sortBy}`,true);
         setLoader(false);
         if(!response.data.hasOwnProperty('status_code')){
             SwalClass.success("Unable to fetch data at this time.");
             return;
         }
 
         if(response?.data?.status_code == 0){
             return
         }
         if(response?.data?.status_code == 1){
             setData(response?.data?.data?.data || []);
             setTotal(response?.data?.data?.total || 1);
             setPagination({
                 page:response?.data?.data?.current_page || 1,
                 last_page:response?.data?.data?.last_page || 1,
                 
             })
         }
     }
 
         //export tabel
         const handleOnExport = async(val) => {
             let response = await ApiClass.getRequest(`Inr/withdrawal_get?page=${page}&name=${name}&email=${email}&amount=${amount}&wd_acc_no=${account_number}&wd_ifsc=${ifsc_code}&withdraw_unique_id=${UniqueId}&created_at=${date}&status=${status}&sortbyname=${sortName}&sortby=${sortBy}&per_page=${total}`,true);
 
             if(!response.data.hasOwnProperty('status_code')){
                 SwalClass.success("Unable to Export at this time.");
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
     
                 if(val == 0){  // Excel
                     generateExcel(d);
                     return;
                 }
     
                 if(val == 1){ // PDF
                     let heading = ['amount',"created_at","status"];

                        let relational_keys = {
                            "heading":["name","email",'wd_acc_no',"wd_ifsc"],
                            "data":[
                                {
                                    object:"user",
                                    keys:["name","email"],
                                    parent:""
                                },
                                {
                                    object:"transfer_detail",
                                    keys:["wd_acc_no","wd_ifsc"],
                                    parent:""
                                }
                            ]
                        };
                     return generatePDF(heading, d, "INRWITHDRAW",relational_keys); // 
                 }
             }
         }
 
     useEffect(()=>{
         setLoader(true)
         getInrWithdrawList();  
     },[page,date,status,sortBy,sortName]);

 
     const handlePageClick = (e) => {
         setPage(e.selected+1)
     }
     const setformdata = (v) => {
        console.log(v);
        setForm(v)
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
                                setName={setName}
                                setEmail={setEmail}   
                                setAmount={setAmount} 
                                setAccount_number={setAccount_number}
                                setIfsc_code={setIfsc_code}
                                setDate={setDate}
                                setStatus={setStatus}
                                getInrWithdrawList={getInrWithdrawList}
                                handleOnExport={handleOnExport}
                                setLoader={setLoader}
                                loader={loader}
                                setSortBy={setSortBy}
                                setSortName={setSortName}
                                sortBy={sortBy}
                                setformdata={setformdata}
                                setUniqueId={setUniqueId}
                            />
                        </div>
                    </div>
                </div>
            </section>  
            <Form  data={form} getInrWithdrawList={getInrWithdrawList}/>
        
        </>
    )
}
export default INR_WITHDRAWL;