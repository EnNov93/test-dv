import React, {useContext} from "react";
import PropTypes from "prop-types";
import Context from '../context'

const styles = {
  li: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ".5rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: ".5rem",
  },
  input: {
    marginRight: '1rem'
  }
};

function ToDoItem({ todo, index, onChange }) {
  const {removeTodo} = useContext(Context)
  const classes = []
  if (todo.complited){
    classes.push('done')
  }


  return (
    <li style={styles.li}>
      <span className={classes.join(' ')}>
        <input checked={todo.complited} style={styles.input} type="checkbox" onChange={()=>onChange(todo.id)}/>
        <strong>{index + 1}</strong>
        &nbsp;
        {todo.title}
      </span>

      <button className='rm' onClick={()=>{removeTodo(todo.id)}}>&times;</button>
    </li>
  );
}
ToDoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ToDoItem;
