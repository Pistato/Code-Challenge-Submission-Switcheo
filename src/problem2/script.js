// in case of problems with accessing API
const jsonData = [
    {"currency":"BLUR","date":"2023-08-29T07:10:40.000Z","price":0.20811525423728813},
    {"currency":"bNEO","date":"2023-08-29T07:10:50.000Z","price":7.1282679},
    {"currency":"BUSD","date":"2023-08-29T07:10:40.000Z","price":0.999183113},
    {"currency":"BUSD","date":"2023-08-29T07:10:40.000Z","price":0.9998782611186441},
    {"currency":"USD","date":"2023-08-29T07:10:30.000Z","price":1},
    {"currency":"ETH","date":"2023-08-29T07:10:52.000Z","price":1645.9337373737374},
    {"currency":"GMX","date":"2023-08-29T07:10:40.000Z","price":36.345114372881355},
    {"currency":"STEVMOS","date":"2023-08-29T07:10:40.000Z","price":0.07276706779661017},
    {"currency":"LUNA","date":"2023-08-29T07:10:40.000Z","price":0.40955638983050846},
    {"currency":"RATOM","date":"2023-08-29T07:10:40.000Z","price":10.250918915254237},
    {"currency":"STRD","date":"2023-08-29T07:10:40.000Z","price":0.7386553389830508},
    {"currency":"EVMOS","date":"2023-08-29T07:10:40.000Z","price":0.06246181355932203},
    {"currency":"IBCX","date":"2023-08-29T07:10:40.000Z","price":41.26811355932203},
    {"currency":"IRIS","date":"2023-08-29T07:10:40.000Z","price":0.0177095593220339},
    {"currency":"ampLUNA","date":"2023-08-29T07:10:40.000Z","price":0.49548589830508477},
    {"currency":"KUJI","date":"2023-08-29T07:10:45.000Z","price":0.675},
    {"currency":"STOSMO","date":"2023-08-29T07:10:45.000Z","price":0.431318},
    {"currency":"USDC","date":"2023-08-29T07:10:40.000Z","price":0.989832},
    {"currency":"axlUSDC","date":"2023-08-29T07:10:40.000Z","price":0.989832},
    {"currency":"ATOM","date":"2023-08-29T07:10:50.000Z","price":7.186657333333334},
    {"currency":"STATOM","date":"2023-08-29T07:10:45.000Z","price":8.512162050847458},
    {"currency":"OSMO","date":"2023-08-29T07:10:50.000Z","price":0.3772974333333333},
    {"currency":"rSWTH","date":"2023-08-29T07:10:40.000Z","price":0.00408771},
    {"currency":"STLUNA","date":"2023-08-29T07:10:40.000Z","price":0.44232210169491526},
    {"currency":"LSI","date":"2023-08-29T07:10:50.000Z","price":67.69661525423729},
    {"currency":"OKB","date":"2023-08-29T07:10:40.000Z","price":42.97562059322034},
    {"currency":"OKT","date":"2023-08-29T07:10:40.000Z","price":13.561577966101694},
    {"currency":"SWTH","date":"2023-08-29T07:10:45.000Z","price":0.004039850455012084},
    {"currency":"USC","date":"2023-08-29T07:10:40.000Z","price":0.994},
    {"currency":"USDC","date":"2023-08-29T07:10:30.000Z","price":1},
    {"currency":"USDC","date":"2023-08-29T07:10:30.000Z","price":1},
    {"currency":"USDC","date":"2023-08-29T07:10:40.000Z","price":0.9998782611186441},
    {"currency":"WBTC","date":"2023-08-29T07:10:52.000Z","price":26002.82202020202},
    {"currency":"wstETH","date":"2023-08-29T07:10:40.000Z","price":1872.2579742372882},
    {"currency":"YieldUSD","date":"2023-08-29T07:10:40.000Z","price":1.0290847966101695},
    {"currency":"ZIL","date":"2023-08-29T07:10:50.000Z","price":0.01651813559322034}
]

// Parse the JSON data into a JavaScript dictionary (object)
const prices = {};

jsonData.forEach(item => {
  prices[item.currency] = {
    date: item.date,
    price: item.price
  };
});

// Get all images on the page
const images = document.querySelectorAll('img');

// Disable click and drag for each image
images.forEach((image) => {
    image.addEventListener('mousedown', (e) => {
        e.preventDefault();
    });
});

// Declaration with ETH as default
var input = "ETH";
var output = "Select token";

const inputIcon = document.getElementById("input-img");
const outputIcon = document.getElementById("output-img");
const inputIconTag = document.getElementById("input-img-tag");
const outputIconTag = document.getElementById("output-img-tag");
const inputTrueValue = document.getElementById("input-value");
const outputTrueValue = document.getElementById("output-value");
const inputValue = document.getElementById("input-amount");
const outputValue = document.getElementById("output-amount");
const inputImgCardDiv = document.getElementById("input-div");
const outputImgCardDiv = document.getElementById("output-div");
const exchangeButton = document.getElementById("exchange-btn-div-2");
const menu = document.getElementById("menu");
const menuGrid = document.getElementById("menu-grid");
const menuTitle = document.getElementById("menu-title");
const searchInput = document.getElementById("search-input");
const form = document.getElementById("token-form");
const submitButton = document.getElementById("swap-button");
const loadingIndicator = document.getElementById("loading-indicator");
const screenBlocker = document.getElementById("screen-blocker")

// Updates called in case of refreshes
updateInputValue();
updateOutputValue();

menu.style.display="none";

var changeTag = "input";

const buttons = {};
// create buttons for menu programatically
for (const supportedCurrency in prices){
    const newDiv = document.createElement("div");
    
    newDiv.className = "menuItem";
    
    const newCurrImg = document.createElement("img");
    newCurrImg.className = "menu-curr-img";
    newCurrImg.src = "tokens/" + supportedCurrency + ".svg";
    if (newDiv) {newDiv.appendChild(newCurrImg)}

    const newCurrTag = document.createElement("div");
    newCurrTag.className = "menu-curr-tag";
    newCurrTag.textContent = supportedCurrency;
    if (newDiv) {newDiv.appendChild(newCurrTag)}

    if (menuGrid) {
        menuGrid.appendChild(newDiv);
    } else {
        document.body.appendChild(newDiv); // Append it to the body if no parent is specified
    }

    function newClickFunction() {
        if(changeTag == "input") {
            replaceInputCurrency(supportedCurrency);
            updateInputValue();
            changeOutputValue();
            toggleMenu();
        } 
        else if (changeTag == "output") {
            replaceOutputCurrency(supportedCurrency);
            updateOutputValue();
            changeInputValue();
            toggleMenu();
        }
    }
    
    newDiv.onclick = newClickFunction;

    buttons[supportedCurrency] = newDiv;
}

/* below are functions called by buttons or event listeners */
let isDragging = false;
let offsetX, offsetY;

// Event listener to start dragging
menuTitle.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - menu.getBoundingClientRect().left;
    offsetY = e.clientY - menu.getBoundingClientRect().top;
    menu.style.cursor = 'grabbing'; // Change cursor while dragging
  });
  
  // Event listener to continue dragging
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;
    menu.style.left = newX + 'px';
    menu.style.top = newY + 'px';
  });
  
  // Event listener to stop dragging
  document.addEventListener('mouseup', () => {
    isDragging = false;
    menu.style.cursor = 'grab';
  });
  
  // Prevent default drag behavior on the element
  menuTitle.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });

// function that swaps the two currency types and amount with an animation
function handleExchangeClick() {
    if(handleExchangeClick.executed){
        return false;
    }
    handleExchangeClick.executed = true;

    // adds a transition towards the direction they need to travel towards.
    inputImgCardDiv.classList.add('moveRight');
    outputImgCardDiv.classList.add('moveLeft');
    
    setTimeout(() => {
        tempCurr = output;
        tempVal = outputValue.value;

        outputValue.value = inputValue.value;        
        replaceOutputCurrency(input);
        inputValue.value = tempVal;        
        replaceInputCurrency(tempCurr);

        // removes transition time
        inputImgCardDiv.style.transition = "transform 0s ease";
        outputImgCardDiv.style.transition = "transform 0s ease";
        // moves it back immediately
        inputImgCardDiv.classList.remove('moveRight');
        outputImgCardDiv.classList.remove('moveLeft');

        updateInputValue();
        updateOutputValue();

        setTimeout(() => {
            inputImgCardDiv.style.transition = "transform 1s ease";
            outputImgCardDiv.style.transition = "transform 1s ease";

            handleExchangeClick.executed = false;
        },10)
        
    }, 1000); // 1000ms (1 second) matches the animation duration

}

// opens a menu to change currency type (send)
function handleInputCurrencyChange() {
    changeTag = "input";
    toggleMenu();
}

// opens a menu to change currency type (recieve)
function handleOutputCurrencyChange() {
    changeTag = "output";
    toggleMenu();
}

function handleCloseMenu() {
    toggleMenu();
}

inputValue.addEventListener('input', function() {
    // Remove any non-numeric characters using a regular expression
    this.value = this.value.replace(/[^0-9.]/g, '');
    updateInputValue();
    changeOutputValue(); // function that updates the other input field
});

outputValue.addEventListener('input', function() {
    // Remove any non-numeric characters using a regular expression
    this.value = this.value.replace(/[^0-9.]/g, '');
    updateOutputValue();
    changeInputValue(); // function that updates the other input field
});

outputValue.addEventListener('input', function() {
    // Remove any non-numeric characters using a regular expression
    this.value = this.value.replace(/[^0-9.]/g, '');
    updateOutputValue();
    changeInputValue(); // function that updates the other input field
});

searchInput.addEventListener('input', function() {
    searchStr = searchInput.value.toLowerCase();
    for (const buttonType in buttons) {
        if(buttonType.toLowerCase().includes(searchStr)) {
            buttons[buttonType].style.display="flex";
        }
        else {
            buttons[buttonType].style.display="none";
        }
    }
});

function submitForm() {
    form.submit;
}

// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Disable the submit button and show the loading indicator
    submitButton.disabled = true;
    screenBlocker.style.display = 'inline';
    loadingIndicator.style.display = 'inline';

    // Simulate a delay (e.g., 2 seconds) for demonstration
    setTimeout(function () {
    // Re-enable the submit button and hide the loading indicator
    submitButton.disabled = false;
    screenBlocker.style.display = 'none';
    loadingIndicator.style.display = 'none';

    }, 2000); // Adjust the timeout delay as needed (in milliseconds)
});


/* Below are utility functions used in buttons.*/
// replaces currency that is being sent (takes a string argument)
function replaceInputCurrency(newCurr){
    input = newCurr;
    inputIcon.src = 'tokens/' + newCurr + '.svg';
    inputIconTag.textContent = newCurr;
}

// replaces currency that is being recieved (takes a string argument)
function replaceOutputCurrency(newCurr){
    output = newCurr;
    outputIcon.src = 'tokens/' + newCurr + '.svg';
    outputIconTag.textContent = newCurr;
}

// calculates FIAT from amount of a certain currency
function calculateMoneyFromCurr(val, currency){
    if(prices[currency] == undefined) {
        return "Not available."
    }
    else{
        return val * prices[currency]["price"];
    }
}

// calculates amount of a certain currency from FIAT
function calculateCurrFromMoney(val, currency){
    if(prices[currency] == undefined) {
        return "Not available."
    }
    else{
        return val / prices[currency]["price"];
    }
}

// function that updates the FIAT currency value below input field (send)
function updateInputValue() {
    var val = inputValue.value;
    trueVal = calculateMoneyFromCurr(val, input);
    if(trueVal >= 0) {
        inputTrueValue.textContent = '$' + trueVal.toFixed(2);
    }
    else{
        inputTrueValue.textContent = trueVal;
    }
}

// function that updates the FIAT currency value below input field (recieve)
function updateOutputValue() {
    var val = outputValue.value;
    trueVal = calculateMoneyFromCurr(val, output);
    if(trueVal >= 0) {
        outputTrueValue.textContent = '$' + trueVal.toFixed(2);
    }
    else{
        outputTrueValue.textContent = trueVal;
    }
}

// function that updates the other input field (send --updates--> recieve)
function changeOutputValue() {
    var val = inputValue.value;
    trueVal = calculateMoneyFromCurr(val, input);

    convertedVal = calculateCurrFromMoney(trueVal, output);
    if(convertedVal >= 0) {
        outputValue.value = parseFloat(convertedVal.toFixed(8));
    }
    else{
        outputValue.value = 0;
    }
    updateOutputValue();
}

// function that updates the other input field (recieve --updates--> send)
function changeInputValue() {
    var val = outputValue.value;
    trueVal = calculateMoneyFromCurr(val, output);

    convertedVal = calculateCurrFromMoney(trueVal, input);
    if(convertedVal >= 0) {
        inputValue.value = parseFloat(convertedVal.toFixed(8));
    }
    else{
        inputValue.value = 0;
    }
    updateInputValue();
}

// toggles menu's open/close state
function toggleMenu() {
    if(menu.style.display=="none") {
        menu.style.display = "inline";
        // Calculate the center position based on the element's width and height
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Set the position to be centered
        menu.style.position = 'fixed';
        menu.style.left = `${centerX - menu.offsetWidth / 2}px`;
        menu.style.top = `${centerY - menu.offsetHeight / 2}px`;
        menu.style.position = "absolute";
        if(changeTag == "input") menuTitle.textContent = "Currently Changing:   Send";
        if(changeTag == "output") menuTitle.textContent = "Currently Changing:   Receive";
        
    }
    else {
        menu.style.display="none";
    }
}