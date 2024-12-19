document.getElementById('searchButton').addEventListener('click', function() {
    const ingredientInput = document.getElementById('ingredientInput').value;
    // const cuisine = document.getElementById('cuisineDropdown').value;  // Get selected cuisine

    if (!ingredientInput) {
        alert('Please enter some ingredients!');
        return;
    }

    // Split the input into an array of ingredients
    const ingredients = ingredientInput.split(',').map(item => item.trim());

    // Debugging: Check the data sent to the backend
    console.log('Sending ingredients:', ingredients);
    // console.log('Selected cuisine:', cuisine);

    // Make an API call to the Python backend
    fetch('http://127.0.0.1:5000/search_recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ingredients: ingredients,
            // cuisine: cuisine  // Include selected cuisine
        })
    })
    .then(response => {
        // Debugging: Check the status of the response
        console.log('Response status:', response.status);
        return response.json();
    })
    .then(data => {
        // Debugging: Log the data returned from the backend
        console.log('Data received:', data);
        displayResults(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

//originAL
// function displayResults(recipes) {
//     const resultsContainer = document.getElementById('results');
//     resultsContainer.innerHTML = ''; // Clear previous results

//     // Debugging: Check if recipes are being processed
//     console.log('Recipes to display:', recipes);

//     if (recipes.length === 0) {
//         resultsContainer.innerHTML = '<p>No recipes found.</p>';
//         return;
//     }

//     recipes.forEach(recipe => {
//         const recipeElement = document.createElement('div');
//         recipeElement.classList.add('recipe');
        
//         recipeElement.innerHTML = `
//             <h3>${recipe.name}</h3>
//             <img src="${recipe.image}" alt="${recipe.name}" style="width: 100px; height: 100px;">
//             <p><strong>Used Ingredients:</strong> ${recipe.usedIngredients.join(', ')}</p>
//             <p><strong>Missed Ingredients:</strong> ${recipe.missedIngredients.join(', ')}</p>
//         `;
        
//         resultsContainer.appendChild(recipeElement);
//     });
// }

//link changes
function displayResults(recipes) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (recipes.length === 0) {
        resultsContainer.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');

        recipeElement.innerHTML = `
            <h3>${recipe.name}</h3>
            <img src="${recipe.image}" alt="${recipe.name}" style="width: 100px; height: 100px;">
            <p><strong>Used Ingredients:</strong> ${recipe.usedIngredients.join(', ')}</p>
            <p><strong>Missed Ingredients:</strong> ${recipe.missedIngredients.join(', ')}</p>
            <p><strong>Video Search:</strong> <a href="${recipe.videoSearchLink}" target="_blank">Search Recipe Video</a></p>
        `;

        resultsContainer.appendChild(recipeElement);
    });
}



// awanish changes
function search() {
    // Get the search input
    const searchInput = document.getElementById("searchInput").value;

    // Check if the input is empty
    if (!searchInput) {
        alert("Please enter ingredients to search for recipes.");
        return;
    }

    // Prepare the request data
    const data = {
        ingredients: searchInput.split(",").map(ingredient => ingredient.trim())
    };

    // Send the request to the Flask API
    fetch("http://127.0.0.1:5000/search_recipes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.error) {
            document.getElementById("result").innerHTML = result.error;
        } else {
            displayRecipes(result);
        }
    })
    .catch(error => console.error("Error:", error));
}

function displayRecipes(recipes) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ""; // Clear previous results

    // Display each recipe
    recipes.forEach(recipe => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");

        // Recipe title and image
        //original
        recipeDiv.innerHTML = `
            <h3>${recipe.name}</h3>
            <img src="${recipe.image}" alt="${recipe.name}" width="100">
            <p><strong>Used Ingredients:</strong> ${recipe.usedIngredients.join(", ")}</p>
            <p><strong>Missed Ingredients:</strong> ${recipe.missedIngredients.join(", ")}</p>
            <p><strong>Video Search:</strong> <a href="${recipe.videoSearchLink}" target="_blank">Search Recipe Video</a></p>
        `;
        resultDiv.appendChild(recipeDiv);
        //new
        // recipeElement.innerHTML = `
        //     <h3>${recipe.name}</h3>
        //     <img src="${recipe.image}" alt="${recipe.name}" style="width: 100px; height: 100px;">
        //     <p><strong>Used Ingredients:</strong> ${recipe.usedIngredients.join(', ')}</p>
        //     <p><strong>Missed Ingredients:</strong> ${recipe.missedIngredients.join(', ')}</p>
        //     <p><strong>Video Search:</strong> <a href="${recipe.videoSearchLink}" target="_blank">Search Recipe Video</a></p>
        // `;

        // resultDiv.appendChild(recipeDiv);
    });
}
