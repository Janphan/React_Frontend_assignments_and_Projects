import React from "react";
import { useState } from "react";
function TodoList() {
  const [todo, setTodo] = useState({
    description: "",
    date: "",
  });
  const [todos, setTodos] = useState([]);

  const handleClick = () => {
    if (todo.description && todo.date) {
      setTodos([...todos, todo]);
      setTodo({ description: "", date: "" });
    } else {
      alert("Type a description and date first");
    }
  };
  const handleDelete = () => {
    
  }
  return (
    <>
      <fieldset><legend>Add todo</legend>
      <label htmlFor="description">Description:</label>
        
        <input
        type ="text"
          placeholder="Description"
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          value={todo.date}
          onChange={(e) => setTodo({ ...todo, date: e.target.value })}
        />
      
      {/* testing */}
      <button onClick={handleClick}>Add</button>
      </fieldset>
      <table>
        <thead>
          <tr>
          <th>Description</th>
          <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo.description}</td>
              <td>{todo.date}</td>
              <td><button onClick={handleDelete}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
//we have to render after this to use
export default TodoList;
