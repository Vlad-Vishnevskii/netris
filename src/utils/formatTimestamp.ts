export const formatTimestamp = (timestamp: number): string => {
  const totalMilliseconds = Math.round(timestamp * 1000);
  const minutes = Math.floor(totalMilliseconds / 60000);
  const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
  const milliseconds = totalMilliseconds % 1000;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(
    milliseconds,
  ).padStart(3, '0')}`;
};
