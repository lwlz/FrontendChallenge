"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useDebounce } from "@/domain/hooks/useDebounce.hook";

export default function EditEmployeePage() {
  const { employeeId } = useParams();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");

  const debouncedName = useDebounce(name, 500);
  const debouncedAge = useDebounce(age, 500);
  const debouncedSalary = useDebounce(salary, 500);

  useEffect(() => {
    if (employeeId) {
      fetch(`https://dummy.restapiexample.com/api/v1/employee/${employeeId}`)
        .then((response) => response.json())
        .then((data) => {
          setName(data.data.employee_name);
          setAge(data.data.employee_age);
          setSalary(data.data.employee_salary);
        })
        .catch((error) => console.error("Error fetching employee:", error));
    }
  }, [employeeId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://dummy.restapiexample.com/api/v1/update/${employeeId}`, {
      method: "PUT",
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
      .then(() => (window.location.href = `/employee/${employeeId}`))
      .catch((error) => console.error("Error updating employee:", error));
  };

  return (
    <main className="flex h-screen flex-col items-start justify-start p-4">
      <h1>Edit Employee</h1>
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
        <button type="submit">Update</button>
      </form>
    </main>
  );
}
