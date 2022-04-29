import AdminRepository from "../repositories/admin-repository";

export default class UserController{
    static async getAllAdmin(){
        const admins = await AdminRepository.getAll();
        return admins;
    }
}