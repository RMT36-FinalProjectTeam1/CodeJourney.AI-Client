const { schedule } = require("./db_test.json");
const startDate = new Date();
const fs = require("fs");
const newSchedule = [[]];
let month = startDate.getMonth();
let week = startDate.getDay();
console.log(week);
// schedule.forEach(el => {
//     el.forEach(e => {
//         e.forEach(task => {
//             startDate.setDate(startDate.getDate()+1)
//             task.date = new Date(startDate)

//         })
//     }
//     )
// })

// fs.writeFile('./data.json',JSON.stringify(schedule), 'utf8', (err) => {
//     if (err) {
//       console.error('Error writing JSON file:', err);
//       return;
//     }
//     console.log('JSON file has been created.');
//   });

const getWeek = (date) => {};
