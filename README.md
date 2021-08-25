# NodeJs with Firebase Realtime Database
 This project demonstrates the implementation  of #CRUD operation with #Firebase under NodeJs app

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

   * Node JS
   * Postman (For testing api locally)
   * Firebase project setup

#### Creating an Firebase application
1. If you haven't already, create a Firebase project: In the Firebase console, click Add project, then follow the on-screen instructions to create a Firebase project or to add Firebase services to an existing GCP project.

2. Navigate to the Database section of the Firebase console. You'll be prompted to select an existing Firebase project. Follow the database creation workflow.

3. Select a starting mode for your Firebase Security Rules

4. Click Done.

#### Get service account key file

1. In the Firebase console, open Settings > Service Accounts.

2. Click Generate New Private Key, then confirm by clicking Generate Key.

3. Securely store the JSON file containing the key.

*NOTE*: 
1. In my project the service account file is `server/service-account-file.json`
2. Firebase configurations are under `server/services/Firebase.js`

### Running endpoints

###### CREATE

Method: `POST`
URL: `http://localhost:3000/api/user`
Body:
```js 
{
    id: String,
    score: Number,
    winning: Number,
    cardGame: {
        round: Number,
        score: Number
    }
}
```
###### READ ALL USERS AND INFO

Method: `GET`
URL: `http://localhost:3000/api/user`

###### UPDATE   // All number fields are increased with new Values.

Method: `POST`
URL: `http://localhost:3000/api/user`
Body: 
```js 
{
    id: String,
    score: Number,
    winning: Number,
    cardGame: {
        round: Number,
        score: Number
    },
    addNewFiled: String,
    newGame: {
        round: Number,
        score: Number
    }
}
```

###### DELETE
Method: `DELETE`
URL: `http://localhost:3000/api/user/remove/{id}`

