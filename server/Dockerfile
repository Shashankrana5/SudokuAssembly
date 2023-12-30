# FROM openjdk:11-jre-alpine
# ADD target/*.jar app.jar
# EXPOSE 9090

# ENTRYPOINT ["java", "-jar", "app.jar"]


# Stage 1: Build stage
FROM maven:3.8.4-openjdk-11 AS build
WORKDIR /app

# Copy only the necessary files for Maven to run (pom.xml, etc.)
COPY pom.xml .
COPY src ./src

# Build the project with Maven
RUN mvn clean install -Dmaven.test.skip=true

# Stage 2: Application runtime stage
FROM azul/zulu-openjdk-alpine:11

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar /app/app.jar
WORKDIR /app
EXPOSE 9090

# Entry point to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
