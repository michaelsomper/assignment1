async function images_show (title, id) {
  continue_search = true
  index = 1
  title_array = title.split(' ')
  new_title = title_array.join('+')
  url_list = []
  while (continue_search == true) {
    url = new_title + index + '.jpg'
    try {
      const response = await this.fetch('http://127.0.0.1:8000/retrieve?url=' + url)
      // console.log('http://127.0.0.1:8000/retrieve?url=' + url);
      if (response.ok) {
        const body = await response.text()
        const data = JSON.parse(body)

        if (data.result == true) {
          continue_search = true
          index += 1
          url_list.push(url)
        } else {
          continue_search = false
        }
      }
    } catch {
      alert('Failed to get image(s)')
    }
  }
  const images_id = id + 'images_data'
  const content = document.getElementById(images_id)
  content.innerHTML = ''
  for (i = 0; i < url_list.length; i++) {
    content.innerHTML += `<img src="images/${url_list[i]}" class="recipe-photo">`
  }
  content.innerHTML += `<div id="placeholder-div">
                            <form action="/upload" method="POST" enctype="multipart/form-data" id="form">
                            <input type="text" name="dessert_title" value="${new_title}" hidden/>
                            <input type="file" class="upload-form" name="image" accept="image/*"/><br><br><br><br><br><br>
                            <button type="submit" class="upload-form" onclick="success()">Upload</button>
                            </form>
                           </div>`
}

function images_click (title, id) {
  images_data_id = id + 'images_data'
  images_data = document.getElementById(images_data_id)
  if (images_data.innerHTML == '') {
    images_show(title, id)
  } else {
    images_data.innerHTML = ''
  }
}

function addImages (item, images_id) {
  console.log(images_id)
  const content = document.getElementById(images_id)
  content.innerHTML += `<img src="images/${item}" class="recipe-photo">`
}

async function imagesShow (title, id) {
  continue_search = true
  index = 1
  title_array = title.split(' ')
  new_title = title_array.join('+')
  url_list = []
  while (continue_search == true) {
    url = new_title + index + '.jpg'
    try {
      const response = await this.fetch('http://127.0.0.1:8000/retrieve?url=' + url)

      if (response.ok) {
        const body = await response.text()
        const data = JSON.parse(body)

        if (data.result == true) {
          continue_search = true
          index += 1
          url_list.push(url)
        } else {
          continue_search = false
        }
      }
    } catch {
      alert('Failed to get image(s)')
    }
  }
  const images_id = id + 'images_data'
  const content = document.getElementById(images_id)
  content.innerHTML = ''
  for (i = 0; i < url_list.length; i++) {
    content.innerHTML += `<img src="images/${url_list[i]}" class="recipe-photo">`
  }
  content.innerHTML += `<div id="placeholder-div">
                            <form action="/upload" method="POST" enctype="multipart/form-data" id="form">
                            <input type="text" name="dessert_title" value="${new_title}" hidden/>
                            <input type="file" class="upload-form" name="image" accept="image/*" /><br><br><br><br><br><br>
                            <button type="submit" class="upload-form" onclick="success()">Upload</button>
                            </form>
                           </div>`
}
