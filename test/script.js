const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const confirmButton = document.querySelector('.confirm-button');
// const showtimeSelect = document.getElementById('showtime');

populateUI();
let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Event listener for when the movie selection changes
// movieSelect.addEventListener('change', (e) => {
//   const selectedOption = e.target.options[e.target.selectedIndex];
//   const showtimeData = selectedOption.getAttribute('data-showtimes');

//   // Parse the showtimes from the data attribute
//   const showtimes = showtimeData.split(',');

//   // Populate the showtimeSelect with the showtimes for the selected movie
//   showtimeSelect.innerHTML = '';
//   showtimes.forEach(time => {
//     const option = document.createElement('option');
//     option.value = time;
//     option.textContent = time;
//     showtimeSelect.appendChild(option);
//   });
// });

// Seat click event
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// Confirm booking button click event
confirmButton.addEventListener('click', () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  selectedSeats.forEach((seat) => {
    seat.classList.remove('selected');
    seat.classList.add('occupied');
  });
  updateSelectedCount();
});
