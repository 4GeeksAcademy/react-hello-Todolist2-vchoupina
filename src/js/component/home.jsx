import React, { useState, useEffect } from "react";

const Home = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");
	const apiUrl = "https://playground.4geeks.com/todo/user/alesanchezr";

	// Função para carregar tarefas da API
	useEffect(() => {
		fetch(apiUrl)
			.then(response => {
				if (!response.ok) throw new Error("Network response was not ok");
				return response.json();
			})
			.then(data => setTodos(data))
			.catch(error => console.error("Error fetching todos:", error));
	}, []);

	const syncTodos = (todos) => {
		fetch(apiUrl, {
			method: "PUT",
			body: JSON.stringify(todos),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(response => {
				if (!response.ok) throw new Error(response.statusText);
				return response.json();
			})
			.then(data => console.log("Sync success:", data))
			.catch(error => console.error("Error syncing todos:", error));
	};

	// Função para nova tarefa
	const handleAddTodo = (e) => {
		if (e.key === "Enter" && newTodo.trim() !== "") {
			const newTodos = [...todos, { label: newTodo, done: false }];
			setTodos(newTodos);
			setNewTodo("");
			syncTodos(newTodos);
		}
	};

	// Função para eliminar tarefa
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
		<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
			<h1 style={{ fontSize: "2em", color: "#333" }}>To Do</h1>
			<div style={{ background: "#fff", padding: "20px", borderRadius: "4px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
				<input
					type="text"
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
					onKeyDown={handleAddTodo}
					placeholder="What needs to be done?"
					style={{ width: "100%", padding: "10px", fontSize: "1em", border: "1px solid #ccc", borderRadius: "4px" }}
				/>
				<ul style={{ listStyle: "none", padding: "0" }}>
					{todos.length === 0 ? (
						<li style={{ textAlign: "center", color: "#888", fontStyle: "italic" }}>No tasks yet</li>
					) : (
						todos.map((todo, index) => (
							<li key={index} style={{ display: "flex", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #ccc" }}>
								{todo.label}
								<span
									onClick={() => handleRemoveTodo(index)}
									style={{ cursor: "pointer", color: "red", marginLeft: "10px" }}
								>
									X
								</span>
							</li>
						))
					)}
				</ul>
				{todos.length > 0 && (
					<div style={{ marginTop: "20px", textAlign: "center" }}>
						<span>{todos.length} item{todos.length > 1 ? 's' : ''} left</span>
					</div>
				)}
				<button onClick={handleClearTodos} style={{ marginTop: "20px", padding: "10px 20px", fontSize: "1em", cursor: "pointer" }}>Clear All</button>
			</div>
		</div>
	);
};

export default Home;
