import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import OneItem from "./OneItem";
import { Badge } from "react-bootstrap";

const styles = {
  mainLeft: {
    display: "flex",
    flexDirection: "column",
  },
};

function ItemsList({ headData, data }) {
  return (
    <div style={styles.maimLeft}>
      {headData.map((element) => (
        <OneItem
          hFlag={true}
          key={element.id}
          active
          item={element}
          data={data}
        />
      ))}
    </div>
  );
}

ItemsList.propTypes = {
  headDdata: PropTypes.array,
};

export default ItemsList;
