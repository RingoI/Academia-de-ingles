import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(username, password);
      alert("Login OK");
    } catch (error: any) {
      console.log("STATUS 👉", error.response?.status);
      console.log("DATA 👉", error.response?.data);
      console.log("FULL 👉", error);
      alert("Credenciales incorrectas (mirá consola)");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
}
