import React,{useState} from "react";
import Date from "../../../common/Date";
import ReactPaginate from "react-paginate";
var itemsPerPage = 10
const Table = ({data,loader}) => {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
      };


    const newTextOnKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            // Users();
        }   
    };

    const searchBy = (e) => {
        e.preventDefault();
        // Users();
    }

    const sorting = (field) => {
        // setsortBy(field)
        // sort_type == 'ASC' ?setsortType('DESC'):setsortType('ASC')
    }
    const clearDate = () => {
        document.getElementById('datepicker').reset();
        // setDate('')
    }
    
    
    return(
        <>
            <div className="admin-table table-responsive">
                <table className="table align-middle table-bordered w-100" id="table-container">  
                    <thead>
                        <tr>
                            <th>
                                Id
                            </th>
                            <th>
                                Category Name
                            </th>
                            <th>
                                Created At
                            </th>
                        </tr>
                    </thead>
                    {loader ?
                        <tbody>
                                <tr>
                                    <td colSpan={10} className="text-center">
                                        <div className="loader-outer d-flex align-items-center justify-content-center" style={{minHeight:'40vh'}}>
                                            <div className="spinner-border" role="status" style={{height:'70px',width:'70px'}}>
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                        </tbody>
                        :
                        <>
                    {currentItems?.length>0?
                    <tbody>
                        {currentItems.map((val,index)=>(
                            <tr key={index}>
                                <td>
                                    {val?.id}
                                </td>
                                <td>
                                    {val?.name}
                                </td>
                                <td>
                                    {Date.getDate(val?.created_at)}
                                </td>
                            </tr>
                            ))
                             } 
                        </tbody>
                       :
                        <tbody>
                            <tr>
                                <td colSpan={8} className="text-center" style={{color:'var(--white)'}}>
                                    No Data Found.
                                </td>
                            </tr>
                        </tbody>
                    }
                    </>}
                </table>
                <div className="react-pagination  d-sm-flex justify-content-between align-items-center text-center py-2">
                <p className="mb-0 text-capitalize">
                        showing  {pageCount} pages
                    </p>
                    <div className="pagination-buttons">

                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        breakClassName={'page-item'}
                        breakLinkClassName={'page-link'}
                        containerClassName={'pagination'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        activeClassName={'active'}
                    />
                    </div>
                </div>    
            </div>       
        </>
    )
}
export default Table;