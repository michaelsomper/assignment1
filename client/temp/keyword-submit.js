import { getDate } from './get-date.jss'
import { getRecipes } from './meal-handler'

const keywordForm = document.getElementById('keyword-form')

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
  const time = getDate()

  submitInfo.innerHTML = 'Last submission: ' + time[0] + ':' + time[1] + ':' + time[2]
  getRecipes(keyword)
})


