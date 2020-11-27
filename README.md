# Bookshelf-API

A Book Management API that has: User Authentication and Book Management System.
Users can signup and login and then have access to add, edit, delete books. Book details can be seen publicly.

Use 'npm install' to install necessary packages and 'npm run start' to run the application.

**Connecting to MongoDB**
After starting the application, we define a connection for mongodb. Once we establish a connection from the terminal, we can access our API from localhost:3000. Then we use Postman for the requests.

  ## USERS API

   **Creating users (POST request):**
    Use *localhost:3000/users* to create a user by entering a **JSON OBJECT** having mandatory fields: email, password, name, age. In response, the newly created user info is returned with an authentication token. E.g.,
    ```{
        "name": "Samuel White",
        "email": "hwolowitz456@yahoo.com",
        "password": "de$p3j123",
        "age": 40
      }```

   **Logging in users (POST request):**
    Use *localhost:3000/users/login* to login as an existing user by entering a **JSON OBJECT** having mandatory fields: email, password. In response, the logged in user info is returned with an authentication token. E.g.,
    {
        "email": "hwolowitz456@yahoo.com",
        "password": "de$p3j123"
    }

   **Read user profile (GET request):**
    Use *localhost:3000/users/me* to access your own profile while logged in. In response, either your profile info **or** an authentication error will occur if not logged in.

   **Update user profile (PATCH request):**
    Use *localhost:3000/users/me* to update your own profile while logged in. Enter a **JSON OBJECT** having valid fields to change, along with new values. In response, either your profile info **or** an authentication error will occur if not logged in. E.g.,
    {
        "email": "viity22@yahoo.com",
        "age": "56"
    }

   **Delete user (DELETE request):**
    Use *localhost:3000/users/me* to delete your id when logged in.

   **Logging out (POST request):**
    Use *localhost:3000/users/logout* to logout with the recent token.
    Use *localhost:3000/users/logoutAll* to logout with all the tokens.
    
  
  ## BOOKS API
  Make sure you are logged in with a token to add, update or delete books. **Authentication is not need to _view_ book list and details.
  
   **Adding books (POST request):**
    Use *localhost:3000/books* to add a book by entering a **JSON OBJECT** having mandatory fields: isbn, title, author, published. In response, the newly created book info is returned. E.g.,
    {
      "isbn": "978-3-16-148410-0",
      "title": "Breaking Bad",
      "author": "Vince Gilligan",
      "published": 2008
    }

  **Update books (PATCH request):**
    Use *localhost:3000/books/id* to update a specific book while logged in. Enter a **JSON OBJECT** having valid fields to change, along with new values. In response, either your profile info **or** an authentication error will occur if not logged in. E.g.,
    {
      "author": "Walter H. White"
    }

  **Delete books (DELETE request):**
    Use *localhost:3000/books/id* to delete a specific book by its id.
    
  **View Booklist:**
    Use *localhost:3000/books* to view all the books added by all users.
    
  **View Book detail:**
    Use *localhost:3000/books/id* to view further details of books.

