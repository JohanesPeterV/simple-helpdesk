import User from '../auth/user';

export type PaginateTicketFilteredByUserParams = {
  user: User;
  limit?: number;
  skip?: number;
};
