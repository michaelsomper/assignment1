keywordForm = document.getElementById('keyword-form')

keywordForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let keyword = document.getElementById('keyword').value
  const checkbox = document.getElementById('includeAllCases')
  if (checkbox.checked === true) {
    const upperKeyword = keyword[0].toUpperCase()
    const lowerKeyword = keyword.slice(1).toLowerCase()
    keyword = upperKeyword + lowerKeyword
  }
  const submitInfo = document.getElementById('submitInfo')
  const time = getDateDigital()

  submitInfo.innerHTML = 'Last submission: ' + time[0] + ':' + time[1] + ':' + time[2]
  getRecipes(keyword)
})

function getDateDigital () {
  const date = new Date()
  let dateSeconds = date.getSeconds()
  let dateMinutes = date.getMinutes()
  let dateHours = date.getHours()
  if (dateSeconds < 10) {
    dateSeconds = '0' + dateSeconds
  }
  if (dateMinutes < 10) {
    dateMinutes = '0' + dateMinutes
  }
  if (dateHours < 10) {
    dateHours = '0' + dateHours
  }
  const dateArray = [dateHours, dateMinutes, dateSeconds]
  return dateArray
}

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

async function imagesShow (title, id) {
  let continueSearch = true
  let index = 1
  const titleArray = title.split(' ')
  const newTitle = titleArray.join('+')
  const urlList = []
  while (continueSearch === true) {
    const url = newTitle + index + '.jpg'
    try {
      const response = await this.fetch('http://127.0.0.1:8000/retrieve?url=' + url)
      // console.log('http://127.0.0.1:8000/retrieve?url=' + url);
      if (response.ok) {
        const body = await response.text()
        const data = JSON.parse(body)

        if (data.result === true) {
          continueSearch = true
          index += 1
          urlList.push(url)
        } else {
          continueSearch = false
        }
      }
    } catch {
      alert('Failed to get image(s)')
    }
  }
  const imagesID = id + 'images_data'
  const content = document.getElementById(imagesID)
  content.innerHTML = ''
  for (let i = 0; i < urlList.length; i++) {
    content.innerHTML += `<img src="images/${urlList[i]}" class="recipe-photo">`
  }
  content.innerHTML += `<div id="placeholder-div">
                              <form action="/upload" method="POST" enctype="multipart/form-data" id="form">
                              <input type="text" name="dessert_title" value="${newTitle}" hidden/>
                              <input type="file" class="upload-form" name="image" accept="image/*"/><br><br><br><br><br><br>
                              <button type="submit" class="upload-form" onclick="success()">Upload</button>
                              </form>
                             </div>`
}

function success()
{
  alert("Image uploaded: refresh images to view image.")
}

function imagesClick (title, id) {
  const imagesDataID = id + 'images_data'
  const imageData = document.getElementById(imagesDataID)
  if (imageData.innerHTML === '') {
    imagesShow(title, id)
  } else {
    imageData.innerHTML = ''
  }
}

function addImages (item, imagesID) {
  console.log(imagesID)
  const content = document.getElementById(imagesID)
  content.innerHTML += `<img src="images/${item}" class="recipe-photo">`
}
