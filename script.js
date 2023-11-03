// initialize the local storage fuels
const fuels = JSON.parse(localStorage.getItem("fuels") || "[]");

// This function execute while click the submit button (add details)
const entryForm = document.querySelector("form");
entryForm.addEventListener("submit", addDetails);

// // variable declearation for form element
// const currentFuelprice = document.getElementById('currentFuelprice'),
//     odometerReading = document.getElementById('odometerReading'),
//     fuelAdded = document.getElementById('fuelAdded'),
//     averageMileage = document.getElementById('averageMileage');

function addDetails(event) {
    event.preventDefault();
    var currentFuelprice = document
        .getElementById("currentFuelprice")
        .value.trim();
    var odometerReading = document.getElementById("odometerReading").value.trim();
    var fuelAdded = document.getElementById("fuelAdded").value.trim();
    var averageMileage = document.getElementById("averageMileage").value.trim();

    fuelsData = { currentFuelprice, odometerReading, fuelAdded, averageMileage };

    tableCalculate(currentFuelprice, odometerReading, fuelAdded, averageMileage);
    entryForm.reset();
    dataSuccessmessage();
}

// this function exceute for the data success message
function dataSuccessmessage() {
    successMessage = document.querySelector(".successMessage");
    successMessage.style.display = "flex";
    document.querySelector(".entryPagecontent").style.display = "none";
    setTimeout(() => {
        successMessage.style.display = "none";
        document.querySelector(".entryPagecontent").style.display = "flex";
    }, 1500);
}

// this function is for the calculate the data for table
function tableCalculate(currentFuelprice, odometerReading, fuelAdded, averageMileage) {
    var totalFuel = parseFloat(fuelAdded / currentFuelprice).toFixed(2);
    var previousFuel = 0, previousodo = 0;
    if (fuels.length > 0) {
        previousFuel = parseFloat(fuels[fuels.length - 1].totalFuel);
        previousodo = parseFloat(fuels[fuels.length - 1].odometerReading);
    }
    var balanceFuel = ((previousFuel + parseFloat(totalFuel)) - ((parseFloat(odometerReading) - previousodo) / parseFloat(averageMileage))).toFixed(2);
    var willTravel = (balanceFuel * averageMileage).toFixed(2);
    fuels.push({ currentFuelprice, odometerReading, fuelAdded, averageMileage, totalFuel, balanceFuel, willTravel });
    console.log(fuels);
    renderFuels();
}

// render the basic table
basicfuelTabledetails = document.querySelector("#basicfuelTable");
advancefuelTabledetails = document.querySelector("#advancefuelTable");
function renderFuels() {
    //   if (fuels.length === 0) {
    //     console.log()
    //   } else {
    basicfuelTabledetails.innerHTML = `<tr><th>S.NO</th><th>Date</th><th>Day</th><th>Odometer</th><th>Current Fuel Price</th><th>Filled Fuel Price</th><th>Fuel</th></tr>`;
    fuels.forEach((fuel, index) => {
        const tableItem = document.createElement("tr");
        tableItem.innerHTML = `
          <td>${index + 1}</td>
          <td><span>${fuel.date}</span></td><td><span>${fuel.day
            }</span></td><td><span>${fuel.odometerReading}</span></td><td><span>${fuel.currentFuelprice
            }</span></td><td><span>${fuel.fuelAdded}</span></td>
          <td><span>${fuel.totalFuel}</span></td>
        `;
        basicfuelTabledetails.appendChild(tableItem);
    });

    advancefuelTabledetails.innerHTML = `<tr>
    <th>S.NO</th>
    <th>Date</th>
    <th>Day</th>
    <th>Odometer</th>
    <th>Fuel</th>
    <th>Balance Fuel</th>
    <th>Average Mileage</th>
    <th>Will Travel</th>
</tr>`;
    fuels.forEach((fuel, index) => {
        const tableItem = document.createElement("tr");
        tableItem.innerHTML = `
          <td>${index + 1}</td>
          <td><span>${fuel.date}</span></td><td><span>${fuel.day
            }</span></td><td><span>${fuel.odometerReading}</span></td><td><span>${fuel.totalFuel
            }</span></td><td><span>${fuel.balanceFuel}</span></td>
          <td><span>${fuel.averageMileage}</span></td><td><span>${fuel.willTravel}</span></td>
        `;
        advancefuelTabledetails.appendChild(tableItem);
    });
}
// }
// this is for the view page
// basic view page

// This functin execute for the website tab
const navTab = document.querySelector(".navLinks");
navTab.addEventListener("click", tabClick);

function tabClick(event) {
    const activeTabs = document.querySelectorAll(".active");

    activeTabs.forEach((tabs) => {
        tabs.classList.remove("active");
    });
    const pages = document.querySelectorAll(".page-active");

    pages.forEach((tabs) => {
        tabs.classList.remove("page-active");
    });
    const tab = event.target.parentElement;
    tab.querySelector("a").classList.add("active");
    const id = event.target.href;
    const page = document.getElementById(id.split("#")[1]);
    page.classList.add("page-active");
}

// show more show less button for table
const toggleBtn = document.querySelector(
    ".main-content .showMore input[type='button']"
);

toggleBtn.addEventListener("click", toggleButton);

function toggleButton() {
    var basicTabel = document.querySelector(".fuelTabledetails");
    var advanceTabel = document.querySelector(".advanceFueltable");

    if (basicTabel.classList.contains("show")) {
        basicTabel.classList.remove("show");
        advanceTabel.classList.add("show");
        toggleBtn.value = "Show Less";
    } else {
        basicTabel.classList.add("show");
        advanceTabel.classList.remove("show");
        toggleBtn.value = "Show More";
    }
}

// this function for the calculate pagecontent
const calculatePagecontent = document.querySelector(".calculatePagecontent");
const calculateForm = calculatePagecontent.querySelector('form');
const formContainer = calculatePagecontent.querySelector('.formContainer');
const contentDetails = calculatePagecontent.querySelector('.contentDetails');
const closeButton = formContainer.querySelector('#closeButton');

calculateForm.addEventListener('submit', calculateDetails);

function calculateDetails(event) {
    event.preventDefault();
    var previousFuel = fuels[fuels.length - 1].balanceFuel;
    var previousOdo = fuels[fuels.length - 1].odometerReading;
    var currentodo = calculateForm.querySelector('#currentodo').value.trim();
    var fuelConsumed = currentodo / fuels[fuels.length - 1].averageMileage;
    var currentFuelBalance = previousFuel - fuelConsumed;
    var currentFuelrange = currentFuelBalance * fuels[fuels.length - 1].averageMileage;
    document.getElementById('#balanceFueldetail').innerText = currentFuelBalance;
    document.getElementById('#rangeDetail').innerText = currentFuelrange;
    closeButton.style.display = 'flex';
    contentDetails.style.display = 'inline-flex';
}

closeButton.addEventListener('click', closeContainer);
function closeContainer() {
    closeButton.style.display = 'none';
    contentDetails.style.display = 'none';
}