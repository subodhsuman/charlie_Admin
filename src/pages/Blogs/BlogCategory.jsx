import React,{useState,useEffect} from "react";
import Sidebar from '../../layout/Sidebar.jsx';
import Heading from "../../components/Utils/Heading.jsx";
import BlogCategoryTable from '../../components/blogs/blog-category/BlogCategoryTable';
import BlogCategoryForm from '../../components/blogs/blog-category/BlogCategoryForm';
import ApiClass from "../../Api/api.js";
import { generatePDF,generateExcel } from "../../common/Export";

const BlogCategory = () => {
    //states
    const [data,setData] = useState([]);
    const [loader, setLoader] = useState(true);
    const [page, setPage] = useState('');

  //BLog Category List get
    const BlogCategoryList = async() => {
    let response = await ApiClass.getNodeRequest(`category/get?page=${page}&per_page=10`,true);
    setLoader(false);             
    if(!response.data.hasOwnProperty('status_code')){
        SwalClass.success("Unable to fetch data at this time.");
        return;
    }

    if(response?.data?.status_code == 0){
        return
    }

    if(response?.data?.status_code == 1){
        setData(response?.data?.data || []);
    }
}

    useEffect(()=>{
        setLoader(true)
        BlogCategoryList();
    },[]);

 //export tabel
 const handleOnExport = async(type) => {
    let response = await ApiClass.getNodeRequest(`category/get`,true);
    if(!response.data.hasOwnProperty('status_code')){
        SwalClass.success("Unable to Export at this time.");
        return;
    }

    if(response?.data?.status_code == 0){
        SwalClass.failed(response?.data?.message)
        return
    }

    if(response?.data?.status_code == 1){

        let d = response?.data?.data;

        if(d.length == 0){
            SwalClass.success("No Data to Export in Pdf/Excel.")
            return;
        }

        if(type == 0){  // Excel
            generateExcel(d);
            return;
        }

        if(type == 1){ // PDF
            let heading = ['id','name',"created_at"];
            return generatePDF(heading, d, "Blog_Category_List"); // 
        }
    }
}

const handlePageClick = (e) => {
    setPage(e.selected+1)
}
    return(
        <>
        
            <section className="dashboard-sec"> 
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center">
                        <Heading 
                            text="Blog Category List"
                            image="blog.webp"
                        />
                        <div className="d-flex align-items-center gap-2">
                         <button className="btn p-0 border-0" data-bs-toggle="modal" data-bs-target="#blogCategoryModal">
                            <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--white)"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"/></svg>
                        </button>
                        <button className="btn p-0 border-0" data-bs-toggle="dropdown" data-bs-target="#exportDropdown">
                                <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V28.5h3V39h30V8.9H9v10.6H6V8.9q0-1.2.9-2.1.9-.9 2.1-.9h30q1.2 0 2.1.9.9.9.9 2.1V39q0 1.2-.9 2.1-.9.9-2.1.9Zm11.65-8.35L18.4 31.4l5.9-5.9H6v-3h18.3l-5.9-5.9 2.25-2.25L30.3 24Z" /></svg>
                            </button>
                            <ul className="dropdown-menu p-0" id="exportDropdown">
                                <li>
                                    <a className="dropdown-item rounded" href="#" onClick={()=>handleOnExport(0)}>Excel</a>
                                </li>
                                <li>
                                    <a className="dropdown-item rounded" href="#" onClick={()=>handleOnExport(1)}>Pdf</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <BlogCategoryTable 
                               data={data}
                               setLoader={setLoader}
                               loader={loader}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <BlogCategoryForm BlogCategoryList={BlogCategoryList}/>
        
        </>
    )
}
export default BlogCategory;