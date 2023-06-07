import React, { useEffect, useState } from "react";
import Sidebar from "../layout/Sidebar";
import Table from "../components/list_crypto/Table";
import Heading from "../components/Utils/Heading";
import ApiClass from "../Api/api";
import CryptoModal from "../components/list_crypto/CryptoModal";
import SwalClass from "../common/swal";
const ListCrypto = () => {
    const [active, setActive] = useState('USDT');

    const [cryptoData, setCryptoData] = useState('')

    const [search, setSearch] = useState('')

    const [ data, setData ] = useState('')

    const getCrypto = async () => {
        const response = await ApiClass.getRequest('crypto/get_list');
        if(!response?.data.hasOwnProperty("status_code")){
            SwalClass.failed("Unable to fetch records at this time.");
            return
        }
        if(response?.data?.status_code == 0){
            return;
        }
        if(response?.data?.status_code == 1){
            setCryptoData(response?.data?.data || {})
            return
        }
    }
    useEffect(() => {
        getCrypto();
    }, [])


    const cryptoHandler =async(id)=>{
        const response = await ApiClass.getRequest(`crypto/get_list/${id}`);
        if(!response?.data.hasOwnProperty("status_code")){
            SwalClass.failed("Unable to fetch records at this time.");
            return
        }
        if(response?.data?.status_code == 0){
            return;
        }
        if(response?.data?.status_code == 1){
            setData(response?.data?.data || {})
            return
        }
    }

    return (
        <>
            
                <section className="dashboard-sec">
                    <div className="container-fluid">
                        <Heading
                            text="crypto list"
                            image="crypto.webp"
                        />
                        <div className="row">
                            <div className="col-md-12">
                                <div className="admin-table-wrapper">
                                    <div className="d-sm-flex justify-content-between align-items-center mb-3">
                                        <ul className="nav nav-tabs list-crypto-tabs border-bottom-0 justify-content-center jusitfy-content-sm-start mb-3" id="cryptoTab" role="tablist">
                                            {Object.keys(cryptoData)?.map((val, index) => {
                                                return (
                                                    <li className="nav-item" role="presentation" key={index}>
                                                        <button
                                                            className={`nav-link text-uppercase ${active == val ? 'active' : ''}`}
                                                            id={`${val}-tab`}
                                                            data-bs-toggle="tab"
                                                            data-bs-target={`#${val}`}
                                                            type="button"
                                                            role="tab"
                                                            aria-controls={val}
                                                            aria-selected="true"
                                                            onClick={() => setActive(val)}
                                                        >
                                                            {val}
                                                        </button>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                        <div className="d-flex gap-2">
                                            <div className="search-group">
                                                <div className="input-group border">
                                                    <input type="text" className="form-control border-0" placeholder="Search" aria-label="Search" aria-describedby=""
                                                        onChange={(e) => setSearch(e.target.value)} />
                                                </div>
                                            </div>
                                         
                                        </div>
                                    </div>
                                    <Table data={cryptoData} cryptoHandler={cryptoHandler} callGetCrypto={getCrypto} active={active} search={search} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <CryptoModal cryptoData={data} getCrypto={getCrypto} />
            
        </>
    )
}
export default ListCrypto;