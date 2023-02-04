const {Router} = require('express')
const shortid = require('shortid')
const config = require('config')
const router = Router()
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')


router.post('/generate', auth, async (req, res) => {
  try {
    const {from} = req.body
    const existing = await Link.findOne({from})
    if (existing) {
      return res.json({link: existing})
    }

    const code = shortid.generate()
    const baseUrl = config.get('baseUrl')
    const to = baseUrl + '/t/' + code
    const owner = req.user.userId

    const link = new Link({from, to, code, owner})
    await link.save()
    res.json({link})

  } catch (e) {
    console.log('(/generate): ' + e.message);
    res.status(500).json({message: 'Чтото пошло не так, попробуйте снова'})
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({owner: req.user.userId})
    res.json({links})

  } catch (e) {
    console.log('(/): ' + e.message);
    res.status(500).json({message: 'Чтото пошло не так, попробуйте снова'})
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findOne({_id: req.params.id, owner: req.user.userId})
    if (!link) {
      console.log('(:id) Ссылка не найдена');
      return res.status(404).json({message: 'Ссылка не найдена'})
    }
    console.log(':id', link);
    res.json({link})
  } catch (e) {
    console.log('(/:id): ' + e.message);
    res.status(500).json({message: 'Чтото пошло не так, попробуйте снова'})
  }
})

module.exports = router