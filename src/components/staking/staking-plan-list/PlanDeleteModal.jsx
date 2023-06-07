import React from "react";


const PlanDeleteModal = () => {
 
    return(
        <>
            <div className="modal fade common-modal" id="stakeplandeleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-md modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body admin-form text-center">
                            <h4 className="mb-3">Are you sure you want to delete?</h4>
                            <div className="d-flex justify-content-center gap-3">
                                <button className="btn text-capitalize" data-bs-dismiss="modal" id="closeDeleteBanner">cancel</button>
                                <button className="btn text-capitalize" >yes, delete!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PlanDeleteModal;