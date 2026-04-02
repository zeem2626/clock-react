export type TextSettings = {
  timeFontSize: number;
  timeColor: string;
  timeX: number;
  timeY: number;
  dateFontSize: number;
  dateColor: string;
  dateX: number;
  dateY: number;
};

export const defaultTextSettings: TextSettings = {
  timeFontSize: 160,
  timeColor: '#9effdf',
  timeX: 80,
  timeY: 120,
  dateFontSize: 32,
  dateColor: '#92c4b3',
  dateX: 150,
  dateY: 400,
};
