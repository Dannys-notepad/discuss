const renderHome = (req, res) => {
  res.render('home')
}

const renderProfile = (req, res) => {
  res.render('profile', {username: 'Hey', email: 'hry'})
}

module.exports = {
  renderHome,
  renderProfile
}