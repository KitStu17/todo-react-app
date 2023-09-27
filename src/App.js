import "./App.css";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { call } from "./service/ApiService";
import React, { useState, useEffect } from "react";
import { Paper, List, Container } from "@material-ui/core";

function App() {
  const [items, setItems] = useState([]);
  const [checked, setChecked] = useState([]);

  const addTodo = (item) => {
    // 목록 추가
    call("/todo", "POST", item).then((response) => setItems(response.data));
  };

  const deleteTodo = (item) => {
    // 목록 삭제
    call("/todo", "DELETE", item).then((response) => setItems(response.data));
  };

  const updateTodo = (item) => {
    // 목록 갱신
    call("/todo", "PUT", item).then((response) => setItems(response.data));
  };

  useEffect(() => {
    // 페이지가 마운트 될 때 목록을 DB에서 가져옴
    call("/todo", "GET", null).then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    // 추후 일괄 삭제 기능 추가를 위한 기능
    // 사용자가 선택한 목록이 checked에 추가된다.
    if (items.length > 0) {
      const thisItems = [...items];
      var newItems = [];
      thisItems.forEach((todo) => {
        if (todo.done === true) {
          newItems.push(todo);
        }
      });
      setChecked(newItems);
      console.log(newItems);
    }
  }, [items]);

  var todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item, idx) => (
          <Todo
            item={item}
            key={item.id}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </List>
    </Paper>
  );

  return (
    <div className="App">
      <Container maxWidth="md">
        <AddTodo addTodo={addTodo} />
      </Container>
      <div className="TodoList">{todoItems}</div>
    </div>
  );
}

export default App;
