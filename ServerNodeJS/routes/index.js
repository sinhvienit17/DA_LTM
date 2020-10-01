const express = require('express')
const router = express.Router()
const scholar = require('scholarly')
const cors = require('cors')
/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' })
})
router.get('/api', (req, res) => {
  let search = req.query.q
  scholar.search(search).then(data => {
    res.json(data)
  })
})
module.exports = router
