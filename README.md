# Project-2-Group-2

# Social Media Platform

## Description
Create a social media platform where users can create profiles, post updates, and interact with other users through comments and likes.

## Key Features

- **RESTful API:** Use Node.js and Express.js for managing posts, comments, and user interactions.
- **Template Engine:** Render the frontend using Handlebars.js for timelines, profiles, and interaction views.
- **Database:** Utilize PostgreSQL with Sequelize ORM to store posts, user data, comments, and likes.
- **Routes:** Implement GET routes for retrieving posts and POST routes for creating posts, comments, and likes.
- **New Technology:** Integrate WebSockets for real-time updates and notifications.
- **MVC Structure:** Organize the application with a clear MVC structure.
- **Authentication:** Implement user authentication using `express-session` and cookies.
- **Environment Variables:** Protect sensitive data using environment variables.
- **Deployment:** Deploy the app using Render with PostgreSQL integration.
- **UI/UX:** Ensure a user-friendly, responsive, and interactive interface.
- **Quality Standards:** Ensure clean code and include a comprehensive README file.

## User Story
As a user, I want to create a profile, post updates, and interact with other users through comments and likes, so that I can stay connected and engaged with my social network.

## Acceptance Criteria
- **When** I sign up, I want to create a profile with my personal information.
- **When** I log in, I want to see a timeline of posts from users I follow.
- **When** I make a post, I want it to be visible to my followers.
- **When** I comment on a post, I want the comment to be visible under the post.
- **When** I like a post, I want the number of likes to update in real-time.
- **When** I receive a comment or like, I want to be notified in real-time.
- **When** I visit a user’s profile, I want to see their posts and interactions.

## Technologies Used
- Node.js
- Express.js
- Handlebars.js
- PostgreSQL
- Sequelize ORM
- cloudinary
- express-session
- Render (for deployment)

## Folder Structure (MVC Paradigm)
- `models/` – Sequelize models (User, Post, Comment, Like)
- `views/` – Handlebars.js templates
- `controllers/` – Express.js route handlers
- `public/` – Static assets (CSS, JavaScript, images)
- `config/` – Configuration files (database, authentication)
- `routes/` – API routes
- `.env` – Environment variables (API keys, database credentials)

## Deployment
- Deploy the application using Render with a PostgreSQL database.

## UI/UX
- Create a polished, responsive, and interactive user interface with real-time updates for interactions like comments and likes.

## Quality Standards
- Maintain high coding standards with a clear file structure, consistent naming conventions, proper indentation, and quality comments.
- Provide a professional README file with a unique name, description, list of technologies used, screenshots, and link to the deployed application.

## Example Routes
- **GET /api/posts** – Retrieve all posts
- **POST /api/posts** – Create a new post
- **GET /api/users/:id** – Retrieve user profile
- **POST /api/comments** – Create a new comment
- **POST /api/likes** – Like a post

## Example Models
- **User:** id, username, email, password
- **Post:** id, content, user_id, created_at
- **Comment:** id, content, user_id, post_id, created_at
- **Like:** id, user_id, post_id

## Example Environment Variables (.env)
```plaintext
DB_NAME=your_database_name
DB_USER=your_postgresql_username
DB_PASSWORD=your_postgresql_password
SESSION_SECRET=your_session_secret

TODO:
Add Profile pics to users
Remove access to user/:self page from dashboard
Add search access for users
Add styling and extra listeners to chat

