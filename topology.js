// The set X
var X = [];

// A collection of subsets X, to be determined if it is a topology on X
var T = [];

var stringsT = [];

// An array that represents a subset of X. The element at index i is 1 if x_i is an element of the subset, 0 otherwise
var set = [0, 0, 0 , 0, 0];

// This function is called when the user inputs the size of X. The array X is initialized and the elements of X
// are displayed for the user. Onclick attributes are added to each element so that users can add them and 
// remove them from subsets when creating the collection T.
function chooseSize() {
    document.getElementById("sizeForm").addEventListener("submit", function (ev) {
        ev.preventDefault();

        let size = document.getElementById("sizeX").value;

        for (let i = 0; i < size; i++) {
            X.push(i);

            // Create the elements of the set X for users to see
            let element = document.createElement("span");
            element.setAttribute("id", "element" + i);
            element.innerHTML = "x<sub>" + i + "</sub>";
            element.setAttribute("class", "elemBtn");

            // When an element of X is clicked, it is added to the array set and displayed for the user to see
            element.onclick = function () {
                let chosenElement = document.createElement("span");
                chosenElement.setAttribute("id", "chosen" + i);
                chosenElement.innerHTML = "x<sub>" + i + "</sub>";
                set[i] = 1;

                // When an element in the set is clicked, it is removed from the array, set
                chosenElement.onclick = function(){
                    document.getElementById(this.id).remove();
                    let num = this.id[6];
                    set[num] = 0;
                }


                document.getElementById("chosenElements").appendChild(chosenElement);
            }

            document.getElementById("elementsOfX").appendChild(element);
        }

        console.log(X);

        document.getElementById("chooseElements").style.display = "block";

        document.getElementById("chooseSize").style.display = "none";


    });
}

// This function adds a subset of X to the collection T. It is called when the user clicks the button "Add to T"
// The subset is displayed for the user to see
function addToT(){
    
    let array = set;

    T.push(array);

    let newSet = document.createElement("span");
    let resultSet = document.createElement("span");
    let resultSetContents = "{"
    let newSetContents = "{"
    for (let i = 0; i < 5; i++){
        if (set[i] == 1){
            newSetContents +="x<sub>" + i + "</sub>";
            resultSetContents +="x<sub>" + i + "</sub>";
        }
    }
    newSetContents += "}";
    resultSetContents += "}";

    resultSet.innerHTML = resultSetContents;
    newSet.innerHTML = newSetContents;

    document.getElementById("elementsOfT").appendChild(newSet);
    document.getElementById("elementsOfTResults").appendChild(resultSet);

    document.getElementById("chosenElements").innerHTML = "Set: ";

    set = [0,0,0,0,0];

    console.log("T: " + T);
    console.log("length of T: " + T.length)
    console.log("Set: " + set);
}

// Determines if T contains X and the empty set 
function checkRule1(){
    console.log("T");

    let containsX = false;
    let containsEmpty = false;


    for (let i = 0; i < T.length; i++){
        let sum = 0;
        for (let j = 0; j < 5; j++){
            sum += T[i][j];
        }

        if (sum == 0){
            containsEmpty = true;
        } else if (sum == X.length){
            containsX = true;
        }
    }

    console.log("here we are");
    if (containsX && containsEmpty){
        return true;
    } else{
        return false;
    }
}

// String used to check rule 2
var unionAnswer = "";

// String used to check rule 3
var interAnswer = "";


// Determines if T is closed under unions.
function checkRule2(){

    unionAnswer = "";
    
    for (let k = 0; k < T.length; k++){
        
        calcSubsequentUnions(T[k], k + 1);
    }

    return !unionAnswer.includes(0);
 
}

// Determines if T is closed under finite intersections.
function checkRule3(){

    interAnswer = "";
    
    for (let k = 0; k < T.length; k++){
        
        calcSubsequentIntersections(T[k], k + 1);
    }

    return !interAnswer.includes(0);
 
}

// Calculates all the possible unions between array and the elements of T from index num onward. 
// array - an integer array containing 1s and 0s only
// num - a nonnegative integer
function calcSubsequentUnions(array, num){

    
    for (let j = num; j < T.length; j++){
        let newUnion = calcUnion(array, T[j]);
        if (isInT(newUnion)){
            unionAnswer += 1;
        }else{
            unionAnswer += 0;
        }
        
        
        calcSubsequentUnions(newUnion, j+1);
    }

    
}

// Calculates all the possible intersections between array and the elements of T from index num onward
// array - an integer array containing 1s and 0s only
// num - a nonnegative integer
function calcSubsequentIntersections(array, num){

    
    for (let j = num; j < T.length; j++){
        let newInter = calcIntersection(array, T[j]);
        if (isInT(newInter)){
            interAnswer += 1;
        }else{
            interAnswer += 0;
        }
        
        
        calcSubsequentIntersections(newInter, j+1);
    }

    
}



// Returns the intersection of two arrays, where each array is made of 0s and 1s, where i = 1 if x_i is an element of
// the array and x_i = 0 otherwise. Thus, the intersection of two arrays has a 1 at index i if both arrays have a 1
// at index i, and 0 otherwise.
function calcIntersection(arr1, arr2){
    let intersection = [];
    for (let i = 0; i < arr1.length; i++){
        if (arr1[i] == 1 && arr2[i] == 1){
            intersection[i] = 1;
        } else{
            intersection[i] = 0;
        }
    }
    return intersection;
}

// Returns the union of two arrays, where each array is made of 0s and 1s, where i = 1 if x_i is an element of
// the array and x_i = 0 otherwise. Thus, the union of two arrays has a 1 at index i if either array has a 1
// at index i, and 0 otherwise.
function calcUnion(arr1, arr2){
    let union = []
    for (let i = 0; i < arr1.length; i++){
        if (arr1[i] == 1 || arr2[i] == 1){
            union[i] = 1;
        } else{
            union[i] = 0;
        }
    }
    return union;
}

// Determines if an array is an element of T
function isInT(arr){
    
    for (let i = 0; i < T.length; i++){
        if (T[i].toString() == arr.toString()){
            return true;
        }
    }
    return false;
}

// Checks if T is a topology on X and prints to the console
function checkTop(){

    if (checkRule1() && checkRule2() && checkRule3()){
        document.getElementById("resultsText").innerHTML = " is a topology on X </br></br>"
    } else{
        let message = " is not a topology on X because: </br></br>";
        
        if (!checkRule1()){
            message += "T does not contain X or the empty set</br></br>";
        }
        if (!checkRule2()){
            message += "T is not closed under unions</br></br>";
        }
        if (!checkRule3()){
            message += "T is not closed under fintite intersections</br></br>";
        }

        document.getElementById("resultsText").innerHTML = message;
    }

    document.getElementById("chooseElements").style.display = "none";
    document.getElementById("results").style.display = "block";
    
    console.log("rule 1: " + checkRule1());
    console.log("rule 2: " + checkRule2());
    console.log("rule 3: " + checkRule3());
}


chooseSize();