# Coding example app

This is a bare-bones app to show front and back-end coding ability.

## App

* Typescript
* Vue 3
* Jest (component)
* Cypress (e2e)
* Axios

## Server

* Typescript
* Node
* Express
* Sequelize
* PostgreSQL
* Jest

## Setup

If you would like to get the app up-and-running there is a little configuration involved. Both `app` and `server` are independent of one another but I have included up a parent `package.json` so they can be installed and started together. 

1. As Sequelize can't create databases, please create two [PostgreSQL](https://www.postgresql.org/) databases (`priority-app` and `priority-app-test`) both with a role of username/password `priority-app`.

2. Ensure PostgreSQL is running.
  
3. From the projects root directory run `npm run setup` (this will install all dependencies, seed the database, and launch the app and server)
  
4. To start again in the future, run `npm run start` instead. 

> Note: The .env files have only been included for ease of demonstration. 

## Running tests

### App

Navigate to `/app` directory

* Jest component tests - `npm run test:unit`
* Cypress e2e tests - `npm run test:e2e`

### Server

Navigate to `/server` directory

* Jest route tests - `npm run test`




