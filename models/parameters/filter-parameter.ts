export type FilterParameter = {
    status: string;
    title: string;
    keyword: string;
    creationTimeRange: RangeDate;
};
  
export type RangeDate = {
  startDate: string;
  endDate: string;
};