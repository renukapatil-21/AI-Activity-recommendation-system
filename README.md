# AI-Powered Activity Tracker

A full-stack, microservices-based activity tracking application built with Spring Boot and React. Users can record activities and receive AI-generated recommendations based on the activity data. The application demonstrates service discovery, API gateway routing, secure authentication, and event-driven communication with Apache Kafka.

## Features

- User registration and profile management
- Create and view tracked activities
- Generate AI-powered recommendations for activities
- Asynchronous activity processing using Kafka
- Service discovery and centralized configuration
- API routing through Spring Cloud Gateway
- OAuth 2.0 authentication using Keycloak
- React frontend integrated with the backend services

## Architecture

The application is split into independently running services:

| Component | Responsibility | Data / Technology |
| --- | --- | --- |
| User Service | Manages user profiles and identity details | Spring Boot, Spring Data JPA, SQL database |
| Activity Service | Stores and serves user activities; publishes activity events | Spring Boot, Spring Data MongoDB, Apache Kafka |
| AI Service | Consumes activity events and creates recommendations | Spring Boot, Spring AI, Google Gemini |
| Eureka Server | Registers services and supports service discovery | Spring Cloud Netflix Eureka |
| API Gateway | Provides a single entry point and routes requests to services | Spring Cloud Gateway |
| Config Server | Supplies shared and service-specific configuration | Spring Cloud Config |
| Keycloak | Handles authentication and issues access tokens | OAuth 2.0 / OpenID Connect |
| Frontend | User interface for sign-in, activity entry, and recommendations | React |


### Activity and recommendation flow

1. A user signs in through Keycloak.
2. The frontend sends an authenticated request through the API Gateway.
3. The Activity Service saves the activity and publishes an event to Kafka.
4. The AI Service consumes the event and generates a recommendation using Google Gemini.
5. The recommendation is associated with the activity and can be retrieved by the frontend.

<img width="2547" height="1699" alt="image" src="https://github.com/user-attachments/assets/33c3ba3e-ce08-4583-9501-7d615364a8aa" />

## Technology Stack

- **Backend:** Java, Spring Boot, Spring Cloud
- **Frontend:** React
- **Databases:** SQL with Spring Data JPA; MongoDB with Spring Data MongoDB
- **Messaging:** Apache Kafka
- **AI integration:** Spring AI and Google Gemini
- **Service infrastructure:** Eureka, Spring Cloud Gateway, Spring Cloud Config
- **Identity and security:** Keycloak, OAuth 2.0 / OpenID Connect, PKCE

## Repository Structure

The project contains separate applications for the frontend and backend services. Exact folder names may vary by repository; a typical structure is:

```text
.
├── activity-service/
├── ai-service/
├── user-service/
├── api-gateway/
├── config-server/
├── eureka-server/
└── frontend/
```

## Prerequisites

Install the versions required by the project configuration. You will generally need:

- Java and Maven or Gradle
- Node.js and npm
- SQL database
- MongoDB
- Apache Kafka
- Keycloak
- Google Gemini API key

## Configuration

Before starting the applications, configure the database connections, Kafka bootstrap server, service discovery and config server URLs, Keycloak issuer/client settings, and Gemini API key in the appropriate application configuration or environment variables.

Do not commit passwords, client secrets, tokens, or API keys. Use environment variables or a local, untracked configuration file for sensitive values.

## Running the Application

Start the infrastructure and services in the order required by your configuration:

1. Start the SQL database, MongoDB, Kafka, and Keycloak.
2. Start the Config Server.
3. Start the Eureka Server.
4. Start the User Service, Activity Service, and AI Service.
5. Start the API Gateway.
6. Install frontend dependencies and start the React application.

Use each service's Maven/Gradle wrapper and the frontend's package scripts where available. Check the service configuration for ports and the repository's scripts or documentation for exact commands.

## Authentication

Keycloak acts as the identity provider. The frontend authenticates users and obtains an access token. Requests to protected backend routes include that token; the gateway and services validate it before allowing access. The project also demonstrates PKCE for the public frontend client.

## What I Worked On

- Designed and implemented a Spring Boot microservices application for activity tracking.
- Built REST APIs and persistence for user and activity data using SQL/JPA and MongoDB.
- Connected services through Eureka service discovery and Spring Cloud communication.
- Added Kafka-based asynchronous processing between the Activity Service and AI Service.
- Integrated Google Gemini through Spring AI to generate activity recommendations.
- Configured centralized application settings with Spring Cloud Config.
- Added a Spring Cloud API Gateway as the frontend's backend entry point.
- Integrated Keycloak authentication and secured API access with OAuth 2.0 / OpenID Connect.
- Built a React frontend for authentication and activity workflows.
