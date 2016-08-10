# Gist Explorer

React.js viewer for your gists that allows to label them.

# Description

It is split into 2 separate projects:

  * the first one is a React.js application
  * and the second one is a Rails backend that serves API for labels and manages GitHub authentication

## Authentication

Authentication is based on the token that GitHub provides you as a result of successfull OAuth authentication.

It is implemented in the following way:

1. Application tries to read the token from cookies

    If token presents, it continues authentification process.
    Otherwise authentification fails and the login page is rendered.

2. Application validates the token via GitHub API

    If token is valid then authentication succeed and received user info is saved to the application store.
    Otherwise authentification fails and the login page is rendered.

3. If authentication failed then user has a link that allows him to sign in using GitHub and receive a new token

4. When user clicks this link he is redirected to the backend, which in its turn redirects to request GitHub access. GitHub redirects back to the backend. Backend writes the received token to cookies and redirects back to the React application. This time application will read the new token from the cookies.

## GitHub API

Application reads the following information from GitHub API:

  * user profile
  * list of gists
  * detailed info (with the content of files) about a selected gist

Communication with GitHub API is implemented via `github-api` package.

## Labels API

Since GitHub does not provide any functionality conerning labeling your gists, I have to create my own API for it on the backend application.

This API provides the following methods:

  * read list of all labels
  * create a new label
  * delete an existing label
  * toggle label on the specified gist

API uses a token-based authentication. You have to provide an `Authorization` header with your token:

    Authorization: Token token="the-same-token-you-use-for-github-api"

There is an `API` class (`src/api/index.js`) that incapsulates all the details of API communication.

# Installation

Install React application:

1. `git clone git@github.com:ImmaculatePine/gist-explorer.git`
2. `npm install`

Install backend using instructions from its [repository](https://github.com/ImmaculatePine/gist-explorer-backend)

# Using

Run backend using instructions from its [repository](https://github.com/ImmaculatePine/gist-explorer-backend).

Run `npm start` from the command line and visit `http://localhost:3001` in your browser.

# Tests

Use `npm test` command to run tests.
