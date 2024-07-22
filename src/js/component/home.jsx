import React, { useState, useEffect } from "react";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const apiUrl = "https://playground.4geeks.com/todo/users/vchoupina";

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("Data fetched:", data.todos);
        setTodos(data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchData();
  }, []);

  const syncTodos = async (todos) => {
    try {
      console.log("Syncing todos:", todos);
      const response = await fetch(apiUrl, {
        method: "PUT",
        body: JSON.stringify(todos),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Sync success:", data);
    } catch (error) {
      console.error("Error syncing todos:", error);
    }
  };

  const handleAddTodo = (e) => {
    if (e.key === "Enter" && newTodo.trim()) {
      const newTodos = [...todos, { label: newTodo, done: false }];
      setTodos(newTodos);
      setNewTodo("");
      syncTodos(newTodos);
    }
  };

  const handleRemoveTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    syncTodos(updatedTodos);
  };

  const handleClearTodos = () => {
    setTodos([]);
    syncTodos([]);
  };

  return (
    <div className="container">
      <h1 className="title">To Do</h1>
      <div className="todo-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleAddTodo}
          placeholder="What needs to be done?"
          className="input"
        />
        <ul className="list">
          {todos.length === 0 ? (
            <li className="no-tasks">No tasks yet</li>
          ) : (
            todos.map((todo, index) => (
              <li key={index} className="list-item">
                {todo.label}
                <span
                  onClick={() => handleRemoveTodo(index)}
                  className="remove"
                >
                  X
                </span>
              </li>
            ))
          )}
        </ul>
        {todos.length > 0 && (
          <div className="footer">
            <span>{todos.length} item{todos.length > 1 ? 's' : ''} left</span>
          </div>
        )}
        <button onClick={handleClearTodos} className="clear-button">Clear All</button>
      </div>
    </div>
  );
};

export default Home;
