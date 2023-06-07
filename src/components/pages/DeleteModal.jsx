import React from "react";
import ApiClass from "../../Api/api";
import SwalClass from "../../common/swal";

const DeleteModal = ({ senddata, getPages }) => {
    let { id } = senddata
    const deleteRequest = async () => {
        let response = await ApiClass.deleteRequest(`pages/delete?id=${id}`, true);
        if (response?.data?.status_code == 0) {
            SwalClass.failed(response?.data?.message);
            return;
        }
        if (response?.data?.status_code == 1) {
            SwalClass.success(response?.data?.message);
            document.getElementById('closeDeleteBlog').click();
            getPages()
            return;
        }
    }
    return (
        <>
            <div className="modal fade common-modal" id="deletePageModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-md modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body admin-form text-center">
                            <h4 className="mb-3">Are you sure you want to delete?</h4>
                            <div className="d-flex justify-content-center gap-3">
                                <button className="btn text-capitalize" data-bs-dismiss="modal" id="closeDeleteBlog">cancel</button>
                                <button className="btn text-capitalize" onClick={() => { deleteRequest() }}>yes, delete!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DeleteModal;