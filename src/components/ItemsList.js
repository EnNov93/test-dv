import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import OneItem from "./OneItem";
const styles = {

};

function ItemsList({ headData, data }) {
    console.log(headData)
    return (
        <>
            <h2>Items List</h2>
            {
                headData.map(element => <OneItem key={element.id} item={element} data={data} />
            )}
        </>
    )
}

ItemsList.propTypes = {
    headDdata: PropTypes.array
}

export default ItemsList