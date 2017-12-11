docker build -t example-todo-app-server . && docker run --rm --name example-todo-app-server --env-file .env -p 8085:8080 example-todo-app-server
