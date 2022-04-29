import AdminRepository from '../repositories/admin-repository';
import superjson from 'superjson';
import { Admin } from '@prisma/client';

export default class AdminController {
  static getActiveAdmins = async () => {
    const activeAdminsString = superjson.stringify(
      await AdminRepository.getActiveAdmins()
    );
    return superjson.parse<Admin[]>(activeAdminsString);
  };
}
