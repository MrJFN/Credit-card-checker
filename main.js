// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:

//Our function to return 'true' for all valid CC's and 'false for all 'invalid' CC's
const validateCred = array => {

 
    let unchangedNumArray =[]; //array to hold digits that won't need calculations.
    let calculationArray =[]; //array to hold digits that will need further calucation.

    //interate backwards from last index by 2 of the given array and push values into unchangedNumArray
    for(let i = array.length - 1; i >= 0; i -= 2){
        unchangedNumArray.push(array[i]);
    };

    //interate backwards from the second last index by 2 of the given array and push values into caculationArray
    for(let i = array.length - 2; i >= 0; i -= 2){
        calculationArray.push(array[i]);
    };

    /*Use map to double each element. Then use map to see if the product is greater than 9. if true subtract 9 and return the difference. If false return the product. */
    calculationArray = calculationArray.map(x => x * 2)
                                       .map(x => x > 9 ? x - 9 : x);

    //create variable sum. first concatonate our arrays then use reduce to sum all of our elements.
    let sum = unchangedNumArray.concat(calculationArray)
                               .reduce((a, b) => a + b);

    //if sum modulo 10 equals 0 then it is a valid CC and we return true. If invalid return false.
        return(sum % 10 === 0);

}

// our function to return a nested array of invalid CC's
const findInvalidCards = (nestedCreditCardArray) => {
    /* create a new nested array that filters the inputed array. Only include arrays that fail our validateCred function */
    let invalidCardsArray = nestedCreditCardArray.filter(array => !validateCred(array));
        return invalidCardsArray;
}

//Our function that returns a company name based on a number indentifier.
const companyChecker = num => {
    switch(num){
      case 3:
        return 'Amex (American Express)';
        break;
      case 4:
        return 'Visa';
        break;
      case 5:
        return 'Matercard';
        break;
      case 6:
        return 'Discover';
        break;
      default:
        return 'Company not found';
        break;
    };
  }

//Our function that creates an array of companies that need to be alerted about their invalid CC. Has an input of already invalid CC's numbers
const idInvalidCardCompanies = (nestedInvalidCardsArray) => {
    
    /* create a new array of company names by first using map to return the first number from each credit card, and then using map to call the companyChecker function and return the corresponding name. */
   let listOfCompanies = nestedInvalidCardsArray.map(creditCard => creditCard[0])
                                    .map(startNum => companyChecker(startNum));
   
    /* use filter removed duplicate companies being added to our array. Our call back function uses indexOf. Any repeat companies found after the first index found are not included. */
     listOfCompanies = listOfCompanies.filter((company, index) => listOfCompanies.indexOf(company) === index);


  return listOfCompanies;
}




