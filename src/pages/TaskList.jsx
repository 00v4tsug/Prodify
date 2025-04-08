import { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../services/api";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";

function TaskList({ token }) {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState("score"); // score | date | priority
  const navigate = useNavigate();

  const loadTasks = async () => {
    const res = await getTasks(token);
    setTasks(res.data);
  };

  const handleDelete = async (id) => {
    await deleteTask(id, token);
    loadTasks();
  };

  const handleEdit = (task) => {
    navigate(`/edit/${task.id}`, { state: { task } });
  };

  const toggleComplete = async (taskId) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) return;

    const updatedTask = {
      ...taskToUpdate,
      completed: !taskToUpdate.completed,
    };

    await updateTask(taskId, updatedTask, token);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const calculateUrgencyScore = (task) => {
    const now = new Date();
    const dueDate = task.due_date ? new Date(task.due_date) : null;
    const daysRemaining = dueDate ? (dueDate - now) / (1000 * 60 * 60 * 24) : 9999;

    const priorityWeight = {
      high: 30,
      normal: 20,
      low: 10,
    };

    const priorityScore = priorityWeight[task.priority] || 0;

    return daysRemaining - priorityScore;
  };

  const sortTasks = (a, b) => {
    if (sortBy === "score") {
      return calculateUrgencyScore(a) - calculateUrgencyScore(b);
    }

    if (sortBy === "date") {
      const dateA = a.due_date ? new Date(a.due_date) : null;
      const dateB = b.due_date ? new Date(b.due_date) : null;

      if (dateA && dateB) return dateA - dateB;
      if (dateA) return -1;
      if (dateB) return 1;
      return 0;
    }

    if (sortBy === "priority") {
      const priorityOrder = { high: 1, normal: 2, low: 3 };
      return (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4);
    }

    return 0;
  };

  const sortedTasks = [...tasks].sort(sortTasks);

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-purple-400 mb-4 md:mb-0">Minhas Tarefas - Prodify</h1>

          <div className="flex items-center gap-4">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl shadow"
              onClick={() => navigate("/new")}
            >
              + Nova Tarefa
            </button>

            <div className="flex items-center space-x-2">
              <label className="text-white">Ordenar por:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 rounded bg-gray-700 text-white"
              >
                <option value="score">Score Inteligente</option>
                <option value="date">Data</option>
                <option value="priority">Prioridade</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {sortedTasks.length === 0 ? (
            <p className="text-center text-gray-400">Nenhuma tarefa encontrada.</p>
          ) : (
            sortedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onToggleComplete={toggleComplete}
                isCompleted={task.completed}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskList;