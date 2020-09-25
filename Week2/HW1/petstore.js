
/**
 * This function should calculate the total amount of pet food that should be
 * ordered for the upcoming week.
 * @param numAnimals the number of animals in the store
 * @param avgFood the average amount of food (in kilograms) eaten by the animals
 *              each week
 * @return the total amount of pet food that should be ordered for the upcoming
 *               week, or -1 if the numAnimals or avgFood are less than 0 or non-numeric
 */
function calculateFoodOrder(numAnimals, avgFood) {
    // IMPLEMENT THIS FUNCTION!

    if (isNaN(numAnimals) || isNaN(avgFood))
    {
        return -1;
    }

    if (numAnimals < 0 || avgFood < 0)
    {
        return -1;
    }

    if (!Number.isInteger(numAnimals))
    {
        return -1;
    }


    var order = Number(numAnimals)*Number(avgFood);

    return order;

}

/**
 * Determines which day of the week had the most nnumber of people visiting the
 * pet store. If more than one day of the week has the same, highest amount of
 * traffic, an array containing the days (in any order) should be returned.
 * (ex. ["Wednesday", "Thursday"]). If the input is null or an empty array, the function
 * should return null.
 * @param week an array of Weekday objects
 * @return a string containing the name of the most popular day of the week if there is only one most popular day, and an array of the strings containing the names of the most popular days if there are more than one that are most popular
 */
function mostPopularDays(week) {
    // IMPLEMENT THIS FUNCTION!
    if (week == null || week.length < 1)
    {
        return null;
    }
    console.log("Starting mostPopularDays");

    var frequencies = {};
    var day;
    var traffic;


    //map weekdays to total number of traffic on those days in frequencies obj
    for (var i = 0; i < week.length; i++)
    {
        day = week[i].name;
        traffic = week[i].traffic;
        if (frequencies[day] == undefined)
        {
            frequencies[day] = 0;
        }
        frequencies[day] = frequencies[day] + traffic;
    }
    console.log(frequencies);

    //get all of the weekday traffic frequencies
    
    
    var vals = Object.keys(frequencies).map(
        function(key) {
            return frequencies[key];
        });
    
    //make maxVal the highest weekday traffic frequency
    var maxVal = vals[0];
    for (var i = 0; i < vals.length; i++ )
    {
        if (vals[i] > maxVal)
        {
            maxVal = vals[i];
        }
    }

    //get the days that match the highest weekday traffic frequency
    var mostPopular = {}
    
    var keys = Object.keys(frequencies);
    console.log("Keys");
    console.log(keys);
    var name;
    var val;
    console.log("Maxval");
    console.log(maxVal);
    console.log("Starting iterations");
    console.log(keys.length);
    for (var j = 0; j < keys.length; j++)
    {
        name = keys[j];
        console.log(name);
        val = frequencies[name];
        console.log(val);
        if (val == maxVal)
        {
            mostPopular.push( name );
            console.log("Added")
        }
    }
    console.log("Most popular");

    console.log(mostPopular);

    if (mostPopular.length == 1)
    {
        return mostPopular[0];
    }
    return mostPopular;


}


/**
 * Given three arrays of equal length containing information about a list of
 * animals - where names[i], types[i], and breeds[i] all relate to a single
 * animal - return an array of Animal objects constructed from the provided
 * info.
 * @param names the array of animal names
 * @param types the array of animal types (ex. "Dog", "Cat", "Bird")
 * @param breeds the array of animal breeds
 * @return an array of Animal objects containing the animals' information, or an
 *         empty array if the array's lengths are unequal or zero, or if any array is null.
 */
function createAnimalObjects(names, types, breeds) {
    // IMPLEMENT THIS FUNCTION!
    var animals = []
    if (names == null || types == null || breeds == null)
    {
        return animals;
    }

    if (names.length != types.length || names.length != breeds.length)
    {
        return animals;
    }

    for (var i = 0; i < names.length; i++)
    {
        animals[i] = new Animal(names[i], types[i], breeds[i]);
    }
    return animals;
}

/////////////////////////////////////////////////////////////////
//
//  Do not change any code below here!
//
/////////////////////////////////////////////////////////////////


/**
 * A prototype to create Weekday objects
 */
function Weekday (name, traffic) {
    this.name = name;
    this.traffic = traffic;
}

/**
 * A prototype to create Item objects
 */
function Item (name, barcode, sellingPrice, buyingPrice) {
     this.name = name;
     this.barcode = barcode;
     this.sellingPrice = sellingPrice;
     this.buyingPrice = buyingPrice;
}
 /**
  * A prototype to create Animal objects
  */
function Animal (name, type, breed) {
    this.name = name;
     this.type = type;
     this.breed = breed;
}


function testMPD()
{
    var week = []
    var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    for (var i = 0; i < days.length; i++)
    {
        var wDay = new Weekday(days[i], i);
        week.push(wDay);
    }
    return mostPopularDays(week);
}

/**
 * Use this function to test whether you are able to run JavaScript
 * from your browser's console.
 */
function helloworld() {
    return 'hello world!';
}