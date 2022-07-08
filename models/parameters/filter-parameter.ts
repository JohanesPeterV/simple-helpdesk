export type FilterParameter = {
    status: string;
    title: string;
    creationTimeRange: RangeDate;
  };
  
export type RangeDate = {
  startDate: string;
  endDate: string;
};