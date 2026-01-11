# Bandwidth Microservices Task Manager

Welcome to the **Bandwidth** project. This is a distributed system built with a microservices architecture, focusing on high availability, scalability, and secure authentication.

---

## 📁 Repository Directory

This ecosystem consists of four primary repositories. Ensure you have all services cloned to test the full end-to-end flow.

| Service | Responsibility | Repository Link |
| :--- | :--- | :--- |
| **Frontend** | React-based user interface and dashboard. | [bandwidth-frontend](https://github.com/LeeamShutzman/bandwidth-frontend) |
| **Auth Service** | JWT generation, security filtering, and login logic. | [bandwidth-auth-service](https://github.com/LeeamShutzman/bandwidth-auth-service) |
| **User Service** | User profile management and credential storage. | [bandwidth-user-service](https://github.com/LeeamShutzman/bandwidth-user-service) |
| **Task Service** | Core business logic for task creation and tracking. | [bandwidth-task-service](https://github.com/LeeamShutzman/bandwidth-task-service) |

---

## 🏗️ System Architecture

The system uses a **Federated Identity** pattern. The Auth Service acts as a gatekeeper, communicating with the User Service to verify credentials before granting access to downstream resources like the Task Service.



### Key Technologies
* **Backend:** Java 21, Spring Boot 3.5.7, Spring Security
* **Communication:** OpenFeign (Synchronous REST)
* **Security:** JWT (JSON Web Tokens)
* **Testing:** JUnit 5, Mockito, AssertJ

* **Frontend:** React 19.1.0, React Native 0.81.5, Expo 54.0.25, Axios 1.13.2

---

## 🛠️ Getting Started

To run the entire ecosystem locally, follow this startup order to ensure dependencies are available:

1. **User Service** (Port `8082`): Start this first as it holds the identity source of truth.
2. **Auth Service** (Port `8081`): Configured to point to User Service via Feign.
3. **Task Service** (Port `8083`): Requires valid JWTs issued by the Auth Service.
4. **Frontend** (Port `3000`): Launch the React UI to interact with the API.

---

## Resilience & Error Handling

The system is designed with "fail-fast" and graceful degradation principles. 

### External Service Outages
In the event of an upstream service outage (e.g., User Service is down), the **Auth Service** is configured to:
* Catch connection timeouts and refused connections via Feign.
* Map system failures to `InternalAuthenticationServiceException`.
* Return a **500 Internal Server Error** to the client.

> **Note:** We distinguish between `401 Unauthorized` (bad credentials) and `500 Internal Server Error` (service down) to assist in rapid DevOps troubleshooting while maintaining a secure exterior.

---

## Testing
Each service contains a comprehensive test suite:
* **Unit Tests:** Mocking external dependencies with Mockito.
* **Integration Tests:** Using `@SpringBootTest` and `TestRestTemplate` to verify HTTP status codes and security filters.

```bash
# Run tests for any service
./mvnw test