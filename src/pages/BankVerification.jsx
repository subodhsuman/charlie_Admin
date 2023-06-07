import React,{useState,useEffect} from "react";
import Sidebar from '../layout/Sidebar'
import Table from "../components/bank-verification/Table";
import Heading from '../components/Utils/Heading';

import ApiClass from '../Api/api.js';
import SwalClass from '../common/swal.js';

import VerifyModal from "../components/bank-verification/VerifyModal";
import {generatePDF, generateExcel} from "../common/Export.js";

const BankVerification = () => {

    const [loader, setLoader] = useState(true)
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [total, setTotal] = useState('');

    const [page, setPage] = useState('');
    const [alias, setAlias] = useState('');
    const [email, setEmail] = useState('');
    const [AccNumber, setAccNumber] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('completed');
    const [sortBy, setSortBy] = useState('');
    const [sortName, setSortName] = useState('');
    const [d, setD] = useState('');


    //initial api
    const getBanks = async() => {
        
        let response = await ApiClass.getRequest(`userbanks/get?page=${page}&alias=${alias}&email=${email}&account_number=${AccNumber}&ifsc_code=${ifsc}&created_at=${date}&status=${status}&sortbyname=${sortName}&sortby=${sortBy}`,true);
        setLoader(false)
        if(!response.data.hasOwnProperty("status_code")){
            SwalClass.failed("Unable to fetch data at this time.")
            return
        }
        if(response?.data?.status_code == 0){
            return
        }
        if(response?.data?.status_code == 1){
            setData(response?.data?.data?.data);
            setPagination({
                page: response?.data?.data?.current_page,
                last_page: response?.data?.data?.last_page
            })
            setTotal(response?.data?.data?.total)
            return
        }
    }
    //called initially and onchange of dependencies
    useEffect(()=>{
        setLoader(true)
        getBanks()
    },[date,status, sortBy,page]);

  
    //handlepage
    const handlePageClick = (e) => {
        setPage(e.selected+1);
    }

    //set View Data
    const setViewData = (v) => {
        setD(v)
    }

      //export to
      const handleOnExport = async(type)=>{
        let response = await ApiClass.getRequest(`userbanks/get?per_page=${total}&alias=${alias}&email=${email}&account_number=${AccNumber}&ifsc_code=${ifsc}&created_at=${date}&status=${status}&sortbyname=${sortName}&sortby=${sortBy}`,true);
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
                let heading = ['alias', 'account_number', "ifsc_code","created_at", "status"];
                let relational_keys = {
                    "heading":["name","email"],
                    "data":[
                        {
                            object:"user",
                            keys:["name"],
                            parent:""
                        },
                        {
                            object:"user",
                            keys:["email"],
                            parent:""
                        }
                    ]
                };
                return generatePDF(heading, d, `Bank Verification`,relational_keys); // 
            }
        }
    }
    return(
        <>
        
            <section className="dashboard-sec">
                <div className="container-fluid">
                    <Heading 
                        text="bank verification"
                        image="bank.webp"
                    />
                    <div className="row">
                        <div className="col-md-12">
                            <Table 
                                data={data}
                                pagination={pagination}
                                handlePageClick={handlePageClick}

                                getBanks={getBanks}
                                setAlias={setAlias}
                                setEmail={setEmail}
                                setAccNumber={setAccNumber}
                                setIfsc={setIfsc}
                                setDate={setDate}
                                setStatus={setStatus}
                                setViewData={setViewData}
                                handleOnExport={handleOnExport}
                                setLoader={setLoader}
                                loader={loader}
                                setSortBy={setSortBy}
                                setSortName={setSortName}
                                sortBy={sortBy}

                            />
                        </div>
                    </div>
                </div>
            </section>
            <VerifyModal 
                data={d}
                getBanks={getBanks}
                setLoader={setLoader}
            />
        
        </>
    )
}
export default BankVerification;