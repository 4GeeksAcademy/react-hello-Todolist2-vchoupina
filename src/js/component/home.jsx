import React, { useState } from "react";

const Home = () => {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");

	// Função para adicionar uma nova tarefa
	const handleAddTodo = (e) => {
		if (e.key === "Enter" && newTodo.trim() !== "") {
			setTodos([...todos, newTodo]);
			setNewTodo("");
		}
	};

	// Função para remover uma tarefa
	const handleRemoveTodo = (index) => {
		const updatedTodos = todos.filter((todos, i) => i !== index);
		setTodos(updatedTodos);
	};

	return (
		<div className="text-center">
			<h1 className="text-center mt-5">Todos</h1>

			<div className="content">
				{/* Input */}
				<input
					type="text"
					value={newTodo} // Valor do campo de entrada vem do estado
					onChange={(e) => setNewTodo(e.target.value)} // Atualiza o estado quando o usuário digita
					onKeyDown={handleAddTodo} // Adiciona a tarefa quando o usuário pressiona Enter
					placeholder="Your tasks" 
				/>
			</div>


			<ul>

				{todos.length === 0 ? (
					<li>Add tasksNo hay tareas, añadir tareas</li>
				) : (

					todos.map((todo, index) => (
						<li key={index}
							onMouseEnter={() => document.getElementById(`remove-${index}`).style.display = 'inline'}
							onMouseLeave={() => document.getElementById(`remove-${index}`).style.display = 'none'}
						>
							{todo}
							<span
								id={`remove-${index}`}
								style={{ display: 'none', cursor: 'pointer' }}
								onClick={() => handleRemoveTodo(index)}
							>
								❌
							</span>
						</li>
					))
				)}
			</ul>
		</div>
	);
};

export default Home;
