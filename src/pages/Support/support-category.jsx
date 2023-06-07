import React,{useState,useEffect} from "react";
import Sidebar from '../../layout/Sidebar';
import Table from '../../components/Support/support-category/Table';
import Heading from "../../components/Utils/Heading";

import ApiClass from '../../Api/api.js';

import EditModal from "../../components/Support/support-category/EditModal";
import DeleteModal from "../../components/Support/support-category/DeleteModal";
import CreateModal from "../../components/Support/support-category/CreateModal";
const SupportCategory = () => {
    //states
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [d,setD] = useState({})
    const [page,setPage] = useState('');
    const getCategory = async() => {
        let response = await ApiClass.getRequest(`ticket/category_get?page=${page}`,true);
        if(response?.data?.status_code == 0){
            return
        }
        if(response?.data?.status_code == 1){
            setData(response?.data?.data?.data);
            setPagination({
                page:response?.data?.data?.current_page,
                last_page:response?.data?.data?.last_page
            })
            setPage('')
        }
    }
    useEffect(()=>{
        getCategory()
    },[]);
    useEffect(()=>{
        if(page != ''){
            getCategory()
        }
    },[page]);

    const handlePageClick = (e) => {
        setPage(e.selected+1)
    }
    const setViewData = (v) =>{
        setD(v);
    }

    return(
        <>
            
                <section className="dashboard-sec">
                    <div className="container-fluid">
                        <div className="d-flex align-items-center justify-content-between">
                      
                            <Heading 
                                text="support category"
                                image="kyc.webp"
                            />
                            <button className="btn p-0 border-0" data-bs-toggle="modal" data-bs-target="#createCategoryModal">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--white)"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"/></svg>
                            </button>
                        </div>
                     
                        <div className="row">
                            <div className="col-md-12">
                                <Table 
                                    data={data}
                                    pagination={pagination}
                                    handlePageClick={handlePageClick}
                                    setViewData={setViewData}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <CreateModal 
                    getCategory={getCategory}
                />
                <EditModal 
                    data={d}
                    getCategory={getCategory}
                />
                <DeleteModal 
                    data={d}
                    getCategory={getCategory}
                />
            
        </>
    )
}
export default SupportCategory;