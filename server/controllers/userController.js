import Firebase from '../services/Firebase';

class userController {
  
  static async requestUsers(req, res) {
    Firebase.requestUsers(req, res);
  }

  static async requestUser(req, res) {
    Firebase.requestUser(req, res);
  }

  static async createAcount(req, res) {
    Firebase.createAccount(req, res);
  }
  static async updateUser(req, res) {
    Firebase.updateUser(req, res);
  }

  static async deleteUser(req, res) {
    Firebase.deleteUser(req, res);
  }
}

export default userController;
