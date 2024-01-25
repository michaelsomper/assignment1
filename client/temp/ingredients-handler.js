function ingredientsClick (ingredients, servings, id) {
  const ingredientID = id + 'ingredients_data'
  const ingredientsData = document.getElementById(ingredientID)

  if (ingredientsData.innerHTML === '') {
    let content = 'Servings: ' + servings + '<br>'

    const ingredientsList = ingredients.split(',')
    console.log(ingredientsList)
    ingredientsList.map((ingredient, index) => {
      content += '\u2022' + ingredient + '<br>'
    })
    ingredientsData.innerHTML = content
  } else {
    ingredientsData.innerHTML = ''
  }
}
