let express = require('express');
let router = express.Router();
let path = require("path")
let db = require("../modules/pgutils")

router.get('/', (req, res, next) => {
  const uid = req.session.uid
  if(!uid){
    res.redirect('/')
    return
  }
  res.render('dashboard')
})

module.exports = router;