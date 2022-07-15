export type FilterParameter = {
    status: string;
    title: string;
    keyword: string;
    creationTimeRange: RangeDate;
    doneTimeRange: RangeDate;
  };
  
export type RangeDate = {
  startDate: string;
  endDate: string;
};