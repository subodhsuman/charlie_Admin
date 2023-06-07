import React,{useState,useEffect} from "react";
import Sidebar from "../../layout/Sidebar";
import Table from "../../components/staking/user-staking-list/Table";
import Heading from "../../components/Utils/Heading";
import ApiClass from "../../Api/api";
import SwalClass from "../../common/swal";
import { generatePDF,generateExcel } from "../../common/Export";
import { useSelector } from "react-redux";

const UserStakeList = () => {
     //states
     const {StakeId} = useSelector((state) => {
        return state.user;
    })
     const [data,setData] = useState([]);
     const [TotalData,setTotalData] = useState();
     const [pagination,setPagination] = useState({});
     const [page, setPage] = useState('');
     const [name, setName] = useState('');
     const [amount, setAmount] = useState('');
     const [created_at, setcreated_at] = useState('');  
     const [loader, setLoader] = useState(true);
     const [total, setTotal] = useState('');

      //User Staking List get
      const getStakingUserList = async() => {
        let response = await ApiClass.getNodeRequest(`staking/get_by_plan_id/${StakeId}?page=${page}&name=${name}&created_at=${created_at}&amount=${amount}`,true);
        setLoader(false);             
        if(!response.data.hasOwnProperty('status_code')){
            SwalClass.success("Unable to fetch data at this time.");
            return;
        }

        if(response?.data?.status_code == 0){
            return
        }

        if(response?.data?.status_code == 1){
            setTotalData(response?.data?.data)
            setData(response?.data?.data?.data || []);
            setTotal(response?.data?.data?.data?.total || 1);
            setPagination({
                page:response?.data?.data?.data?.current_page || 1,
                last_page:response?.data?.data?.data?.last_page || 1,
                
            })
        }
    }

    useEffect(()=>{
        setLoader(true)
        getStakingUserList();
    },[page,created_at]);

    const handlePageClick = (e) => {
        setPage(e.selected+1)
    }

     //export tabel
     const handleOnExport = async(type) => {
        let response = await ApiClass.getNodeRequest(`staking/get_by_plan_id/${StakeId}?page=${page}&name=${name}&amount=${amount}&created_at=${created_at}&per_page=${total}`,true);
        if(!response.data.hasOwnProperty('status_code')){
            SwalClass.success("Unable to Export at this time.");
            return;
        }

        if(response?.data?.status_code == 0){
            SwalClass.failed(response?.data?.message)
            return
        }

        if(response?.data?.status_code == 1){

            let d = response?.data?.data?.data?.data;
            console.log({d});

            if(d.length == 0){
                SwalClass.success("No Data to Export in Pdf/Excel.")
                return;
            }

            if(type == 0){  // Excel
                generateExcel(d);
                return;
            }

            if(type == 1){ // PDF
                let heading = ['name', 'reward_currency',"plan_type",'amount'];
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
                return generatePDF(heading, d, "User Staking List",relational_keys); // 
            }
        }
    }

    return(
        <>
        
            <section className="dashboard-sec">
                <div className="container-fluid">
                  <div className="d-flex justify-content-between align-items-center">
                    <Heading 
                    text="user stake list"
                    image="stake.webp"
                    />
                    <div className="d-flex gap-3">
                   <p className="mb-3">Total Stake : {TotalData?.sum}</p>
                   <p className="mb-3">Total User : {data?.data?.length}</p>
                   <p className="mb-3">Total Interest : {TotalData?.total_interest}</p>
                    </div>
                    {data?.data?.length == 0 ? '' :
                    <>
                        <button className="mb-3 btn p-0 border-0" data-bs-toggle="dropdown" data-bs-target="#exportDropdown">
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
                                </>
}
                    </div>    
                    <div className="row">
                        <div className="col-md-12">
                            <Table 
                            data={data.data}
                            pagination={pagination}
                            handlePageClick={handlePageClick}
                            setName={setName}
                            setcreated_at={setcreated_at}
                            setAmount={setAmount}
                            getStakingUserList={getStakingUserList}
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
export default UserStakeList;