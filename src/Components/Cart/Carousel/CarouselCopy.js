import React, { useState } from "react";
import "./Carousel.css";

export const CarouselItem = ({ children, width }) => {
    return (
        <div className="carousel-item" style={{ width: width }}>
            {children}
        </div>
    );
};
const CarouselCopy = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const itemsNumber = React.Children.count(children);

    const updateIndex = (newIndex) => {
        console.log("update index");
        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex >= React.Children.count(children)) {
            newIndex = React.Children.count(children) - 1;
        }
        setActiveIndex(newIndex);
    };
    return (
        <div className="carousel-container">
            <i className="fa-solid fa fa-chevron-left fa-lg" disabled={activeIndex === 0} onClick={() => updateIndex(activeIndex - 1)}></i>

            <div className="carousel">
                <div className="inner" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                    {React.Children.map(children, (child) => {
                        return React.cloneElement(child, { width: "100%" });
                    })}
                </div >

            </div>
            <i className="fa-solid fa fa-chevron-right fa-lg" disabled={activeIndex === (itemsNumber - 1)} onClick={() => updateIndex(activeIndex + 1)}></i>

        </div>
    );
};

export default CarouselCopy;