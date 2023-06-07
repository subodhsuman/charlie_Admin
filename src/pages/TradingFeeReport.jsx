import React,{useState,useEffect} from 'react';
import Sidebar from '../layout/Sidebar';
import Table from '../components/fee-report/Table';
import Heading from '../components/Utils/Heading';
import ApiClass from '../Api/api';
import {generatePDF, generateExcel} from "../common/Export.js";
import SwalClass from "../common/swal.js"

function TradingFeeReport() {
    //states
    const [data,setData] = useState([]);
    const [totalCommision,setTotalCommision] = useState([]);
    const [pagination,setPagination] = useState({});
    const [page, setPage] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [commision_cur, setCommision_cur] = useState('');
    const [commision,setCommision] = useState('');
    const [date, setDate] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortName, setSortName] = useState('');
    const [durtion, setDurtion] = useState('');
    const [total, setTotal] = useState('');
    const [loader, setLoader] = useState(true)

    //Trading fee report data get
    const getTrade = async() => {
        let response = await ApiClass.getRequest(`usersReport/trading_fee_report_get?page=${page}&commission_currency=${commision_cur}&commission=${commision}&order_type=${type}&name=${name}&date=${date}&sortbyname=${sortName}&sortby=${sortBy}&duration=${durtion}`,true);
        setLoader(false);
        if(!response.data.hasOwnProperty('status_code')){
            SwalClass.success("Unable to fetch data at this time.");
            return;
        }

        if(response?.data?.status_code == 0){
            return
        }
        
        if(response?.data?.status_code == 1){
            setData(response?.data?.data?.final?.data || []);
            setTotal(response?.data?.data?.final?.total || 1)
            setTotalCommision(response?.data?.data?.total || [])
            setPagination({
                page:response?.data?.data?.final?.current_page || 1,
                last_page:response?.data?.data?.final?.last_page || 1
            })
        }
    }
    useEffect(()=>{
        setLoader(true)
        getTrade()     
    },[type,date,durtion,sortBy,sortName,page]);


    const handlePageClick = (e) => {
        setPage(e.selected+1)
    }

            //Client fee report data get
            const handleOnExport = async(export_type) => {
            let response = await ApiClass.getRequest(`usersReport/trading_fee_report_get?page=${page}&commission_currency=${commision_cur}&commission=${commision}&order_type=${type}&name=${name}&date=${date}&sortbyname=${sortName}&sortby=${sortBy}&duration=${durtion}&per_page=${total}`,true);
                
                if(!response.data.hasOwnProperty('status_code')){
                    SwalClass.success("Unable to Export at this time.");
                    return;
                }
        
                if(response?.data?.status_code == 0){
                    SwalClass.failed(response?.data?.message)
                    return
                }
        
                if(response?.data?.status_code == 1){
        
                    let d = response?.data?.data?.final?.data;
                    if(d.length == 0){
                        SwalClass.success("No Data to Export in Pdf/Excel.")
                        return;
                    }
        
                    if(export_type == 0){  // Excel
                        generateExcel(d);
                        return;
                    }
        
                    if(export_type == 1){ // PDF
                        let heading = ["commission_currency","commission","created_at"];

                        let relational_keys = {
                            "heading":["order_type","name","email"],
                            "data":[
                                {
                                    object:"order",
                                    keys:["order_type"],
                                    parent:""
                                },
                                {
                                    object:"user",
                                    keys:["name","email"],
                                    parent:"order"
                                }
                            ]
                        };

                        return generatePDF(heading, d, "Trade_Fee_Report", relational_keys); // 
                    }
                }
            }

  return (
    <>
        
            <section className='dashboard-sec'>
                <div className="container-fluid">
                    <Heading 
                        text="trading fee report"
                        image="trading_report.webp"
                    />
                    <div className="row">
                        <div className="col-md-12">
                            <Table 
                             data={data}
                             totalCommision={totalCommision}
                             pagination={pagination}
                             handlePageClick={handlePageClick}
                             setName={setName}
                             setType={setType}
                             setCommision_cur={setCommision_cur}
                             setCommision={setCommision}
                             setDate={setDate}
                             getTrade={getTrade}
                             setSortBy={setSortBy}
                             setSortName={setSortName}
                             sortBy={sortBy}
                             setDurtion={setDurtion}
                             handleOnExport={handleOnExport}
                             setLoader={setLoader}
                             loader={loader}
                            />
                        </div>
                    </div>
                </div>
            </section>
        
    </>
  )
}

export default TradingFeeReport