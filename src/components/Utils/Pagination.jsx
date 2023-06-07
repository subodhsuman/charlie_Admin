import React from "react";
import ReactPaginate from 'react-paginate';
const Pagination = ({pagination,handlePageClick}) => {
    return(
        <>
        {pagination != undefined?
             <div className="react-pagination d-sm-flex justify-content-between align-items-center text-center py-2">
                    
                    <p className="mb-0 text-capitalize">
                        showing {pagination?.page} of {pagination.last_page} pages
                    </p>
                    <div className="pagination-buttons">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageCount={Math.ceil(pagination?.last_page) || 1}
                        
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
                        forcePage={pagination?.page-1 || 0}
                    />
                       
                    </div>
                </div>
                :''}
        </>
    )
}
export default Pagination;