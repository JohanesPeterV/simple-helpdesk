export type FilterParameter = {
  status: string;
  title: string;
  content: string;
  keyword: string;
  creationTimeRange: RangeDate;
  doneTimeRange: RangeDate;
};
const DefaultFilterParameter: FilterParameter = {
  status: 'All Status',
  title: '',
  content: '',
  keyword: '',
  creationTimeRange: { startDate: '', endDate: '' },
  doneTimeRange: { startDate: '', endDate: '' },
};
export type RangeDate = {
  startDate: string;
  endDate: string;
};
export default DefaultFilterParameter;
