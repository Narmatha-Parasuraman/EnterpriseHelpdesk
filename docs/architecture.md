\# EnterpriseHelpdesk – Architecture Documentation



\## 1. Overview



EnterpriseHelpdesk is an enterprise-style helpdesk management system built using ASP.NET Core Web API and React.



The backend follows \*\*Clean Architecture\*\* principles to maintain separation of concerns, improve testability, and make the application easier to maintain and extend.



The application consists of:



\* ASP.NET Core Web API

\* Application services

\* Domain entities

\* Infrastructure and repositories

\* Entity Framework Core

\* ASP.NET Core Identity

\* JWT authentication

\* React frontend

\* SQLite database



\---



\## 2. High-Level Architecture



```text

&#x20;                   ┌──────────────────────┐

&#x20;                   │    React Frontend    │

&#x20;                   │   Vite + Axios       │

&#x20;                   └──────────┬───────────┘

&#x20;                              │

&#x20;                              │ HTTP / REST API

&#x20;                              ▼

&#x20;                   ┌──────────────────────┐

&#x20;                   │  EnterpriseHelpdesk  │

&#x20;                   │         API           │

&#x20;                   │    ASP.NET Core       │

&#x20;                   └──────────┬───────────┘

&#x20;                              │

&#x20;                              ▼

&#x20;                   ┌──────────────────────┐

&#x20;                   │     Application      │

&#x20;                   │                      │

&#x20;                   │ Services / DTOs /    │

&#x20;                   │ Interfaces           │

&#x20;                   └──────────┬───────────┘

&#x20;                              │

&#x20;                              ▼

&#x20;                   ┌──────────────────────┐

&#x20;                   │        Domain        │

&#x20;                   │                      │

&#x20;                   │ Entities / Enums     │

&#x20;                   │ Business Rules       │

&#x20;                   └──────────────────────┘

&#x20;                              ▲

&#x20;                              │

&#x20;                   ┌──────────┴───────────┐

&#x20;                   │    Infrastructure    │

&#x20;                   │                      │

&#x20;                   │ EF Core / Repositories│

&#x20;                   │ Identity / Database  │

&#x20;                   └──────────┬───────────┘

&#x20;                              │

&#x20;                              ▼

&#x20;                   ┌──────────────────────┐

&#x20;                   │        SQLite        │

&#x20;                   │       Database       │

&#x20;                   └──────────────────────┘

```



\---



\## 3. Clean Architecture Layers



\### 3.1 Domain Layer



Project:



```text

EnterpriseHelpdesk.Domain

```



The Domain layer contains the core business objects of the application.



Examples include:



\* Department

\* Employee

\* Ticket

\* ApplicationUser

\* TicketStatus



The Domain layer does not depend on the API, database, or UI.



This makes the core business model independent from external technologies.



\---



\### 3.2 Application Layer



Project:



```text

EnterpriseHelpdesk.Application

```



The Application layer contains application-specific business logic and contracts.



Responsibilities include:



\* DTOs

\* Service interfaces

\* Application services

\* Business operations

\* Data mapping



Examples:



```text

Interfaces

├── IDepartmentService

├── IEmployeeService

├── ITicketService

└── IRepository interfaces



DTOs

├── DepartmentDto

├── EmployeeDto

└── TicketDto



Services

├── DepartmentService

├── EmployeeService

└── TicketService

```



The Application layer depends on the Domain layer.



\---



\### 3.3 Infrastructure Layer



Project:



```text

EnterpriseHelpdesk.Infrastructure

```



The Infrastructure layer contains implementations of external dependencies.



Responsibilities include:



\* Entity Framework Core

\* DbContext

\* Repository implementations

\* ASP.NET Core Identity

\* Authentication infrastructure

\* Database configuration



Examples:



```text

Infrastructure

│

├── Data

│   └── ApplicationDbContext

│

├── Repositories

│   ├── DepartmentRepository

│   ├── EmployeeRepository

│   └── TicketRepository

│

└── Authentication

&#x20;   └── AuthService

```



Infrastructure implements interfaces defined by the Application layer.



\---



\### 3.4 API Layer



Project:



```text

EnterpriseHelpdesk.API

```



The API layer is the entry point to the backend application.



Responsibilities include:



\* HTTP endpoints

\* Controllers

\* Authentication configuration

\* Authorization

\* Dependency Injection

\* Middleware

\* Swagger/OpenAPI

\* CORS configuration



Example controllers:



```text

Controllers

├── AuthController

├── DepartmentsController

├── EmployeesController

└── TicketsController

```



Controllers should remain lightweight and delegate application work to services.



\---



\## 4. Dependency Flow



The application follows a controlled dependency direction.



```text

API

&#x20;│

&#x20;▼

Application

&#x20;│

&#x20;▼

Domain

```



Infrastructure provides implementations required by the Application layer:



```text

&#x20;            Application

&#x20;           ▲           │

&#x20;           │           ▼

&#x20;    Infrastructure    Domain

```



The goal is to prevent business logic from becoming tightly coupled to databases, frameworks, or UI technologies.



\---



\## 5. Request Flow



A typical request follows this path:



```text

React

&#x20; │

&#x20; │ HTTP Request

&#x20; ▼

Controller

&#x20; │

&#x20; ▼

Application Service

&#x20; │

&#x20; ▼

Repository Interface

&#x20; │

&#x20; ▼

Repository Implementation

&#x20; │

&#x20; ▼

Entity Framework Core

&#x20; │

&#x20; ▼

SQLite

```



For example, when creating a department:



```text

React

&#x20; │

&#x20; │ POST /api/departments

&#x20; ▼

DepartmentsController

&#x20; │

&#x20; ▼

IDepartmentService

&#x20; │

&#x20; ▼

DepartmentService

&#x20; │

&#x20; ▼

IDepartmentRepository

&#x20; │

&#x20; ▼

DepartmentRepository

&#x20; │

&#x20; ▼

ApplicationDbContext

&#x20; │

&#x20; ▼

SQLite

```



\---



\## 6. Repository Pattern



The project uses the Repository Pattern to separate data access from application logic.



For example:



```csharp

public interface IDepartmentRepository

{

&#x20;   Task<IEnumerable<Department>> GetAllAsync();

&#x20;   Task<Department?> GetByIdAsync(int id);

&#x20;   Task AddAsync(Department department);

&#x20;   Task UpdateAsync(Department department);

&#x20;   Task DeleteAsync(int id);

}

```



The implementation is located in Infrastructure.



This allows application services to work with an abstraction rather than directly depending on Entity Framework Core.



\---



\## 7. Dependency Injection



ASP.NET Core Dependency Injection is used to connect interfaces with their implementations.



Example:



```csharp

builder.Services.AddScoped<IDepartmentService, DepartmentService>();

builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();

```



The controller receives the required service through constructor injection.



```csharp

public DepartmentsController(IDepartmentService service)

{

&#x20;   \_service = service;

}

```



This improves:



\* Testability

\* Maintainability

\* Loose coupling

\* Separation of concerns



\---



\## 8. Authentication and Authorization



The application uses:



\* ASP.NET Core Identity

\* JWT Bearer Authentication

\* Role-based authorization



Supported roles:



```text

Admin

Manager

Employee

```



The authentication flow is:



```text

User

&#x20;│

&#x20;│ Login

&#x20;▼

AuthController

&#x20;│

&#x20;▼

AuthService

&#x20;│

&#x20;▼

ASP.NET Core Identity

&#x20;│

&#x20;▼

JWT Token

&#x20;│

&#x20;▼

React Frontend

&#x20;│

&#x20;│ Authorization: Bearer <token>

&#x20;▼

Protected API Endpoint

```



Role-based authorization is applied to protected endpoints.



Example:



```csharp

\[Authorize(Roles = "Employee")]

```



\---



\## 9. DTO Pattern



DTOs are used to control the data exposed through the API.



Instead of directly exposing domain entities, the application maps entities to DTOs.



Example:



```text

Database Entity

&#x20;     │

&#x20;     ▼

Application Service

&#x20;     │

&#x20;     ▼

DTO

&#x20;     │

&#x20;     ▼

API Response

&#x20;     │

&#x20;     ▼

React

```



Benefits include:



\* Preventing unnecessary data exposure

\* Separating API contracts from database entities

\* Easier API versioning

\* Better control of request and response models



\---



\## 10. Database Architecture



Entity Framework Core is used for data access.



The current development database is SQLite.



```text

ApplicationDbContext

&#x20;       │

&#x20;       ├── Departments

&#x20;       ├── Employees

&#x20;       ├── Tickets

&#x20;       └── Identity Tables

&#x20;               │

&#x20;               ▼

&#x20;            SQLite

```



Entity Framework Core migrations are used to manage database schema changes.



\---



\## 11. Ticket Management



The Ticket module supports the ticket lifecycle.



Ticket statuses include:



```text

Open

&#x20;  ↓

InProgress

&#x20;  ↓

Resolved

&#x20;  ↓

Closed

```



Tickets can be assigned and their status can be updated as they move through the support workflow.



\---



\## 12. Frontend Architecture



The frontend is implemented using React and Vite.



The frontend communicates with the backend through REST APIs using Axios.



```text

React Components

&#x20;      │

&#x20;      ▼

Axios API Client

&#x20;      │

&#x20;      ▼

ASP.NET Core Web API

```



The JWT token is stored on the client after successful login and included in authenticated API requests.



\---



\## 13. Security



The application includes:



\* JWT authentication

\* Role-based authorization

\* ASP.NET Core Identity

\* Password hashing through Identity

\* Protected API endpoints

\* CORS configuration

\* Separation of authentication from business logic



Production secrets should be stored outside source control using environment variables or Azure configuration.



\---



\## 14. Testing



The solution contains a dedicated test project:



```text

EnterpriseHelpdesk.Tests

```



The test project is intended to verify application behavior independently from the API layer.



The architecture makes unit testing easier because services depend on interfaces rather than directly on infrastructure implementations.



\---



\## 15. Deployment Architecture



The planned Azure deployment architecture is:



```text

&#x20;               Internet

&#x20;                  │

&#x20;                  ▼

&#x20;       ┌─────────────────────┐

&#x20;       │ Azure Static Web    │

&#x20;       │ Apps                │

&#x20;       │                     │

&#x20;       │ React Frontend      │

&#x20;       └──────────┬──────────┘

&#x20;                  │

&#x20;                  │ HTTPS

&#x20;                  ▼

&#x20;       ┌─────────────────────┐

&#x20;       │ Azure App Service   │

&#x20;       │                     │

&#x20;       │ ASP.NET Core API    │

&#x20;       └──────────┬──────────┘

&#x20;                  │

&#x20;                  ▼

&#x20;       ┌─────────────────────┐

&#x20;       │ Azure Database      │

&#x20;       │                     │

&#x20;       │ Production Data     │

&#x20;       └─────────────────────┘

```



The current local development environment uses SQLite. The database architecture can be changed for production deployment without changing the core business logic.



\---



\## 16. Benefits of the Architecture



The Clean Architecture approach provides:



\### Maintainability



Each layer has a clearly defined responsibility.



\### Testability



Application services can be tested independently using mocked interfaces.



\### Scalability



New modules can be added without significantly changing existing modules.



\### Loose Coupling



Business logic does not directly depend on database or UI implementations.



\### Separation of Concerns



API, business logic, domain models, and infrastructure are kept separate.



\---



\## 17. Future Enhancements



Potential future improvements include:



\* Azure deployment

\* Azure SQL Database

\* Azure Blob Storage for ticket attachments

\* Refresh tokens

\* Advanced ticket workflow

\* Email notifications

\* Audit logging

\* Application Insights

\* Automated CI/CD using GitHub Actions

\* Additional automated tests

\* Production configuration and secret management



\---



\## 18. Summary



EnterpriseHelpdesk demonstrates an enterprise-style ASP.NET Core application using Clean Architecture, dependency injection, repository and service patterns, Entity Framework Core, JWT authentication, role-based authorization, and a React frontend.



The architecture is designed to keep business logic independent from external infrastructure while providing a maintainable foundation for future Azure deployment and additional enterprise features.



