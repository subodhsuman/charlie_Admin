import React, { useEffect, useState } from "react";
import Sidebar from "../layout/Sidebar";
import Heading from "../components/Utils/Heading";
import ApiClass from "../Api/api.js";
import SwalClass from "../common/swal.js";
import Swal from "sweetalert2";

const Settings = () => {
  const [data, setData] = useState();


  const getAuthority = async () => {
    let val = await ApiClass.getNodeRequest("user/get/authority");

    if (val === undefined) {
      SwalClass.failed(val?.data?.message);
      return;
    }

    if (val?.data?.status_code === 0) {
      SwalClass.success(val?.data?.message);
      return
    }

    if (val?.data?.status_code === 1 || []) {
      setData(val?.data?.data);
      return;
    }
  };


  const statusUpdate = (val) => {
    Swal.fire({
      title: "Please Confirm..",
      text: `Are you sure you want to change  ${val.type}`,
      icon: "warning",
      iconColor: "var(--red)",
      background:'var(--side-bg)',
      color:'var(--white)',
      showCancelButton: true,
      confirmButtonColor: "var(--blue)",
      cancelButtonColor: "var(--red)",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(async (value) => {
        
      if (value.isConfirmed) {
        let onoff = val?.status == "on" ? "off" : "on";
        const fn = {
          status: onoff,
          type: val?.type,
        };

        let response = await ApiClass.postNodeRequest("user/set/authority", true, fn);
        if (response?.data?.status_code == 1) {
          Swal.fire(response?.data?.message);
            getAuthority()
        }
        if (response?.data?.status_code == 0) {
          SwalClass.failed(response?.data?.message);
        }
      
      }
    });
  };

  useEffect(() => {
    getAuthority();
  }, []);

  return (
    <>
      
        <section className="dashboard-sec">
          <div className="container-fluid">
            <Heading text="settings" image="gear.webp" />
            <div className="row justify-content-center">
              <div className="col-sm-12 col-md-10 col-xxl-6">
                <div className="template-list p-sm-5">
                  <div className="card p-4 mb-4 mb-md-0">
                    <div className="d-flex justify-content-center text-center">
                      <div
                        className="template-image mb-3"
                        style={{ height: "150px", width: "150px" }}
                      >
                        <img
                          loading="lazy"
                          src="./images/gear.webp"
                          alt="settings"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                    <div className="card-footer">
                      {data?.map((val, i) => {
                        return (
                          <div
                            className="d-flex justify-content-between mb-3"
                            key={i}
                          >
                            <h6 className="text-capitalize mb-0">
                              {val?.type == "maintenance"? "Exchange"
                                : val.type}{" "}
                              under maintenance
                            </h6>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={val.status == "on" ? true : false || ''}
                                onChange={newChange => {}}
                                onClick={() => statusUpdate(val)}
                                id={i}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      
    </>
  );
};
export default Settings;
