function TaskCard({ task, onDelete, onEdit, onToggleComplete, isCompleted }) {
  const formatDate = (dateString) => {
    if (!dateString) return "Sem data";
    const options = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleString("pt-BR", options);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-400";
      case "normal":
        return "text-yellow-400";
      case "low":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div
      onClick={() => onToggleComplete(task.id)}
      className="bg-gray-700 p-4 rounded-xl text-white shadow flex justify-between items-center cursor-pointer"
    >
      <div>
        <h3 className={`text-xl ${isCompleted ? "line-through" : ""}`}>
          {task.title}
        </h3>
        <p className={`text-sm mb-1 ${isCompleted ? "line-through" : ""}`}>
          {task.description}
        </p>

        <p className="text-sm text-gray-300">
          📅 {formatDate(task.due_date)}
        </p>
        <p className={`text-sm font-semibold ${getPriorityColor(task.priority)}`}>
          🔥 Prioridade: {task.priority || "nenhuma"}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
          className="text-blue-400 hover:text-blue-600"
        >
          Editar
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="text-red-400 hover:text-red-600"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
