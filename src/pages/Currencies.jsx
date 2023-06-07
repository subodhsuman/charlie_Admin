import React, { useEffect } from "react";
import Sidebar from '../layout/Sidebar';
import Heading from '../components/Utils/Heading';
import ApiClass from "../Api/api";
import { useState } from "react";
import * as Yup from 'yup';
import { useFormik } from "formik";
import SwalClass from "../common/swal";
const Currencies = () => {

    const fiat_currency = "INR";

    const [currency, setCurrency] = useState();
    const [CTokenType, setCTokenType] = useState('');
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('')

    const getCurrencies = async () => {
        const response = await ApiClass.getRequest(`currency/w_2_w_get`);
        if(!response.data.hasOwnProperty("status_code")){
            SwalClass.failed("Unable to fetch currencies at this time.")
            return
        }
        if(response?.data?.status_code == 0){
            return
        }
        if(response?.data?.status_code == 1){
            setCurrency(response?.data?.data || []);
            return;
        }
    }

    // SEARCH --------
    const searchList = () => {
        if (search != "") {
            return currency.filter((val) => {
                return val.symbol.toLowerCase().includes(search.toLowerCase());
            });
        } else {
            return currency;
        }
    };

    useEffect(() => {
        searchList();
    }, [search]);

    useEffect(() => {
        getCurrencies(search);
    }, [])

    function clickModal(v) {
        const { deposit_enable, deposit_desc, withdraw_enable, withdraw_desc, withdraw_min, withdraw_max, address, withdraw_commission, type, deposit_commission, deposit_min, deposit_type, token_type } = v;

        setCTokenType(token_type)


        setFieldValue("target_id", v.id);
        setFieldValue("deposit_enable", deposit_enable);
        setFieldValue("withdraw_enable", withdraw_enable);
        setFieldValue("deposit_desc", deposit_desc);
        setFieldValue("withdraw_desc", withdraw_desc);
        setFieldValue("withdraw_min", withdraw_min);
        setFieldValue("withdraw_max", withdraw_max);
        setFieldValue("address", address);
        setFieldValue("type", type);
        setFieldValue("withdraw_commission", withdraw_commission);
        setFieldValue("deposit_min", deposit_min);

        if(token_type == fiat_currency){
            setFieldValue("deposit_type", deposit_type);
            setFieldValue("deposit_commission", deposit_commission);
        }else{
            setFieldValue("deposit_type", "");
            setFieldValue("deposit_commission", "0.01");
        }

    }
    const { values, handleSubmit, handleChange, errors, touched, resetForm, setFieldValue } = useFormik({
        initialValues: {
            target_id: "",
            deposit_desc: '',
            withdraw_enable: '',
            active_status_enable:'',
            withdraw_desc: '',
            withdraw_min: '',
            withdraw_max: '',
            address: '',
            type: '',
            withdraw_commission: '',
            deposit_commission: '',
            deposit_min: '',
            deposit_type: ''
        },
        validationSchema: Yup.object({
            deposit_enable: Yup.string().required('This field is required.'),
            deposit_desc: Yup.string().required('This field is required.'),
            withdraw_enable: Yup.string().required('This field is required.'),
            withdraw_desc: Yup.string().required('This field is required.'),
            withdraw_min: Yup.string().required('This field is required.'),
            withdraw_max: Yup.string().required('This field is required.'),
            address: Yup.string().required('This field is required.'),
            type: Yup.string().required('This field is required.'),
            withdraw_commission: Yup.string().required('This field is required.'),

            deposit_min: Yup.string().required('This field is required.'),

            deposit_commission: Yup.string().when("deposit_min", {
                is: (value) => (value == "0" && CTokenType == fiat_currency) ,
                then: Yup.string()
                    .required("This field is required.")
            }),
            deposit_type: Yup.string().when("deposit_min", {
                is: (value) => (value == "0" && CTokenType == fiat_currency) ,
                then: Yup.string()
                    .required("This field is required.")
            }),

            // deposit_commission: Yup.string().required('This field is required.'),
            // deposit_type: Yup.string().required('This field is required.'),
        }),
        onSubmit: async (values) => {

            values.deposit_enable = JSON.parse(values.deposit_enable) ? 1 : 0;
            values.withdraw_enable = JSON.parse(values.withdraw_enable) ? 1 : 0;

            setLoading(true)
            let response = await ApiClass.updateRequest(`currency/w_2_w_update`, true, values);
            setLoading(false)
            if (response?.data?.status_code == 0 || response?.data?.status == 0) {
                SwalClass.failed(response?.data?.message)
                return
            }
            if (response?.data?.status_code == 1) {
                SwalClass.success(response?.data?.message || '');
                document.getElementById("currencyArc").click()
                getCurrencies()

                return
            }
        }
    })
    const updateStatus = async (value, column) => {
        let status
        if (column == "deposit_enable") {
            status = value.deposit_enable ? 0 : 1
        }
        if (column == "withdraw_enable") {
            status = value.withdraw_enable ? 0 : 1
        }
        if (column == "active_status_enable") {
            status = value.active_status_enable ? 0 : 1
        }
        let body =
        {
            "status": status,
            "id": value.id,
            "column": column
        }

        let response = await ApiClass.updateRequest("currency/update_status", true, body);
        if (response?.data?.status_code == 0 || response?.data?.status == 0) {
            SwalClass.failed(response?.data?.message)
            return
        }
        if (response?.data?.status_code == 1) {
            SwalClass.success(response?.data?.message || '');
            getCurrencies()

            return
        }
    }
    const checkStatusWithdraw = (status) => {
        let result1 = {
            "InActive": "bg-danger",
            "Active": "bg-success"
        }
        return result1[status];
    };
    const checkStatusDeposit = (status) => {
        let result2 = {
            "InActive": "bg-danger",
            "Active": "bg-success"
        }
        return result2[status];
    };
    return (
        <>
            
                <section className="dashboard-sec">
                    <div className="container-fluid">
                        <div className="mb-3 d-flex align-items-center justify-content-between">
                            <Heading
                                text="currencies"
                                image=""
                            />
                            <div className="search-group">
                                <div className="input-group border">
                                    <input type="text" className="form-control border-0" placeholder="Search Currency" aria-label="Search" aria-describedby=""
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <span className="input-group-text border-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="19" width="19" viewBox="0 0 48 48" fill="var(--gray)"><path d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z" /></svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="accordion currency-accordion" id="accordionA">
                                    {searchList()?.map((value, i) => {
                                        return (
                                            <div className="accordion-item mb-2" key={i}>

                                                <div>
                                                    <h2 className="accordion-header" id={`"heading2"+${i}`}>
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseCurr2" + i} aria-expanded="false" aria-controls={"collapseCurr2" + i}>
                                                            <div className="w-100">
                                                                <div className="row">
                                                                    <div className="col-md-3">
                                                                        <h6 className="mb-2 mb-md-0">{value?.symbol}</h6>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="form-check form-switch d-md-flex justify-content-center gap-3 mb-2 mb-md-0"
                                                                        >
                                                                            <input className="form-check-input" type="checkbox" checked={value?.active_status_enable} onChange={()=>{}} role="switch" onClick={() => updateStatus(value, "active_status_enable")} />
                                                                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Active Coin</label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="form-check form-switch d-md-flex justify-content-center gap-3 mb-2 mb-md-0"
                                                                        >
                                                                            <input className="form-check-input" type="checkbox" checked={value?.withdraw_enable} onChange={()=>{}} role="switch" onClick={() => updateStatus(value, "withdraw_enable")} />
                                                                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Withdraw Enable</label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="form-check form-switch me-2 d-md-flex justify-content-end gap-3 "
                                                                        >
                                                                            <input className="form-check-input" type="checkbox" checked={value?.deposit_enable} role="switch" onChange={()=>{}}  onClick={() => updateStatus(value, "deposit_enable")} />
                                                                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Deposit Enable</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </button>
                                                    </h2>
                                                    <div id={"collapseCurr2" + i} className="accordion-collapse collapse " aria-labelledby={`"heading2"+${i}`} data-bs-parent="#accordionA">
                                                        <div className="accordion-body ">
                                                            <div className="admin-table table-responsive">
                                                                <table className="table align-middle table-bordered w-100" id="table-container">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>
                                                                                Token Type
                                                                            </th>
                                                                            <th>
                                                                                Withdraw Commission Type
                                                                            </th>
                                                                            <th>
                                                                                Withdraw Min
                                                                            </th>
                                                                            <th>
                                                                                Withdraw Max
                                                                            </th>
                                                                            <th>
                                                                                Withdraw Commission
                                                                            </th>
                                                                            <th>
                                                                                Withdraw Enable
                                                                            </th>
                                                                            <th>
                                                                                Deposit Enable
                                                                            </th>
                                                                            <th>
                                                                                Network
                                                                            </th>
                                                                            <th>
                                                                                Currency Symbol
                                                                            </th>
                                                                            <th>
                                                                                Deposit Detail
                                                                            </th>
                                                                            <th>
                                                                                Action
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {value?.currency_networks?.map((val, index) => {
                                                                            // console.log({val});
                                                                            return (
                                                                                <tr key={index}>
                                                                                    <td>
                                                                                        {val?.token_type}
                                                                                    </td>
                                                                                    <td>
                                                                                        {val?.type}
                                                                                    </td>
                                                                                    <td>
                                                                                        {val?.withdraw_min}
                                                                                    </td>
                                                                                    <td>
                                                                                        {val?.withdraw_max}
                                                                                    </td>
                                                                                    <td>
                                                                                        {val?.withdraw_commission}
                                                                                    </td>
                                                                                    <td>
                                                                                        <span className={`badge ${checkStatusWithdraw(val?.withdraw_enable == true ? "Active" : "InActive")}`}>
                                                                                            {val?.withdraw_enable == true ? "Active" : "InActive"}
                                                                                        </span>
                                                                                    </td>
                                                                                    <td>
                                                                                        <span className={`badge ${checkStatusDeposit(val?.deposit_enable == true ? "Active" : "InActive")}`}>
                                                                                            {val?.deposit_enable == true ? "Active" : "InActive"}
                                                                                        </span>
                                                                                    </td>
                                                                                    <td>
                                                                                        {val?.block_network?.network_name}
                                                                                    </td>
                                                                                    <td>
                                                                                        {val?.block_network?.currency_symbol}
                                                                                    </td>
                                                                                    {
                                                                                        val?.token_type == fiat_currency
                                                                                        ?
                                                                                        <td style={{whiteSpace:'normal'}}>
                                                                                            <span style={{wordBreak:'break-all'}}>
                                                                                                Minimum Deposit - {val?.deposit_min} <br/>
                                                                                                Commission - {val?.deposit_commission} <br/>
                                                                                                Commission Type - {val?.deposit_type} <br/>
                                                                                            </span>
                                                                                        </td>
                                                                                        :
                                                                                        <td style={{whiteSpace:'normal'}}>
                                                                                            <span style={{wordBreak:'break-all'}}>
                                                                                                Minimum Deposit - {val?.deposit_min} <br/>
                                                                                            </span>
                                                                                        </td>
                                                                                    }
                                                                                   
                                                                                    <td className="text-primary" data-bs-toggle="modal" data-bs-target="#currencyVerifyModal" style={{ cursor: "pointer" }} onClick={() => clickModal(val)}>
                                                                                        Edit
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        })}

                                                                    </tbody>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td colSpan={10} className="text-center" style={{ color: 'var(--white)' }}>
                                                                                No Data Found.
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)
                                    })}
                                    {searchList()?.length == 0 && <p className="text-center">No Record Found</p>}

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*  ---------- currency edit modal -------     */}
                <div className="modal fade common-modal" id="currencyVerifyModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-uppercase d-flex align-items-center" id="exampleModalLabel">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M34.55 34.5q1.3 0 2.2-.95.9-.95.9-2.25t-.9-2.2q-.9-.9-2.2-.9-1.3 0-2.25.9t-.95 2.2q0 1.3.95 2.25t2.25.95Zm-.05 6.25q1.65 0 3-.7t2.3-2q-1.3-.7-2.6-1.05-1.3-.35-2.7-.35-1.4 0-2.725.35-1.325.35-2.575 1.05.95 1.3 2.275 2t3.025.7ZM24 44q-6.9-1.6-11.45-7.825Q8 29.95 8 21.9V9.95l16-6 16 6v13.5q-.7-.35-1.5-.625T37 22.45v-10.4l-13-4.8-13 4.8v9.85q0 3.8 1.225 7t3.125 5.625q1.9 2.425 4.2 4.025 2.3 1.6 4.45 2.3.3.6.9 1.35.6.75 1 1.15-.45.25-.95.375-.5.125-.95.275Zm10.65 0q-3.9 0-6.65-2.775-2.75-2.775-2.75-6.575 0-3.9 2.75-6.675t6.65-2.775q3.85 0 6.625 2.775t2.775 6.675q0 3.8-2.775 6.575Q38.5 44 34.65 44ZM24 24.05Z" /></svg>
                                    &nbsp;Edit Currency</h5>
                                <button type="button" className="btn p-0 border-0" data-bs-dismiss="modal" aria-label="Close" id="currencyArc">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                                </button>
                            </div>
                            <div className="modal-body admin-form">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="staticName" className="col-form-label">Deposit</label>
                                                <select className="form-select shadow-none" name="deposit_enable" id="deposit_enable"
                                                    value={values.deposit_enable}
                                                    onChange={handleChange}>
                                                    <option value={true}>Active</option>
                                                    <option value={false}>InActive</option>
                                                </select>
                                                {errors.deposit_enable && touched.deposit_enable && (<span className="text-danger form_err">{errors.deposit_enable}</span>)}
                                            </div>

                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="staticName" className="col-form-label">Deposit Description</label>
                                                <textarea className="form-control" type="textArea" placeholder="Deposit Description" name="deposit_desc"
                                                    value={values.deposit_desc || ''}
                                                    onChange={handleChange} />
                                                {errors.deposit_desc && touched.deposit_desc && (<span className="text-danger form_err">{errors.deposit_desc}</span>)}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="staticName" className="col-form-label">Withdraw</label>
                                                <select className="form-select shadow-none" name="withdraw_enable"
                                                    value={values.withdraw_enable}
                                                    onChange={handleChange}>
                                                    <option value={true}>Active</option>
                                                    <option value={false}>InActive</option>
                                                </select>
                                                {errors.withdraw_enable && touched.withdraw_enable && (<span className="text-danger form_err">{errors.withdraw_enable}</span>)}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="staticName" className="col-form-label">Withdraw Description</label>
                                                <textarea className="form-control" type="textarea" placeholder="Wallet Maintenance, Withdrawal Suspended" name="withdraw_desc"
                                                    value={values.withdraw_desc || ''}
                                                    onChange={handleChange} />
                                                {errors.withdraw_desc && touched.withdraw_desc && (<span className="text-danger form_err">{errors.withdraw_desc}</span>)}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="staticName" className="col-form-label">Withdraw Min</label>
                                                <input className="form-control" type="text"
                                                    value={values.withdraw_min}
                                                    onChange={handleChange}
                                                    placeholder="Min" name="withdraw_min" />
                                                {errors.withdraw_min && touched.withdraw_min && (<span className="text-danger form_err">{errors.withdraw_min}</span>)}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="staticName" className="col-form-label">Withdraw Max</label>
                                                <input className="form-control" type="text" placeholder="Max" name="withdraw_max"
                                                    value={values.withdraw_max}
                                                    onChange={handleChange}
                                                />
                                                {errors.withdraw_max && touched.withdraw_max && (<span className="text-danger form_err">{errors.withdraw_max}</span>)}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="staticName" className="col-form-label">Contract Address</label>
                                                <input className="form-control" type="text" placeholder="Contract Address" name="address"
                                                    value={values.address || ''}
                                                    onChange={handleChange} />
                                                {errors.address && touched.address && (<span className="text-danger form_err">{errors.address}</span>)}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="selectbuy" className="form-label">Withdraw commission</label>
                                                    <div className="input-group">
                                                        <select className="form-select shadow-none" name="type"
                                                            value={values.type}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="percentage">Percentage</option>
                                                            <option value="flat">Flat</option>
                                                        </select>
                                                        <input type="text" className="form-control" id="withdraw_commission" placeholder="Commission" aria-describedby="buycomm"
                                                            value={values.withdraw_commission}
                                                            onChange={handleChange}
                                                        />
                                                        {values.type == "percentage" && <span className="input-group-text" id="buycomm" style={{color:'var(--white)'}}>%</span>}
                                                    </div>
                                                    {errors.withdraw_commission && touched.withdraw_commission && (<span className="text-danger form_err">{errors.withdraw_commission}</span>)}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Deposit min and deposit commission */}

                                        {/* deposit_commission deposit_type */}
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="staticName" className="col-form-label">Deposit Min</label>
                                                <input className="form-control" type="text"
                                                    value={values.deposit_min}
                                                    onChange={handleChange}
                                                    placeholder="Min" name="deposit_min" />
                                                {errors.deposit_min && touched.deposit_min && (<span className="text-danger form_err">{errors.deposit_min}</span>)}
                                            </div>
                                        </div>
                                    {
                                        CTokenType == fiat_currency ?
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="selectbuy" className="form-label">Deposit commission</label>
                                                    <div className="input-group">
                                                        <select className="form-select shadow-none" name="deposit_type"
                                                            value={values.deposit_type}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="percentage">Percentage</option>
                                                            <option value="flat">Flat</option>
                                                        </select>
                                                        <input type="text" className="form-control" id="deposit_commission" placeholder="Commission" aria-describedby="buycomm1"
                                                            value={values.deposit_commission}
                                                            onChange={handleChange}
                                                        />
                                                        {values.deposit_type == "percentage" && <span className="input-group-text" id="buycomm1" style={{color:'var(--white)'}}>%</span>}
                                                    </div>
                                                    {errors.deposit_commission && touched.deposit_commission && (<span className="text-danger form_err">{errors.deposit_commission}</span>)}
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        ""
                                    }
                                     


                                        <div className="col-md-12 mt-5">
                                            <div className="export-btn text-center">
                                                {loading ?
                                                    <button className="btn" type="button" disabled>
                                                        <div className="d-flex align-items-center gap-2">
                                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                            Loading...
                                                        </div>
                                                    </button>
                                                    :
                                                    <input type="submit" className="btn" value="Submit" />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            
        </>
    )
}
export default Currencies;