"use client";

import { EmployeeModel } from "@/domain/models/employee.model";
import EmployeeCard from "@/ui/components/EmployeeCard.component";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmployeeDetailsPage() {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState<EmployeeModel | null>(null);

  useEffect(() => {
    console.log("Employee ID:", employeeId); // De
    if (employeeId) {
      fetch(`https://dummy.restapiexample.com/api/v1/employee/${employeeId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response:", data); // Debugging line
          return setEmployee(data.data);
        })
        .catch((error) => console.error("Error fetching employee:", error));
    }
  }, [employeeId]);

  const handleDelete = () => {
    fetch(`https://dummy.restapiexample.com/api/v1/delete/${employeeId}`, {
      method: "DELETE",
    })
      .then(() => (window.location.href = "/"))
      .catch((error) => console.error("Error deleting employee:", error));
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <main className="flex h-screen flex-col items-start justify-start p-4 gap-4">
      <h1>Employee Details</h1>
      <EmployeeCard employee={employee} />
      <Link
        className="border px-2 py-1 rounded-md"
        href={`/employee/${employee.id}/edit`}
      >
        Edit
      </Link>
      <button
        className="border px-2 py-1 rounded-md bg-red-500 text-white"
        onClick={handleDelete}
      >
        Delete
      </button>
    </main>
  );
}
