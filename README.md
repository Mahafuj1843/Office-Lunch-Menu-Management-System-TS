# Office Lunch Menu Management System [LunchHub]

The Office Lunch Menu Management System is a web application designed to streamline the process of managing daily lunch options in an office environment. This system aims to simplify the lunch ordering process and ensure that all employees' choices are recorded efficiently.

## Technologies used
A list of technologies used within the project:
* Typescript
* React
* Tailwind
* Redux
* Node 
* Express
* Postgresql
* Prisma

## Features
### Admin:
* Add, Update and Delete lunch menu option.
* View lunch menu options.
* View all employee lunch menu choice list.

### Employee
* View daily lunch menu options.
* Select lunch menu.
* Search lunch menu options.
* View my all lunch choice list.

## Database schema

### Users
```bash
  id        Int 
  name      String
  email     String  
  password  String
  role      Role 
  createdAt DateTime 
  updatedAt DateTime 
```

### Menus
```bash
  id        Int
  title     String
  desc      String
  date      DateTime
  extras    String[]
  createdAt DateTime
  updatedAt DateTime
```

### Choices
```bash
  id        Int
  userId    Int
  menuId    Int
  extras    String[]
  createdAt DateTime
```

## Requirment
Install Node and PostgreSQL in local meachine.

## Setup instructions

First, Add the username and password to the database URL in the .env file.
 
Then, install all dependency for Backend:

```bash
npm i
# or
yarn
```
Migrate database schema:

```bash
npx prisma migrate dev --name init
```
Generate the Prisma client:

```bash
npx prisma generate
```

Then, install all dependency for Frontend:

```bash
cd client

npm i
# or
yarn
```

## Project run instructions

Run the Backend development server:

```bash
npm run build

npm start 
#or 
npm run dev

# or

yarn build
yarn start
```

Then, run the React development server:

```bash
cd client

npm run dev
# or
yarn dev
```