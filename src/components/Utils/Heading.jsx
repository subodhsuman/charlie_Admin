import React from "react";
const Heading = ({text,image}) => {
    return(
        <>
            <div className="dashboard-heading mb-3">
                <h5 className="mb-0 d-flex align-items-center text-capitalize">
                    {image &&
                        <img src={`./images/${image}`} alt="image" style={{ width: "35px", height: "35px" }} /> 
                    }
                    &nbsp;
                    {text &&
                        text
                    }
                </h5>
            </div>
        </>
    )
}
export default Heading;