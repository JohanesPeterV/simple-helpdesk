import { FilterParameter } from "./filter-parameter";

export type PaginateTicketParameter = {
  page: number;
  dataPerPage: number;
  filterParameter: FilterParameter;
};
