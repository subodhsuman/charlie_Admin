import React, { useState } from "react";
import Dates from "../../../common/Date";
import Pagination from "../../Utils/Pagination";
import PlanDeleteModal from "./PlanDeleteModal";
import StakePlanModal from "./StakePlanModal";
import { setStakeId } from "../../../../Redux/userReducer";
import { useDispatch } from "react-redux";
import ApiClass from "../../../Api/api";
import SwalClass from "../../../common/swal";

const Table = ({  ActivePage, data, pagination, handlePageClick, getStakingPlanList, setLoader, loader }) => {
    const [detail, setDetail] = useState({});
    const [type, setType] = useState();
    const dispatch = useDispatch()
    function clickModal(v) {
        setDetail(v)
    }
    
    const updateStakeStatus = async (id, val) => {
        val = val == 0 ? 1 : 0;
        let response = await ApiClass.putNodeRequest("staking/activation", true,{ plan_id: id, plan_status: val });

        if (!response.data.hasOwnProperty('status_code')) {
            SwalClass.success("Unable to fetch data at this time.");
            return;
        }
        if (response?.data?.status_code == "0") {
            SwalClass.failed(response.data.message)
            return
        }

        if (response?.data?.status_code == 1) {
            SwalClass.success(response.data.message)
            getStakingPlanList()
        }
    }
    const AutoStakeStatus = async (id, val) => {
        val = val == 0 ? 1 : 0;
        let response = await ApiClass.putNodeRequest(`staking/update_auto_stake/${id}/${val}`, true);

        if (!response.data.hasOwnProperty('status_code')) {
            SwalClass.success("Unable to fetch data at this time.");
            return;
        }
        if (response?.data?.status_code == "0") {
            SwalClass.failed(response.data.message)
            return
        }

        if (response?.data?.status_code == 1) {
            SwalClass.success(response.data.message)
            getStakingPlanList()
        }
    }
const DeletePlan=async(id)=>{
    let response = await ApiClass.deleteNodeRequest(`staking/delete_stake_plan/${id}`, true);
    if (!response.data.hasOwnProperty('status_code')) {
        SwalClass.success("Unable to fetch data at this time.");
        return;
    }
    if (response?.data?.status_code == "0") {
        SwalClass.failed(response.data.message)
        return
    }

    if (response?.data?.status_code == 1) {
        SwalClass.success(response.data.message)
        getStakingPlanList()
    }
}

    return (
        <>
            {data?.map((val, i) => {
                return (
                    <div className="accordion currency-accordion" id={`accordionStaking${val.i}`} key={i}>
                        <div className="accordion-item mb-2">
                            <h2 className="accordion-header" id={`sheadingOne${i}`}>
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#stakingOne${i}`} aria-expanded="true" aria-controls="collapseOne">
                                    {val?.stake_currency}-{val?.reward_currency}
                                </button>
                            </h2>
                            {(Object.keys(val.s_data).map((value, index) => {
                                return (
                                    <div id={`stakingOne${i}`} key={index} className="accordion-collapse collapse " aria-labelledby={`sheadingOne${i}`} data-bs-parent={`#accordionStaking${val.i}`}>

                                        <div className="accordion-body ">
                                            <div className="stk-multiple rounded mb-3 p-3" style={{ backgroundColor: 'var(--bg)' }}>
                                                <div className="d-flex justify-content-between mb-3 ">
                                                    <div>
                                                        <p className="mb-0 text-capitalize">
                                                            {value.split("-")[0]} {value.split("-")[1] ? value.split("-")[1] + "Days" : ""}
                                                        </p>
                                                    </div>
                                                    <div className="export-btn">

                                                        <button className="btn">
                                                            {val.s_data[value].activate_status == "1" ? "Active" : val.s_data[value].is_expired == "1" ? "Expired" : "Inactive"}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between mb-3">
                                                    <p className="mb-0">ROI : {val.s_data[value].roi_percentage} %</p>
                                                    {val.s_data[value].is_expired == "0" ? <p className="mb-0"><span className="form-check form-switch">

                                                        <input className="form-check-input" type="checkbox" checked={val.s_data[value].activate_status} role="switch" onChange={() => { }}
                                                            onClick={() => updateStakeStatus(val.s_data[value].id, val.s_data[value].activate_status)}
                                                        /> Activate Status</span></p>
                                                        : ""}


                                                </div>
                                                <div className="d-flex justify-content-between mb-3">
                                                    <p className="mb-0">Created Date</p>
                                                    <p className="mb-0">{Dates.getDate(val.s_data[value].created_at)}</p>
                                                </div>
                                                <div className="d-flex justify-content-between mb-3">
                                                    <p className="mb-0">Start Date</p>
                                                    <p className="mb-0">{new Date(parseFloat(val?.s_data[value]?.plan_start_date)).toISOString().substring(0, 10)}</p>
                                                </div>
                                                <div className="d-flex justify-content-between mb-3">
                                                    <p className="mb-0">Expired Date</p>
                                                    <p className="mb-0">{new Date(parseFloat(val?.s_data[value]?.plan_expiry_date)).toISOString().substring(0, 10)}</p>
                                                </div>
                                                {(val.s_data[value].activate_status && val.s_data[value].plan_type == 'fixed') ?
                                                    <div className="d-flex justify-content-between mb-3">
                                                        <p className="mb-0">Auto Staking</p>
                                                        <p className="mb-0"><span className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" checked={val.s_data[value].autostake_enable} role="switch" 
                                                            onClick={() => AutoStakeStatus(val.s_data[value].id, val.s_data[value].autostake_enable)}
                                                            /></span></p>
                                                    </div> : ""}

                                                <div className="d-flex justify-content-between mb-3">
                                                    <p className="mb-0">Total Limit</p>
                                                    <p className="mb-0">{val.s_data[value].pool_limit}</p>
                                                </div>
                                                <div className="d-flex justify-content-between mb-3">
                                                    <p className="mb-0">Remaining Pool Limit</p>
                                                    <p className="mb-0">{val.s_data[value].remaining_pool_limit}</p>
                                                </div>
                                                <div className="d-flex justify-content-between mb-3">
                                                    <p className="mb-0">Remaining Pool Limit : {((val.s_data[value].remaining_pool_limit) / (val.s_data[value].pool_limit)) * 100} %</p>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <svg onClick={() => { ActivePage('/user-stake-list'), dispatch(setStakeId(val.s_data[value].id)), console.log(true, val.s_data[value]) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="20" height="20" style={{ fill: 'var(--blue)', cursor: 'pointer' }}><path d="M144 160c-44.2 0-80-35.8-80-80S99.8 0 144 0s80 35.8 80 80s-35.8 80-80 80zm368 0c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM416 224c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" /></svg>

                                                        {/* /user-stake-list */}

                                                        <svg data-bs-toggle="modal" data-bs-target="#stakePlanModal" onClick={() => { clickModal(val.s_data[value]), setType("show") }} data-v-d7c80f18="" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style={{ fill: 'rgb(85, 110, 230)', cursor: 'pointer' }}><path data-v-d7c80f18="" d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 11c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"></path><path data-v-d7c80f18="" d="M12 10c-1.084 0-2 .916-2 2s.916 2 2 2 2-.916 2-2-.916-2-2-2z"></path></svg>

                                                        {val.s_data[value].is_new == "1" ? <><svg data-bs-toggle="modal" data-bs-target="#stakePlanModal" onClick={() => { clickModal(val.s_data[value]), setType("edit") }} data-v-d7c80f18="" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style={{ fill: 'rgb(85, 110, 230)', cursor: 'pointer' }}><path data-v-d7c80f18="" d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"></path><path data-v-d7c80f18="" d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"></path></svg>

                                                            <svg 
                                                            onClick={() => DeletePlan(val.s_data[value].id)}
                                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16" style={{ fill: 'var(--red)', cursor: 'pointer' }}><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" /></svg>
                                                        </> : ""}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }))}

                        </div>
                    </div>
                )
            })}
            <Pagination pagination={pagination} handlePageClick={handlePageClick} /> 
            <StakePlanModal detail={detail} type={type} getStakingPlanList={getStakingPlanList} />
            <PlanDeleteModal />
        </>
    )
}
export default Table;