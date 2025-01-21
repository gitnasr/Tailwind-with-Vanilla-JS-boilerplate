// JS Goes HERE!



const buttons = {
    pizza: document.getElementById("pizza"),
    salad: document.getElementById("salad"),
    beef: document.getElementById("beef"),
    pasta: document.getElementById("pasta")
};


const recipesContainer = document.getElementById("render-contanier");
const loader = document.getElementById("loader");
Object.keys(buttons).forEach(meal => {
    buttons[meal].addEventListener("click", () => getFromAPI(meal));
});



function getFromAPI(selectedMeal) {
    loader.classList.remove("hidden");
    fetch(`https://forkify-api.herokuapp.com/api/search?q=${selectedMeal}`)
        .then(response => response.json())
        .then(data => {
            
            renderRecipes(data.recipes);
            loader.classList.add("hidden");
        });
}


function renderRecipes(recipes) {
    recipesContainer.innerHTML = "";
    recipes.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");
        recipeCard.innerHTML = `
          <div class="flex flex-col border border-gray-900 w-96 rounded-xl p-4 mx-auto h-full">
    <img src="${recipe.image_url}" alt="" id="image" class="w-full h-96 object-cover rounded-lg">
    <div class="text-center mt-4 max-w-sm mx-auto">
        <h1 id="title" class="text-2xl font-bold">${recipe.title}</h1>
        <p id="publisher" class="text-sm text-gray-600">${recipe.publisher}</p>
    </div>
</div>

        `;
        recipesContainer.appendChild(recipeCard);
    });
}

