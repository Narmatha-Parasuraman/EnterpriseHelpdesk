# EnterpriseHelpdesk

EnterpriseHelpdesk is an enterprise-style helpdesk management system built using **ASP.NET Core Web API**, **Clean Architecture**, **Entity Framework Core**, **SQLite**, **JWT Authentication**, and **React**.

The project demonstrates a scalable backend architecture with authentication, role-based authorization, department management, employee management, and ticket management.

## 🏗️ Architecture

The project follows **Clean Architecture** principles.

```text
EnterpriseHelpdesk
│
├── EnterpriseHelpdesk.API
│   └── Controllers, Middleware, API Configuration
│
├── EnterpriseHelpdesk.Application
│   ├── DTOs
│   ├── Interfaces
│   └── Services
│
├── EnterpriseHelpdesk.Domain
│   ├── Entities
│   └── Enums
│
├── EnterpriseHelpdesk.Infrastructure
│   ├── DbContext
│   ├── Repositories
│   └── Authentication
│
├── EnterpriseHelpdesk.Tests
│   └── Unit Tests
│
└── React Frontend
```

### Application Flow

```text
React Frontend
       ↓
ASP.NET Core Web API
       ↓
Application Services
       ↓
Repositories
       ↓
Entity Framework Core
       ↓
SQLite Database
```

## 🚀 Technologies

### Backend

* ASP.NET Core Web API
* .NET 10
* Entity Framework Core
* SQLite
* JWT Authentication
* ASP.NET Core Identity
* Swagger / OpenAPI
* Clean Architecture
* Repository Pattern
* Dependency Injection

### Frontend

* React
* JavaScript
* Axios
* Vite

### Development Tools

* Visual Studio
* Git
* GitHub

## 🔐 Authentication & Authorization

The application uses **JWT Bearer Authentication**.

Supported roles:

* **Admin**
* **Manager**
* **Employee**

Role-based authorization is implemented using ASP.NET Core authorization attributes.

Example:

```csharp
[Authorize(Roles = "Employee")]
```

## 📋 Features

### Authentication

* User registration
* User login
* JWT token generation
* Role-based authorization
* Password management through ASP.NET Core Identity

### Departments

* Create department
* View departments
* View department by ID
* Update department
* Delete department

### Employees

* Create employee
* View employees
* View employee by ID
* Update employee
* Delete employee
* Department association

### Tickets

* Create support tickets
* Assign tickets
* Track ticket status
* Manage ticket lifecycle

Supported ticket statuses include:

```text
Open
InProgress
Resolved
Closed
```

## 🗄️ Database

The project currently uses **SQLite** for development.

Database connection:

```text
Data Source=EnterpriseHelpdesk.db
```

Entity Framework Core migrations are used to manage database schema changes.

## ▶️ Running the Backend

Clone the repository:

```bash
git clone https://github.com/Narmatha-Parasuraman/EnterpriseHelpdesk.git
```

Navigate to the project:

```bash
cd EnterpriseHelpdesk
```

Restore dependencies:

```bash
dotnet restore
```

Build the solution:

```bash
dotnet build
```

Run the API:

```bash
dotnet run --project EnterpriseHelpdesk.API
```

The API can then be accessed through the configured HTTPS/HTTP endpoints.

Swagger is available when the API is running.

## ▶️ Running the React Frontend

Navigate to the React application folder:

```bash
cd <frontend-folder>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The React application runs using Vite.

## 🔗 API

The React frontend communicates with the ASP.NET Core API using Axios.

Example API base URL during local development:

```text
https://localhost:7096/api
```

## 📁 Project Structure

```text
EnterpriseHelpdesk
│
├── EnterpriseHelpdesk.API
├── EnterpriseHelpdesk.Application
├── EnterpriseHelpdesk.Domain
├── EnterpriseHelpdesk.Infrastructure
├── EnterpriseHelpdesk.Tests
├── README.md
└── EnterpriseHelpdesk.sln
```

## 🔄 Git Workflow

Typical development workflow:

```bash
git add .
git commit -m "Update EnterpriseHelpdesk"
git push origin main
```

## ☁️ Future Deployment

The application is designed for deployment to Microsoft Azure.

Planned deployment architecture:

```text
React Frontend
      ↓
Azure Static Web Apps
      ↓
Azure App Service
      ↓
ASP.NET Core Web API
      ↓
Azure Database
```

## 📌 Project Status

The following modules have been implemented:

* [x] Clean Architecture
* [x] JWT Authentication
* [x] Role-based Authorization
* [x] Department CRUD
* [x] Employee CRUD
* [x] Ticket Management
* [x] React Frontend
* [x] API Integration
* [x] GitHub Repository

## 👩‍💻 Author

**Narmatha Parasuraman**

This project was developed as an enterprise-style ASP.NET Core application to demonstrate modern .NET development, Clean Architecture, REST APIs, authentication, authorization, React integration, and Azure deployment readiness.
