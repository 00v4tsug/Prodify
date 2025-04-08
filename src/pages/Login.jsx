import { useState } from "react";
import { loginUser } from "../services/api";

function Login({ setToken }) {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(form);
    const token = res.data.token;

    localStorage.setItem("token", token); // salva no navegador
    setToken(token);                      // ativa navegação no App
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1a1a2e]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#2e2e3a] p-8 rounded-2xl shadow-2xl max-w-sm w-full space-y-4"
      >
        <h2 className="text-3xl font-bold mb-4 text-purple-400 text-center">Prodify</h2>
        <input
          type="text"
          name="username"
          placeholder="Usuário"
          value={form.username}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
