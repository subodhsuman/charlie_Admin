import React, { useEffect, useState } from "react";
import Sidebar from "../layout/Sidebar";
import Table from "../components/listed-coin/Table";
import Heading from "../components/Utils/Heading";
import ApiClass from "../Api/api";
import Modal from "../components/listed-coin/Modal";
import AddListCoin from "../components/listed-coin/AddListCoin";
import LIstCoinInfo from "../components/listed-coin/LIstCoinInfo";
import CurrencyData from '../assets/json/currency.json';

const ListedCoin = () => {
    const [active, setActive] = useState('USDT');

    const [cryptoData, setCryptoData] = useState('')

    const [search, setSearch] = useState('')

    const [ data, setData ] = useState('')

    const getCrypto = async () => {
        const response = await ApiClass.getRequest('list-coins/getPair');

        setCryptoData(response?.data?.data)
    }
    useEffect(() => {
        getCrypto();
    }, [])


    const cryptoHandler =async(id)=>{
        const response = await ApiClass.getRequest(`list-coins/getPair/${id}`);
 
        setData(response?.data?.data)
    }

    const [contractDetail, setContractDetail] = useState({});
    const [contractError, setContractError] = useState('');
    const contDetail = ({message,v}) => {
        setContractError(message)
        setContractDetail(v)
    }


    return (
        <>
                <section className="dashboard-sec">
                    <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center">
                    <Heading
                            text="Listed Coin"
                            image="crypto.webp"
                        />
                                <button className="btn p-0 border-0" data-bs-toggle="modal" data-bs-target="#listcoinmodal">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--white)"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z" /></svg>
                                </button>
                        </div>
                        
                        <div className="row">
                            <div className="col-md-12">
                                <div className="admin-table-wrapper">
                                    <div className="d-sm-flex justify-content-between align-items-center mb-3">
                                        <ul className="nav nav-tabs list-crypto-tabs border-bottom-0 justify-content-center jusitfy-content-sm-start mb-3" id="cryptoTab" role="tablist">
                                            {CurrencyData?.map((val, index) => {
                                                return (
                                                    <li className="nav-item" role="presentation" key={index}>
                                                        <button
                                                            className={`nav-link text-uppercase ${active == val?.currency ? 'active' : ''}`}
                                                            id={`${val?.currency}-tab`}
                                                            data-bs-toggle="tab"
                                                            data-bs-target={`#${val?.currency}`}
                                                            type="button"
                                                            role="tab"
                                                            aria-controls={val?.currency}
                                                            aria-selected="true"
                                                            onClick={() => setActive(val?.currency)}
                                                        >
                                                            {val?.currency}
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
                <Modal cryptoData={data} />
                <AddListCoin getCrypto={getCrypto} contDetail={contDetail}/>
                <LIstCoinInfo contractDetail={contractDetail} contractError={contractError} />
        </>
    )
}
export default ListedCoin;