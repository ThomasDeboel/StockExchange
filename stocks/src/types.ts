export type StockHistoryPoint = {
  time: string; // ISO date string
  value: number; // Stock price
};
export type ScheduleChange = {
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  fromValue: number; // Stock price before change
  toValue: number; // Stock price after change
};
export type Stock = {
  name: string; // Stock name
  history: StockHistoryPoint[]; // Historical stock prices
  scheduleChanges: ScheduleChange[]; // Scheduled changes in stock prices
};
