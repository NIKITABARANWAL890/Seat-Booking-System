const movieData = [
    {name: "Avengers", price: 199, date: '22 Jul 2025'},
    {name: "Batman", price: 299, date: '2 Jul 2025'},
    {name: "Iron Man", price: 299, date: '18 Jul 2025'},
    {name: "Flash", price: 199, date: '10 Jul 2025'}
]

const movieSelectOptions = document.getElementById('select'); // Ensure the correct select element

const movieOptions = (movies) => {
    movies.forEach((movie) => {
        const newOption = document.createElement('option');
        newOption.value = movie.name; 
        newOption.innerText = movie.name;
        movieSelectOptions.appendChild(newOption);
    });
};

movieOptions(movieData);

const movieName = document.querySelector('.name'); 
const moviePrice = document.getElementsByClassName('cost')[0];
const movieDate = document.querySelector('.date');

const selectMovie = (e) => {
    const selectedValue = e.target.value;
    console.log("Selected Value:", selectedValue);
    const movieFound = movieData.find(movie => movie.name === selectedValue);
    console.log("Movie Found:", movieFound);

    if (movieFound) {
        movieName.innerText = movieFound.name;
        moviePrice.innerText = movieFound.price || "Price not available";  // Assuming 'price' exists
        movieDate.innerText = movieFound.date || "Date not available";  // Assuming 'date' exists
    } else {
        console.log("Movie not found!");
    }
};

// ✅ Add event listener to the select element
document.querySelector("select").addEventListener("change", selectMovie);

const firstColumn = document.querySelector('.first-column');

for (let i = 1; i <= 16; i++) {
    const seatDiv = document.createElement("div");
    seatDiv.classList.add("seat");
    seatDiv.id = i;
    // seatDiv.innerHTML = '<i class="fa-solid fa-square"></i>';
    firstColumn.appendChild(seatDiv);
}

const secondColumn = document.querySelector('.second-column');

for (let i = 17; i <= 48; i++) {
    const seatDiv = document.createElement("div");
    seatDiv.classList.add("seat");
    if(i>16 && i<23){
        seatDiv.classList.add("occupiedSeat");
    }
    seatDiv.id = i;
    // seatDiv.innerHTML = '<i class="fa-solid fa-square"></i>';
    secondColumn.appendChild(seatDiv);
}

const thirdColumn = document.querySelector('.third-column');

for (let i = 49; i <= 64; i++) {
    const seatDiv = document.createElement("div");
    seatDiv.classList.add("seat");
    seatDiv.id = i;
    // seatDiv.innerHTML = '<i class="fa-solid fa-square"></i>';
    thirdColumn.appendChild(seatDiv);
}

const seats = document.querySelectorAll(".seat");
const showSelectedSeats = document.querySelector('.selected-seats-display');
showSelectedSeats.textContent="No seat Selected";
const selectedSeatsCount = document.querySelector('.count');
const totalBill = document.querySelector('.bill');
const selectedSeatsArr = [];

const updateSeatCount = () =>{
    const seatCount = showSelectedSeats.children.length;
    console.log(seatCount);
    selectedSeatsCount.innerText = seatCount;
    totalBill.innerText = seatCount*moviePrice.innerText;
}
// const seatSelected = (e) => {
//     console.log("Seat clicked:", e.target.id);
//     const selectedSeats = e.currentTarget;
//     const seatNumber = selectedSeats.id;

//     if (selectedSeats.classList.contains("occupiedSeat")) {
//         console.log("Occupied seat clicked");
//         alert("Sold out!");
//         return;
//     }

//     if (selectedSeats.classList.contains("selectedSeat")) {
//         // Deselect seat
//         selectedSeats.classList.remove("selectedSeat"); 
//         selectedSeatsArr = selectedSeatsArr.filter(id => id !== seatNumber);
        
//         // Remove from UI display
//         document.querySelector(`.selected-seat-number[data-id="${seatNumber}"]`)?.remove();
//     } else {
//         if (!selectedSeatsArr.includes(seatNumber)) { // Only add if not already present
//             if (selectedSeatsArr.length == 0) {
//                 showSelectedSeats.textContent = "";
//             }
            
//             selectedSeats.classList.add("selectedSeat"); // Select seat
//             selectedSeatsArr.push(seatNumber);

//             // Add to UI display
//             const newSeat = document.createElement("div");
//             newSeat.classList.add("selected-seat-number");
//             newSeat.setAttribute("data-id", seatNumber); // Assign unique identifier
//             newSeat.innerText = seatNumber;
//             showSelectedSeats.appendChild(newSeat);
//         }
//     }

//     console.log(selectedSeatsArr);
//     updateSeatCount(); // Update count after changes
// };


const seatSelected = (e) => {
    console.log("Seat clicked:", e.target.id);
    const selectedSeats = e.currentTarget;
    const seatNumber = selectedSeats.id;

    if (selectedSeats.classList.contains("occupiedSeat")) {
        console.log("Occupied seat clicked");
        alert("Sold out!");
        return;
    }

    if (selectedSeats.classList.contains("selectedSeat")) {
        // Deselect seat
        selectedSeats.classList.remove("selectedSeat"); 
        selectedSeatsArr = selectedSeatsArr.filter(id => id !== seatNumber);
        
        // Remove from UI display
        const seatElementToRemove = [...showSelectedSeats.children].find(
            seat => seat.innerText === seatNumber
        );
        if (seatElementToRemove) {
            seatElementToRemove.remove();
        }
    } else {
        if (!selectedSeatsArr.includes(seatNumber)) { // Only add if not already present
            if (selectedSeatsArr.length == 0) {
                showSelectedSeats.textContent = "";
            }
            
            selectedSeats.classList.add("selectedSeat"); // Select seat
            selectedSeatsArr.push(seatNumber);

            // Add to UI display
            const newSeat = document.createElement("div");
            newSeat.classList.add("selected-seat-number");
            newSeat.innerText = seatNumber;
            showSelectedSeats.appendChild(newSeat);
        }
    }

    console.log(selectedSeatsArr);
    updateSeatCount(); // Update count after changes
};



seats.forEach((seat) => {
    seat.addEventListener("click", seatSelected);
});

const updateSeatStatus = (selectedSeatsArr) => {
    selectedSeatsArr.forEach((seatId) => {
        const seatElement = document.getElementById(seatId); // Get the actual seat element
        if (seatElement) {
            seatElement.classList.remove("selectedSeat");
            seatElement.classList.add("occupiedSeat");
        }
    });
    selectedSeatsCount.textContent=0;
    showSelectedSeats.innerText="";
    showSelectedSeats.textContent="No Seat Selected";
    totalBill.innerText=0;
    selectedSeatsArr.length=0;
};


const handleSubmit = (e) =>{
    console.log('submit');
    if(selectedSeatsCount.length==0){
        alert("Oops! No seat Selected.")
    }else{
        alert("Yay! Your seats have been booked");
        updateSeatStatus(selectedSeatsArr);
    }
}

const handleCancel = (e) => {
    if (selectedSeatsArr.length > 0) {
        selectedSeatsArr.forEach((seatId) => {
            const seatElement = document.getElementById(seatId); // Get the actual seat element
            if (seatElement) {
                seatElement.classList.remove("selectedSeat");
            }
        });

        selectedSeatsCount.textContent = 0;
        showSelectedSeats.innerHTML = "<p>No Seat Selected</p>"; // Ensuring proper structure
        totalBill.innerText = 0;

        selectedSeatsArr.length = 0; // Properly emptying the array
    }
};


