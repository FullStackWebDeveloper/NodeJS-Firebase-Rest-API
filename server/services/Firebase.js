import firebase from "firebase-admin";
import serviceAccount from "../service-account-file.json";

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://reacttest-580ca.firebaseio.com",
});

var db = firebase.database();
var usersRef = db.ref("users");

class Firebase {
  static async requestUsers(req, res) {
    usersRef.once("value", (snapshot) => {
      res
        .status(200)
        .send({ status: 200, users: Object.values(snapshot.val()) });
    });
  }

  static async requestUser(req, res) {
    const {
      params: { id },
    } = req;
    usersRef
      .orderByChild("id")
      .equalTo(id)
      .once("value", (snapshot) => {
        if (snapshot.val() == null) {
          res.status(404).send({ status: 404, error: "User not found" });
        } else {
          res.status(200).send({
            status: 200,
            data: Object.values(snapshot.val()),
          });
        }
      });
  }

  // CREATE - create user account
  static async createAccount(req, res) {
    const data = req.body;

    // Push the data to the databse
    usersRef.push(data, function (err) {
      if (err) {
        res
          .status(500)
          .send({ status: 500, message: "Internal server error!" });
      } else {
        res
          .status(201)
          .send({ status: 201, message: "New user created successfully!" });
      }
    });
  }
  
 // New API for create User
  static async createUser(data, res) {
    usersRef.push(data, (err) => {
      if (err) {
        res
          .status(500)
          .send({ status: 500, message: "Internal server error!" });
      } else {
        res
          .status(201)
          .send({
            status: 201,
            message: "New user created successfully!",
            data: data,
          });
      }
    });
  }

  static async updateChild(snapshot, data) {
    if (snapshot.hasChildren()) {
      Object.keys(data).forEach((key) => {
        this.updateChild(snapshot.child(key), data[key]);
      });
    } else {
      if (snapshot.exists()) {
        if (typeof data == "number" && typeof snapshot.val() == "number") {
          snapshot.ref.transaction((current_value) => {
            return (current_value || 0) + data;
          });
        } else {
          return snapshot.ref.set(data);
        }
      } else {
        return snapshot.ref.set(data);
      }
    }
  }

  // UPDATE - update a particular user
  static async updateUser(req, res) {
    const { id } = req.body;
    const data = req.body;
    
    // If user exist
    usersRef
      .orderByChild("id")
      .equalTo(id)
      .once("value", (snapshot) => {
        if (snapshot.val() != null) {
          snapshot.forEach((childSnapshot) => {
            this.updateChild(childSnapshot, data).then(() => {
              const key = childSnapshot.key;
              usersRef.child(key).once("value", (snapshot) => {
                if (snapshot.val() == null) {
                  res
                    .status(500)
                    .send({ status: 500, error: "User can't save correctly." });
                } else {
                  res.status(201).send({
                    status: 201,
                    message: "User updated successfully!",
                    data: snapshot,
                  });
                }
              });
            });
          });
        } else {
          this.createUser(data, res);
        }
      });
  }

  // DELETE - delete user account
  static async deleteUser(req, res) {
    const {
      params: { id },
    } = req;

    // reove user account

    usersRef
      .orderByChild("id")
      .equalTo(id)
      .once("value", (snapshot) => {
        if (snapshot.val() != null) {
          snapshot.forEach((childSnapshot) => {
              const key = childSnapshot.key;
              usersRef.child(key).remove((err) => {
                if (err) {
                  res.send(err);
                } else {
                  res.status(201).send({
                    status: 201,
                    message: "User removed successfully!",
                  });
                }
              });
          });
        } else {
          res.status(404).send({ status: 404, error: "User not found" });
        }
      })
  }
}

export default Firebase;
