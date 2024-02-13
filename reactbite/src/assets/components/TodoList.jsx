import React from "react";
import { useState } from "react";
function TodoList() {
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const handleClick = () => {
    setTodos([...todos, description]);
  };
  return (
    <>
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleClick}>Add Todo</button>
      <table>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
//we have to render after this to use
export default TodoList;
