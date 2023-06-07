import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import INR_WITHDRAWL from "../pages/INRWithdrawl";
import Users from "../pages/Users";
import ListCrypto from "../pages/ListCrypto";
import INRDeposit from '../pages/INRDeposit';
import Orders from '../pages/Orders';
import Tds from '../pages/Tds';
import Wallet from "../pages/Wallet";
import NewsBoard from "../pages/NewsBoard";
import Dashboard from "../pages/Dashboard";
import KycVerification from "../pages/KycVerification";
import TradingFeeReport from "../pages/TradingFeeReport";
import ClientReport from "../pages/ClientReport";
import BankVerification from "../pages/BankVerification";
import UpiVerification from '../pages/UpiVerification';
//p2p routes
import CreateOrder from "../pages/P2p/CreateOrder";
import OrderList from "../pages/P2p/OrderList";
import ChatList from "../pages/P2p/ChatList";
import WalletTransactionList from "../pages/P2p/WalletTransactionList";
import P2pComission from '../pages/P2pComission';
import ListedCoin from "../pages/ListedCoin";
import Pages from "../pages/pages";
import Liquidity from "../pages/Liquidity";
import Template from "../pages/Template";
import CreateTemplate from "../pages/CreateTemplate";
//Staking routes
import StakeCreate from "../pages/staking/stake-create";
import StakePlanList from "../pages/staking/stake-plan-list";
import UserStakeList from "../pages/staking/user-stake-list";

import Banner from '../pages/Banner';
//support routes
import SupportCategory from "../pages/Support/support-category";
import TicketList from "../pages/Support/TicketList";

import Currencies from "../pages/Currencies";
import Settings from "../pages/Settings";

//Bank History
import Deposit from '../pages/BankHistory/Deposit';
import Withdraw from '../pages/BankHistory/Withdraw';

//Crypto Transaction History
import CryptoDepositHistory from "../pages/CryptoTransacHistory/Deposit";
import CryptoWithdrawHistory from "../pages/CryptoTransacHistory/Withdraw";

//Admin bank and upi
import AdminBank from '../pages/AdminBank';
import AdminUpi from '../pages/AdminUpi';

//Auth Routes
import Login from "../pages/Auth/Login";
import Forgot from "../pages/Auth/Forgot";
import ChangePassword from '../pages/Auth/ChangePassword';

//blogs
import BlogCategory from "../pages/Blogs/BlogCategory";
import BlogList from '../pages/Blogs/BlogList';
import BlogCreate from '../pages/Blogs/BlogCreate';
import Nav from '../components/Nav';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setActive } from "../../Redux/userActivePage.js"
import { useSelector } from "react-redux";



import ManualWithdraw from "../pages/ManualWithdraw";

//Transferusdt
import Transferusdt from '../pages/Transferusdt';
function MainPage() {
    const routing = [
        {
            name: 'Transfer',
            path: '/Transfer',
            Component: Transferusdt
        },
        {
            name: 'INR_WITHDRAWL',
            path: '/inr-withdrawl',
            Component: INR_WITHDRAWL
        },
        {
            name: 'NewsBoard',
            path: '/news-board',
            Component: NewsBoard
        },
        {
            name: 'Wallet',
            path: '/wallet',
            Component: Wallet
        },
        {
            name: 'users',
            path: '/users',
            Component: Users
        },
        {
            name: 'crypto',
            path: '/crypto',
            Component: ListCrypto
        },
        {
            name: 'INRDeposit',
            path: '/inr-deposit',
            Component: INRDeposit
        },
        {
            name: 'Orders',
            path: '/orders',
            Component: Orders
        },
        {
            name: 'Tds',
            path: '/Tds',
            Component: Tds
        },
        
        {
            name: 'Dashboard',
            path: '/dashboard',
            Component: Dashboard
        },
        {
            name: 'KycVerification',
            path: '/kycverification',
            Component: KycVerification
        },
        {
            name: 'TradingFeeReport',
            path: '/trading-fee-report',
            Component: TradingFeeReport
        },
        {
            name: 'client-report',
            path: '/client-report',
            Component: ClientReport
        },
        {
            name: 'bank-verification',
            path: '/bank-verification',
            Component: BankVerification
        },
        {
            name: 'upi-verification',
            path: '/upi-verification',
            Component: UpiVerification
        },
        // {
        //     name:'create-order',
        //     path:'/create-order',
        //     Component:CreateOrder
        // },
        {
            name: 'order-list',
            path: '/order-list',
            Component: OrderList
        },
        {
            name: 'chat-list',
            path: '/chat-list',
            Component: ChatList
        },
        {
            name: 'wallet-transaction-list',
            path: '/wallet-transaction-list',
            Component: WalletTransactionList
        },
        {
            name: 'listed-coin',
            path: '/listed-coin',
            Component: ListedCoin
        },
        {
            name: 'pages',
            path: '/pages',
            Component: Pages
        },
        {
            name: 'liquidity',
            path: '/liquidity',
            Component: Liquidity
        },
        {
            name: 'template-list',
            path: '/template-list',
            Component: Template
        },
        {
            name: 'create-template',
            path: '/create-template',
            Component: CreateTemplate
        },
        {
            name: 'stake-create',
            path: '/stake-create',
            Component: StakeCreate
        },
        {
            name: 'stake-plan-list',
            path: '/stake-plan-list',
            Component: StakePlanList
        },
        {
            name: 'user-stake-list',
            path: '/user-stake-list',
            Component: UserStakeList
        },
        {
            name: 'banner',
            path: '/banner',
            Component: Banner
        },
        {
            name: 'support-category',
            path: '/support-category',
            Component: SupportCategory
        },
        {
            name: 'ticket-list',
            path: '/ticket-list',
            Component: TicketList
        },
        {
            name: 'currencies',
            path: '/currencies',
            Component: Currencies
        },
        {
            name: 'settings',
            path: '/settings',
            Component: Settings
        },
        {
            name: 'bank-deposit-history',
            path: '/bank-deposit-history',
            Component: Deposit
        },
        {
            name: 'bank-withdraw-history',
            path: '/bank-withdraw-history',
            Component: Withdraw
        },
        {
            name: 'crypto-deposit-history',
            path: '/crypto-deposit-history',
            Component: CryptoDepositHistory
        },
        {
            name: 'crypto-withdraw-history',
            path: '/crypto-withdraw-history',
            Component: CryptoWithdrawHistory
        },
        {
            name: 'admin-bank',
            path: '/admin-bank',
            Component: AdminBank
        },
        {
            name: 'admin-upi',
            path: '/admin-upi',
            Component: AdminUpi
        },
        {
            name: 'Login',
            path: '/',
            Component: Login
        },
        {
            name: 'Forgot',
            path: '/forgot-password',
            Component: Forgot
        },
        {
            name: 'change-password',
            path: '/change-password',
            Component: ChangePassword
        },
        {
            name: 'BlogCategory',
            path: '/blog-category',
            Component: BlogCategory
        },
        {
            name: 'BlogCreate',
            path: '/create-blog',
            Component: BlogCreate
        },
        {
            name: 'BlogList',
            path: '/blog-list',
            Component: BlogList
        },
        {
            name: 'p2p-comission',
            path: '/p2p-comission',
            Component: P2pComission
        },
        {
            name: 'withdrawal',
            path: '/withdrawal',
            Component: ManualWithdraw
        },
    ]
    const setdata = useSelector((state) => {
        return state
    });
    const [activeComponent, setActiveComponent] = useState(setdata?.setactive?.activeComponents ?? "/dashboard")
    const ActivePage = (val) => {
        setActiveComponent(val);
    }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setActive(activeComponent));
    }, [activeComponent])

    const [size, setSize] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', () => {
            setSize(window.innerWidth)
        })
    })

    return (
        <section className="main-section">
            <div className="container-fluid">
                <div className="row">
                    <div className={`col-md-4 col-xl-3 col-xxl-2 px-0 ${size < 991 ? 'offcanvas offcanvas-end' : ''}`} id="offcanvasNavbar" >
                        <Sidebar ActivePage={ActivePage} activeComponent={activeComponent} />
                    </div>
                    <div className={`col-md-8 col-xl-9 col-xxl-10 p-0 ${size < 991 ? ' offcanvas-body' : ''}`} >
                        <Nav size={size} ActivePage={ActivePage} />
                        {routing.map(({ path, Component }, i) => {
                            return (path == activeComponent &&
                                <Component ActivePage={ActivePage} key={i} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </section >

    )
}



export default MainPage