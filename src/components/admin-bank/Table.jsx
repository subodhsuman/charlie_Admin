import React from "react";

const Table = ({ data, setViewData, updateBank }) => {

  return (
    <>
      <div className="admin-table table-responsive">
        <table
          className="table align-middle table-bordered w-100"
          id="table-container"
        >
          <thead>
            <tr>
              <th>Id</th>
              <th>Account Holder Name</th>
              <th>Account Type</th>
              <th>IFSC Code</th>
              <th>Bank Name</th>
              <th>Enable Bank Account</th>
              <th>Action</th>
            </tr>
          </thead>
          {data?.length > 0 ? (
            <tbody>
              {data.map((v, i) => {
                return (
                  <tr key={i}>
                    <td>{v.id}</td>
                    <td>{v.account_holder_name}</td>
                    <td>{v.account_type}</td>
                    <td>{v.ifsc_code}</td>
                    <td>{v.bank_name}</td>
                    <td>
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={v?.status == 1 ? true : false || ''} onChange={(event) => updateBank(event.target.checked, v?.id)} />
                      </div>
                    </td>
                    <td>
                      <div className="export-btn">
                        <button className="btn text-capitalize" data-bs-toggle="modal" data-bs-target="#updateBankModal" onClick={() => setViewData(v)}>
                          edit
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td
                  colSpan={10}
                  className="text-center"
                  style={{ color: "var(--white)" }}
                >
                  No Data Found.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};
export default Table;
