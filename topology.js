var X = [];
var T = [];
var stringsT = [];
var set = [0, 0, 0 , 0, 0];

// Function called when user inputs the size of X. Creates the array X.
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

            // When an element of X is clicked, it is added to a set (this set may be added to T)
            element.onclick = function () {
                let chosenElement = document.createElement("span");
                chosenElement.setAttribute("id", "chosen" + i);
                chosenElement.innerHTML = "x<sub>" + i + "</sub>";
                set[i] = 1;

                // When an element in the set is clicked, it is removed from the set
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

        document.getElementById("chooseElements").style.display = "inline";

        document.getElementById("chooseSize").style.display = "none";


    });
}

function addToT(){
    // let elementOfT = [];
    let array = set;

    T.push(array);

    let newSet = document.createElement("span");

    let newSetContents = "{"
    for (let i = 0; i < 5; i++){
        if (set[i] == 1){
            newSetContents +="x<sub>" + i + "</sub>";
        }
    }
    newSetContents += "}";

    newSet.innerHTML = newSetContents;

    document.getElementById("elementsOfT").appendChild(newSet);

    document.getElementById("chosenElements").innerHTML = "Set: ";

    set = [0,0,0,0,0];

    console.log("T: " + T);
    console.log("length of T: " + T.length)
    console.log("Set: " + set);
}

// Determines if T contains X and the empty set (the first topology axiom)
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

var unionAnswer = "";
var interAnswer = "";

function checkRule2(){

    unionAnswer = "";
    
    for (let k = 0; k < T.length; k++){
        
        calcSubsequentUnions(T[k], k + 1);
    }

    return !unionAnswer.includes(0);
 
}

function checkRule3(){

    interAnswer = "";
    
    for (let k = 0; k < T.length; k++){
        
        calcSubsequentIntersections(T[k], k + 1);
    }

    return !interAnswer.includes(0);
 
}

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



// Returns the binary intersection of two arrays
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

// Returns the binary union of two arrays
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

// Checks if T is a topology on X
function checkTop(){
    
    console.log("rule 1: " + checkRule1());
    console.log("rule 2: " + checkRule2());
    console.log("rule 3: " + checkRule3());
}


chooseSize();