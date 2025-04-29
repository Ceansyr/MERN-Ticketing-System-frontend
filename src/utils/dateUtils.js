export const getTicketDuration = (createdAt) => {
  const timeDiff = new Date() - new Date(createdAt);
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours} : ${minutes}`;
};