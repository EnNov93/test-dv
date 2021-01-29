import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import Context from "../context";
import { BsArrowReturnRight } from "react-icons/bs";

const styles = {
  child: {
    margin: "0.5rem 0 0.5rem 2rem",
    display: "flex",
    flexDirection: "column",
  },
};

function OneItem({ hFlag, item, data }) {
  const ActivContext = useContext(Context);
  console.log(item);

  let arr = [];
  if (item.parts !== undefined)
    item.parts.forEach((element) => {
      data.forEach((el) => {
        if (element === el.id) {
          arr.push(el);
        }
      });
    });
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {!hFlag && <BsArrowReturnRight size='2rem' color='gray' />}
        <Button
          style={{ width: "100%", color:item.id == ActivContext.active? 'white' : hFlag? 'black' : item.parts!==undefined?  '#404040' : 'gray' , fontWeight: hFlag? 'bold' : 'normal' }}
          variant={
            item.id == ActivContext.active
              ? "secondary"
              : hFlag? "outline-dark" :  "outline-secondary"
          }
          onClick={() => {
            ActivContext.setActive(
              item.id == ActivContext.active ? "" : item.id
            );
          }}
        >
          {item.name}
        </Button>
      </div>

      <div style={styles.child}>
        {arr.map((el) => (
          <OneItem key={el.id} item={el} active data={data}></OneItem>
        ))}
      </div>
    </>
  );
}

OneItem.propTypes = {};

export default OneItem;
