function recipeClick (recipe, cookingTimePrep, cookingTimeCook, id) {
  const recipeID = id + 'recipe_data'
  const recipeData = document.getElementById(recipeID)
  if (recipeData.innerHTML === '') {
    const total = +(cookingTimePrep) + +(cookingTimeCook)
    let content = 'Prep: ' + cookingTimePrep + ', Cook: ' + cookingTimeCook + ', Total: ' + total + '<br>'
    const recipeList = recipe.split(',')
    recipeList.map((recipe, index) => {
      content += (index + 1) + '. ' + recipe + '<br>'
    })
    recipeData.innerHTML = content
  } else {
    recipeData.innerHTML = ''
  }
}

module.exports(recipeClick())
