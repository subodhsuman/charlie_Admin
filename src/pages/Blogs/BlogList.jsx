import React, { useState, useEffect } from "react";
import Sidebar from '../../layout/Sidebar.jsx';
import Heading from '../../components/Utils/Heading';
import ApiClass from "../../Api/api.js";
import Pagination from "../../components/Utils/Pagination.jsx";
import Date from "../../common/Date.js";
import BlogEdit from "../../components/blogs/BlogEdit.jsx";
const BlogList = () => {
    const [categories, setCategories] = useState([]);
    const [blogList, setBlogList] = useState([]);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState('');
    const [d, setD] = useState({})
    //BLog Category List get
    const CategoryList = async () => {
        let response = await ApiClass.getNodeRequest(`category/get`, true);
        console.log({response});
        if (response?.data?.status_code == 0) {
            return
        }

        if (response?.data?.status_code == 1) {
            setCategories(response?.data?.data || []);
            return
        }
    }

    //BLog List get
    const BlogList = async () => {
        let response = await ApiClass.getNodeRequest(`blog/get?page=${page}&per_page=3`, true);
        if (!response.data.hasOwnProperty("status_code")) {
            return;
        }
        if (response?.data?.status_code == 0) {
            return
        }

        if (response?.data?.status_code == 1) {
            setBlogList(response?.data?.data.data || []);
            setPagination({
                page: response?.data?.data?.current_page,
                last_page: response?.data?.data?.last_page,

            })
            return;
        }
    }

    useEffect(() => {
        CategoryList();
    }, []);


    useEffect(() => {
        BlogList();
    }, [page]);


    const handlePageClick = (e) => {
        setPage(e.selected + 1)
    }

    const setViewData = (v) => {
        setD(v)
    }

    return (
        <>
            
                <section className="dashboard-sec">
                    <div className="container-fluid">
                        <Heading
                            text="Blog List"
                            image="blog.webp"
                        />  
                        <div className="row">
                            <div className="col-md-8 col-xl-9">
                                <div className="custom-blog-content rounded p-2 p-md-4">


                                    <ul className="nav nav-tabs justify-content-center blog-navtab" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link text-capitalize active" id="blog-tab" data-bs-toggle="tab" data-bs-target="#blog-tab-pane" type="button" role="tab" aria-controls="blog-tab-pane" aria-selected="true">blogs</button>
                                        </li>

                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade p-3 show active" id="blog-tab-pane" role="tabpanel" aria-labelledby="blog-tab" tabIndex="0">
                                            <div className="container">
                                                <div className="row justify-content-center">
                                                    <div className="col-md-10 col-xl-8">
                                                        <div className="">

                                                            <div className="change-view">
                                                                <div className="export-btn">
                                                                    <div className="d-flex align-items-center justify-content-between">
                                                                        <div>
                                                                            <h6 className="mb-0 text-capitalize">blog list</h6>
                                                                        </div>
                                                                        <div className="d-flex align-items-center gap-2">
                                                                            <p className="mb-0">View</p>
                                                                            <ul className="nav nav-pills list-crypto-tabs" id="pills-tab" role="tablist">
                                                                                <li className="nav-item" role="presentation">
                                                                                    <button className="nav-link active" id="pills-tab1-tab" data-bs-toggle="pill" data-bs-target="#pills-tab1" type="button" role="tab" aria-controls="pills-tab1" aria-selected="true"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="rgba(243, 241, 241, 1)"><path d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm16-8V6H8.023v2H18.8zM8 11h12v2H8zm0 5h12v2H8z"></path></svg></button>
                                                                                </li>
                                                                                <li className="nav-item" role="presentation">
                                                                                    <button className="nav-link" id="pills-tab2-tab" data-bs-toggle="pill" data-bs-target="#pills-tab2" type="button" role="tab" aria-controls="pills-tab2" aria-selected="false"> <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="rgba(243, 241, 241, 1)"><path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm5 2h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm1-6h4v4h-4V5zM3 20a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6zm2-5h4v4H5v-4zm8 5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6zm2-5h4v4h-4v-4z"></path></svg></button>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <div className="tab-content" id="pills-tabContent">
                                                                        <div className="tab-pane fade show active" id="pills-tab1" role="tabpanel" aria-labelledby="pills-tab1-tab" tabIndex="0">
                                                                            <div className="div_box">
                                                                                <div className="row">
                                                                                    {blogList.map((v, i) => {
                                                                                        return (
                                                                                            <div className="col-md-12" key={i}>
                                                                                                <div className="blogs">
                                                                                                    <h5 className="mb-2 fw-bold" style={{ color: 'var(--blue)' }}>{v?.name}</h5>
                                                                                                    <p className="mb-2">{Date.getDate(v?.created_at)}</p>
                                                                                                    <img src={v?.image} alt="blog-content" className="mb-2 img-fluid" />
                                                                                                    <p className="mb-2" dangerouslySetInnerHTML={{ __html: v?.description }} style={{maxHeight:'400px',overflowY:'scroll'}}></p>
                                                                                                    <div className="export-btn mb-3">
                                                                                                        <button className="btn" data-bs-toggle="modal" data-bs-target="#blogEditModalMain" onClick={() => setViewData(v)} >Edit</button>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <hr />
                                                                                            </div>
                                                                                        )
                                                                                    })}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {/* first tab */}
                                                                        <div className="tab-pane fade" id="pills-tab2" role="tabpanel" aria-labelledby="pills-tab2-tab" tabIndex="0">
                                                                            <div className="div_box">
                                                                                <div className="row">
                                                                                    {blogList.map((v, i) => {
                                                                                        return (
                                                                                            <div className="col-md-6" key={i}>
                                                                                                <div className="blogs">
                                                                                                    <h5 className="mb-2 fw-bold" style={{ color: 'var(--blue)' }}>{v?.name}</h5>
                                                                                                    <p className="mb-2">{Date.getDate(v?.created_at)}</p>
                                                                                                    <img src={v?.image} alt="blog-content" className="mb-2 img-fluid" />
                                                                                                    <p className="mb-2" dangerouslySetInnerHTML={{ __html: v?.description }}></p>
                                                                                                    <div className="export-btn mb-3">
                                                                                                        <button className="btn" data-bs-toggle="modal" data-bs-target="#blogEditModalMain" onClick={() => setViewData(v)} >Edit</button>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <hr />
                                                                                            </div>
                                                                                        )
                                                                                    })}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {/* second tab */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-xl-3">
                                <div className="custom-blog-content rounded p-2 p-md-4">
                                    <h6 className="mb-3">Categories</h6>
                                    <ul className="list-group blog-menu">
                                        
                                        {categories.map((val, i) => {
                                            return (
                                                <li className="list-group-item mb-2 border-0 p-0" key={i}>

                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="var(--light-gray)"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                                                    {val?.name}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    <hr className="mb-0" />
                                </div>
                            </div>
                        </div>
                        <Pagination pagination={pagination} handlePageClick={handlePageClick} />
                    </div>
                </section>
                <BlogEdit data={d} categories={categories} BlogList={BlogList}/>
            
        </>
    )
}
export default BlogList;