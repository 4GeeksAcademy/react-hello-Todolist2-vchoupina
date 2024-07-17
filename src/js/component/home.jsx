import React, { useState } from "react";
import "../../styles/index.css";

const Home = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");

	// Função para nova tarefa
	const handleAddTodo = (e) => {
		if (e.key === "Enter" && newTodo.trim() !== "") {
			setTodos([...todos, newTodo]);
			setNewTodo("");
		}
	};

	// Função para eliminar tarefa
	const handleRemoveTodo = (index) => {
		const updatedTodos = todos.filter((todo, i) => i !== index);
		setTodos(updatedTodos);
	};

	return (
		<div className="container">
			<h1>To Do</h1>
			<div className="content">
				<input
					type="text"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					onKeyDown={handleAddTodo}
					placeholder="What needs to be done?"
				/>
				<ul>
					{todos.length === 0 ? (
						<li className="no-tasks">No tasks yet</li>
					) : (
						todos.map((todo, index) => (
							<li key={index} className="todo-item">
								{todo}
								<span
									className="remove-icon"
									onClick={() => handleRemoveTodo(index)}
								>
									X
								</span>
							</li>
						))
					)}
				</ul>
				<div className="footer">
					{todos.length > 0 && <span>{todos.length} item left</span>}
				</div>
			</div>
		</div>
	);
};

export default Home;
