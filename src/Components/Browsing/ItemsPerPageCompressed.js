import React from "react";
import GridViewIcon from '@mui/icons-material/GridView';

const ItemsPerPageCompressed = ({ itemsNumber, selected }) => {
    return (
        <div className={`browser-buttons browser-per-page-buttons ${!selected ? "per-page-not-selected" : "per-page-selected"}`}>
            <p>{itemsNumber}</p>
            <GridViewIcon />
        </div>
    );
};

export default ItemsPerPageCompressed;
