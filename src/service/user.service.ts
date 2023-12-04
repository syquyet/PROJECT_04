import { apiGetAllUsers, apiGetUserById } from "../API/user.api";

class UserService {
  // ================= get user by id ====================
  async getUserById(id: any) {
    const response = await apiGetUserById(id);
    return response;
  }
  // ==================== get all users ===================
  async getAllUsers() {
    const response = await apiGetAllUsers();
    return response;
  }
}
export default UserService;
