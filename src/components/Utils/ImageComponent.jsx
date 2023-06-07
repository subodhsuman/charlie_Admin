import React from "react";

const ImageComponent = ({source, alt, height, width, classname}) => {
    return(
            <img loading="lazy" src={source || ''} className={classname || ''} alt={alt || ''} height={height || ''} width={width || ''} onError={event => {
                event.target.src = "./images/not-found.webp"
                event.onerror = null
            }}   />
    )
}

export default ImageComponent;