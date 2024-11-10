# Home Library Service

## Description
The **Home Library Service** is an application where users can manage a personal library of music by creating, reading, updating, and deleting information about artists, tracks, and albums. Users can also organize their favorite selections, adding preferred tracks, albums, and artists to a dedicated favorites section in their library.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Application](#running-application)
  - [Standard Mode](#standart-mode)
  - [Development Mode](#development-mode)
  - [Debug Mode](#debug-mode)
  - [Production Mode](#production-mode)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [User](#user)
  - [Artist](#artist)
  - [Album](#album)
  - [Track](#track)
  - [Favorites](#favorites)
- [Testing](#testing)
- [Formatting](#formatting)
  - [List of Errors and Warnings](#list-of-errors-and-warnings)
  - [Auto-fix and Format](#auto-fix-and-format)
- [Debugging in VSCode](#debugging-in-vscode)

## Prerequisites

<a href="#table-of-contents" style="font-size: 0.8em; color: gray;">⬆️ Back to Table of Contents</a>

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Installation

<a href="#table-of-contents" style="font-size: 0.8em; color: gray;">⬆️ Back to Table of Contents</a>

1. **Clone the repository**:  

    ```bash
    git clone https://github.com/allaprischepa/nodejs2024Q3-service.git
    ```

2. **Go to the project folder and select `rest-service` branch**:  

    ```bash
    cd nodejs2024Q3-service
    git checkout rest-service
    ```

3. **Install dependencies**:  

    Make sure you are using Node.js version 22.x.x (22.9.0 or higher).
    ```bash
    npm install
    ```

4. **Set up the environment**:  

    Create a `.env` file at the root of the project based on the `.env.example` file.  
    The `.env.example` contains an example of how to define the port on which the application will run:  
    ```
    PORT=4000
    ```
    If `PORT` variable is not provided, the application will use port `4000` by default.

## Running application

<a href="#table-of-contents" style="font-size: 0.8em; color: gray;">⬆️ Back to Table of Contents</a>

The application can be run in four modes: **standart**, **development**, **debug** and **production**.

### Standart Mode

```bash
npm run start
```

### Development Mode

In development mode, the server will automatically restart when changes are detected. Use the following command:

```bash
npm run start:dev
```

### Debug Mode

```bash
npm run start:debag
```

### Production Mode

To run the application in production mode use the command:

```bash
npm run start:prod
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Environment Variables

<a href="#table-of-contents" style="font-size: 0.8em; color: gray;">⬆️ Back to Table of Contents</a>

Create a `.env` file to configure the application port. Example:

```
PORT=4000
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
