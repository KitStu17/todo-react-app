import React, { useState, useEffect } from "react";
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

function Todo(props) {
  const [item, setItem] = useState(props.item);
  const [readOnly, setReadOnly] = useState(true);
  const [color, setColor] = useState("#ffffff");

  const deleteEventHandler = () => {
    props.deleteTodo(item);
  };

  const offReadOnlyMode = () => {
    setReadOnly(false);
  };

  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      setReadOnly(true);
      props.updateTodo(item);
    }
  };

  const editEventHandler = (e) => {
    const thisItem = { ...item };
    thisItem.title = e.target.value;
    setItem(thisItem);
  };

  const checkboxEventHandler = (e) => {
    const thisItem = { ...item };
    thisItem.done = thisItem.done ? false : true;
    setItem(thisItem);
    setReadOnly(true);

    props.updateTodo(thisItem);
  };

  useEffect(() => {
    if (item.done) {
      setColor("#ffecb3");
    } else {
      setColor("#ffffff");
    }
  }, [item]);

  return (
    <ListItem>
      <Checkbox checked={item.done} onChange={checkboxEventHandler} />
      <ListItemText style={{ backgroundColor: color }}>
        <InputBase
          inputProps={{ "aria-label": "naked", readOnly: readOnly }}
          type="text"
          id={item.id}
          name={item.id}
          value={item.title}
          multiline={true}
          fullWidth={true}
          onClick={offReadOnlyMode}
          onChange={editEventHandler}
          onKeyDown={enterKeyEventHandler}
        />
      </ListItemText>

      <ListItemSecondaryAction>
        <IconButton aria-label="Delete" onClick={deleteEventHandler}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Todo;
