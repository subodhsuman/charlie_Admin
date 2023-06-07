import React,{useState,useEffect} from 'react'
import Sidebar from '../../layout/Sidebar';
import Table from '../../components/p2p/wallet-transaction/Table';
import Heading from '../../components/Utils/Heading';
import ApiClass from '../../Api/api';
import SwalClass from '../../common/swal';
import { generateExcel,generatePDF } from '../../common/Export';

const WalletTransactionList = () => {
     //states
     const [data,setData] = useState([]);
     const [pagination,setPagination] = useState({});
     const [page, setPage] = useState('');
     const [name, setName] = useState('');
     const [email, setEmail] = useState('');
     const [amount, setAmount] = useState('');
     const [date, setDate] = useState('');
     const [currency, setCurrency] = useState('');
     const [status, setStatus] = useState('');
     const [transaction_type, setTransaction_type] = useState('');
     const [total, setTotal] = useState('');
     const [loader, setLoader] = useState(true)

     //P2P order list data get
     const getP2pTransList = async() => {
         let response = await ApiClass.getNodeRequest(`P2P/cryptotransfer/transaction-list?page=${page}&name=${name}&email=${email}&amount=${amount}&currency=${currency}&status=${status}&transaction_type=${transaction_type}&date=${date}`,true);
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
             let response = await ApiClass.getNodeRequest(`P2P/cryptotransfer/transaction-list?page=${page}&name=${name}&email=${email}&amount=${amount}&currency=${currency}&transaction_type=${transaction_type}&date=${date}&per_page=${total}`,true);
 
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
                     let heading = ['currency', 'amount', 'transaction_type',"created_at","status"];

                        let relational_keys = {
                            "heading":["name","email"],
                            "data":[
                                {
                                    object:"user",
                                    keys:["name","email"],
                                    parent:""
                                }
                            ]
                        };
                     return generatePDF(heading, d, "P2P_Wallet_Transaction_List",relational_keys); // 
                 }
             }
         }
 
     useEffect(()=>{
         setLoader(true)
         getP2pTransList();
     },[page,transaction_type,date,status]);

 
     const handlePageClick = (e) => {
         setPage(e.selected+1)
     }


  return (
    <>
       
            <section className="dashboard-sec">
                <div className="container-fluid">
                   {/* <Heading
                    text="p2p"
                    image="p2p.webp"
                   /> */}
                    <div className="row">
                        <div className="col-md-12">
                            <Table     
                            data={data}
                            pagination={pagination}
                            handlePageClick={handlePageClick}
                            setName={setName}
                            setEmail={setEmail}
                            setCurrency={setCurrency}
                            setAmount={setAmount}
                            setStatus={setStatus}
                            setDate={setDate}
                            setTransaction_type={setTransaction_type}
                            getP2pTransList={getP2pTransList}
                            handleOnExport={handleOnExport}
                            setLoader={setLoader}
                            loader={loader}/>
                        </div>
                    </div>
                </div>
            </section>
        
    </>
  )
}

export default WalletTransactionList