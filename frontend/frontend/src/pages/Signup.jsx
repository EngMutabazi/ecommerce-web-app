import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  //Handle changes in form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //Handling submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMsg("");

    try {
      const res = await fetch(`${BASEURL}/api/register/`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg("Account created. Redirecting to login...");

        setTimeout(() => {
          navigate("/login");
        }, 1200);
      } else {
        setMsg(data.username || data.password || JSON.stringify(data));
      }
    } catch (error) {
      console.error(error);

      setMsg("Signup failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justfy-center p-6">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">login</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="username"
            onChange={handleChange}
            value={form.username}
            placeholder="Username"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="email"
            onChange={handleChange}
            value={form.email}
            placeholder="email"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={form.password}
            placeholder="Password"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="password2"
            type="password"
            onChange={handleChange}
            value={form.password2}
            placeholder="Password"
            required
            className="w-full p-2 border rounded"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Create Account
          </button>
          {msg && <p className="mt-3 text-sm">{msg}</p>}
        </form>
      </div>
    </div>
  );
}

export default Signup;
