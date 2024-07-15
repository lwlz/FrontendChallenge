import EmployeeDatasourceContract from "@/domain/contracts/employeeDatasource.contract";
import {
  EmployeeListModel,
  EmployeeListSchema,
  EmployeeModel,
} from "@/domain/models/employee.model";
import { GetEmployeeByIdParams } from "@/domain/params/employee.param";

export default class EmployeeDatasource extends EmployeeDatasourceContract {
  public async getEmployeeList(): Promise<EmployeeListModel | undefined> {
    try {
      const response = await fetch(
        "https://dummy.restapiexample.com/api/v1/employees"
      );

      // Validate response
      if (response.status !== 200) {
        return undefined;
      }

      // Obtain json from response
      const json = await response.json();
      // Extract data
      const data = json["data"];

      return EmployeeListSchema.parse(data);
    } catch (exception) {
      return undefined;
    }
  }

  public async createEmployee(
    params: unknown
  ): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(
        "https://dummy.restapiexample.com/api/v1/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );

      if (response.status !== 200) {
        return undefined;
      }

      const json = await response.json();
      return json.data;
    } catch (exception) {
      return undefined;
    }
  }

  public async getEmployeeById(
    params: GetEmployeeByIdParams
  ): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/employee/${params.id}`
      );

      if (response.status !== 200) {
        return undefined;
      }

      const json = await response.json();
      return json.data;
    } catch (exception) {
      return undefined;
    }
  }

  public async updateEmployeeById(
    params: unknown
  ): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/update/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );

      if (response.status !== 200) {
        return undefined;
      }

      const json = await response.json();
      return json.data;
    } catch (exception) {
      return undefined;
    }
  }

  public async deleteEmployeeById(
    params: unknown
  ): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/delete/${params.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.status !== 200) {
        return undefined;
      }

      const json = await response.json();
      return json.data;
    } catch (exception) {
      return undefined;
    }
  }
}
