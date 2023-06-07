import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const Sidebar = ({ ActivePage, activeComponent }) => {
    const path = activeComponent;
    const [size, setSize] = useState(window.innerWidth);
    const [menuHeight, setmenuHeight] = useState(window.innerHeight - 74);
    useEffect(() => {
        window.addEventListener('resize', () => {
            setmenuHeight(window.innerHeight - 74)
            setSize(window.innerWidth)
        })
    })
    return (
        <>


            {/* <div className={`col-md-4 col-xl-3 col-xxl-2 px-0 ${size < 991 ? 'offcanvas offcanvas-end' : ''}`} id="offcanvasNavbar" > */}

            <div className="side-menu position-relative" >
                {/* <Link to="/dashboard" > */}
                    <div className='text-center py-3' onClick={() => ActivePage("/dashboard")} style={{cursor:"pointer"}}>
                        <img src='./logo.png' className='img-fluid' alt='logo' />
                    </div>
                {/* </Link> */}
                <div className={`menu-list px-3`} style={{ height: menuHeight }}>
                    <div className="d-flex justify-content-end align-items-center">
                        {/* <p className='mb-0'>
                            MENU</p> */}
                        {size < 991 &&
                            <button className="btn p-0 border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z" /></svg>
                            </button>
                        }
                    </div>
                    <hr className='my-2' />
                    <ul className="list-group main-menu">
                        {/* <Link to="/dashboard" className={`mb-1 ${path == "/dashboard" ? 'active' : ''}`} onClick={()=>ActivePage("/dashboard")}> */}
                        <li className="list-group-item border-0 d-flex align-items-center active" onClick={() => ActivePage("/dashboard")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == "/dashboard" ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"></path></svg>
                            &nbsp;
                            <span className='text-capitalize' style={{ color: `${path == "/dashboard" ? 'var(--white)' : 'var(--light-gray)'}` }}>Dashboard</span>
                        </li>
                        {/* </Link> */}
                        {/* <Link to="/wallet" className={`mb-1 ${path == "/wallet" ? 'active' : ''}`} > */}
                        <li className="list-group-item border-0 d-flex align-items-center" onClick={() => ActivePage("/wallet")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == "/wallet" ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M16 12h2v4h-2z"></path><path d="M20 7V5c0-1.103-.897-2-2-2H5C3.346 3 2 4.346 2 6v12c0 2.201 1.794 3 3 3h15c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zM5 5h13v2H5a1.001 1.001 0 0 1 0-2zm15 14H5.012C4.55 18.988 4 18.805 4 18V8.815c.314.113.647.185 1 .185h15v10z"></path></svg>
                            &nbsp;
                            <span className='text-capitalize' style={{ color: `${path == "/wallet" ? 'var(--white)' : 'var(--light-gray)'}` }}>Wallet</span>
                        </li>
                        {/* </Link> */}
                        {/* <Link to="/orders" className={`mb-1 ${path == "/orders" ? 'active' : ''}`}> */}
                        <li className="list-group-item border-0 d-flex align-items-center" onClick={() => ActivePage("/orders")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == "/orders" ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M20 3H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM4 9V5h16v4zm16 4H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2zM4 19v-4h16v4z"></path><path d="M17 6h2v2h-2zm-3 0h2v2h-2zm3 10h2v2h-2zm-3 0h2v2h-2z"></path></svg>
                            &nbsp;
                            <span className='text-capitalize' style={{ color: `${path == "/orders" ? 'var(--white)' : 'var(--light-gray)'}` }} >Orders</span>
                        </li>
                        <li className="list-group-item border-0 d-flex align-items-center" onClick={() => ActivePage("/Tds")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == "/Tds" ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M20 3H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM4 9V5h16v4zm16 4H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2zM4 19v-4h16v4z"></path><path d="M17 6h2v2h-2zm-3 0h2v2h-2zm3 10h2v2h-2zm-3 0h2v2h-2z"></path></svg>
                            &nbsp;
                            <span className='text-capitalize' style={{ color: `${path == "/Tds" ? 'var(--white)' : 'var(--light-gray)'}` }} >Tds on Orders</span>
                        </li>
                        {/* </Link> */}
                        {/* <Link to="/users" className={`mb-1 ${path == "/users" ? 'active' : ''}`}> */}
                        <li className="list-group-item border-0 d-flex align-items-center" onClick={() => ActivePage("/users")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == "/users" ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path></svg>
                            &nbsp;
                            <span className='text-capitalize' style={{ color: `${path == "/users" ? 'var(--white)' : 'var(--light-gray)'}` }}>users</span>
                        </li>
                        {/* </Link> */}
                        {/* <Link to="/crypto" className={`mb-1 ${path == "/crypto" ? 'active' : ''}`}> */}
                        <li className="list-group-item border-0 d-flex align-items-center" onClick={() => ActivePage("/crypto")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == "/crypto" ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M15.999 8.5h2c0-2.837-2.755-4.131-5-4.429V2h-2v2.071c-2.245.298-5 1.592-5 4.429 0 2.706 2.666 4.113 5 4.43v4.97c-1.448-.251-3-1.024-3-2.4h-2c0 2.589 2.425 4.119 5 4.436V22h2v-2.07c2.245-.298 5-1.593 5-4.43s-2.755-4.131-5-4.429V6.1c1.33.239 3 .941 3 2.4zm-8 0c0-1.459 1.67-2.161 3-2.4v4.799c-1.371-.253-3-1.002-3-2.399zm8 7c0 1.459-1.67 2.161-3 2.4v-4.8c1.33.239 3 .941 3 2.4z"></path></svg>
                            &nbsp;
                            <span className='text-capitalize' style={{ color: `${path == "/crypto" ? 'var(--white)' : 'var(--light-gray)'}` }}>crypto</span>
                        </li>
                        {/* </Link> */}
                        {/* <Link to="/kycverification" className={`mb-1 ${path == "/kycverification" ? 'active' : ''}`}> */}
                        <li className="list-group-item border-0 d-flex align-items-center" onClick={() => ActivePage("/kycverification")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == "/kycverification" ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M8 12.052c1.995 0 3.5-1.505 3.5-3.5s-1.505-3.5-3.5-3.5-3.5 1.505-3.5 3.5 1.505 3.5 3.5 3.5zM9 13H7c-2.757 0-5 2.243-5 5v1h12v-1c0-2.757-2.243-5-5-5zm11.294-4.708-4.3 4.292-1.292-1.292-1.414 1.414 2.706 2.704 5.712-5.702z"></path></svg>
                            &nbsp;
                            <span className='text-capitalize' style={{ color: `${path == "/kycverification" ? 'var(--white)' : 'var(--light-gray)'}` }}>KYC Verification</span>
                        </li>
                        {/* </Link> */}
                        {/* <Link to="/bank-verification" className={`mb-1 ${path == "/bank-verification" ? 'active' : ''}`}> */}
                        <li className="list-group-item border-0 d-flex align-items-center" onClick={() => ActivePage("/bank-verification")} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == "/bank-verification" ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M2 8v4.001h1V18H2v3h16l3 .001V21h1v-3h-1v-5.999h1V8L12 2 2 8zm4 10v-5.999h2V18H6zm5 0v-5.999h2V18h-2zm7 0h-2v-5.999h2V18zM14 8a2 2 0 1 1-4.001-.001A2 2 0 0 1 14 8z"></path></svg>
                            &nbsp;
                            <span className='text-capitalize' style={{ color: `${path == "/bank-verification" ? 'var(--white)' : 'var(--light-gray)'}` }}>Bank Verification</span>
                        </li>
                        {/* </Link> */}
                        {/* <Link to="/upi-verification" className={`mb-1 ${path == "/upi-verification" ? 'active' : ''}`}> */}
                        <li className="list-group-item border-0 d-flex align-items-center" onClick={() => ActivePage("/upi-verification")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == "/upi-verification" ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M2 8v4.001h1V18H2v3h16l3 .001V21h1v-3h-1v-5.999h1V8L12 2 2 8zm4 10v-5.999h2V18H6zm5 0v-5.999h2V18h-2zm7 0h-2v-5.999h2V18zM14 8a2 2 0 1 1-4.001-.001A2 2 0 0 1 14 8z"></path></svg>
                            &nbsp;
                            <span className='text-capitalize' style={{ color: `${path == "/upi-verification" ? 'var(--white)' : 'var(--light-gray)'}` }}>Upi Verification</span>
                        </li>
                        {/* </Link> */}
                        <div className="accordion mb-1" >
                            <li
                                className={`list-group-item border-0 d-flex align-items-center accordion-button ${path == "/trading-fee-report" || path == '/client-report' ? 'active' : 'collapsed'}`}
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="true"
                                aria-controls="collapseTwo"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == "/trading-fee-report" || path == '/client-report' ? 'var(--white)' : 'var(--light-gray)'}`}><path d="m20 8-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM9 19H7v-9h2v9zm4 0h-2v-6h2v6zm4 0h-2v-3h2v3zM14 9h-1V4l5 5h-4z"></path></svg>
                                &nbsp;
                                <span
                                    className='pointer'
                                    style={{ color: `${path == "/trading-fee-report" || path == '/client-report' ? 'var(--white)' : ''}` }}
                                >
                                    Report
                                </span>
                            </li>
                            <ul
                                className={`list-group-dropdown accordion-collapse collapse ${path == '/trading-fee-report' || path == '/client-report' ? 'show' : ''}`}
                                id="collapseTwo"
                                aria-labelledby="headingOne"
                            >
                                {/* <Link to="/trading-fee-report"> */}
                                <li
                                    className='border-0 d-flex align-items-center px-3 mb-1'
                                    style={{ color: `${path == '/trading-fee-report' ? 'var(--white)' : ''}` }} onClick={() => ActivePage("/trading-fee-report")}
                                >
                                    Trading Fee Report
                                </li>
                                {/* </Link> */}
                                {/* <Link to="/client-report"> */}
                                <li
                                    className='border-0 d-flex align-items-center px-3'
                                    style={{ color: `${path == '/client-report' ? 'var(--white)' : ''}` }} onClick={() => ActivePage("/client-report")}
                                >
                                    Client Report
                                </li>
                                {/* </Link> */}
                            </ul>
                        </div>
                        {/* <Link to="/inr-withdrawl" className={`mb-1 ${path == "/inr-withdrawl" ? 'active' : ''}`}> */}
                        <li className="list-group-item border-0 d-flex align-items-center" onClick={() => ActivePage("/inr-withdrawl")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == "/inr-withdrawl" ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M17 6V4H6v2h3.5c1.302 0 2.401.838 2.815 2H6v2h6.315A2.994 2.994 0 0 1 9.5 12H6v2.414L11.586 20h2.828l-6-6H9.5a5.007 5.007 0 0 0 4.898-4H17V8h-2.602a4.933 4.933 0 0 0-.924-2H17z"></path></svg>
                            &nbsp;
                            <span className='text-capitalize' style={{ color: `${path == "/inr-withdrawl" ? 'var(--white)' : 'var(--light-gray)'}` }} >INR Withdrawal</span>
                        </li>
                        {/* </Link> */}
                        {/* <Link to="/inr-deposit" className={`mb-1 ${path == "/inr-deposit" ? 'active' : ''}`}> */}
                        <li className="list-group-item border-0 d-flex align-items-center" onClick={() => ActivePage("/inr-deposit")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == "/inr-deposit" ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M17 6V4H6v2h3.5c1.302 0 2.401.838 2.815 2H6v2h6.315A2.994 2.994 0 0 1 9.5 12H6v2.414L11.586 20h2.828l-6-6H9.5a5.007 5.007 0 0 0 4.898-4H17V8h-2.602a4.933 4.933 0 0 0-.924-2H17z"></path></svg>
                            &nbsp;
                            <span className='text-capitalize' style={{ color: `${path == "/inr-deposit" ? 'var(--white)' : 'var(--light-gray)'}` }}>INR Deposit</span>
                        </li>
                        {/* </Link> */}



                        <div className="accordion mb-1">
                            <li
                                className={`list-group-item border-0 d-flex align-items-center accordion-button ${path == '/create-order' || path == '/order-list' || path == '/chat-list' || path == '/wallet-transaction-list' || path == '/p2p-comission' ? 'active' : 'collapsed'} `}
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseSeven"
                                aria-expanded="true"
                                aria-controls="collapseSeven"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill={`${path == "/create-order" || path == '/order-list' || path == '/chat-list' || path == '/wallet-transaction-list' ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M24 46q-5.6 0-10.8-3.3Q8 39.4 5 35.15V42H2V30h12v3H7.15q2.55 3.85 7.275 6.925Q19.15 43 24 43q3.9 0 7.375-1.5t6.05-4.075Q40 34.85 41.5 31.375 43 27.9 43 24h3q0 4.55-1.725 8.55-1.725 4-4.725 7-3 3-7 4.725Q28.55 46 24 46Zm-1.45-7.65v-2.7q-2.25-.6-3.775-1.925Q17.25 32.4 16.2 30.1l2.55-.85q.6 1.9 2.125 3t3.475 1.1q2 0 3.325-.975Q29 31.4 29 29.8q0-1.65-1.25-2.775t-4.6-2.525q-3-1.25-4.5-2.7-1.5-1.45-1.5-3.9 0-2.2 1.5-3.75 1.5-1.55 4-1.9V9.7h2.75v2.55q1.9.2 3.3 1.2t2.25 2.75l-2.4 1.15q-.75-1.4-1.85-2.1-1.1-.7-2.6-.7-1.95 0-3.075.9-1.125.9-1.125 2.45 0 1.6 1.3 2.55 1.3.95 4.2 2.15 3.45 1.45 4.9 3.05 1.45 1.6 1.45 4.15 0 1.25-.45 2.3-.45 1.05-1.275 1.8T28 35.125q-1.2.475-2.7.625v2.6ZM2 24q0-4.55 1.725-8.55 1.725-4 4.725-7 3-3 7-4.725Q19.45 2 24 2q5.6 0 10.8 3.3Q40 8.6 43 12.85V6h3v12H34v-3h6.85q-2.55-3.85-7.25-6.925Q28.9 5 24 5q-3.9 0-7.375 1.5t-6.05 4.075Q8 13.15 6.5 16.625 5 20.1 5 24Z" /></svg>
                                &nbsp;
                                <span
                                    className='pointer'
                                    style={{ color: `${path == '/create-order' || path == '/order-list' || path == '/chat-list' || path == '/wallet-transaction-list' || path == '/p2p-comission' ? 'var(--white)' : ''}` }}
                                >
                                    P2P
                                </span>
                            </li>
                            <ul
                                className={`list-group-dropdown accordion-collapse collapse ${path == '/create-order' || path == '/order-list' || path == '/chat-list' || path == '/wallet-transaction-list' || path == '/p2p-comission' ? 'show' : ''}`}
                                id="collapseSeven"
                                aria-labelledby="headingOne"
                            >
                                {/* <Link to="/create-order">
                                                    <li 
                                                        className='border-0 d-flex align-items-center px-3 mb-1'
                                                        style={{color:`${path == '/create-order' ?'var(--white)':''}`}}
                                                    >
                                                        Create Order
                                                    </li>
                                                </Link> */}
                                {/* <Link to="/order-list"> */}
                                <li
                                    className='border-0 d-flex align-items-center px-3 mb-1'
                                    style={{ color: `${path == '/order-list' ? 'var(--white)' : ''}` }} onClick={() => ActivePage("/order-list")}
                                >
                                    Orders
                                </li>
                                {/* </Link> */}
                                {/* <Link to="/chat-list"> */}
                                <li
                                    className='border-0 d-flex align-items-center px-3 mb-1'
                                    style={{ color: `${path == '/chat-list' ? 'var(--white)' : ''}` }} onClick={() => ActivePage("/chat-list")}
                                >
                                    Trade-List
                                </li>
                                {/* </Link> */}
                                {/* <Link to="/wallet-transaction-list"> */}
                                <li
                                    className='border-0 d-flex align-items-center px-3 mb-1'
                                    style={{ color: `${path == '/wallet-transaction-list' ? 'var(--white)' : ''}` }} onClick={() => ActivePage("/wallet-transaction-list")}
                                >
                                    Wallet Transaction List
                                </li>
                                {/* </Link> */}
                                {/* <Link to="/p2p-comission" > */}
                                <li
                                    className='border-0 d-flex align-items-center px-3 mb-1'
                                    style={{ color: `${path == '/p2p-comission' ? 'var(--white)' : ''}` }} onClick={() => ActivePage("/p2p-comission")}
                                >
                                    P2p Comission
                                </li>
                                <li
                                    className='border-0 d-flex align-items-center px-3'
                                    style={{ color: `${path == '/Transfer' ? 'var(--white)' : ''}` }} onClick={() => ActivePage("/Transfer")}
                                >
                                    Transfer USDT
                                </li>


                                {/* </Link> */}
                            </ul>
                        </div>

                        {/* <Link to="/listed-coin" className={`mb-1 ${path == "/listed-coin" ? 'active' : ''}`}> */}
                        <li className="list-group-item border-0 d-flex align-items-center" onClick={() => ActivePage("/listed-coin")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == "/listed-coin" ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm16-8V6H8.023v2H18.8zM8 11h12v2H8zm0 5h12v2H8z"></path></svg>
                            &nbsp;
                            <span className='text-capitalize' style={{ color: `${path == "/listed-coin" ? 'var(--white)' : 'var(--light-gray)'}` }}>Listed Coin</span>
                        </li>
                        {/* </Link> */}
                        {/* <Link to="/pages" className={`mb-1 ${path == "/pages" ? 'active' : ''}`}> */}
                        <li className="list-group-item border-0 d-flex align-items-center" onClick={() => ActivePage("/pages")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == "/pages" ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm16-8V6H8.023v2H18.8zM8 11h12v2H8zm0 5h12v2H8z"></path></svg>
                            &nbsp;
                            <span className='text-capitalize' style={{ color: `${path == "/pages" ? 'var(--white)' : 'var(--light-gray)'}` }}>Pages</span>
                        </li>
                        {/* </Link> */}
                        <div className="accordion mb-1">
                            <li
                                className={`list-group-item border-0 d-flex align-items-center accordion-button collapsed  ${path == '/blog-category' || path == '/create-blog' || path == '/blog-list' ? 'active' : 'collapsed'}`}
                                data-bs-toggle="collapse" data-bs-target="#collapseBlog" aria-expanded="true" aria-controls="collapseBlog">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill={`${path == '/blog-category' || path == '/create-blog' || path == '/blog-list' ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M4 10.75V2h8.75v3H7v5.75Zm37 0V5h-5.75V2H44v8.75ZM4 46v-8.75h3V43h5.75v3Zm31.25 0v-3H41v-5.75h3V46ZM13 37h22V11H13Zm0 3q-1.2 0-2.1-.9-.9-.9-.9-2.1V11q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v26q0 1.2-.9 2.1-.9.9-2.1.9Zm5.5-20.5h11v-3h-11Zm0 6h11v-3h-11Zm0 6h11v-3h-11ZM13 37V11v26Z" /></svg>

                                &nbsp;
                                <span className='pointer'
                                    style={{ color: path == '/blog-category' || path == '/create-blog' || path == '/blog-list' ? 'var(--white)' : '' }}
                                >Blogs</span>
                            </li>
                            <ul className={`list-group-dropdown accordion-collapse collapse ${path == '/blog-category' || path == '/create-blog' || path == '/blog-list' ? 'show' : ''}`} id="collapseBlog" aria-labelledby="headingOne" >
                                {/* <Link to="/blog-category" className={`${path == "/blog-category" ? 'active' : ''}`}> */}
                                <li className='border-0 d-flex align-items-center px-3  mb-2' onClick={() => ActivePage("/blog-category")}
                                    style={{ color: `${path == '/blog-category' ? 'var(--white)' : ''}` }} >Create Category</li>
                                {/* </Link> */}
                                {/* <Link to="/create-blog" className={`${path == "/create-blog" ? 'active' : ''}`}> */}
                                <li className='border-0 d-flex align-items-center px-3 mb-2' onClick={() => ActivePage("/create-blog")} style={{ color: `${path == '/create-blog' ? 'var(--white)' : ''}` }}>Create Blog</li>
                                {/* </Link> */}
                                {/* <Link to="/blog-list" className={`${path == "/blog-list" ? 'active' : ''}`}> */}
                                <li className='border-0 d-flex align-items-center px-3' onClick={() => ActivePage("/blog-list")}
                                    style={{ color: `${path == '/blog-list' ? 'var(--white)' : ''}` }}>Blog List</li>
                                {/* </Link> */}
                            </ul>
                        </div>
                        {/* <Link to="/liquidity" className={`mb-1 ${path == "/liquidity" ? 'active' : ''}`}> */}
                        <li className="list-group-item border-0 d-flex align-items-center" onClick={() => ActivePage("/liquidity")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == "/liquidity" ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M15.566 11.021A7.016 7.016 0 0 0 19 5V4h1V2H4v2h1v1a7.016 7.016 0 0 0 3.434 6.021c.354.208.566.545.566.9v.158c0 .354-.212.69-.566.9A7.016 7.016 0 0 0 5 19v1H4v2h16v-2h-1v-1a7.014 7.014 0 0 0-3.433-6.02c-.355-.21-.567-.547-.567-.901v-.158c0-.355.212-.692.566-.9zM17 19v1H7v-1a5.01 5.01 0 0 1 2.45-4.299A3.111 3.111 0 0 0 10.834 13h2.332c.23.691.704 1.3 1.385 1.702A5.008 5.008 0 0 1 17 19z"></path></svg>
                            &nbsp;
                            <span className='text-capitalize' style={{ color: `${path == "/liquidity" ? 'var(--white)' : 'var(--light-gray)'}` }}>Liquidity</span>
                        </li>
                        {/* </Link> */}
                        <div className="accordion mb-1">
                            <li
                                className={`list-group-item border-0 d-flex align-items-center accordion-button collapsed  ${path == '/create-template' || path == '/template-list' || path == '/create-template' ? 'active' : 'collapsed'}`}
                                data-bs-toggle="collapse" data-bs-target="#collapse11" aria-expanded="true" aria-controls="collapse11">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill={`${path == "/template-list" || path == "/create-template" ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M4 10.75V2h8.75v3H7v5.75Zm37 0V5h-5.75V2H44v8.75ZM4 46v-8.75h3V43h5.75v3Zm31.25 0v-3H41v-5.75h3V46ZM13 37h22V11H13Zm0 3q-1.2 0-2.1-.9-.9-.9-.9-2.1V11q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v26q0 1.2-.9 2.1-.9.9-2.1.9Zm5.5-20.5h11v-3h-11Zm0 6h11v-3h-11Zm0 6h11v-3h-11ZM13 37V11v26Z" /></svg>

                                &nbsp;
                                <span className='pointer'
                                    style={{ color: path == '/template-list' || path == '/create-template' ? 'var(--white)' : '' }}
                                >Template</span>
                            </li>
                            <ul className={`list-group-dropdown accordion-collapse collapse ${path == '/template-list' || path == '/create-template' ? 'show' : ''}`} id="collapse11" aria-labelledby="headingOne" >
                                {/* <Link to="/template-list" className={`${path == "/template-list" ? 'active' : ''}`}> */}
                                <li className='border-0 d-flex align-items-center px-3 mb-2' onClick={() => ActivePage("/template-list")}
                                    style={{ color: `${path == '/template-list' ? 'var(--white)' : ''}` }}
                                >Template List</li>
                                {/* </Link> */}
                                {/* <Link to="/create-template" className={`${path == "/create-template" ? 'active' : ''}`}> */}
                                <li className='border-0 d-flex align-items-center px-3' onClick={() => ActivePage("/create-template")}
                                    style={{ color: `${path == '/create-template' ? 'var(--white)' : ''}` }}
                                >Create Template</li>
                                {/* </Link> */}
                            </ul>
                        </div>

                        <div className="accordion mb-1">
                            <li
                                className={`list-group-item border-0 d-flex align-items-center accordion-button ${path == '/stake-create' || path == '/stake-plan-list' || path == '/user-stake-list' ? 'active' : 'collapsed'}`}
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse12"
                                aria-expanded="true"
                                aria-controls="collapse12"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == "/stake-create" || path == '/stake-plan-list' || path == '/user-stake-list' ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M12 22c3.976 0 8-1.374 8-4V6c0-2.626-4.024-4-8-4S4 3.374 4 6v12c0 2.626 4.024 4 8 4zm0-2c-3.722 0-6-1.295-6-2v-1.268C7.541 17.57 9.777 18 12 18s4.459-.43 6-1.268V18c0 .705-2.278 2-6 2zm0-16c3.722 0 6 1.295 6 2s-2.278 2-6 2-6-1.295-6-2 2.278-2 6-2zM6 8.732C7.541 9.57 9.777 10 12 10s4.459-.43 6-1.268V10c0 .705-2.278 2-6 2s-6-1.295-6-2V8.732zm0 4C7.541 13.57 9.777 14 12 14s4.459-.43 6-1.268V14c0 .705-2.278 2-6 2s-6-1.295-6-2v-1.268z"></path></svg>
                                &nbsp;
                                <span className='pointer'
                                    style={{ color: path == '/stake-create' || path == '/stake-plan-list' || path == '/user-stake-list' ? 'var(--white)' : '' }}
                                >Staking</span>
                            </li>
                            <ul
                                className={`list-group-dropdown accordion-collapse collapse ${path == '/stake-create' || path == '/stake-plan-list' || path == '/user-stake-list' ? 'show' : ''}`}
                                id="collapse12"
                                aria-labelledby="headingOne"
                            >
                                {/* <Link to="/stake-create" className={`${path == '/stake-create' ? 'active' : ''}`}> */}
                                <li className='border-0 d-flex align-items-center px-3 mb-2' onClick={() => ActivePage("/stake-create")}
                                    style={{ color: `${path == '/stake-create' ? 'var(--white)' : ''}` }}

                                >Stake Create</li>
                                {/* </Link> */}
                                {/* <Link to="/stake-plan-list" className={`${path == '/stake-plan-list' ? 'active' : ''}`}> */}
                                <li className='border-0 d-flex align-items-center px-3 mb-2' onClick={() => ActivePage("/stake-plan-list")}
                                    style={{ color: `${path == '/stake-plan-list' ? 'var(--white)' : ''}` }}

                                >Stake Plan List</li>
                                {/* </Link> */}
                                {/* <Link to="/user-stake-list" className={`${path == '/user-stake-list' ? 'active' : ''}`}> */}
                                {/* <li className='border-0 d-flex align-items-center px-3' onClick={() => ActivePage("/user-stake-list")}
                                    style={{ color: `${path == '/user-stake-list' ? 'var(--white)' : ''}` }}

                                >User Stake List</li> */}
                                {/* </Link> */}
                            </ul>
                        </div>
                        {/* <Link to="/banner" className={`mb-1 ${path == "/banner" ? 'active' : ''}`}> */}
                        <li className="list-group-item border-0 d-flex align-items-center" onClick={() => ActivePage("/banner")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == "/banner" ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M4 5h13v7h2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-2H4V5z"></path><path d="m8 11-3 4h11l-4-6-3 4z"></path><path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path></svg>
                            &nbsp;
                            <span className='text-capitalize' style={{ color: `${path == "/banner" ? 'var(--white)' : 'var(--light-gray)'}` }}>Banner</span>
                        </li>
                        {/* </Link> */}
                        <div className="accordion mb-1">
                            <li
                                className={`list-group-item border-0 d-flex align-items-center accordion-button ${path == '/support-category' || path == '/ticket-list' ? 'active' : 'collapsed'}`}
                                data-bs-toggle="collapse" data-bs-target="#collapse15" aria-expanded="true" aria-controls="collapse15">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == '/support-category' || path == '/ticket-list' ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M12 2C6.486 2 2 6.486 2 12v4.143C2 17.167 2.897 18 4 18h1a1 1 0 0 0 1-1v-5.143a1 1 0 0 0-1-1h-.908C4.648 6.987 7.978 4 12 4s7.352 2.987 7.908 6.857H19a1 1 0 0 0-1 1V18c0 1.103-.897 2-2 2h-2v-1h-4v3h6c2.206 0 4-1.794 4-4 1.103 0 2-.833 2-1.857V12c0-5.514-4.486-10-10-10z"></path></svg>
                                &nbsp;
                                <span
                                    className='pointer'
                                    style={{ color: path == '/support-category' || path == '/ticket-list' ? 'var(--white)' : '' }}
                                >Support</span>
                            </li>
                            <ul
                                className={`list-group-dropdown accordion-collapse collapse ${path == '/support-category' || path == '/ticket-list' ? 'show' : ''}`}
                                id="collapse15"
                                aria-labelledby="headingOne" >
                                {/* <Link to="/support-category" className={` ${path == "/support-category" ? 'active' : ''}`}> */}
                                <li className='border-0 d-flex align-items-center px-3 mb-2' onClick={() => ActivePage("/support-category")}
                                    style={{ color: `${path == '/support-category' ? 'var(--white)' : ''}` }}
                                >Support Category</li>
                                {/* </Link> */}
                                {/* <Link to="/ticket-list" className={` ${path == "/ticket-list" ? 'active' : ''}`}> */}
                                <li className='border-0 d-flex align-items-center px-3' onClick={() => ActivePage("/ticket-list")}
                                    style={{ color: `${path == '/ticket-list' ? 'var(--white)' : ''}` }}
                                >Ticket List</li>
                                {/* </Link> */}
                            </ul>
                        </div>
                        {/* <Link
                                            to="/currencies"
                                            className={`mb-1 ${path == "/currencies" ? 'active' : ''}`}
                                        > */}
                        <li className="list-group-item border-0 d-flex align-items-center" onClick={() => ActivePage("/currencies")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == "/currencies" ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm16-8V6H8.023v2H18.8zM8 11h12v2H8zm0 5h12v2H8z"></path></svg>
                            &nbsp;
                            <span className="pointer" style={{ color: `${path == "/currencies" ? 'var(--white)' : 'var(--light-gray)'}` }}>Currencies</span>
                        </li>
                        {/* </Link> */}
                        {/* <Link to="/settings" className={`mb-1 ${path == "/settings" ? 'active' : ''}`}> */}
                        <div className="accordion">
                            <li className="list-group-item border-0 d-flex align-items-center" onClick={() => ActivePage("/settings")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == "/settings" ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M20 3H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM4 9V5h16v4zm16 4H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2zM4 19v-4h16v4z"></path><path d="M17 6h2v2h-2zm-3 0h2v2h-2zm3 10h2v2h-2zm-3 0h2v2h-2z"></path></svg>
                                &nbsp;
                                <span className='text-capitalize' style={{ color: `${path == "/settings" ? 'var(--white)' : 'var(--light-gray)'}` }}>Settings</span>
                            </li>
                        </div>
                        {/* </Link> */}
                        <div className="accordion mb-1">
                            <li
                                className={`list-group-item border-0 d-flex align-items-center accordion-button ${path == '/news-board' ? 'active' : 'collapsed'}`}
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse16"
                                aria-expanded="true"
                                aria-controls="collapse16"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == "/news-board" ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M19.875 3H4.125C2.953 3 2 3.897 2 5v14c0 1.103.953 2 2.125 2h15.75C21.047 21 22 20.103 22 19V5c0-1.103-.953-2-2.125-2zm0 16H4.125c-.057 0-.096-.016-.113-.016-.007 0-.011.002-.012.008L3.988 5.046c.007-.01.052-.046.137-.046h15.75c.079.001.122.028.125.008l.012 13.946c-.007.01-.052.046-.137.046z"></path><path d="M6 7h6v6H6zm7 8H6v2h12v-2h-4zm1-4h4v2h-4zm0-4h4v2h-4z"></path></svg>&nbsp;
                                <span
                                    className="pointer"
                                    style={{ color: `${path == '/news-board' ? 'var(--white)' : ''}` }}
                                >
                                    News Board
                                </span>
                            </li>
                            <ul
                                className={`list-group-dropdown accordion-collapse collapse ${path == '/news-board' ? 'show' : ''}`}
                                id="collapse16"
                                aria-labelledby="headingOne"
                            >
                                {/* <Link
                                                    to="/news-board"
                                                    className={`mb-2 ${path == "/news-board" ? 'active' : ''}`}
                                                > */}
                                <li className='border-0 d-flex align-items-center px-3' onClick={() => ActivePage("/news-board")}  
                                style={{ color: `${path == '/news-board' ? 'var(--white)' : ''}` }}>Create News</li>
                                {/* </Link> */}
                            </ul>
                        </div>
                        <div className="accordion mb-1">
                            <li className={`list-group-item border-0 d-flex align-items-center accordion-button ${path == '/bank-deposit-history' || path == '/bank-withdraw-history' ? 'active' : 'collapsed'}`} data-bs-toggle="collapse" data-bs-target="#collapse17" aria-expanded="true" aria-controls="collapse17">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == '/bank-deposit-history' || path == '/bank-withdraw-history' ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M12 22c3.976 0 8-1.374 8-4V6c0-2.626-4.024-4-8-4S4 3.374 4 6v12c0 2.626 4.024 4 8 4zm0-2c-3.722 0-6-1.295-6-2v-1.268C7.541 17.57 9.777 18 12 18s4.459-.43 6-1.268V18c0 .705-2.278 2-6 2zm0-16c3.722 0 6 1.295 6 2s-2.278 2-6 2-6-1.295-6-2 2.278-2 6-2zM6 8.732C7.541 9.57 9.777 10 12 10s4.459-.43 6-1.268V10c0 .705-2.278 2-6 2s-6-1.295-6-2V8.732zm0 4C7.541 13.57 9.777 14 12 14s4.459-.43 6-1.268V14c0 .705-2.278 2-6 2s-6-1.295-6-2v-1.268z"></path></svg>
                                &nbsp;
                                <span className='pointer'
                                    style={{ color: path == '/bank-deposit-history' || path == '/bank-withdraw-history' ? 'var(--white)' : '' }}
                                >Bank History</span>
                            </li>
                            <ul className={`list-group-dropdown accordion-collapse collapse ${path == '/bank-deposit-history' || path == '/bank-withdraw-history' ? 'show' : ''}`} id="collapse17" aria-labelledby="headingOne" >
                                {/* <Link to="/bank-deposit-history" className={` ${path == "/bank-deposit-history" ? 'active' : ''}`}> */}
                                <li className='border-0 d-flex align-items-center px-3 mb-1' onClick={() => ActivePage("/bank-deposit-history")}
                                    style={{ color: `${path == '/bank-deposit-history' ? 'var(--white)' : ''}` }}
                                >Deposit History</li>
                                {/* </Link> */}
                                {/* <Link to="/bank-withdraw-history" className={` ${path == "/bank-withdraw-history" ? 'active' : ''}`}> */}
                                <li className='border-0 d-flex align-items-center px-3 ' onClick={() => ActivePage("/bank-withdraw-history")}
                                    style={{ color: `${path == '/bank-withdraw-history' ? 'var(--white)' : ''}` }}
                                >Withdraw History</li>
                                {/* </Link> */}
                            </ul>
                        </div>
                        <div className="accordion mb-1">
                            <li className={`list-group-item border-0 d-flex align-items-center accordion-button ${path == '/crypto-deposit-history' || path == '/crypto-withdraw-history' ? 'active' : 'collapsed'}`} data-bs-toggle="collapse" data-bs-target="#collapse18" aria-expanded="true" aria-controls="collapse18">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${path == '/crypto-deposit-history' || path == '/crypto-withdraw-history' ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M12 22c3.976 0 8-1.374 8-4V6c0-2.626-4.024-4-8-4S4 3.374 4 6v12c0 2.626 4.024 4 8 4zm0-2c-3.722 0-6-1.295-6-2v-1.268C7.541 17.57 9.777 18 12 18s4.459-.43 6-1.268V18c0 .705-2.278 2-6 2zm0-16c3.722 0 6 1.295 6 2s-2.278 2-6 2-6-1.295-6-2 2.278-2 6-2zM6 8.732C7.541 9.57 9.777 10 12 10s4.459-.43 6-1.268V10c0 .705-2.278 2-6 2s-6-1.295-6-2V8.732zm0 4C7.541 13.57 9.777 14 12 14s4.459-.43 6-1.268V14c0 .705-2.278 2-6 2s-6-1.295-6-2v-1.268z"></path></svg>
                                &nbsp;
                                <span className='pointer'
                                    style={{ color: path == '/crypto-deposit-history' || path == '/crypto-withdraw-history' ? 'var(--white)' : '' }}
                                >Crypto Transac History</span>
                            </li>
                            <ul className={`list-group-dropdown accordion-collapse collapse ${path == '/crypto-deposit-history' || path == '/crypto-withdraw-history' ? 'show' : ''}`} id="collapse18" aria-labelledby="headingOne" >
                                {/* <Link to="/crypto-deposit-history" className={` ${path == "/crypto-deposit-history" ? 'active' : ''}`}> */}
                                <li className='border-0 d-flex align-items-center px-3 mb-2' onClick={() => ActivePage("/crypto-deposit-history")}
                                    style={{ color: `${path == '/crypto-deposit-history' ? 'var(--white)' : ''}` }}
                                >Deposit History</li>
                                {/* </Link> */}
                                {/* <Link to="/crypto-withdraw-history" className={`${path == "/crypto-withdraw-history" ? 'active' : ''}`}> */}
                                <li className='border-0 d-flex align-items-center px-3 ' onClick={() => ActivePage("/crypto-withdraw-history")}
                                    style={{ color: `${path == '/crypto-withdraw-history' ? 'var(--white)' : ''}` }}
                                >Withdraw History</li>
                                {/* </Link> */}
                            </ul>
                        </div>
                        {/* <Link to="/admin-bank" className={`mb-1 ${path == "/admin-bank" ? 'active' : ''}`}> */}
                        <li className="list-group-item border-0 d-flex align-items-center" onClick={() => ActivePage("/admin-bank")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill={`${path == "/admin-bank" ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M34.55 34.5q1.3 0 2.2-.95.9-.95.9-2.25t-.9-2.2q-.9-.9-2.2-.9-1.3 0-2.25.9t-.95 2.2q0 1.3.95 2.25t2.25.95Zm-.05 6.25q1.65 0 3-.7t2.3-2q-1.3-.7-2.6-1.05-1.3-.35-2.7-.35-1.4 0-2.725.35-1.325.35-2.575 1.05.95 1.3 2.275 2t3.025.7ZM24 44q-6.9-1.6-11.45-7.825Q8 29.95 8 21.9V9.95l16-6 16 6v13.5q-.7-.35-1.5-.625T37 22.45v-10.4l-13-4.8-13 4.8v9.85q0 3.8 1.225 7t3.125 5.625q1.9 2.425 4.2 4.025 2.3 1.6 4.45 2.3.3.6.9 1.35.6.75 1 1.15-.45.25-.95.375-.5.125-.95.275Zm10.65 0q-3.9 0-6.65-2.775-2.75-2.775-2.75-6.575 0-3.9 2.75-6.675t6.65-2.775q3.85 0 6.625 2.775t2.775 6.675q0 3.8-2.775 6.575Q38.5 44 34.65 44ZM24 24.05Z" /></svg>

                            &nbsp;
                            <span style={{ color: `${path == "/admin-bank" ? 'var(--white)' : 'var(--light-gray)'}` }}>Admin Bank Detail</span>
                        </li>
                        {/* </Link> */}
                        {/* <Link to="/admin-upi" className={`mb-1 ${path == "/admin-upi" ? 'active' : ''}`} > */}
                        <li className="list-group-item border-0 d-flex align-items-center" onClick={() => ActivePage("/admin-upi")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill={`${path == "/admin-upi" ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M34.55 34.5q1.3 0 2.2-.95.9-.95.9-2.25t-.9-2.2q-.9-.9-2.2-.9-1.3 0-2.25.9t-.95 2.2q0 1.3.95 2.25t2.25.95Zm-.05 6.25q1.65 0 3-.7t2.3-2q-1.3-.7-2.6-1.05-1.3-.35-2.7-.35-1.4 0-2.725.35-1.325.35-2.575 1.05.95 1.3 2.275 2t3.025.7ZM24 44q-6.9-1.6-11.45-7.825Q8 29.95 8 21.9V9.95l16-6 16 6v13.5q-.7-.35-1.5-.625T37 22.45v-10.4l-13-4.8-13 4.8v9.85q0 3.8 1.225 7t3.125 5.625q1.9 2.425 4.2 4.025 2.3 1.6 4.45 2.3.3.6.9 1.35.6.75 1 1.15-.45.25-.95.375-.5.125-.95.275Zm10.65 0q-3.9 0-6.65-2.775-2.75-2.775-2.75-6.575 0-3.9 2.75-6.675t6.65-2.775q3.85 0 6.625 2.775t2.775 6.675q0 3.8-2.775 6.575Q38.5 44 34.65 44ZM24 24.05Z" /></svg>
                            &nbsp;
                            <span style={{ color: `${path == "/admin-upi" ? 'var(--white)' : 'var(--light-gray)'}` }}>Admin Upi Detail</span>
                        </li>
                        {/* <li className="list-group-item border-0 d-flex align-items-center" onClick={() => ActivePage("/withdrawal")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill={`${path == "/withdrawal" ? 'var(--white)' : 'var(--light-gray)'}`}><path d="M34.55 34.5q1.3 0 2.2-.95.9-.95.9-2.25t-.9-2.2q-.9-.9-2.2-.9-1.3 0-2.25.9t-.95 2.2q0 1.3.95 2.25t2.25.95Zm-.05 6.25q1.65 0 3-.7t2.3-2q-1.3-.7-2.6-1.05-1.3-.35-2.7-.35-1.4 0-2.725.35-1.325.35-2.575 1.05.95 1.3 2.275 2t3.025.7ZM24 44q-6.9-1.6-11.45-7.825Q8 29.95 8 21.9V9.95l16-6 16 6v13.5q-.7-.35-1.5-.625T37 22.45v-10.4l-13-4.8-13 4.8v9.85q0 3.8 1.225 7t3.125 5.625q1.9 2.425 4.2 4.025 2.3 1.6 4.45 2.3.3.6.9 1.35.6.75 1 1.15-.45.25-.95.375-.5.125-.95.275Zm10.65 0q-3.9 0-6.65-2.775-2.75-2.775-2.75-6.575 0-3.9 2.75-6.675t6.65-2.775q3.85 0 6.625 2.775t2.775 6.675q0 3.8-2.775 6.575Q38.5 44 34.65 44ZM24 24.05Z" /></svg>
                            &nbsp;
                            <span style={{ color: `${path == "/withdrawal" ? 'var(--white)' : 'var(--light-gray)'}` }}>Manually Withdraw</span>
                        </li> */}
                        {/* </Link> */}
                    </ul>


                </div>
            </div>

            {/* <div className={`col-md-8 col-xl-9 col-xxl-10 p-0 ${size < 991 ? ' offcanvas-body' : ''}`}>
                            <Nav size={size} />
                            <main>{children}</main>
                        </div> */}


        </>
    )
}

export default Sidebar