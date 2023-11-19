FROM openjdk:8-jre-alpine
ADD target/*.jar app.jar
EXPOSE 8080
ENV JAVA_OPTS="-Xmx128m -Xms128m -XX:+UseSerialGC -Xss512k -XX:MaxRAM=72m"
ENTRYPOINT ["java", "-jar", "app.jar"]
#ENTRYPOINT ["java", "-server", "-XX:+UnlockExperimentalVMOptions", "-XX:+UseCGroupMemoryLimitForHeap", "-jar", "app.jar"]
#