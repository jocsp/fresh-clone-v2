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
      <h3>Log in</h3>

      <input
        className="standard-input"
        type="text"
        name="username"
        placeholder="Username here..."
        value={username}
        onChange={(e) => setUser(e.target.value)}
      />

      <input
        className="standard-input"
        type="password"
        name="password"
        placeholder="Password here..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="standard-button login-button"
        type="submit"
        disabled={isLoading}
      >
        {!isLoading ? "Log in" : "Loading..."}
      </button>

      {error ? <span className="error"> {error}</span> : null}
    </form>
  );
}

export default Login;
