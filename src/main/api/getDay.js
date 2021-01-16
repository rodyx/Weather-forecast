const dateNow = new Date()
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const getDay = (value) => {
  switch (value) {
    case 'today':
      return `Today, ${dateNow.getDate()} ${months[dateNow.getMonth()]}`
      break;
    case 'tomorrow':
      const tomorrow = new Date(dateNow);
      tomorrow.setDate(dateNow.getDate() + 1)
      return `${daysOfWeek[tomorrow.getDay()].slice(0, 3)}, ${tomorrow.getDate()} ${months[tomorrow.getMonth()]}`
      break;
    case 'after':
      const after = new Date(dateNow);
      after.setDate(dateNow.getDate() + 2)
      return `${daysOfWeek[after.getDay()].slice(0,3)}, ${after.getDate()} ${months[after.getMonth()]}`
      break;
    default:
      break;
  }
}