import React from "react";
import PropTypes from "prop-types";

const styles = {
    child:{
        marginLeft: '2rem'
    }
  
};

function OneItem({ item, data }) {
    console.log(item)
    let arr = []
    if (item.parts !== undefined) item.parts.forEach(element => {
        data.forEach(el => {
            if (element === el.id) { arr.push(el) }
        })
    })
    return (
        <>
            <p>{item.name}</p>
            <div style={styles.child}>
            {
                arr.map(el => <OneItem key={el.id} item={el} data={data}></OneItem>)
            }
            </div>
           
        </>
    )
}

OneItem.propTypes = {

}

export default OneItem