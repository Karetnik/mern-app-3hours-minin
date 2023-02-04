const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = Router()
const User = require('../models/User')

router.post(
  '/register',
  [
    check('email', 'Введен некорректный email').isEmail(),
    check('password', 'Длина пароля дб не менее 6 символов').isLength({min: 6})
  ],
  async (req,res) => {
  try {
    console.log('Body:', req.body);
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Вы ввели некорректные данные, попробуйте снова'
      })
    }

    const {email, password} = req.body

    const candidate = await User.findOne({email})
    if (candidate) {
      return res.status(400).json({message: 'Пользователь с таким email зарегистрирован, попробуйте снова'})
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({
      email,
      password: hashedPassword
    })
    await user.save()
    res.status(201).json({message: 'Пользователь успешно создан'})

  } catch (e) {
    console.log('При post-запросе /register возникла ошибка', e.message);
    res.status(500).json({message: 'Чтото пошло не так, попробуйте снова'})
  }
})

router.post(
  '/login',
  [
    check('email', 'Введен некорректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(),
    check('password', 'Длина пароля дб не менее 6 символов').isLength({min: 6})
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Введены некорректные данные, попробуйте снова'
      })
    }

    const {email, password} = req.body

    const user = await User.findOne({email}).lean()
    if (!user) {
      return res.status(400).json({message: 'Пользователь с таким email не зарегистрирован'})
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({message: 'Неверный пароль, попробуйте снова'})
    }
    const token = jwt.sign(
      {
        userId: user._id
      },
      config.get('jwtSecret'),
      {expiresIn: 60*60*24}
    )

    res.json({
      token,
      userId: user._id
    })
  } catch (e) {
    console.log('При post-запросе /login возникла ошибка', e.message);
    res.status(500).json({message: 'Чтото пошло не так, попробуйте снова'})
  }

})

module.exports = router

