# NoteKeeper

NoteKeeper is a desktop note-taking application developed using the Electron framework. With this application, users can add, delete, and view existing notes. NoteKeeper integrates with the PostgreSQL database.

## Features
- Add notes
- Delete notes
- Store data with PostgreSQL database
- User-friendly interface

## Installation and Running
### Requirements
- Node.js (v12.x or higher)
- PostgreSQL

### Steps
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd notekeeper
    ```

2. Install the required packages:
    ```bash
    npm install
    ```

3. Create a database in PostgreSQL and add the connection details to the `lib/connection.js` file:
    ```javascript
    const { Client } = require('pg');

    const client = new Client({
         user: 'your-username',
         host: 'your-host',
         database: 'your-database',
         password: 'your-password',
         port: 5432,
    });

    client.connect();

    module.exports = client;
    ```

4. Start the project:
    ```bash
    npm start
    ```

## Contributing
To contribute, please fork the repository, create a feature branch, make your changes, and submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any questions or feedback related to the project, please contact Eren Altay.