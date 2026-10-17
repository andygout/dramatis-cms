# dramatis-cms [![CircleCI](https://circleci.com/gh/andygout/dramatis-cms/tree/main.svg?style=svg)](https://circleci.com/gh/andygout/dramatis-cms/tree/main)

Content Management System (CMS) for managing database of theatrical productions, materials, and associated data.

## Setup

- Clone this repo
- Set Node.js to version specified in `.nvmrc`, which can be achieved by running `$ nvm use` (if using [Volta](https://docs.volta.sh/guide/getting-started) then it will be set automatically)
- Install Node.js modules: `$ npm clean-install`
- Compile code: `$ npm run build`

## To run locally

- Ensure an instance of [`dramatis-api`](https://github.com/andygout/dramatis-api) is running on `http://localhost:3000`
- Run server using `$ npm start` and visit homepage at `http://localhost:3001`

## To run linting checks

- `$ npm run lint-check`

## To run unit tests

- `$ npm run unit-test`

## Architecture

```mermaid
---
config:
  theme: base
  themeVariables:
    actorBkg: "#E6E6E6"
    actorBorder: "#808080"
    actorTextColor: "#000000"
---
sequenceDiagram
  %% Components and grouping boxes
  actor CLIENT as Client

  box rgb(245, 223, 238) CMS
    participant DRAMATIS_CMS as dramatis-cms
  end

  box rgb(218, 231, 242) API
    participant DRAMATIS_API as dramatis-api
  end

  box rgb(223, 240, 216) Database
    participant NEO4J_DATABASE as Neo4j database
  end

  %% Relationships
  CLIENT ->> DRAMATIS_CMS: GET/POST/PUT/DELETE request

  DRAMATIS_CMS ->> DRAMATIS_API: GET/POST/PUT/DELETE request

  DRAMATIS_API ->> NEO4J_DATABASE: CRUD operation

  NEO4J_DATABASE -->> DRAMATIS_API: Return data

  DRAMATIS_API -->> DRAMATIS_CMS: Return data

  DRAMATIS_CMS -->> CLIENT: Return data
```
