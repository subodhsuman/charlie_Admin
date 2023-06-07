import React,{useState,useEffect} from "react";
import Sidebar from "../../layout/Sidebar";
import Table from "../../components/p2p/order-list/Table";
import Heading from "../../components/Utils/Heading";
import ApiClass from "../../Api/api";
import SwalClass from "../../common/swal";
import { generateExcel, generatePDF } from "../../common/Export";

const OrderList = () => {
     //states
     const [data,setData] = useState([]);
     const [pagination,setPagination] = useState({});
     const [page, setPage] = useState('');
     const [name, setName] = useState('');
     const [type, setType] = useState('');
     const [quantity, setQuantity] = useState('');
     const [date, setDate] = useState('');
     const [price, setprice] = useState('');
     const [total_, setTotal_] = useState('');
     const [status, setStatus] = useState('');
     const [sortBy, setSortBy] = useState('');
     const [sortName, setSortName] = useState('');
     const [total, setTotal] = useState('');
     const [loader, setLoader] = useState(true)

     //P2P order list data get
     const getP2pOrderList = async() => {
         let response = await ApiClass.getNodeRequest(`P2P/P2POrder/allorderlist?page=${page}&per_page=10&name=${name}&order_type=${type}&quantity=${quantity}&at_price=${price}&total=${total_}&date=${date}&status=${status}&sortbyname=${sortName}&sortby=${sortBy}`,true);
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
             let response = await ApiClass.getNodeRequest(`P2P/P2POrder/allorderlist?page=${page}&name=${name}&order_type=${type}&quantity=${quantity}&at_price=${price}&total=${total_}&date=${date}&status=${status}&sortbyname=${sortName}&sortby=${sortBy}&per_page=${total}`,true);
 
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
                     let heading = ['order_type', 'max_quantity', 'at_price', "total", "created_at","status"];

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
                     return generatePDF(heading, d, "P2P_Order_List",relational_keys); // 
                 }
             }
         }
 
     useEffect(()=>{
         setLoader(true)
         getP2pOrderList();
     },[page,type,date,status,sortBy,sortName]);

 
     const handlePageClick = (e) => {
         setPage(e.selected+1)
     }
    return(
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
                                  setprice={setprice}
                                  setTotal_={setTotal_}
                                  setType={setType}
                                  setQuantity={setQuantity}
                                  setDate={setDate}
                                  setStatus={setStatus}
                                  getP2pOrderList={getP2pOrderList}
                                  setSortBy={setSortBy}
                                  setSortName={setSortName}
                                  sortBy={sortBy}
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
export default OrderList;