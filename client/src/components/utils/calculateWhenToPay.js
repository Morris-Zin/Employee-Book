const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const calculateWhenToPay = (startDate) => {
    // const salary = employee.salary.split(' ')[0]; 
    let payMentDate = +startDate.split('-')[2] ;
    const currentDate = new Date(); 
    const days = currentDate.getDate()
    const thisMonth = monthNames[currentDate.getMonth()]; 
    
    if (thisMonth !== 'April' && thisMonth !== 'Septhember' && thisMonth !== 'June' && thisMonth !== 'November')    {
        payMentDate += 31
    } else if (thisMonth === 'February') {
        payMentDate += 29; 
    } else {
        payMentDate += 30;
    }
    return (payMentDate - days); 
}; 

export default calculateWhenToPay;
