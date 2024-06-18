# ConnectU
    
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
## Description

ConnectU is a dynamic social media platform designed to foster authentic connections and meaningful interactions. Users can create personalized profiles, share updates, engage with a vibrant community through likes and comments, and participate in dynamic chat rooms. Whether networking, sharing passions, or making new friends, ConnectU provides a versatile platform for users to express themselves and connect with others.


## Deployed Application URL
https://project-2-group-2.onrender.com/

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [Features](#features)
* [Technologies Used](#technologies-used)
* [Dependencies](#dependencies)
* [Screenshots](#screenshots)
* [Walkthrough](#walkthrough)
* [Tests](#tests)
* [License](#license)
* [Screenshots](#screenshots)

## Installation
1. run 'npm init -y'
2. install node dependencies 'npm i'
3. Create a .env file in the root directory of your project
4. Ensure your database (e.g., PostgreSQL) is installed and running
5. start the server 'node server.js'

## Usage
To run the project locally, follow these steps:

1. Clone the repository from [GitHub](https://github.com/raulds-fmtx/Project-2-Group-2).
2. Install dependencies using `npm install`.
3. Set up the PostgreSQL database and update the configuration in `config/config.json`.
4. Set up your own .env file
5. Start the server with `npm start`.
6. Access the application at `http://localhost:3001`.

## Credits

- [Crystal Cruz](https://github.com/CrystalC19)
- [Harris Hurley](https://github.com/harrismhurley)
- [Raul Santos](https://github.com/raulds-fmtx)

## Features
- **User Profiles:** Customize your profile with personal information, profile picture, and bio.
- **Post Updates:** Share thoughts, photos, and videos with your followers.
- **Likes and Comments:** Engage with posts by liking and commenting on them.
- **Follow and Unfollow:** Follow users to stay updated with their posts and activities.
- **Chat Rooms:** Participate in real-time conversations with other users.
- **Search Functionality:** Easily find other users based on usernames.
- **Responsive Design:** Accessible across various devices, ensuring a seamless user experience.


## Technologies Used

- **Frontend:** HTML, CSS, JavaScript, Handlebars.js
- **Backend:** Node.js, Express.js, Sequelize (ORM)
- **Database:** PostgreSQL
- **Authentication:** JSON Web Tokens (JWT)
- **Other Tools:** Bulma (CSS framework), Handlebars (templating engine), Axios (HTTP client), Render (deployment)

## Dependencies

- bcrypt: ^5.1.1
- connect-session-sequelize: ^7.1.7
- dotenv: ^16.4.5
- express: ^4.19.2
- express-handlebars: ^7.1.2
- express-session: ^1.18.0
- jquery: ^3.7.1
- moment: ^2.30.1
- multer: ^1.4.5-lts.1
- pg: ^8.11.5
- sequelize: ^6.37.3
- socket.io: ^4.7.5

## Screenshots
![Signup](./public/readMeImages/signup.png)
![Post](./public/readMeImages/post.png)
![Dashboard](./public/readMeImages/dash.png)

## Tests

N/A

## License 

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license.




