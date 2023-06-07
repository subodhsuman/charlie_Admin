import React,{useState,useEffect} from "react";
import Sidebar from '../../layout/Sidebar';
import Table from "../../components/crypto-transac-his/withdraw/Table";
import ApiClass from "../../Api/api";
import Heading from "../../components/Utils/Heading";
import {generatePDF, generateExcel} from "../../common/Export.js";
import SwalClass from "../../common/swal";
import ViewModal from '../../components/crypto-transac-his/withdraw/ViewModal';

const CryptoWithdrawHistory = () => {
    //states
    const [data,setData] = useState([]);
    const [pagination,setPagination] = useState({});
    const [page, setPage] = useState('');
    const [name, setName] = useState('');
    const [cur_rency, setCur_rency] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortName, setSortName] = useState('');
    const [total, setTotal] = useState('');
    const [loader, setLoader] = useState(true);
    const [chainType, setChainType] = useState('');
    const [d, setD] = useState('')
    const [UniqueId, setUniqueId] = useState('')

    //Crypto Withdraw history data get
        const getCryptoWithdraw = async() => {
            let response = await ApiClass.getRequest(`usersReport/wallet_transactions_get?t_type=crypto&page=${page}&name=${name}&amount=${amount}&current_status=${status}&date=${date}&currency=${cur_rency}&chain_type=${chainType}&withdraw_unique_id=${UniqueId}&sortbyname=${sortName}&sortby=${sortBy}`,true);

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

        useEffect(()=>{
            setLoader(true)
            getCryptoWithdraw();
        },[date,status,sortBy,sortName,page]);

    
        const handlePageClick = (e) => {
            setPage(e.selected+1)
        }

       //Crypto Withdraw history data get
       const handleOnExport = async(type) => {
        let response = await ApiClass.getRequest(`usersReport/wallet_transactions_get?t_type=crypto&page=${page}&name=${name}&amount=${amount}&current_status=${status}&date=${date}&currency=${cur_rency}&chain_type=${chainType}&sortbyname=${sortName}&sortby=${sortBy}&per_page=${total}`,true);
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
                let heading = ['currency', 'amount', "status","created_at"];
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
                return generatePDF(heading, d, "Crypto_Withdraw_History",relational_keys); // 
            }
        }
    }

    //data to show on modal
    const setViewData= (v) =>{
        setD(v)
    }

    return(
        <>
            
                <section className="dashboard-sec">
                    <div className="container-fluid">

                        <div className="d-flex justify-content-between">
                            <Heading 
                                text="Crypto Withdraw History"
                                image="Withdraw_transc.webp"
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
                                setCur_rency={setCur_rency}
                                setDate={setDate}
                                setStatus={setStatus}
                                getCryptoWithdraw={getCryptoWithdraw}
                                setSortBy={setSortBy}
                                setSortName={setSortName}
                                sortBy={sortBy}
                                setLoader={setLoader}
                                loader={loader}
                                setViewData={setViewData}
                                setChainType={setChainType}
                                setUniqueId={setUniqueId}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <ViewModal data={d} />
            
        </>
    )
}
export default CryptoWithdrawHistory;