import React from "react";
import { Link } from "react-router-dom";
const Forgot = () => {
    return(
        <>
            <section className="auth-sec">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-sm-9 col-md-6 col-xl-4 col-xxl-3">
                            <div className="auth-box rounded">
                                <div className="d-flex p-3 justify-content-between align-items-center mb-3 border-bottom">
                                    <div className="auth-left">
                                        <h6 className="mb-2 text-capitalize">
                                           Forgot Password?</h6>
                                        <p className="mb-0 text-capitalize">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 48 48" fill="var(--blue)"><path d="M24 44 6 33.7V13.75L24 4l18 9.75V33.7Zm-5.7-24.9q1.15-1.15 2.625-1.875Q22.4 16.5 24 16.5t3.075.725q1.475.725 2.625 1.875l7.65-4.5L24 7.5l-13.35 7.1Zm4.2 20.6v-8.35q-2.6-.7-4.3-2.7-1.7-2-1.7-4.65 0-.55.075-1.125t.275-1.125L9 17.1v14.85ZM24 28.5q1.9 0 3.2-1.3 1.3-1.3 1.3-3.2 0-1.9-1.3-3.2-1.3-1.3-3.2-1.3-1.9 0-3.2 1.3-1.3 1.3-1.3 3.2 0 1.9 1.3 3.2 1.3 1.3 3.2 1.3Zm1.5 11.2L39 31.95V17.1l-7.85 4.65q.2.55.275 1.125.075.575.075 1.125 0 2.65-1.7 4.65-1.7 2-4.3 2.7Z"/></svg>&nbsp;reset
                                        </p>
                                    </div>
                                    <div className="auth-right">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="70" width="70" viewBox="0 0 48 48" fill='var(--white)'><path d="M26 42.2q-3.45 0-6.7-1.3t-5.65-3.55l2.15-2.15q2 1.85 4.675 2.925Q23.15 39.2 26 39.2q6.25 0 10.725-4.475T41.2 24q0-6.25-4.475-10.725T26 8.8q-6.25 0-10.725 4.475T10.8 24v.9l3.5-3.5 2.1 2.1-7.1 7.1-7.1-7.1 2.1-2.1 3.5 3.5V24q0-3.8 1.425-7.1t3.9-5.775Q15.6 8.65 18.9 7.225 22.2 5.8 26 5.8t7.1 1.425q3.3 1.425 5.775 3.9 2.475 2.475 3.9 5.775Q44.2 20.2 44.2 24q0 7.6-5.3 12.9-5.3 5.3-12.9 5.3Zm-4-10.45q-.7 0-1.225-.525Q20.25 30.7 20.25 30v-6q0-.7.575-1.225.575-.525 1.425-.525V20q0-1.55 1.1-2.65 1.1-1.1 2.65-1.1 1.55 0 2.65 1.1 1.1 1.1 1.1 2.65v2.25q.85 0 1.425.525.575.525.575 1.225v6q0 .7-.525 1.225-.525.525-1.225.525Zm1.75-9.5h4.5V20q0-.95-.65-1.6-.65-.65-1.6-.65-.95 0-1.6.65-.65.65-.65 1.6Z"/></svg>
                                    </div>
                                </div>
                                <div className="auth-form p-3 border-bottom">
                                    <form>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 48 48" fill="var(--white)"><path d="M7 40q-1.2 0-2.1-.9Q4 38.2 4 37V11q0-1.2.9-2.1Q5.8 8 7 8h34q1.2 0 2.1.9.9.9.9 2.1v26q0 1.2-.9 2.1-.9.9-2.1.9Zm17-15.1L7 13.75V37h34V13.75Zm0-3L40.8 11H7.25ZM7 13.75V11v26Z"/></svg>
                                            </span>
                                            <input type="text" className="form-control" placeholder="Enter Email" />
                                        </div>
                                        <div className="text-center">
                                            <input type="button" className="btn" value="Reset"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </section>
        </>
    )
}
export default Forgot;