let itemValue;
let inputArray = [];
let sortedArray;

function getInputArray() {
    const inputNumbers = document.querySelectorAll(".input-field");
    
    let count = 0;
    
    inputNumbers.forEach(inputItem => {
        console.log(inputItem.value);
        if (count < inputNumbers.length - 1) {
            inputArray.push(Number(inputItem.value));
            count ++; 
        }
        itemValue = inputItem.value;
    })


    console.log(inputArray);
    sortedArray = inputArray.sort((a ,b) => (a - b));
    console.log(sortedArray);

    displaySortedArray(sortedArray);
}

function displaySortedArray(sortedArray) {
    const sortedDisplay = document.querySelectorAll(".sort");
    console.log(sortedDisplay);
    let counter = 0;

    sortedDisplay.forEach (sortedItem => {
        sortedItem.textContent = sortedArray[counter];
        counter ++;
    })
}

function displayNumbersInBoxes(sortedArray) {
    const sortedDisplay = document.querySelectorAll(".algo");
    console.log(sortedDisplay);
    let counter = 0;

    sortedDisplay.forEach (sortedItem => {
        sortedItem.textContent = sortedArray[counter];
        counter ++;
    })
    
}


// This updates the iteration count that is displayed
function displayIteration(count) {
    const stepDisplay = document.querySelector(".step-display");
    stepDisplay.textContent = `Step: ${count}`
    stepDisplay.style.fontSize = "1.2rem";
    stepDisplay.classList.add('show');
}

// Comment display text for explanation
function displayComment(commentText) {
    const commentDisplay = document.querySelector('.comment-display');
    commentDisplay.textContent = `💬 ${commentText}`;
    commentDisplay.style.fontSize = "1.2rem";
    commentDisplay.style.transition = "all 2s ease";
    commentDisplay.style.fontWeight = "600";
}

// This function displays the search array in the binary search area
function displayAlgoArray() {
    searchContainer = document.getElementById("algo-display");
    displayNumbersInBoxes(sortedArray);
    searchContainer.classList.add('show');
}

// This function labels the numbers based on which one low, high and mid for that iteration
function labelLowHighMidNumbers(low, mid, high){
    const lowNumDisplay = document.getElementById("low-num");
    const highNumDisplay = document.getElementById("high-num");
    const midNumDisplay = document.getElementById("mid-num");

    lowNumDisplay.textContent = low;
    midNumDisplay.textContent = mid;
    highNumDisplay.textContent = high;

    lowNumDisplay.style.transition = "all 1s ease";
    midNumDisplay.style.transition = "all 1s ease";
    highNumDisplay.style.transition = "all 1s ease";
    
}


// This function changes the color of the box based on low, mid and high.
// Takes low_index, mid_index and high_index
function colorArraytBoxesforLowMidHigh(low_index, mid_index, high_index) {
    const boxDisplay = document.querySelectorAll(".algo");

    // Set the low number's color
    boxDisplay[low_index].style.backgroundColor = "#FCC6FF";
    boxDisplay[high_index].style.backgroundColor = "#FFA09B";
    boxDisplay[mid_index].style.backgroundColor = "#AEEA94";
}

testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// This function changes the colors of the boxes that are no longer included in the search. 
// Takes the lowest and highest index of eliminated numbers range
function styleEleminatedBoxes (lowest_index, highest_index) {
    const boxDisplay = document.querySelectorAll(".algo");
    let elimArray = testArray.slice(lowest_index, highest_index);


    // Set the color of the boxes and strikethrough the number
    for (let i = lowest_index; i <= highest_index; i++) {
        boxDisplay[i].style.backgroundColor = "#F72C5B";
        boxDisplay[i].style.textDecoration = "line-through";
        boxDisplay[i].style.transition = "all 0.5s ease";   
    }
}

function resetBoxes() {
    boxDisplay = document.getElementById("algo-display");
    searchBoxes = boxDisplay.querySelectorAll(".algo");

    searchBoxes.forEach(box => {
        box.style.border = "none";
        box.style.backgroundColor = "#F4F8D3";
        box.style.textDecoration = "none";
    }

    )

}



async function SearchDisplay() {
    // sortedArray = [1, 1.5, 2, 3, 5, 7, 14, 23, 26, 80];

    //TODO: Add a reset box display function that reverts back the appearence of the boxes to before
    resetBoxes();

    let step = 0;
    let low = 0;
    let high = sortedArray.length - 1;
    let mid;

    // This is the initializer

    // Get the value of the item to be searched
    const findItemContainer = document.getElementById("find-item");
    itemValue = Number(findItemContainer.value);
    
    //Displays the low, high and mid values
    const functionContainer = document.getElementById("function-display");
    const paramDisplay = functionContainer.querySelector(".param-display")
    paramDisplay.classList.add('show');

    // Displays any text for explanation
    displayComment("Here's the array. Let's begin searching 🔍 ......");

    // Displays the step or iterations it took
    displayIteration(step);

    // Display boxes showing the binary seach
    await sleep(2000);
    displayAlgoArray();
    

    while (low <= high) {
        step++; 
        displayIteration(step); 

        mid = low + Math.floor((high - low) / 2);

        await sleep(3000);
        displayComment("Let's identify and 🖌️highlight the lowest, highest and middle values in the array");
        await sleep(3000);
        labelLowHighMidNumbers(sortedArray[low], sortedArray[mid], sortedArray[high]);
        await sleep(3000);
        colorArraytBoxesforLowMidHigh(low, mid, high);
        await sleep(3000);

        // If mid is where the item is - highlight the number
        if (sortedArray[mid] == itemValue){
            displayComment("Looks like our current middle value IS the item we are looking for! Search is done! 👏");
            await sleep(3000);
            highlightResultBox(mid);
            break; 
            //Need to write a function that highlights the number by drawing a box around
        }
        
        // If item is smaller than mid then it can only be present in the left subarray
        if (itemValue < sortedArray[mid]) {
            displayComment("Looks like our current middle value is higher than the search item value 👀");
            await sleep(4000);
            displayComment("So our item must be on the left side of the middle value. 👉 Let's eliminate all right numbers ");
            await sleep(1000);
            styleEleminatedBoxes(mid,high);
            await sleep(3000);
            high = mid - 1;
            await sleep(2000);
            displayComment("👇We will try the search again on the remaining numbers in the array");
            await sleep(2000);
        }
        
        // If item is larger that mid then it can only be present in the right subarray
        else {
            displayComment("Looks like our current middle value is lower than the search item value 👀");
            await sleep(4000);
            displayComment("So our item must be on the right side of the middle value. 👉 Let's eliminate all left numbers ");
            await sleep(1000);
            styleEleminatedBoxes(low,mid);
            await sleep(3000);
            low = mid + 1;
            await sleep(2000);
            displayComment("We will try the search again on the remaining numbers 👇 in the array");
            await sleep(2000);
        }
        if (low > high) {
            displayComment("Uh-oh, all numbers have been eliminated. Looks like our item does not exist in the array 🥲");
            break;
        }
    }
    // setTimeout(function(){styleEleminatedBoxes(6,9);}, 4000);


}

let sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function highlightResultBox(resultIndex) {
    boxDisplay = document.getElementById(`search${resultIndex+1}`)
    boxDisplay.style.border = "3px solid #117554";

}

function BinarySearch(arr, item) {
    // Sort the array if it isn't sorted already
    // Do the actual binary search
    // For the visualization part I most likely will have to call some DOM stuff here. Need to figure out how I am going to structure this

    let low = 0;
    let high = arr.length - 1;
    let mid;

    while (low <= high) {
        mid = low + Math.floor((high - low) / 2);

        // If mid is where the item is return the mid
        if (arr[mid] == item) {
            return mid;
        }

        // If item is smaller than mid then it can only be present in the left subarray
        if (item < arr[mid]) {
            high = mid - 1;
        }

        // If itme is larger than mid then it can only be present in the right subarray
        else {
            low = mid + 1
        }
    }

    // If we are here, the item is not in the array
    return -1;
}

function BinarySearchResult(arr, item) {
    let result = BinarySearch(arr, item);
    if (result == -1) {
        console.log("Element is not present in array");
    } else {
        console.log("Element is present at index " + result);
    }
}



