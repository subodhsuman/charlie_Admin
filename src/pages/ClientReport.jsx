import React,{useState,useEffect} from "react";
import Sidebar from '../layout/Sidebar'
import Table from "../components/client-report/Table";
import Heading from "../components/Utils/Heading";
import ApiClass from "../Api/api";
import {generatePDF, generateExcel} from "../common/Export.js";

const ClientReport = () => {
    //states
    const [data,setData] = useState([]);
    const [pagination,setPagination] = useState({});
    const [page, setPage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortName, setSortName] = useState('');
    const [durtion, setDurtion] = useState('');
    const [total, setTotal] = useState('');
    const [loader, setLoader] = useState(true)
    //Client fee report data get
    const getClient = async() => {
        let response = await ApiClass.getRequest(`usersReport/client_report_get?page=${page}&name=${name}&email=${email}&user_status=${userStatus}&date=${date}&duration=${durtion}&sortbyname=${sortName}&sortby=${sortBy}`,true);
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

        //Client fee report data get
        const handleOnExport = async(type) => {
            let response = await ApiClass.getRequest(`usersReport/client_report_get?page=${page}&name=${name}&email=${email}&user_status=${userStatus}&date=${date}&duration=${durtion}&sortbyname=${sortName}&sortby=${sortBy}&per_page=${total}`,true);

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
                    let heading = ['name', 'email', "created_at","user_verify"];
                    return generatePDF(heading, d, "Client_Fee_Report"); // 
                }
            }
        }

    useEffect(()=>{
        setLoader(true)
        getClient();
    },[date,userStatus,durtion,sortBy,sortName,page]);


    const handlePageClick = (e) => {
        setPage(e.selected+1)
    }

    return(
        <>
            
                <section className='dashboard-sec'>
                    <div className="container-fluid">
                        <Heading 
                            text="client fee report"
                            image="client_report.webp"
                        />
                        <div className="row">
                            <div className="col-md-12">
                                <Table 
                                 data={data}
                                 pagination={pagination}
                                 handlePageClick={handlePageClick}
                                 setName={setName}
                                 setEmail={setEmail}
                                 setDate={setDate}
                                 setUserStatus={setUserStatus}
                                 getClient={getClient}
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
export default ClientReport;