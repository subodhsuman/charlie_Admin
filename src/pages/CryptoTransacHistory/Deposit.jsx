import React,{useState,useEffect} from "react";
import Sidebar from '../../layout/Sidebar';
import Table from '../../components/crypto-transac-his/deposit/Table'
import ApiClass from "../../Api/api";
import SwalClass from "../../common/swal";
import { generateExcel,generatePDF } from "../../common/Export";
import Heading from "../../components/Utils/Heading";
import ViewModal from "../../components/crypto-transac-his/deposit/ViewModal";

const CryptoDepositHistory = () => {
        //states
        const [data,setData] = useState([]);
        const [adminData,setAdminData] = useState([]);
        const [pagination,setPagination] = useState([]);
        const [page, setPage] = useState('');
        const [name, setName] = useState('');
        const [symbol, setSymbol] = useState('');
        const [amount, setAmount] = useState('');
        const [date, setDate] = useState('');
        const [status, setStatus] = useState('');
        const [sortBy, setSortBy] = useState('');
        const [sortName, setSortName] = useState('');
        const [total, setTotal] = useState('');
        const [loader, setLoader] = useState(true);
        const [w_address, setWaddress] = useState('');
        const [data_, setData_] = useState('')
        const [UniqueId, setUniqueId] = useState('')
            //Crypto Deposit history data get
            const getCryptoDeposit = async() => {
                let response = await ApiClass.getRequest(`usersReport/deposit_wallet_transactions_get?t_type=crypto&page=${page}&name=${name}&user_wallet_address=${w_address}&amount=${amount}&deposit_unique_id=${UniqueId}&current_status=${status}&date=${date}&symbol=${symbol}&sortbyname=${sortName}&sortby=${sortBy}`,true);
                setLoader(false);
                 if(!response.data.hasOwnProperty('status_code')){
                    SwalClass.success("Unable to fetch data at this time.");
                    return;
                }
        
                if(response?.data?.status_code == 0){
                    return
                }
    
                if(response?.data?.status_code == 1){
                    setAdminData(response?.data?.admin_address || [])
                    setData(response?.data?.data?.data || []);
                    setTotal(response?.data?.data?.total || 1);
                    setPagination({
                        page:response?.data?.data?.current_page || 1,
                        last_page:response?.data?.data?.last_page || 1,
                        
                    })
                }
            }

            useEffect(()=>{
                setLoader(true)
                getCryptoDeposit();
            },[date,status,sortBy,sortName,page]);
        
        
            const handlePageClick = (e) => {
                setPage(e.selected+1)
            }

     //Crypto Withdraw history data get
       const handleOnExport = async(type) => {
        let response = await ApiClass.getRequest(`usersReport/deposit_wallet_transactions_get?t_type=crypto&page=${page}&name=${name}&user_wallet_address=${w_address}&amount=${amount}&deposit_unique_id=${UniqueId}&current_status=${status}&date=${date}&symbol=${symbol}&sortbyname=${sortName}&sortby=${sortBy}&per_page=${total}`,true);
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

            if(type == 0){  // Excel
                generateExcel(d);
                return;
            }

            if(type == 1){ // PDF
                let heading = ['symbol', 'amount', "status","createdAt"];
                let relational_keys = {
                    "heading":["name"],
                    "data":[
                        {
                            object:"user",
                            keys:["name"],
                            parent:""
                        },
                    ]
                };
                return generatePDF(heading, d, "Crypto_Deposit_History",relational_keys); // 
            }
        }
    }

        //data to show on modal
        const setViewData= (v) =>{
            setData_(v)
        }

    return(
        <>
            
            <section className="dashboard-sec">
                    <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                            <Heading 
                                text="Crypto Deposit History"
                                image="Deposit_transc.webp"
                            />
                             <button className="btn p-0 border-0" data-bs-toggle="dropdown" data-bs-target="#exportDropdown">
                                <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V28.5h3V39h30V8.9H9v10.6H6V8.9q0-1.2.9-2.1.9-.9 2.1-.9h30q1.2 0 2.1.9.9.9.9 2.1V39q0 1.2-.9 2.1-.9.9-2.1.9Zm11.65-8.35L18.4 31.4l5.9-5.9H6v-3h18.3l-5.9-5.9 2.25-2.25L30.3 24Z" /></svg>
                            </button>
                            <ul className="dropdown-menu p-0" id="exportDropdown">
                                <li>
                                    <a className="dropdown-item rounded" href="#" onClick={()=>handleOnExport(0)}>Excel</a>
                                </li>
                                <li>
                                    <a className="dropdown-item rounded" href="#" onClick={()=>handleOnExport(1)}>Pdf</a>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Table 
                                  data={data}
                                  pagination={pagination}
                                  handlePageClick={handlePageClick}
                                  setName={setName}
                                  setAmount={setAmount}
                                  setSymbol={setSymbol}
                                  setDate={setDate}
                                  setStatus={setStatus}
                                  getCryptoDeposit={getCryptoDeposit}
                                  setSortBy={setSortBy}
                                  setSortName={setSortName}
                                  sortBy={sortBy}
                                  setLoader={setLoader}
                                  setWaddress={setWaddress}
                                  loader={loader}
                                  setViewData={setViewData}
                                  setUniqueId={setUniqueId}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <ViewModal data={data_} adminData={adminData}/>
        </>
    )
}
export default CryptoDepositHistory;