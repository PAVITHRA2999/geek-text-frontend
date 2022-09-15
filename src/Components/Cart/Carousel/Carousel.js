import React, { useState } from "react";
import "./Carousel.css";

export const CarouselItem = ({ children, width }) => {
    return (
        <div className="carousel-item" style={{ width: width }}>
            {children}
        </div>
    );
};
const Carousel = ({ children, handleUpdateIndexCallback, offset, totalLength }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const items = React.Children;
    const nextIndex = () => {
        let newIndex;
        if (activeIndex === totalLength - offset) {
            newIndex = 0;
        }
        else {
            newIndex = activeIndex + 1;
        }
        setActiveIndex(newIndex);
        handleUpdateIndexCallback(newIndex);

    };

    const prevIndex = () => {
        let newIndex;
        if (activeIndex === 0) {
            newIndex = 0;
        }
        else {
            newIndex = activeIndex - 1;
        }
        setActiveIndex(newIndex);
        handleUpdateIndexCallback(newIndex);
    };

    return (
        <div className="carousel-container">
            {
                (totalLength > offset || activeIndex !== 0) &&
                <i className="fa-solid fa fa-chevron-left fa-lg indicator" disabled={activeIndex === 0} onClick={prevIndex}></i>
            }
            <div className="carousel" >
                <div className="inner" style={{ transform: `translateX(-${(activeIndex) * 25}%)` }}>
                    {items.map(children, (child) => {
                        return React.cloneElement(child, {
                            width: "100%"
                        });
                    })}
                </div>

            </div>
            {((totalLength > offset) || (activeIndex < totalLength - offset)) && <i className="fa-solid fa fa-chevron-right fa-lg indicator"
                disabled={activeIndex >= totalLength - offset}
                onClick={nextIndex}></i>}
        </div>
    );
};


export default Carousel;
