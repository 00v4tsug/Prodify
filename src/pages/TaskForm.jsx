import { useState, useEffect } from "react";
import { createTask, updateTask } from "../services/api";
import { useNavigate, useLocation, useParams } from "react-router-dom";

function TaskForm({ token }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    completed: false,
    due_date: "",
    priority: "normal"
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const taskFromState = location.state?.task;

  useEffect(() => {
    if (taskFromState) {
      const adjustedTask = {
        ...taskFromState,
        due_date: taskFromState.due_date
          ? new Date(taskFromState.due_date).toISOString().slice(0, 16)
          : ""
      };
      setForm(adjustedTask);
    }
  }, [taskFromState]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Converter a data/hora de volta para formato ISO (se necessário)
    const payload = {
      ...form,
      due_date: form.due_date ? new Date(form.due_date).toISOString() : null
    };

    if (id) {
      await updateTask(id, payload, token);
    } else {
      await createTask(payload, token);
    }

    navigate("/tasks");
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white p-6">
    <form
      onSubmit={handleSubmit}
      className="p-8 max-w-xl mx-auto mt-10 bg-[#2e2e3a] rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-3xl font-bold text-purple-400 text-center mb-6">
        {id ? "Editar Tarefa" : "Nova Tarefa"}
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Título"
        value={form.title}
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      />

      <textarea
        name="description"
        placeholder="Descrição"
        value={form.description}
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      ></textarea>

      <input
        type="datetime-local"
        name="due_date"
        value={form.due_date || ""}
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="high">Alta</option>
        <option value="normal">Normal</option>
        <option value="low">Baixa</option>
      </select>

      <label className="flex items-center text-white space-x-2">
        <input
          type="checkbox"
          name="completed"
          checked={form.completed}
          onChange={handleChange}
        />
        <span>Concluída</span>
      </label>

      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white w-full p-3 rounded-lg font-semibold"
      >
        {id ? "Salvar Alterações" : "Criar Tarefa"}
      </button>
    </form>
    </div>
  );
}

export default TaskForm;
