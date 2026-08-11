# EnterpriseHelpdesk API Documentation

## Overview

EnterpriseHelpdesk exposes RESTful APIs through an ASP.NET Core Web API.

The API provides endpoints for authentication, departments, employees, and tickets.

Interactive API documentation is available through Swagger/OpenAPI when the API is running.

## Base URL

Local development:

```text
https://localhost:7096/api
```

Swagger:

```text
https://localhost:7096/swagger
```

---

# Authentication

## Register

```http
POST /api/Auth/register
```

Creates a new user account.

Example request:

```json
{
  "email": "employee@example.com",
  "password": "Password123!"
}
```

New users are assigned the Employee role according to the application's registration logic.

---

## Login

```http
POST /api/Auth/login
```

Authenticates a user and returns a JWT token.

Example request:

```json
{
  "email": "employee@example.com",
  "password": "Password123!"
}
```

The returned JWT token is used to access protected endpoints.

For authenticated requests:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# Departments API

## Get All Departments

```http
GET /api/Departments
```

Returns all departments.

---

## Get Department

```http
GET /api/Departments/{id}
```

Returns a department by ID.

Example:

```text
GET /api/Departments/1
```

---

## Create Department

```http
POST /api/Departments
```

Creates a new department.

Example:

```json
{
  "name": "IT",
  "description": "Information Technology"
}
```

---

## Update Department

```http
PUT /api/Departments/{id}
```

Updates an existing department.

Example:

```text
PUT /api/Departments/1
```

---

## Delete Department

```http
DELETE /api/Departments/{id}
```

Deletes an existing department.

---

# Employees API

## Get All Employees

```http
GET /api/Employees
```

Returns all employees.

---

## Get Employee

```http
GET /api/Employees/{id}
```

Returns an employee by ID.

---

## Create Employee

```http
POST /api/Employees
```

Creates a new employee and associates the employee with a department.

---

## Update Employee

```http
PUT /api/Employees/{id}
```

Updates an existing employee.

---

## Delete Employee

```http
DELETE /api/Employees/{id}
```

Deletes an employee.

---

# Tickets API

## Get All Tickets

```http
GET /api/Tickets
```

Returns the available tickets.

---

## Get Ticket

```http
GET /api/Tickets/{id}
```

Returns a ticket by ID.

---

## Create Ticket

```http
POST /api/Tickets
```

Creates a new support ticket.

---

## Update Ticket

```http
PUT /api/Tickets/{id}
```

Updates an existing ticket.

---

# Ticket Status

Tickets support the following statuses:

```text
Open
InProgress
Resolved
Closed
```

Typical workflow:

```text
Open
  ↓
InProgress
  ↓
Resolved
  ↓
Closed
```

---

# Authorization

The API uses role-based authorization.

Supported roles:

```text
Admin
Manager
Employee
```

Protected endpoints require a valid JWT token.

Some endpoints also require specific roles.

Example:

```csharp
[Authorize(Roles = "Employee")]
```

---

# Swagger / OpenAPI

The API provides interactive documentation through Swagger.

Swagger allows developers to:

* View available endpoints
* View request and response models
* Provide authentication credentials
* Execute API requests
* Inspect HTTP responses
* Test protected endpoints

Open Swagger while the API is running:

```text
https://localhost:7096/swagger
```

---

# API Architecture

The API follows Clean Architecture:

```text
HTTP Request
     ↓
Controller
     ↓
Application Service
     ↓
Repository Interface
     ↓
Repository
     ↓
Entity Framework Core
     ↓
SQLite
```

The API controllers are kept lightweight and delegate application logic to the Application layer.

---

# Error Handling

The API uses standard HTTP status codes.

Common responses include:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error
```

---

# Development

Start the API using Visual Studio or:

```bash
dotnet run --project EnterpriseHelpdesk.API
```

Then open Swagger:

```text
https://localhost:7096/swagger
```

Swagger provides the interactive interface for testing the API.
