import "./App.css";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { call, signout } from "./service/ApiService";
import React from "react";
import {
  Paper,
  List,
  Container,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loding: true,
    };
  }

  // Todo에 대한 CRUD 이후 갱신된 리스트 출력을 위해 코드 일부 변경
  // 백엔드 코드 변경을 통해 다시 교재의 코드로 변경
  add = (item) => {
    call("/todo", "POST", item).then(
      (response) => this.setState({ items: response.data })
      // this.retrieve()
    );
  };

  delete = (item) => {
    call("/todo", "DELETE", item).then(
      (response) => this.setState({ items: response.data })
      // this.retrieve()
    );
  };

  update = (item) => {
    call("/todo", "PUT", item).then(
      (response) => this.setState({ items: response.data })
      // this.retrieve()
    );
  };

  retrieve = () => {
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data, loading: false })
    );
  };

  componentDidMount() {
    // call("/todo", "GET", null).then((response) =>
    //   this.setState({ items: response.data })
    // );
    this.retrieve();
  }

  render() {
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo
              item={item}
              key={item.id}
              delete={this.delete}
              update={this.update}
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
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );

    // login 중이라면
    var loadingPage = <h1>로딩중 ... </h1>;
    var content = loadingPage;

    if (!this.state.loading) {
      content = todoListPage;
    }

    return <div className="App">{content}</div>;
  }
}

export default App;
