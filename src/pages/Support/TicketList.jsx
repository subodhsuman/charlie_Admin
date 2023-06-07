import React, { useEffect, useState } from "react";
import Sidebar from '../../layout/Sidebar';
import Table from '../../components/Support/ticket-list/Table';
import Heading from "../../components/Utils/Heading";

import ApiClass from '../../Api/api.js';

import EditModal from "../../components/Support/ticket-list/EditModal";
import ViewModal from "../../components/Support/ticket-list/ViewModal";
import SwalClass from '../../common/swal.js';
const TicketList = () => {
    const [data,setData] = useState([]);
    const [pagination,setPagination] = useState({});
    const [page,setPage] = useState('');
    const [d,setD] = useState('')

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [date, setDate] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorEmail, setAuthorEmail] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const [sortbyname, setSortName] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [loader, setLoader] = useState(true);
    const [Comment, setComment] = useState([]);

    const getTickets = async() => {
        let response = await ApiClass.getRequest(`ticket/get?page=${page}&title=${title}&content=${content}&created_at=${date}&name=${categoryName}&author_name=${authorName}&author_email=${authorEmail}&priority=${priority}&status=${status}&sortbyname=${sortbyname}&sortby=${sortBy}`,true);
      
        if(!response.hasOwnProperty("data")){
            return
        }
        if(response?.data?.status_code == 0){
            return
        }
        if(response?.data?.status_code == 1){
            setLoader(false);
            setData(response?.data?.data?.data || []);
            setPagination({
                page:response?.data?.data?.current_page,
                last_page:response?.data?.data?.last_page
            })
            setPage('')
        }
    }
    useEffect(()=>{
        setLoader(true)
        getTickets()
    },[date, priority, status, sortbyname, sortBy, page]);

    const handlePageClick = () => {
        setPage(e.selected+1)
    }

    const setViewData= (v, bool) => {
        setD(v)
        bool ? getComments(v?.id) : '';
    }
    const getComments = async(id) => {
        let response = await ApiClass.getRequest(`ticket/comment_get/${id}`, true, data);
            if (!response?.data.hasOwnProperty("status_code")) {
                SwalClass.failed("Unable to Fetch comments at this time.");
                return
            }
            if (response?.data?.status_code == 0) {
                SwalClass.failed(response?.data?.message);
                return
            }
            if (response?.data?.status_code == 1) {
                setComment(response?.data?.data)
                return
            }
    }
    return(
        <>  
            
                <section className="dashboard-sec">
                    <div className="container-fluid">
                       <Heading 
                        text="ticket list"
                        image="kyc.webp"
                       />
                        <div className="row">
                            <div className="col-md-12">
                                <Table 
                                    data={data}
                                    pagination={pagination}
                                    handlePageClick={handlePageClick}
                                    setViewData={setViewData}

                                    getTickets={getTickets}
                                    setTitle={setTitle}
                                    setContent={setContent}
                                    setDate={setDate}
                                    setCategoryName={setCategoryName}
                                    setAuthorName={setAuthorName}
                                    setAuthorEmail={setAuthorEmail}
                                    setPriority={setPriority}
                                    setStatus={setStatus}
                                    setSortName={setSortName}
                                    setSortBy={setSortBy}
                                    sortBy={sortBy}
                                    setLoader={setLoader}
                                    loader={loader}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <EditModal data={d} getTickets={getTickets}/>
                <ViewModal data={d} getTickets={getTickets} getComments={getComments} Comment={Comment}/>
                {/* <ViewModal allData={data} data={d} getTickets={getTickets} /> */}

            
        </>
    )
}
export default TicketList;