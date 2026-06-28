# Bước 1: Build ứng dụng bằng Maven
FROM maven:3.8.8-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Bước 2: Chạy ứng dụng bằng JDK gọn nhẹ
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
# Kích hoạt profile postgres khi chạy
ENTRYPOINT ["java", "-Dspring.profiles.active=postgres", "-jar", "app.jar"]
