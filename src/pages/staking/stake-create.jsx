import React, { useState, useEffect } from "react";
import Sidebar from "../../layout/Sidebar";
import Heading from "../../components/Utils/Heading";
import ApiClass from "../../Api/api";
import SwalClass from "../../common/swal";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { onHandleKeyDown, onHandleKeyPress, onHandleKeyUp, onHandlePaste } from "../../common/InputText.js";

const StakeCreate = () => {
    const [loading, setLoading] = useState(false)
    const [stake__Currency, setStake__Currency] = useState([])
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            maturity_days: '',
            max_stake_amount: '',
            min_stake_amount: '',
            plan_start_date: '',
            plan_type: '',
            pool_limit: '',
            reward_currency: '',
            roi_percentage: '',
            stake_currency: '',
            per_user_limit: '',
            plan_expiry_date: "",
            autostake_enable: '',
        },
        validationSchema: Yup.object({
            stake_currency: Yup.string().required('Stake Currency is required.'),
            reward_currency: Yup.string().required('Reward Currency  is required.'),
            // maturity_days: Yup.string().required('Maturity Days is required.'),
            plan_type: Yup.string().required('Plan Type is required.'),
            pool_limit: Yup.string().required('Pool limit is required.'),
            min_stake_amount: Yup.string().required('Minimum Stake Amount is required.'),
            max_stake_amount: Yup.string().required('Maximum Stake Amount is required.'),
            roi_percentage: Yup.string().required('Roi Percentage is required.'),
            per_user_limit: Yup.string().required('Per User Limit is required Per User Limit should be greater than max stake amount Per User Limit should be less than pool limit'),
            plan_start_date: Yup.date().required('Plan Start date is required.'),
            plan_expiry_date: Yup.date().required('Plan Expiry date is required.'),
        }),
        onSubmit: async (values) => {
            values.autostake_enable = values.autostake_enable ? 1 : 0;
            if(values.plan_type=="flexible"){
            values.maturity_days=-1
            }
            console.log(values);
            setLoading(true)
            let response = await ApiClass.postNodeRequest(`staking/create`, true, values);
            setLoading(false)
            if (!response?.data.hasOwnProperty("status_code")) {
                SwalClass.failed("Unable to Create at this time.")
                return
            }

            if (response?.data?.status_code == 0) {
                SwalClass.failed(response?.data?.message || '')
                resetForm()
                return
            }
            if (response?.data?.status_code == 1) {
                SwalClass.success(response?.data?.message || '');
                resetForm()
                getBank();
                return
            }
        }
    })
    const { values, handleSubmit, handleChange, errors, touched, resetForm } = formik;

    const getList = async () => {
        let response = await ApiClass.getNodeRequest("staking/getcurrencies", true);
        console.log({ response });
        if (response) {
            setStake__Currency(response.data.data || [])
            return
        }
    }

    useEffect(() => {
        getList()
    }, [])

    return (
        <>

            <section className='dashboard-sec'>
                <div className='container-fluid'>
                    <Heading
                        text="stake create"
                        image="stake.webp"
                    />
                    <div className='row'>
                        <div className='col-12'>
                            <form onSubmit={handleSubmit} className="admin-form">
                                <div className="container-fluid rounded" style={{ backgroundColor: 'var(--side-bg)' }}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-sec p-3">
                                                <div className="">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Title :</label>
                                                    <input type="text" name="title" className="form-control" id="exampleFormControlInput1" placeholder="Title"
                                                        value={values.title} onChange={handleChange}
                                                    />
                                                </div>
                                                {errors.title && touched.title && (<span className="text-danger form_err">{errors.title}</span>)}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-sec p-3">
                                                <div className="">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Description :</label>
                                                    <input type="text" name="description" className="form-control" id="exampleFormControlInput1" placeholder="Description "
                                                        value={values.description} onChange={handleChange}
                                                    />
                                                </div>
                                                {errors.description && touched.description && (<span className="text-danger form_err">{errors.description}</span>)}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-sec p-3">
                                                <div className="">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Stake Currency :</label>
                                                    <select className="form-select" placeholder="Choose..." name="stake_currency" aria-label=".form-select-lg" value={values.stake_currency} onChange={handleChange} >
                                                        <option value="">Select Option....</option>
                                                        {stake__Currency.map((data, index) => {
                                                            return (
                                                                <option key={index} value={data.symbol}>{data.symbol}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                                {errors.stake_currency && touched.stake_currency && (<span className="text-danger form_err">{errors.stake_currency}</span>)}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-sec p-3">
                                                <div className="">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Reward Currency :</label>
                                                    <select className="form-select" placeholder="Choose..." name="reward_currency" aria-label=".form-select-lg" value={values.reward_currency} onChange={handleChange} >
                                                        <option value="">Select Option....</option>
                                                        {stake__Currency.map((data, index) => {
                                                            return (
                                                                <option key={index} value={data.symbol}>{data.symbol}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                                {errors.reward_currency && touched.reward_currency && (<span className="text-danger form_err">{errors.reward_currency}</span>)}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-sec p-3">
                                                <div className="">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Plan Type :</label>
                                                    <select className="form-select" placeholder="Choose..." name="plan_type" aria-label=".form-select-lg" value={values.plan_type} onChange={handleChange} >
                                                        <option value="">Choose Plan Type</option>
                                                        <option value="fixed">Fixed</option>
                                                        <option value="flexible">Flexible</option>
                                                    </select>
                                                </div>
                                                {errors.plan_type && touched.plan_type && (<span className="text-danger form_err">{errors.plan_type}</span>)}
                                            </div>
                                        </div>
                                        {(values.plan_type == "fixed") &&
                                            <div className="col-md-6">
                                                <div className="form-sec p-3">
                                                    <div className="">
                                                        <label htmlFor="exampleFormControlInput1" className="form-label">Maturity Days :</label>
                                                        <input className="form-control" type="text" placeholder="Maturity Days" name="maturity_days"
                                                            value={values.maturity_days || ''}
                                                            onChange={handleChange}
                                                            onKeyPress={(e) => onHandleKeyPress(e, 8)}
                                                            onKeyUp={(e) => onHandleKeyUp(e)}
                                                            onKeyDown={(e) => onHandleKeyDown(e)}
                                                            onPaste={(e) => onHandlePaste(e, 8)}
                                                            onDragOver={(e) => e.preventDefault()}
                                                        />
                                                    </div>
                                                    {errors.maturity_days && touched.maturity_days && (<span className="text-danger form_err">{errors.maturity_days}</span>)}
                                                </div>
                                            </div>}
                                        <div className="col-md-6">
                                            <div className="form-sec p-3">
                                                <div className="">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Min Stake Amount :</label>
                                                    <input className="form-control" type="text" placeholder="Min Stake Amount" name="min_stake_amount"
                                                        value={values.min_stake_amount || ''}
                                                        onChange={handleChange}
                                                        onKeyPress={(e) => onHandleKeyPress(e, 8)}
                                                        onKeyUp={(e) => onHandleKeyUp(e)}
                                                        onKeyDown={(e) => onHandleKeyDown(e)}
                                                        onPaste={(e) => onHandlePaste(e, 8)}
                                                        onDragOver={(e) => e.preventDefault()}
                                                    />
                                                </div>
                                                {errors.min_stake_amount && touched.min_stake_amount && (<span className="text-danger form_err">{errors.min_stake_amount}</span>)}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-sec p-3">
                                                <div className="">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Max Stake Amount :</label>
                                                    <input className="form-control" type="text" placeholder="Max Stake Amount" name="max_stake_amount"
                                                        value={values.max_stake_amount || ''}
                                                        onChange={handleChange}
                                                        onKeyPress={(e) => onHandleKeyPress(e, 8)}
                                                        onKeyUp={(e) => onHandleKeyUp(e)}
                                                        onKeyDown={(e) => onHandleKeyDown(e)}
                                                        onPaste={(e) => onHandlePaste(e, 8)}
                                                        onDragOver={(e) => e.preventDefault()}
                                                    />
                                                </div>
                                                {errors.max_stake_amount && touched.max_stake_amount && (<span className="text-danger form_err">{errors.max_stake_amount}</span>)}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-sec p-3">
                                                <div className="">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Plan Date Start :</label>
                                                    <input type="date" className="form-control" name="plan_start_date" id="exampleFormControlInput1" placeholder="Plan Date Start"
                                                        value={values.plan_start_date} onChange={handleChange}
                                                    />
                                                </div>
                                                {errors.plan_start_date && touched.plan_start_date && (<span className="text-danger form_err">{errors.plan_start_date}</span>)}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-sec p-3">
                                                <div className="">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Plan Date plan_expiry_date :</label>
                                                    <input type="date" className="form-control" name="plan_expiry_date" id="exampleFormControlInput1" placeholder="Plan Date Start"
                                                        value={values.plan_expiry_date} onChange={handleChange}
                                                    />
                                                </div>
                                                {errors.plan_expiry_date && touched.plan_expiry_date && (<span className="text-danger form_err">{errors.plan_expiry_date}</span>)}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-sec p-3">
                                                <div className="">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Pool Limit :</label>
                                                    <input className="form-control" type="text" placeholder="Pool Limit" name="pool_limit"
                                                        value={values.pool_limit || ''}
                                                        onChange={handleChange}
                                                        onKeyPress={(e) => onHandleKeyPress(e, 8)}
                                                        onKeyUp={(e) => onHandleKeyUp(e)}
                                                        onKeyDown={(e) => onHandleKeyDown(e)}
                                                        onPaste={(e) => onHandlePaste(e, 8)}
                                                        onDragOver={(e) => e.preventDefault()}
                                                    />
                                                </div>
                                                {errors.pool_limit && touched.pool_limit && (<span className="text-danger form_err">{errors.pool_limit}</span>)}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-sec p-3">
                                                <div className="">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Per User Limit :</label>
                                                    <input className="form-control" type="text" placeholder="Per User Limit" name="per_user_limit"
                                                        value={values.per_user_limit || ''}
                                                        onChange={handleChange}
                                                        onKeyPress={(e) => onHandleKeyPress(e, 8)}
                                                        onKeyUp={(e) => onHandleKeyUp(e)}
                                                        onKeyDown={(e) => onHandleKeyDown(e)}
                                                        onPaste={(e) => onHandlePaste(e, 8)}
                                                        onDragOver={(e) => e.preventDefault()}
                                                    />
                                                </div>
                                                {errors.per_user_limit && touched.per_user_limit && (<span className="text-danger form_err">{errors.per_user_limit}</span>)}

                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-sec p-3">
                                                <div className="">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">ROI Percentage :</label>
                                                    <input className="form-control" type="text" placeholder="ROI Percentage" name="roi_percentage"
                                                        value={values.roi_percentage || ''}
                                                        onChange={handleChange}
                                                        onKeyPress={(e) => onHandleKeyPress(e, 8)}
                                                        onKeyUp={(e) => onHandleKeyUp(e)}
                                                        onKeyDown={(e) => onHandleKeyDown(e)}
                                                        onPaste={(e) => onHandlePaste(e, 8)}
                                                        onDragOver={(e) => e.preventDefault()}
                                                    />
                                                </div>
                                                {errors.roi_percentage && touched.roi_percentage && (<span className="text-danger form_err">{errors.roi_percentage}</span>)}
                                            </div>
                                        </div>
                                        {(values.plan_type == "fixed") &&

                                            <div className="col-md-6">
                                                <div className="form-sec p-3">
                                                    <div className="">
                                                        <label htmlFor="exampleFormControlInput1" className="form-label">Autostake Enable :</label>
                                                        <input className="form-check-input " type="checkbox" name="autostake_enable" onChange={handleChange}
                                                            value={values.autostake_enable} />
                                                    </div>
                                                </div>
                                            </div>}



                                        <div className="export-btn text-center mb-3">
                                            {loading ?
                                                <button className="btn" type="button" disabled>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        Loading...
                                                    </div>
                                                </button>
                                                :
                                                <button className="btn" type="submit">Submit</button>}
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                        <div >
                        </div>

                    </div>
                </div>
            </section>

        </>
    )
}
export default StakeCreate;