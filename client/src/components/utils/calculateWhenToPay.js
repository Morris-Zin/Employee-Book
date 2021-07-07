import moment from "moment";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const calculateWhenToPay = (startDate) => {
  // const salary = employee.salary.split(' ')[0];
  const inMilliseconds = new Date(startDate).getTime();
  const dueDate = inMilliseconds + 1000 * 60 * 60 * 24 * 30;
  return moment(dueDate).format('YYYY-MM-DD')
};

export default calculateWhenToPay;
