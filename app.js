const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')
const fs = require('fs')
app.use(express.static('client'))

//Used to allow images to be uploaded
app.use('/images', express.static('images'))
app.use(fileUpload())

const recipes = require('./json/dessert_recipes.json')

app.get('/recipe', function (req, res) {
  const keyword = req.query.keyword
  const filteredRecipes = recipes.filter(r => r.title.includes(keyword)) //filters the recipes
  console.log('Recipes filtered')
  res.send(200, JSON.stringify(filteredRecipes)) //returns a json file back to the function
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

/* eslint-disable no-path-concat */

app.get('/retrieve', (req, res) => {
  //The url in the query will have spaces, whereas our image paths do not.
  const spacedURL = req.query.url
  const url = (spacedURL.split(' ')).join('+')
  if (fs.existsSync(__dirname + '/images/' + url)) {
    res.send({ result: true }) //lets the function know there is an image with that directory
  } else {
    res.send({ result: false })
  }
})

app.post('/upload', (req, res) => {
  // This code was adapted from 'https://pqina.nl/blog/image-upload-with-php/'
  // Get the file that was set to our field named "image"
  try {
    const { image } = req.files

    const title = req.body.dessert_title
    console.log(title)
    // If no image submitted, exit
    if (!image) return res.sendStatus(400)

    let imageOriginal = false
    let index = 1
    let imageName = title + index + '.jpg'
    while (imageOriginal === false) {
      if (fs.existsSync(__dirname + '/images/' + imageName)) {
        index += 1
        imageName = title + index + '.jpg'
      } else {
        image.mv(__dirname + '/images/' + imageName)
        imageOriginal = true
      }
    }  
  } catch (e) {
    res.sendStatus(400)
  }
})

/* eslint-disable no-path-concat */

app.get('/aboutus', function (req, resp) {
  resp.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>index.html</title>
  </head>
  <script src="./javascript/index.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
  <link rel="stylesheet" type="text/css" href="styles.css" />
  <body>


  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">S.W</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="http://127.0.0.1:8000">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="">About Us<span class="sr-only"> (current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="http://127.0.0.1:8000/copyright">Copyright</a>
      </li>
    </ul>
  </div>
</nav>

<!-- About 1 - Bootstrap Brain Component -->
<section class="py-3 py-md-5 py-xl-8">
  <div class="container">
    <div class="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
      <div class="col-12 col-lg-6 col-xl-5">
        <img class="img-fluid rounded" loading="lazy" src="./images/chef.jpg" alt="">
      </div>
      <div class="col-12 col-lg-6 col-xl-7">
        <div class="row justify-content-xl-center">
          <div class="col-12 col-xl-11">
            <h2 class="h1 mb-3">Who Are We?</h2>
            <p class="lead fs-4 text-secondary mb-3">Welcome to SweetWisdom – your portal to a world of exquisite desserts. As an experienced chef, I've crafted this space to share a lifetime of culinary wisdom and passion. Here, you'll discover a curated collection of timeless classics and innovative delights.</p>
            <p class="mb-5">SweetWisdom is not just a recipe hub; it's a community where dessert enthusiasts can celebrate the joy of baking, share experiences, and indulge in the sweet moments of life.</p>
            <div class="row gy-4 gy-md-0 gx-xxl-5X">
              <div class="col-12 col-md-6">
                <div class="d-flex">
                  <div class="me-4 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                      <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="mb-3">Methodical</h4>
                    <p class="text-secondary mb-0">Every recipe has clear instructions that are easy to follow.</p>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="d-flex">
                  <div class="me-4 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-fire" viewBox="0 0 16 16">
                      <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="mb-3">Innovative Recipes</h4>
                    <p class="text-secondary mb-0">We can guarantee we'll deliver innovative recipes before anyone else.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</body>
  `)
})

app.get('/copyright', function (req, resp) {
  resp.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>index.html</title>
  </head>
  <script src="./javascript/index.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
  <link rel="stylesheet" type="text/css" href="styles.css" />
  <body>


  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">S.W</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="http://127.0.0.1:8000">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="http://127.0.0.1:8000/aboutus">About Us</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Copyright<span class="sr-only"> (current)</span></a>
      </li>
    </ul>
  </div>
</nav>
<br>
<div class="container">
  <h2>Copyright Information</h2>
  <div class="panel panel-default">
    <div class="panel-heading">© 2024 SweetWisdom. All rights reserved.</div>
    <br><div class="panel-body">No part of this website, including recipes, images, or content, may be reproduced, distributed, or transmitted in any form or by any means without the prior written permission of SweetWisdom. The information provided on this website is for personal, non-commercial use only.</div>
    <br><div class="panel-body">SweetWisdom and its logo are trademarks of the website owner. All other trademarks, service marks, and logos used on this site are the property of their respective owners.</div>
    <br><div class="panel-body">While every effort has been made to ensure the accuracy of the information presented on SweetWisdom, the website owner does not guarantee the completeness, accuracy, or timeliness of the content. The recipes and advice provided are for informational purposes only and should not be considered as professional advice.</div>
    <br><div class="panel-body">By accessing and using this website, you agree to abide by these terms and conditions. SweetWisdom reserves the right to modify or update these terms at any time without prior notice. Please check this page periodically for any changes.</div>
  </div>
</div>
</body>
  `)
})

module.exports = app
app.listen(8000)


