# Home Library Service

## Description
The **Home Library Service** is an application where users can manage a personal library of music by creating, reading, updating, and deleting information about artists, tracks, and albums. Users can also organize their favorite selections, adding preferred tracks, albums, and artists to a dedicated favorites section in their library.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Application](#running-application)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [User](#user)
  - [Artist](#artist)
  - [Album](#album)
  - [Track](#track)
  - [Favorites](#favorites)
- [Testing](#testing)
- [Docker: Commands](#docker-commands)
  - [Starting the Application](#starting-the-application)
  - [Stopping the Application](#stopping-the-application)
  - [Removing Containers and Volumes](#removing-containers-and-volumes)
  - [Restarting the Application](#restarting-the-application)
  - [Viewing Container Logs](#viewing-container-logs)
  - [Viewing Running Containers](#viewing-running-containers)
  - [Stopping a Specific Container](#stopping-a-specific-container)
  - [Starting a Specific Container](#starting-a-specific-container)
  - [Updating Images and Restarting](#updating-images-and-restarting)
  - [Interactive Session with a Container](#interactive-session-with-a-container)
  - [Login](#login)
- [Docker: Security Scanning](#docker-security-scanning)
- [Formatting](#formatting)
  - [List of Errors and Warnings](#list-of-errors-and-warnings)
  - [Auto-fix and Format](#auto-fix-and-format)
- [Debugging in VSCode](#debugging-in-vscode)

## Prerequisites

<a href="#table-of-contents" style="font-size: 0.8em; color: gray;">⬆️ Back to Table of Contents</a>

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/engine/install/)
- `Docker Hub` Account - Sign Up on [Docker Hub](https://hub.docker.com/)
- Docker Scout (for scanning images) - [Download & Install Docker Scout](https://docs.docker.com/scout/install/)

## Installation

<a href="#table-of-contents" style="font-size: 0.8em; color: gray;">⬆️ Back to Table of Contents</a>

1. **Clone the repository**:  

    ```bash
    git clone https://github.com/allaprischepa/nodejs2024Q3-service.git
    ```

2. **Go to the project folder and select `rest-service` branch**:  

    ```bash
    cd nodejs2024Q3-service
    git checkout docker-database
    ```
3. **Install dependencies**:  

    Make sure you are using Node.js version 22.x.x (22.9.0 or higher).
    ```bash
    npm install
    ```

4. **Set up the environment**:  

    Create a `.env` file at the root of the project based on the `.env.example` file.  
    The `.env.example` contains an example of how to define the port on which the application will run and postgres variables:  
    ```
    PORT=4000

    POSTGRES_PORT=5432
    POSTGRES_USER=hls_postgress
    POSTGRES_PASSWORD=hls_postgress
    POSTGRES_DB=hls_postgress
    ```
    If `PORT` variable is not provided, the application will use port `4000` by default.

    > [!NOTE]  
    > You do not need to change `DATABASE_URL` variable. Just leave it as is.

## Running application

<a href="#table-of-contents" style="font-size: 0.8em; color: gray;">⬆️ Back to Table of Contents</a>

The application can be run using `Docker`.

 > [!NOTE]  
 > Unlike Compose V1, Compose V2 integrates into the Docker CLI platform and the recommended command-line syntax is `docker compose`. So if you are using Compose V1 run commands with `docker-compose`.
 
Go to the root project directory and run the following command:

```bash
docker compose up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Environment Variables

<a href="#table-of-contents" style="font-size: 0.8em; color: gray;">⬆️ Back to Table of Contents</a>

Create a `.env` file to configure the application port and variables for postgres database connection. Example:

```
PORT=4000

POSTGRES_PORT=5432
POSTGRES_USER=hls_postgress
POSTGRES_PASSWORD=hls_postgress
POSTGRES_DB=hls_postgress
```

- `PORT`: The port on which the application will listen requests.

## API Endpoints

<a href="#table-of-contents" style="font-size: 0.8em; color: gray;">⬆️ Back to Table of Contents</a>

> [!NOTE]  
> You can find detailed API documentation by visiting [http://localhost:4000/doc](http://localhost:4000/doc) after starting the application, or by accessing the OpenAPI specification file located at `/doc/api.yaml`  

You can perform requests using tools like Postman, curl, or similar.  
Here is a list of available API endpoints:

### User

<a href="#api-endpoints" style="font-size: 0.8em; color: gray;">⬆️ Back to API Endpoints</a>

Performs on `/user` route

  * `GET /user` - get all users  
    **Response:**  
    - `status code` **200** and all users records 

  * `GET /user/:id` - get single user by id  
    **Response:**  
    - `status code` **200** and and record with `id === userId` if it exists
    - `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - `status code` **404** and corresponding message if record with `id === userId` doesn't exist  

  * `POST /user` - create user  
    **Request body:**  
    JSON object with the following data: 
    - `login` (string) - Required;
    - `password` (string) - Required;

    **Response:**  
      - `status code` **201** and newly created record if request is valid
      - `status code` **400** and corresponding message if request `body` does not contain **required** fields

  * `PUT /user/:id` - update user's password  
    **Request body:**  
    JSON object with the following data: 
    - `oldPassword` (string) - Required;
    - `newPassword` (string) - Required;

    **Response:**  
    - ` status code` **200** and updated record if request is valid
    - ` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - ` status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - ` status code` **403** and corresponding message if `oldPassword` is wrong

  * `DELETE /user/:id` - delete user  
    **Response:**  
    -  `status code` **204** if the record is found and deleted
    -  `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    -  `status code` **404** and corresponding message if record with `id === userId` doesn't exist

### Artist

<a href="#api-endpoints" style="font-size: 0.8em; color: gray;">⬆️ Back to API Endpoints</a>

Performs on `/artist` route  

  * `GET /artist` - get all artists  
    **Response:**  
    -  `status code` **200** and all artists records
  
  * `GET /artist/:id` - get single artist by id  
    **Response:**  
    -  `status code` **200** and and record with `id === artistId` if it exists
    -  `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    -  `status code` **404** and corresponding message if record with `id === artistId` doesn't exist  

  * `POST /artist` - create new artist  
    **Request body:**  
    JSON object with the following data: 
    - `name` (string) - Required;
    - `grammy` (boolean) - Required; 

    **Response:**  
    -  `status code` **201** and newly created record if request is valid
    -  `status code` **400** and corresponding message if request `body` does not contain **required** fields

  * `PUT /artist/:id` - update artist info  
    **Request body:**  
    JSON object with the following data: 
    - `name` (string) - Required;
    - `grammy` (boolean) - Required; 

    **Response:**  
    - ` status code` **200** and updated record if request is valid
    - ` status code` **400** and corresponding message if `artist` is invalid (not `uuid`)
    - ` status code` **404** and corresponding message if record with `id === artistId` doesn't exist

  * `DELETE /artist/:id` - delete album  
    **Response:**  
    -  `status code` **204** if the record is found and deleted
    -  `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    -  `status code` **404** and corresponding message if record with `id === artistId` doesn't exist

### Album

<a href="#api-endpoints" style="font-size: 0.8em; color: gray;">⬆️ Back to API Endpoints</a>

Performs on `/album` route  

  * `GET /album` - get all albums  
    **Response:**  
    -  `status code` **200** and all albums records
  
  * `GET /album/:id` - get single album by id  
    **Response:**  
    -  `status code` **200** and and record with `id === albumId` if it exists
    -  `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    -  `status code` **404** and corresponding message if record with `id === albumId` doesn't exist
  
  * `POST /album` - create new album  
    **Request body:**  
    JSON object with the following data:  
    - `name` (string) - Required;
    - `year` (number) - Required;
    - `artistId` (UUID string) - Required;  

    **Response:**  
    -  `status code` **201** and newly created record if request is valid
    -  `status code` **400** and corresponding message if request `body` does not contain **required** fields

  * `PUT /album/:id` - update album info  
    **Request body:**  
    JSON object with the following data:  
    - `name` (string) - Required;
    - `year` (number) - Required;
    - `artistId` (UUID string) - Required;  

    **Response:**  
    - ` status code` **200** and updated record if request is valid
    - ` status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    - ` status code` **404** and corresponding message if record with `id === albumId` doesn't exist

  * `DELETE /album/:id` - delete album  
    **Response:**  
    -  `status code` **204** if the record is found and deleted
    -  `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    -  `status code` **404** and corresponding message if record with `id === albumId` doesn't exist

### Track

<a href="#api-endpoints" style="font-size: 0.8em; color: gray;">⬆️ Back to API Endpoints</a>

Performs on `/track` route  

  * `GET /track` - get all tracks    
    **Response:**  
    -  `status code` **200** and all tracks records

  * `GET /track/:id` - get single track by id  
    **Response:**  
    -  `status code` **200** and and record with `id === trackId` if it exists
    -  `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    -  `status code` **404** and corresponding message if record with `id === trackId` doesn't exist
  
  * `POST /track` - create new track  
    **Request body:**  
    JSON object with the following data: 
    - `name` (string) - Required;
    - `artistId` (UUID string) - Required;
    - `albumId` (UUID string) - Required;
    - `duration` (number) - Required; 

    **Response:**  
    -  `status code` **201** and newly created record if request is valid
    -  `status code` **400** and corresponding message if request `body` does not contain **required** fields
  
  * `PUT /track/:id` - update track info  
    **Request body:**  
    JSON object with the following data: 
    - `name` (string) - Required;
    - `artistId` (UUID string) - Required;
    - `albumId` (UUID string) - Required;
    - `duration` (number) - Required; 

    **Response:**  
    - ` status code` **200** and updated record if request is valid
    - ` status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    - ` status code` **404** and corresponding message if record with `id === trackId` doesn't exist

  * `DELETE /track/:id` - delete track  
    **Response:**  
    -  `status code` **204** if the record is found and deleted
    -  `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    -  `status code` **404** and corresponding message if record with `id === trackId` doesn't exist  

### Favorites

<a href="#api-endpoints" style="font-size: 0.8em; color: gray;">⬆️ Back to API Endpoints</a>

Performs on `/favs` route

  * `GET /favs` - get all favorites  
    **Response:**  
    -  `status code` **200** and all favorite records (**not their ids**), split by entity type:
    ```typescript
    {
      artists: Artist[];
      albums: Album[];
      tracks: Track[];
    }
    ```

  * `POST /favs/track/:id` - add track to the favorites  
    **Response:**  
    -  `status code` **201** and corresponding message if track with `id === trackId` exists
    -  `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    -  `status code` **422** and corresponding message if track with `id === trackId` doesn't exist

  * `DELETE /favs/track/:id` - delete track from favorites  
    **Response:**  
    -  `status code` **204** if the track was in favorites and now it's deleted id is found and deleted
    -  `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
    -  `status code` **404** and corresponding message if corresponding track is not favorite

  * `POST /favs/album/:id` - add album to the favorites  
    **Response:**  
    -  `status code` **201** and corresponding message if album with `id === albumId` exists
    -  `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    -  `status code` **422** and corresponding message if album with `id === albumId` doesn't exist

  * `DELETE /favs/album/:id` - delete album from favorites  
    **Response:**  
    -  `status code` **204** if the album was in favorites and now it's deleted id is found and deleted
    -  `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
    -  `status code` **404** and corresponding message if corresponding album is not favorite

  * `POST /favs/artist/:id` - add artist to the favorites  
    **Response:**  
    -  `status code` **201** and corresponding message if artist with `id === artistId` exists
    -  `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    -  `status code` **422** and corresponding message if artist with `id === artistId` doesn't exist

  * `DELETE /favs/artist/:id` - delete artist from favorites  
    **Response:**  
    -  `status code` **204** if the artist was in favorites and now it's deleted id is found and deleted
    -  `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
    -  `status code` **404** and corresponding message if corresponding artist is not favorite

## Testing

<a href="#table-of-contents" style="font-size: 0.8em; color: gray;">⬆️ Back to Table of Contents</a>

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

Here’s a README for useful Docker Compose commands for users working with your application:

---

## Docker: Commands

<a href="#table-of-contents" style="font-size: 0.8em; color: gray;">⬆️ Back to Table of Contents</a>

 > [!NOTE]  
 > Unlike Compose V1, Compose V2 integrates into the Docker CLI platform and the recommended command-line syntax is `docker compose`. So if you are using Compose V1 run commands with `docker-compose`.

There are several commands that will be useful while the application usage. 

### Starting the application

To start all services defined in the `docker-compose.yml` file, use the following command:

```bash
docker compose up
```

If you want to run the services in detached mode (in the background), add the `-d` flag:

```bash
docker compose up -d
```

### Stopping the application

To stop all containers running through Docker Compose:

```bash
docker compose down
```

### Removing containers and volumes

To remove all containers and volumes (including database data):

```bash
docker compose down --volumes
```

This will remove all volumes used by the containers, such as `postgres_data`, which can be useful for clearing data.

### Restarting the application

```bash
docker compose restart
```

### Viewing container logs

To view the logs of all containers in real-time:

```bash
docker compose logs -f
```

If you want to view the logs of a specific container, such as the app container, use:

```bash
docker compose logs -f app
```

### Viewing running containers

```bash
docker compose ps
```

### Stopping a specific container

If you want to stop only the app container (without affecting others), run:

```bash
docker compose stop app
```

### Starting a specific container

To start only one container, such as the `app` container:

```bash
docker compose up -d app
```

Similarly, to start only the `postgres` container:

```bash
docker compose up -d postgres
```

### Updating images and restarting

If you need to update the images, use the following command:

```bash
docker compose pull
```

Then restart the containers:

```bash
docker compose up
```
or

```bash
docker compose up -d
```

### Interactive session with a container

If you need to enter the app container for debugging or development, run an interactive session:

```bash
docker compose exec app /bin/sh
```

This will open a terminal inside the `app` container where you can execute commands. To close the terminal type `exit` and press `enter`.

### Login

To authenticate to a registry with a username and password run the following command (and type the password when asked):

```bash
docker login -u <your_username>
```

## Docker: Security Scanning

<a href="#table-of-contents" style="font-size: 0.8em; color: gray;">⬆️ Back to Table of Contents</a>

#### Images:
- App image: `allaprishchepa/nodejs2024q3-service:app`
- PostgreSQL image: `allaprishchepa/nodejs2024q3-service:postgres`

---

You can run the folowing command to scan the App and the PostgreSQL images for security vulnerabilities:

```bash
npm run docker:scan-images
```

> [!NOTE] You must be logged into the Docker registry and have Docker Scout installed to perform the scan

## Formatting

<a href="#table-of-contents" style="font-size: 0.8em; color: gray;">⬆️ Back to Table of Contents</a>

### List of errors and warnings

```
npm run lint:raw
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

## Debugging in VSCode

<a href="#table-of-contents" style="font-size: 0.8em; color: gray;">⬆️ Back to Table of Contents</a>

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
