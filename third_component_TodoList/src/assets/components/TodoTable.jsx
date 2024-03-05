import React from 'react';

function TodoTable({todos, handleDelete}){

    return (

        <table>
        <thead>
          <tr>
          <th>Description</th>
          <th>Priority</th>
          <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo.description}</td>
              <td>{todo.priority}</td>
              <td>{todo.date}</td>
              <td>{<button onClick={() => handleDelete(index)}>Delete</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>      );
      
}

export default TodoTable;