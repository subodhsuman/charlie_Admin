import React, { useState, useEffect } from "react";
import Sidebar from "../../layout/Sidebar";
import Table from "../../components/p2p/chat-list/Table";
import Heading from "../../components/Utils/Heading";
import ApiClass from "../../Api/api";
import SwalClass from "../../common/swal";
import { generateExcel, generatePDF } from "../../common/Export";
import ChatModal from "./ChatModal";
const ChatList = () => {
    //states
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState('');
    const [user_id, setName] = useState('');
    const [match_id, setMatch_id] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [total, setTotal] = useState('');
    const [loader, setLoader] = useState(true)
    const [cryptosedit, setAllcryptoedit] = useState([])
    const [status, setstatus] = useState([])


    const [buy_confirmation, setBuyConfirmation] = useState('')
    const [sell_confirmation, setSellConfirmation] = useState('')

    const [d, setD] = useState([]);
    const [user, setUser] = useState()
    const getP2pCh = async () => {
        let response = await ApiClass.getNodeRequest(`P2P/trade/get_p2p_trades?page=${page}&per_page=10&date=${date}&id=${user_id}&buy_confirmation=${buy_confirmation}&sell_confirmation=${sell_confirmation}&status=${status}`, true);
        setLoader(false);
        if (!response.data.hasOwnProperty('status_code')) {
            SwalClass.success("Unable to fetch data at this time.");
            return;
        }

        if (response?.data?.status_code == 0) {
            return
        }
        if (response?.data?.status_code == 1) {
            setD(response?.data?.data?.data)
            setPagination({
                page: response?.data?.data?.current_page || 1,
                last_page: response?.data?.data?.last_page || 1,

            })
            return
        }
    }

    //P2P chat list data get
    const getP2pChatList = async () => {
        let response = await ApiClass.getNodeRequest(`P2P/chat/chat-history?page=${page}&name=${name}&match_id=${match_id}&quantity=${quantity}&email=${email}&message=${message}&date=${date}`, true);
        if (!response.data.hasOwnProperty('status_code')) {
            SwalClass.success("Unable to fetch data at this time.");
            return;
        }

        if (response?.data?.status_code == 0) {
            return
        }
        if (response?.data?.status_code == 1) {
            setData(response?.data?.data?.data || []);
            setTotal(response?.data?.data?.total || 1);

        }
    }
    const setViewData = async (v) => {
        let response = await ApiClass.getNodeRequest(`P2P/chat/all-chat-history?match_id=${v}`, true);
        console.log({ response });
        if (response?.data?.status_code == 1) {
            let users = response?.data?.data?.map((data) => {
                return (data.user.name)
            })
            setUser(users[0])
            setAllcryptoedit(response?.data?.data)
        }

    }
    //export tabel
    const handleOnExport = async (val) => {
        let response = await ApiClass.getNodeRequest(`P2P/chat/chat-history?page=${page}&name=${name}&match_id=${match_id}&quantity=${quantity}&email=${email}&message=${message}&date=${date}&per_page=${total}`, true);

        if (!response.data.hasOwnProperty('status_code')) {
            SwalClass.success("Unable to Export at this time.");
            return;
        }

        if (response?.data?.status_code == 0) {
            SwalClass.failed(response?.data?.message)
            return
        }

        if (response?.data?.status_code == 1) {

            let d = response?.data?.data?.data;

            if (d.length == 0) {
                SwalClass.success("No Data to Export in Pdf/Excel.")
                return;
            }

            if (val == 0) {  // Excel
                generateExcel(d);
                return;
            }

            if (val == 1) { // PDF
                let heading = ['match_id', 'message', "created_at"];

                let relational_keys = {
                    "heading": ["name", "email"],
                    "data": [
                        {
                            object: "user",
                            keys: ["name", "email"],
                            parent: ""
                        }
                    ]
                };
                return generatePDF(heading, d, "P2P_Chat_List", relational_keys); // 
            }
        }
    }

    useEffect(() => {
        setLoader(true)
        getP2pCh()
    }, [page, date, buy_confirmation, sell_confirmation, status]);

    const handlePageClick = (e) => {
        setPage(e.selected + 1)
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
                                data={d}
                                pagination={pagination}
                                handlePageClick={handlePageClick}
                                setName={setName}
                                setEmail={setEmail}
                                setMatch_id={setMatch_id}
                                setMessage={setMessage}
                                setDate={setDate}
                                getP2pChatList={getP2pCh}
                                handleOnExport={handleOnExport}
                                setLoader={setLoader}
                                setViewData={setViewData}
                                setBuyConfirmation={setBuyConfirmation}
                                setSellConfirmation={setSellConfirmation}
                                setstatus={setstatus}
                                loader={loader} />
                        </div>
                    </div>
                </div>
            </section>
            <ChatModal cryptosedit={cryptosedit || []} user={user} />
        </>
    )
}
export default ChatList;