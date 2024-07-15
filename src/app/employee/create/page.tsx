"use client";

import { useDebounce } from "@/domain/hooks/useDebounce.hook";
import { useState } from "react";

export default function CreateEmployeePage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");

  const debouncedName = useDebounce(name, 500);
  const debouncedAge = useDebounce(age, 500);
  const debouncedSalary = useDebounce(salary, 500);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("CALL SUBMIT");
    e.preventDefault();
    fetch("https://dummy.restapiexample.com/api/v1/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: debouncedName,
        age: debouncedAge,
        salary: debouncedSalary,
      }),
    })
      .then((response) => response.json())
      .then(() => (window.location.href = "/"))
      .catch((error) => console.error("Error creating employee:", error));
  };

  return (
    <main className="flex h-screen flex-col items-start justify-start p-4">
      <h1>Create Employee</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label>Salary:</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </main>
  );
}
