import "./App.css";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { call, signout } from "./service/ApiService";

import React, { useState, useEffect } from "react";
import {
  Paper,
  List,
  Container,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Grid,
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
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
    // DB 목록을 정상적으로 가져왔다면 loading 값이 false로 변경
    call("/todo", "GET", null).then((response) => {
      setItems(response.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    // 추후 일괄 삭제 기능 추가를 위한 기능
    // items가 변경될 때마다 사용자가 선택한 목록이 checked에 추가된다.
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

  var navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">오늘의 할 일</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={signout}>
              logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  // login 중이 아니라면
  var todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
        <AddTodo addTodo={addTodo} />
        <div className="TodoList">{todoItems}</div>
      </Container>
      <div>
        <Button variant="outlined" color="inherit" startIcon={<Delete />}>
          선택 항목 삭제
        </Button>
      </div>
    </div>
  );

  // login 중이라면
  var loadingPage = <h1>로딩중 ... </h1>;
  var content = loadingPage;

  if (!loading) {
    content = todoListPage;
  }

  return <div className="App">{content}</div>;
}

export default App;
