const ingredientsClick = require('./ingredients-handler.js')
const recipeClick = require('./recipe-handler')

async function getRecipes (keyword) {
  try {
    const response = await this.fetch('http://127.0.0.1:8000/recipe?keyword=' + keyword) //, {mode : 'no-cors'});

    if (response.ok) {
      const body = await response.text()
      const data = JSON.parse(body)
      const recipeTitles = []

      for (let i = 0; i < data.length; i++) {
        recipeTitles.push(data[i].title)
      }

      const cell = document.getElementById('row1')
      cell.innerHTML = ''

      data.map((item, index) => {
        const id = 'col1_row' + (index + 1)
        cell.innerHTML += `<div class="col-sm" id="${id}" ></div><div class="w-100"></div>`
        const content = document.getElementById(id)
        const title = item.title
        const ingredients = item.ingredients
        const servings = item.servings
        const recipe = item.instructions
        const cookingTimePrep = item.cooking_time.prep
        const cookingTimeCook = item.cooking_time.cook
        const titleID = id + 'title_data'
        const recipeButtonID = id + 'recipe_button_data'
        const ingredientID = id + 'ingredients_data'
        const recipeID = id + 'recipe_data'
        const imagesButtonID = id + 'images_button'
        const imagesID = id + 'images_data'

        content.innerHTML += `<div id=${titleID}>${item.title}<br><hr><button onclick="ingredientsClick('${ingredients}', ${servings},'${id}')">View Ingredients</button></div>
                                     <div id=${ingredientID}></div>
                                     <div id=${recipeButtonID}><br><button onclick="recipeClick('${recipe}', '${cookingTimePrep}', '${cookingTimeCook}', '${id}')">View Recipe</button><br></div>
                                     <div id=${recipeID}></div>
                                     <div id=${imagesButtonID}><br><button onclick="imagesClick('${title}', '${id}')">View Images</button><br></div>
                                     <div id=${imagesID}></div><br>`
      })
    } else {
      alert('Sorry you have a 404')
    }
  } catch (e) {
    console.log(e)
    alert(e)
  }
}

module.exports(getRecipes())
