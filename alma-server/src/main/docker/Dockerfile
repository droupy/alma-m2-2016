FROM frolvlad/alpine-oraclejdk8:slim
VOLUME /tmp
ADD alma-server-1.0.0-SNAPSHOT.jar app.jar
RUN sh -c 'touch /app.jar'
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-Dspring.profiles.active=container","-jar","/app.jar"]
