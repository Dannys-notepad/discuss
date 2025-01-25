const uid = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyz1234567890'
  let result = 'dis_'
  
  for (let i = 0; i < 6; i++){
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

const otp = () => {
  const numericCharacters = '1234567890'
  let result = ''
  
  for (let i = 0; i < 6; i++){
    result += numericCharacters.charAt(Math.floor(Math.random() * numericCharacters.length))
  }
  return result
}

//console.log(uid())
//console.log(otp())

module.exports = {
  uid,
  otp
}