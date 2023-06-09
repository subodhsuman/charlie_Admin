import React from "react";

const Export = ({handleOnExport,data}) =>{
    return(
        <>
             <button className="btn p-0 border-0" data-bs-toggle="dropdown" data-bs-target="#exportDropdown">
                <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 48 48" fill="var(--white)"><path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V28.5h3V39h30V8.9H9v10.6H6V8.9q0-1.2.9-2.1.9-.9 2.1-.9h30q1.2 0 2.1.9.9.9.9 2.1V39q0 1.2-.9 2.1-.9.9-2.1.9Zm11.65-8.35L18.4 31.4l5.9-5.9H6v-3h18.3l-5.9-5.9 2.25-2.25L30.3 24Z" /></svg>
            </button>
            <ul className="dropdown-menu p-0" id="exportDropdown">
                <li>
                    <a className="dropdown-item rounded" href="#" onClick={() => handleOnExport(0)}>Excel</a>
                </li>
                <li>
                    <a className="dropdown-item rounded" href="#" onClick={() => handleOnExport(1)}>Pdf</a>
                </li>
            </ul>
        </>
    )
}
export default Export;