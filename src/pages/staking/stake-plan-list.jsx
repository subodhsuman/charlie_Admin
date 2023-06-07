import React, { useState, useEffect } from "react";
import Sidebar from "../../layout/Sidebar";
import Table from "../../components/staking/staking-plan-list/Table";
import Heading from "../../components/Utils/Heading";
import ApiClass from "../../Api/api";
import SwalClass from "../../common/swal";
import { generatePDF, generateExcel } from "../../common/Export";
import UserStakeList from "./user-stake-list";

const StakePlanList = ({ ActivePage }) => {
    //states
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState('');
    const [title, setTitle] = useState('');
    const [stake_currency_, setStake_currency_] = useState('');
    const [reward_currency_, setReward_currency_] = useState('');
    const [loader, setLoader] = useState(true);
    const [total, setTotal] = useState('');
    const [plan_type, setplan_type] = useState('');
    const [plan_status, setplan_status] = useState('');

    
    //Staking Plan List get
    const getStakingPlanList = async () => {
        let response = await ApiClass.getNodeRequest(`staking/get?all=true&page=${page}&title=${title}&search=${stake_currency_}&plan_type=${plan_type}&plan_status=${plan_status}`, true);
        setLoader(false);

        if (!response.data.hasOwnProperty('status_code')) {
            SwalClass.success("Unable to fetch data at this time.");
            return;
        }

        if (response?.data?.status_code == 0) {
            return
        }

        if (response?.data?.status_code == 1) {
            setData(response?.data?.data?.data || []);
            let sr = 1;
            response?.data?.data?.data.map((e) => {
                e.sr_no = sr;
                sr++
            })
            setTotal(response?.data?.data?.total || 1);
            setPagination({
                page: response?.data?.data?.current_page || 1,
                last_page: response?.data?.data?.last_page || 1,

            })
        }
    }

    useEffect(() => {
        setLoader(true)
        getStakingPlanList();
    }, [page,plan_type,plan_status]);

    const handlePageClick = (e) => {
        setPage(e.selected + 1)
    }

    const searchBy = (e) => {
        e.preventDefault();
        setLoader(true);
        getStakingPlanList();
    }

    return (
        <>
            <section className="dashboard-sec">
                <div className="container-fluid">
                    <div className="mb-3 d-flex align-items-center justify-content-between align-items-center">
                        <Heading
                            text="stake plan list"
                            image="stake.webp"
                        />
                        <div className="d-flex gap-2 mb-3">
                            <div>
                                {/* <label htmlFor="">Choose plan type</label> */}
                                <form action="" className="status-form">
                                    <select className="form-select" aria-label=".form-select-lg" onChange={(e) => setplan_type(e.target.value)} >
                                        <option value="">Choose Plan type</option>
                                        <option value="fixed">Fixed</option>
                                        <option value="flexible">Flexible</option>
                                    </select>
                                </form>
                            </div>

                        </div>
                        <div className="d-flex gap-2 mb-3">
                            <div>
                                {/* <label htmlFor="">Choose plan type</label> */}
                                <form action="" className="status-form">
                                    <select className="form-select" aria-label=".form-select-lg" onChange={(e) => setplan_status(e.target.value)} >
                                        <option value="">Choose Plan Status</option>
                                        <option value="running">Active</option>
                                        <option value="upcoming">In-Active</option>
                                        <option value="expired">Expired</option>


                                    </select>
                                </form>
                            </div>

                        </div>

                        <div className="search-group mb-3">
                            <div className="input-group border">
                                <form onSubmit={searchBy}>
                                    <input type="text" className="form-control border-0" placeholder="Search Currency" aria-label="Search" aria-describedby=""
                                        onChange={(e) => setStake_currency_(e.target.value)}
                                    />
                                </form>
                                <span className="input-group-text border-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="19" width="19" viewBox="0 0 48 48" fill="var(--gray)"><path d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z" /></svg>
                                </span>
                            </div>

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12 px-5">
                            <Table
                                data={data}
                                pagination={pagination}
                                handlePageClick={handlePageClick}
                                getStakingPlanList={getStakingPlanList}
                                setTitle={setTitle}
                                setStake_currency_={setStake_currency_}
                                setReward_currency_={setReward_currency_}
                                setLoader={setLoader}
                                loader={loader}
                                ActivePage={ActivePage}
                            />
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
export default StakePlanList;