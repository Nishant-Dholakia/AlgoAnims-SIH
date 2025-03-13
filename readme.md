# AlgoAnims

AlgoAnims is an interactive platform designed to simplify the understanding of algorithms through dynamic animations. The platform provides visual representations of various algorithms, making it easier for users to grasp complex concepts.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Frontend Routes](#frontend-routes)
- [Backend API Endpoints](#backend-api-endpoints)

## Tech Stack

### Frontend
- React.js
- GSAP (GreenSock Animation Platform)
- React Router
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Passport.js (for authentication)
- Multer (for file uploads)

## Frontend Routes

- **Home Page**
  - **Route:** `/`
  - **Component:** `Home`

- **Graph Algorithms**
  - **Route:** `/graph`
  - **Component:** `Graph`

- **Profile**
  - **Route:** `/profile`
  - **Component:** `Profile`

- **Edit Profile**
  - **Route:** `/editprofile`
  - **Component:** `EditProfile`
  - **Sub-routes:**
    - `/editProfilePage`
    - `/editPlatformPage`
    - `/editAccountsPage`

- **Search Algorithms**
  - **Route:** `/search`
  - **Component:** `Topic`

- **Sorting Algorithms**
  - **Route:** `/sort`
  - **Component:** `Topic`

- **Tree Algorithms**
  - **Route:** `/tree`
  - **Component:** `Topic`
  - **Sub-routes:**
    - `/preorder`
    - `/postorder`
    - `/inorder`
    - `/levelorder`

- **Login**
  - **Route:** `/login`
  - **Component:** `Login`
  - **Sub-routes:**
    - `/forgetpassword`
    - `/forgetusername`
    - `/forgetpassword/mail`
    - `/forgetusername/mail`
    - `/forgetpassword/changepassword`

- **Signup**
  - **Route:** `/signup`
  - **Component:** `Signup`

## Backend API Endpoints

- **User Signup**
  - **Endpoint:** `/user/signup`
  - **Method:** `POST`
  - **Description:** Registers a new user.
  - **Request Body:**
    ```json
    {
      "uname": "username",
      "email": "user@example.com",
      "password": "password"
    }
    ```

- **User Login**
  - **Endpoint:** `/user/login`
  - **Method:** `POST`
  - **Description:** Logs in an existing user.
  - **Request Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "password"
    }
    ```

- **User Logout**
  - **Endpoint:** `/user/logout`
  - **Method:** `POST`
  - **Description:** Logs out the current user.

- **Forget Username/Password**
  - **Endpoint:** `/user/forgetform`
  - **Method:** `POST`
  - **Description:** Sends an email to reset the password or retrieve the username.
  - **Request Body:**
    ```json
    {
      "username": "username",
      "email": "user@example.com"
    }
    ```

- **Change Password**
  - **Endpoint:** `/user/changepassword`
  - **Method:** `PATCH`
  - **Description:** Changes the user's password.
  - **Request Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "newpassword"
    }
    ```

- **Get User Details**
  - **Endpoint:** `/user/getuser`
  - **Method:** `POST`
  - **Description:** Retrieves user details.
  - **Request Body:**
    ```json
    {
      "email": "user@example.com"
    }
    ```

- **Update User Score**
  - **Endpoint:** `/score/update`
  - **Method:** `POST`
  - **Description:** Updates the user's score for a specific topic.
  - **Request Body:**
    ```json
    {
      "id": "userId",
      "topic": "topicName",
      "qname": "questionName",
      "checked": true
    }
    ```

- **Get User Score**
  - **Endpoint:** `/score/getscore`
  - **Method:** `POST`
  - **Description:** Retrieves the user's score for a specific topic.
  - **Request Body:**
    ```json
    {
      "id": "userId",
      "topic": "topicName"
    }
    ```

- **Edit User Account**
  - **Endpoint:** `/details/editaccount`
  - **Method:** `PATCH`
  - **Description:** Edits the user's account details.
  - **Request Body:**
    ```json
    {
      "id": "userId",
      "linkedin": "linkedinProfile",
      "github": "githubProfile",
      "discord": "discordProfile"
    }
    ```

- **Edit User Platform**
  - **Endpoint:** `/details/editplatform`
  - **Method:** `PATCH`
  - **Description:** Edits the user's platform usernames.
  - **Request Body:**
    ```json
    {
      "id": "userId",
      "leetUname": "leetcodeUsername",
      "codeUname": "codechefUsername",
      "gfgUname": "gfgUsername"
    }
    ```

- **Edit User Profile**
  - **Endpoint:** `/details/editprofile`
  - **Method:** `PATCH`
  - **Description:** Edits the user's profile details.
  - **Request Body:**
    ```json
    {
      "id": "userId",
      "email": "user@example.com",
      "username": "newUsername",
      "phoneNo": "phoneNumber",
      "country": "countryName"
    }
    ```

- **Edit User Photo**
  - **Endpoint:** `/details/editphoto`
  - **Method:** `POST`
  - **Description:** Edits the user's profile photo.
  - **Request Body:** FormData with `image` file and `id` field.

- **Home Data**
  - **Endpoint:** `/home`
  - **Method:** `POST`
  - **Description:** Retrieves home data for the user.
  - **Request Body:**
    ```json
    {
      "id": "userId"
    }
    ```

- **Get GFG Data**
  - **Endpoint:** `/gfg`
  - **Method:** `POST`
  - **Description:** Retrieves data from GeeksforGeeks for a specific user.
  - **Request Body:**
    ```json
    {
      "name": "gfgUsername"
    }
    ```