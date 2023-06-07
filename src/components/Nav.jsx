import React, { useState, useEffect } from "react";
import SwalClass from "../common/swal";
import ApiClass from "../Api/api";
import { Link, useNavigate } from "react-router-dom";
import { clearState, setTheme } from "../../Redux/userReducer";
import { clearActive } from "../../Redux/userActivePage"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const Nav = ({ size, ActivePage }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const ClearData = async () => {
        setLoading(true)
        const response = await ApiClass.deleteRequest("logout", true);
        if (response === undefined) {
            setLoading(false)
            SwalClass.error("404 NOT FOUND");
            return;
        }

        if (response?.data?.status_code == 0) {
            setLoading(false)
            SwalClass.error(response?.data?.message);
            return;
        }

        if (response?.data?.status_code == 1) {
            dispatch(clearState());
            setLoading(false)
            document.getElementById('closeModal').click();
            SwalClass.success(response?.data?.message);
            dispatch(clearActive());
            return;
        }
    };

    const { theme } = useSelector((state) => {
        return state.user;
    })
    const themeHandle = (value) => {
        if (value == undefined) {
            value = 1;
        }
        dispatch(setTheme(value))
        let light = document.getElementById("root").classList;
        (theme !== "0") ? light.remove("light") : light.add("light");
    }
    useEffect(() => { themeHandle(theme) }, [theme])
    return (
        <>
            <nav className="navbar-light py-3" style={{ backgroundColor: 'var(--side-bg)' }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex justify-content-end gap-2">

                                {size < 991 ?
                                    <button className="btn p-0 border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z" /></svg>
                                    </button>
                                    : ''}
                                <button type="button" className="btn p-0 border-0 px-0 px-xl-2" onClick={() => themeHandle(theme == "1" ? "0" : "1")}>
                                    {
                                        theme == "1" ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style={{ fill: "white", transform: "", msFilter: "" }} >
                                                <path d="M6.995 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007-2.246-5.007-5.007-5.007S6.995 9.239 6.995 12zM11 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2H2zm17 0h3v2h-3zM5.637 19.778l-1.414-1.414 2.121-2.121 1.414 1.414zM16.242 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.344 7.759 4.223 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z">
                                                </path>
                                            </svg>
                                            :
                                            // <button type="button" className="btn p-0 px-0 px-xl-2" onClick={() => themeHandle("1")} >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style={{ fill: "#000", transform: "", msFilter: "" }}>
                                                <path d="M12 11.807A9.002 9.002 0 0 1 10.049 2a9.942 9.942 0 0 0-5.12 2.735c-3.905 3.905-3.905 10.237 0 14.142 3.906 3.906 10.237 3.905 14.143 0a9.946 9.946 0 0 0 2.735-5.119A9.003 9.003 0 0 1 12 11.807z">
                                                </path>
                                            </svg>



                                        // </button>
                                    }
                                </button>
                                <button type="button" className="btn p-0 border-0" data-bs-toggle="dropdown" aria-expanded="false"

                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M24 23.95q-3.3 0-5.4-2.1-2.1-2.1-2.1-5.4 0-3.3 2.1-5.4 2.1-2.1 5.4-2.1 3.3 0 5.4 2.1 2.1 2.1 2.1 5.4 0 3.3-2.1 5.4-2.1 2.1-5.4 2.1ZM8 40v-4.7q0-1.9.95-3.25T11.4 30q3.35-1.5 6.425-2.25Q20.9 27 24 27q3.1 0 6.15.775 3.05.775 6.4 2.225 1.55.7 2.5 2.05.95 1.35.95 3.25V40Zm3-3h26v-1.7q0-.8-.475-1.525-.475-.725-1.175-1.075-3.2-1.55-5.85-2.125Q26.85 30 24 30t-5.55.575q-2.7.575-5.85 2.125-.7.35-1.15 1.075Q11 34.5 11 35.3Zm13-16.05q1.95 0 3.225-1.275Q28.5 18.4 28.5 16.45q0-1.95-1.275-3.225Q25.95 11.95 24 11.95q-1.95 0-3.225 1.275Q19.5 14.5 19.5 16.45q0 1.95 1.275 3.225Q22.05 20.95 24 20.95Zm0-4.5ZM24 37Z" /></svg>
                                </button>
                                <ul className="dropdown-menu p-0">
                                    <li><div onClick={() => ActivePage("/change-password")} className="dropdown-item rounded" >Change Password</div></li>
                                    <li><a className="dropdown-item rounded" href="#" data-bs-toggle="modal" data-bs-target="#logoutModal">Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* logout modal */}
                <div className="modal fade common-modal" id="logoutModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content logout-modal">
                            <div className="close-btn-box">
                                <button type="button" className="btn shadow-none" id="closeModal" data-bs-dismiss="modal" aria-label="Close" v-html="close_btn"></button>
                            </div>

                            <div className="modal-body text-center">
                                <div className="mb-2" v-html="question_svg"></div>
                                <h5 className="fw-bolder"> Please Confirm...</h5>
                                <p className="">Please Confirm you want to logout ?</p>

                            </div>

                            <div className="row justify-content-center p-3 mb-3">

                                {
                                    loading ?
                                        <div className="col mb-sm-0">
                                            <div className="export-btn">
                                                <button className="btn blue-ex-btn w-100" type="button" disabled>
                                                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                                    Loading...</button>
                                            </div>
                                        </div>
                                        :
                                        <>  <div className="col-6 mb-sm-0">
                                            <div className="export-btn">
                                                <button className="btn blue-ex-btn w-100" type="submit" style={{ fontSize: '14px', fontWeight: "bold" }} onClick={() => ClearData("hardlogout")} >Logout from this device</button>
                                            </div>
                                        </div></>
                                }

                            </div>
                        </div>
                    </div>
                </div>

            </nav>
        </>
    )
}
export default Nav;

