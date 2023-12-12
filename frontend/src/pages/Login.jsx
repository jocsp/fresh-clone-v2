import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h3 className="login-heading">Log in</h3>

      <input
        className="rounded-md border shadow-sm py-2 px-4"
        type="text"
        name="username"
        placeholder="Username here..."
        value={username}
        onChange={(e) => setUser(e.target.value)}
      />

      <input
        className="rounded-md border shadow-sm py-2 px-4"
        type="password"
        name="password"
        placeholder="Password here..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-green-600 hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-600 rounded-md border  text-white px-1 py-2"
        type="submit"
        disabled={isLoading}>
        {!isLoading ? "Log in" : "Loading..."}
      </button>

      <p className="text-center">Username: guest</p>
      <p className="text-center">Password: guest</p>
      {error ? <span className="error"> {error}</span> : null}
    </form>
  );
}

export default Login;
