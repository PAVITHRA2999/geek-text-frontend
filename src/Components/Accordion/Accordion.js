import "./Accordion.css";
import React, { useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Accordion = (props) => {
    const [clicked, setClicked] = useState(false);

    const toggle = index => {
        if (clicked === index) {
            //if clicked question is already active, then close it
            return setClicked(null);
        }

        setClicked(index);
    };

    return (<div className='accordion_section'>
        <div className='accordion_container'>
            {props.data.map((item, index) => {
                return (
                    <div key={index}>
                        <div className='accordion_wrap' onClick={() => toggle(index)} key={index}>
                            <div className="accordion_header">{item.heading}</div>
                            <div>{clicked === index ?
                                <ExpandLessIcon />
                                :
                                <ExpandMoreIcon />
                            }
                            </div>
                        </div>
                        {clicked === index ? (
                            <div className='accordion_dropdown'>
                                {item.content}
                            </div>
                        ) : null}
                    </div>
                );
            })}
        </div>
    </div>
    );
};

export default Accordion;
