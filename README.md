## 📋 Project

AnotaAi is a full stack application developed as a challenge for an intern position at jackexperts. You can save your tasks, update them and delete them. Application developed with user experience in mind
<br>

## 💻 How to install?

To clone and run this application you need to have [Git](https://git-scm.com) and [Docker](https://www.docker.com/) installed on your computer

<br>
In your command line:
<br>

```bash
# Clone the repository
$ git clone https://github.com/edsonaraujobr/anotaai

# Run the application through docker
$ docker compose up --build

# To close the application
$ docker compose down -v
```
<br>
You can acess the endpoints locally with link: http://localhost:4444  <br>
After that, you need to create an account. Then, you can access the system.

## 💻 Entities

### User

Who access the system

Method | Description | endpoint
---|---|---
`POST`| Create user | `/user/create`
`POST`| Login as user | `/user/login`
`PUT`| Update user | `/user/update/:id`
`DELETE`| Delete user | `/user/delete/:id`

* Example body to create user
  ```bash
  {
      "fullName": STRING(100),
      "email": STRING(100),
      "password": STRING,
      "photo": BLOB [optional]
  }
  ```

### Task

Tasks that the user saves

Method | Description | endpoint
---|---|---
`POST`| Create task | `/task/create`
`POST`| Read all tasks | `/task/realAll`
`POST`| Read all tasks no completed | `/task/realAllNoCompleted`
`POST`| Read all tasks completed | `/task/realAllCompleted`
`PUT`| Update tasks | `/task/update/:id`
`DELETE`| Delete tasks | `/task/delete/:id`

* Example body to create task
  ```bash
  {
    "title": STRING(100),
    "description": TEXT,
    "completed": BOOLEAN,
    "userId": UUID
  }
  ```

## 👨‍💻 Technologies

These are the technologies used in this project

**Backend:** [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/pt-br/), [MySQL](https://www.mysql.com/). <br>
**Frontend:** [ReactJS](https://react.dev/), [TailwindCSS](https://tailwindcss.com/docs/guides/vite), [Vite](https://vitejs.dev/).

## 📝 License

This project are is under the MIT license. See the [LICENSE](https://github.com/edsonaraujobr/anotaai/blob/main/LICENSE) to get more details.












   




