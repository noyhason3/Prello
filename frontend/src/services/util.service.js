export default {
    makeId,
    capitalize,
    debounce
}

function makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function capitalize(str){
    const words = str.split(' ')
    console.log("🚀 ~ file: util.service.js ~ line 17 ~ capitalize ~ words", words)
    return words.map(word=> word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

function debounce (func, delay,immediate){
  let timerId;
  return (...args) => {
    const boundFunc = func.bind(this, ...args);
    clearTimeout(timerId);
    if (immediate && !timerId) {
      boundFunc();
    }
    const calleeFunc = immediate ? () => { timerId = null } : boundFunc;
    timerId = setTimeout(calleeFunc, delay);
  }
}