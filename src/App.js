import "./App.css";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { call } from "./service/ApiService";
import React from "react";
import { Paper, List, Container } from "@material-ui/core";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  // Todo에 대한 CRUD 이후 갱신된 리스트 출력을 위해 코드 일부 변경
  add = (item) => {
    call("/todo", "POST", item).then((response) =>
      // this.setState({ items: response.data })
      this.retrieve()
    );
  };

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) =>
      // this.setState({ items: response.data })
      this.retrieve()
    );
  };

  update = (item) => {
    call("/todo", "PUT", item).then((response) =>
      // this.setState({ items: response.data })
      this.retrieve()
    );
  };

  retrieve = () => {
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data })
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

    return (
      <div className="App">
        <Container maxWidth="md">
          <AddTodo add={this.add} />
        </Container>
        <div className="TodoList">{todoItems}</div>
      </div>
    );
  }
}

export default App;
