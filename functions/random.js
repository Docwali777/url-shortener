
var random = ()=>{
  var alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let num = ''
  for(let i=0; i < 5; i++){
    var random = Math.floor(Math.random() * alpha.length)
    num += alpha[random]

  }
  return num
}

module.exports = random
