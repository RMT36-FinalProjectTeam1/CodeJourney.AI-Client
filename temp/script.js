// // Sidebar Schedule
// let schedules = document.querySelector('.sidebar-schedules')

// schedules.onclick = () => {
//   schedules.classList.toggle('active')
// }

// Recommended Schedule Card
let dropdownBox = document.querySelector('.dropdown-box')
let cardsBox = document.querySelector('.cards-box')

dropdownBox.onclick = () => {
  cardsBox.classList.toggle('active')
  console.log('ok')
}