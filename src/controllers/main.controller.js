const renderHome = (req, res) => {
  res.render('home')
}

const renderProfile = (req, res) => {
  res.render('profile', {username: req.session.user.name, email: req.session.user.email})
}

module.exports = {
  renderHome,
  renderProfile
}