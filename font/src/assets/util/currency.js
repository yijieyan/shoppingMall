const digitsRE = /(\d{3})(?=\d)/g

export function currency (value, currency, decimals) {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '$'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
}

export function checkPhone(phoneNum) {
  if(!(/^1[34578]\d{9}$/.test(phoneNum))){
        return false;
    }else {
      return true;
    }
}

export function checkEmail(email) {
  let re=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  if(re.test(email)){
    return true;
  }else {
    return false;
  }
}

export function setSessionStorage(key, value) {
    value = JSON.stringify(value);
  sessionStorage.setItem(key, value);
}

export function getSessionStorage(key) {
  let value = sessionStorage.getItem(key);
    if(value){
      value = JSON.parse(value);
    }else {
      value ={};
    }
  return value;
}

export function deleteSessionStorage(key) {
  sessionStorage.removeItem(key);
}
