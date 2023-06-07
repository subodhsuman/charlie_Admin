// import React, { useState } from 'react'
// import Date from '../../../common/Date';
// import { useFormik } from "formik";
// import * as Yup from 'yup';
// import ApiClass from '../../../Api/api';
// import SwalClass from '../../../common/swal';

// const StakePlanModal = ({ detail, getStakingPlanList }) => {
//     const { id, title, stake_currency, description, reward_currency, maturity_days, plan_type, min_stake_amount, max_stake_amount, plan_expiry_days, per_user_limit, roi_percentage, roi_interval, pool_limit, plan_expiry_date, plan_start_date } = detail.v;

//     const [loading, setLoading] = useState(false);
//     const formik = useFormik({
//         initialValues: {
//             plan_status: ''
//         },
//         validationSchema: Yup.object({
//             plan_status: Yup.string().required('Status is required.')
//         }),
//         onSubmit: async (values) => {
//             values.plan_id = id;

//             setLoading(true)
//             let response = await ApiClass.putNodeRequest(`staking/activation`, true, values);

//             setLoading(false)
//             if (!response?.data.hasOwnProperty("status_code")) {
//                 SwalClass.failed('Unable to update at this time.')
//                 return
//             }
//             if (response?.data?.status_code == 0) {
//                 SwalClass.failed(response?.data?.message || '')
//                 resetForm()
//                 return
//             }
//             if (response?.data?.status_code == 1) {
//                 SwalClass.success(response?.data?.message || '');
//                 resetForm()
//                 document.getElementById('verifyBankCloseForm').click();
//                 getStakingPlanList();
//                 return
//             }
//         }
//     })
//     const { values, handleSubmit, handleChange, errors, touched, resetForm, setFieldValue } = formik;

//     return (
//         <div className="modal fade common-modal" id="stakePlanModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
//             <div className="modal-dialog modal-lg modal-dialog-centered">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h5 className="modal-title text-uppercase d-flex align-items-center" id="exampleModalLabel">
//                             <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M34.55 34.5q1.3 0 2.2-.95.9-.95.9-2.25t-.9-2.2q-.9-.9-2.2-.9-1.3 0-2.25.9t-.95 2.2q0 1.3.95 2.25t2.25.95Zm-.05 6.25q1.65 0 3-.7t2.3-2q-1.3-.7-2.6-1.05-1.3-.35-2.7-.35-1.4 0-2.725.35-1.325.35-2.575 1.05.95 1.3 2.275 2t3.025.7ZM24 44q-6.9-1.6-11.45-7.825Q8 29.95 8 21.9V9.95l16-6 16 6v13.5q-.7-.35-1.5-.625T37 22.45v-10.4l-13-4.8-13 4.8v9.85q0 3.8 1.225 7t3.125 5.625q1.9 2.425 4.2 4.025 2.3 1.6 4.45 2.3.3.6.9 1.35.6.75 1 1.15-.45.25-.95.375-.5.125-.95.275Zm10.65 0q-3.9 0-6.65-2.775-2.75-2.775-2.75-6.575 0-3.9 2.75-6.675t6.65-2.775q3.85 0 6.625 2.775t2.775 6.675q0 3.8-2.775 6.575Q38.5 44 34.65 44ZM24 24.05Z" /></svg>
//                             &nbsp;View Full Plan {stake_currency} - {reward_currency} - {plan_type} </h5>
//                         <button type="button" className="btn p-0 border-0" data-bs-dismiss="modal" aria-label="Close" id="verifyBankCloseForm" onClick={() => resetForm()}>
//                             <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
//                         </button>
//                     </div>
//                     <div className="modal-body admin-form">
//                         <form onSubmit={handleSubmit}>
//                             <div className="row">
//                                 <div className="col-md-4">
//                                     <div className="mb-3">
//                                         <label htmlFor="staticName" className="col-form-label">Title</label>
//                                         <input className="form-control" type="text" placeholder="" name="title" value={title || ''} readOnly />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4">
//                                     <div className="mb-3">
//                                         <label htmlFor="staticName" className="col-form-label">Description</label>
//                                         <input className="form-control" type="text" placeholder="" name="description" value={description || ''} readOnly />
//                                     </div>
//                                 </div>
//                                 {/* <div className="col-md-4">
//                                     <div className="mb-3">
//                                         <label htmlFor="staticName" className="col-form-label">Stake Currency</label>
//                                         <input className="form-control" type="text" placeholder="" name="stake_currency" value={stake_currency || ''} readOnly />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4">
//                                     <div className="mb-3">
//                                         <label htmlFor="staticName" className="col-form-label">Reward Currency</label>
//                                         <input className="form-control" type="text" placeholder="" name="reward_currency" value={reward_currency || ''} readOnly />
//                                     </div>
//                                 </div> */}
//                                 <div className="col-md-4">
//                                     <div className="mb-3">
//                                         <label htmlFor="staticName" className="col-form-label">Maturity Days</label>
//                                         <input className="form-control" type="text" placeholder="" name="maturity_days" value={maturity_days || ''} readOnly />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4">
//                                     <div className="mb-3">
//                                         <label htmlFor="staticName" className="col-form-label">Plan Type</label>
//                                         <input className="form-control" type="text" placeholder="" name="plan_type" value={plan_type || ''} readOnly />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4">
//                                     <div className="mb-3">
//                                         <label htmlFor="staticName" className="col-form-label">Max Stake Amount</label>
//                                         <input className="form-control" type="text" placeholder="" name="max_stake_amount" value={max_stake_amount || ''} readOnly />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4">
//                                     <div className="mb-3">
//                                         <label htmlFor="staticName" className="col-form-label">Min Stake Amount</label>
//                                         <input className="form-control" type="text" placeholder="" name="min_stake_amount" value={min_stake_amount || ''} readOnly />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4">
//                                     <div className="mb-3">
//                                         <label htmlFor="staticName" className="col-form-label">Plan Expiry Date</label>
//                                         <input className="form-control" type="text" placeholder="" name="plan_expiry_date" value={Date.now(plan_expiry_date) || ''} readOnly />
//                                     </div>
//                                 </div>
//                                 {/* <div className="col-md-4">
//                                     <div className="mb-3">
//                                         <label htmlFor="staticName" className="col-form-label">Plan Expiry Days</label>
//                                         <input className="form-control" type="text" placeholder="" name="plan_expiry_days" value={plan_expiry_days || ''} readOnly />
//                                     </div>
//                                 </div> */}
//                                 <div className="col-md-4">
//                                     <div className="mb-3">
//                                         <label htmlFor="staticName" className="col-form-label">Plan Start Date</label>
//                                         <input className="form-control" type="text" placeholder="" name="plan_start_date" value={Date.now(plan_start_date) || ''} readOnly />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4">
//                                     <div className="mb-3">
//                                         <label htmlFor="staticName" className="col-form-label">Pool Limit</label>
//                                         <input className="form-control" type="text" placeholder="" name="pool_limit" value={pool_limit || ''} readOnly />
//                                     </div>
//                                 </div>
//                                 {/* <div className="col-md-4">
//                                     <div className="mb-3">
//                                         <label htmlFor="staticName" className="col-form-label">ROI Interval</label>
//                                         <input className="form-control" type="text" placeholder="" name="roi_interval" value={roi_interval || ''} readOnly />
//                                     </div>
//                                 </div> */}
//                                 <div className="col-md-4">
//                                     <div className="mb-3">
//                                         <label htmlFor="staticName" className="col-form-label">ROI Percentage</label>
//                                         <input className="form-control" type="text" placeholder="" name="roi_percentage" value={roi_percentage || ''} readOnly />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4">
//                                     <div className="mb-3">
//                                         <label htmlFor="staticName" className="col-form-label">Per User Limit</label>
//                                         <input className="form-control" type="text" placeholder="" name="per_user_limit" value={per_user_limit || '-'} readOnly />
//                                     </div>
//                                 </div>
//                                 {detail?.type == "edit" && <>
//                                     <hr></hr>

//                                     <div className="mb-3">
//                                         <h5 className="col-form-label">ACTIVATE PLAN</h5>
//                                         <label htmlFor="staticName" className="col-form-label">Plan Status</label>
//                                         <select className="form-select" placeholder='choose..' aria-label=".form-select-lg" name="plan_status" value={values.plan_status} onChange={handleChange}>
//                                             <option value="">Choose..</option>
//                                             <option value="1">On</option>
//                                             <option value="0">Off</option>
//                                         </select>
//                                         {errors.plan_status && touched.plan_status && (<span className="text-danger form_err">{errors.plan_status}</span>)}
//                                     </div>

//                                     <div className="col-md-12">
//                                         <div className=" col-md-12 mt-5 export-btn text-center">
//                                             {loading ?
//                                                 <button className="btn" type="button" disabled>
//                                                     <div className="d-flex align-items-center gap-2">
//                                                         <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
//                                                         Loading...
//                                                     </div>
//                                                 </button>
//                                                 :
//                                                 <input type="submit" className="btn" value="Submit" />
//                                             }
//                                         </div>
//                                     </div>
//                                 </>}
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default StakePlanModal
