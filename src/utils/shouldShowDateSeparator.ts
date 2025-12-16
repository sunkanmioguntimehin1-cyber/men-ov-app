interface Message {
  id: string;
  text: string;
  isAi: boolean;
  timestamp: string;
  date: string;
  fullDate: Date;
}
export const shouldShowDateSeparator = (
  currentMsg: Message,
  prevMsg: Message | null
): boolean => {
  if (!prevMsg) return true;

  const currentDate = new Date(currentMsg.fullDate);
  const prevDate = new Date(prevMsg.fullDate);
  currentDate.setHours(0, 0, 0, 0);
  prevDate.setHours(0, 0, 0, 0);

  return currentDate.getTime() !== prevDate.getTime();
};
