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
    const length = React.Children.count(children);
    const items = React.Children;
    console.log("children: ");
    console.log(children);

    // const updateIndex = (newIndex) => {



    //     if (newIndex < 0) {
    //         newIndex = 0;
    //     } else if (newIndex >= length) {
    //         newIndex = length - 1;
    //     }
    //     setActiveIndex(newIndex);
    //     handleUpdateIndexCallback(newIndex);
    // };


    // 0   1   2   (9)

    // currentFilter === length - 1 - offSet ? 0 : currentFilter + 1

    const nextIndex = () => {
        let newIndex;
        if (activeIndex === totalLength - offset) {
            newIndex = 0;
        }
        else {
            newIndex = activeIndex + 1;
        }
        console.log("next");
        console.log(newIndex);
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
        console.log("previous");
        console.log(newIndex);
        setActiveIndex(newIndex);
        handleUpdateIndexCallback(newIndex);

    };


    return (
        <div className="carousel-container">
            {totalLength > offset && <i className="fa-solid fa fa-chevron-left fa-lg" disabled={activeIndex === 0} onClick={prevIndex}></i>
            }
            <div className="carousel" >
                <div className="inner" style={{ transform: `translateX(-${activeIndex * 0}%)` }}>
                    {items.map(children, (child) => {
                        return React.cloneElement(child, { width: "100%" });
                    })}
                </div>

            </div>
            {totalLength > offset && <i className="fa-solid fa fa-chevron-right fa-lg"
                disabled={activeIndex === totalLength - offset}
                onClick={nextIndex}></i>}
        </div>
    );
};


export default Carousel;