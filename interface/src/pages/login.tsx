import { useState } from "react";

export default function Login() {
  const [initial_values, setinitial_values] = useState({
    email: "",
    password: "",
  });

  const handle_change = (event) => {
    setinitial_values({
      ...initial_values,
      [event.target.name]: event.target.value,
    });
  };

  const handle_submit = () => {
    
  }

  return (
    <div >
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            onChange={(e) => handle_change(e)}
            type="email"
            id="email"
            name="email"
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            onChange={(e) => handle_change(e)}
            type="password"
            id="password"
            name="password"
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
