import React, {Component} from "react";
import "./App.css"

export default class App extends Component {

    state = {
        todoData: [
        ],
        value: ""
    }

    btnStyle = {
        color: "#fff",
        border: "none",
        padding: "5px 9px",
        borderRadius: "50%",
        cursor: "pointer",
        float: "right"
    };

    listStyle = (completed) => {
        return {
            padding: "10px",
            borderBottom: "1px #ccc dotted",
            textDecoration: completed ? "line-through" : "none",
        }
    }

    handleClick = (id) => {
        let newTodoData = this.state.todoData.filter(data => data.id !== id);
        console.log('newTodoData', newTodoData);
        this.setState({todoData: newTodoData})
    }

    handleChange = (e) => {
        this.setState({value: e.target.value});
    }

    handleSubmit = (e) => {
        // form 안에 input을 전송할 때 페이지가 reload 되는 것을 막아줌
        e.preventDefault()

        let newTodo = {
            id: Date.now(),
            title: this.state.value,
            completed: false
        }

        this.setState({todoData: [...this.state.todoData, newTodo], value: ""});
    }

    handleCompleteChange = (id) => {
        let newTodoData = this.state.todoData.map((data) => {
            if (data.id === id) {
                data.completed = !data.completed;
            }
            return data;
        });
        this.setState({todoData: newTodoData})
    }

  render() {
      return (
          <div className="container">
              <div className="todoBlock">
                  <div className="title">
                      <h1>할 일 목록</h1>
                  </div>
                  {this.state.todoData.map((data) => (
                      <div style={this.listStyle(data.completed)} key={data.id}>
                          <input
                              type="checkbox"
                              defaultChecked={data.completed}
                              onChange={()=> this.handleCompleteChange(data.id)}
                          />
                          {data.title}
                          <button style={this.btnStyle} onClick={() => this.handleClick(data.id)}>x</button>
                      </div>
                  ))}

                  <form style={{display: 'flex'}} onSubmit={this.handleSubmit}>
                      <input
                          type="text"
                          name="value"
                          style={{flex: '10', padding: '5px'}}
                          placeholder={"해야 할 일을 입력하세요."}
                          value={this.state.value}
                          onChange={this.handleChange}
                      />
                      <input
                          type="submit"
                          value="입력"
                          className="btn"
                          style={{flex: '1'}}
                      />
                  </form>
              </div>
          </div>
      );
  }
};