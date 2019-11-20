function getCookie(cname) {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return '';
}

function camelizeStr(str) {
  return str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase());
}

function snakifyStr(str) {
  return str.replace(/(?:^|\.?)([A-Z])/g, (_, x) => `_${x.toLowerCase()}`);
}

function convertCase(convertFunc) {
  function converter(thing) {
    if (thing instanceof Array) {
      return thing.map((i) => converter(i));
    }
    if (thing instanceof Object) {
      const newObj = {};
      Object.keys(thing).forEach((k) => {
        newObj[convertFunc(k)] = converter(thing[k]);
      });
      return newObj;
    }
    return thing;
  }
  return converter;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
  getCookie,
  camelizeStr,
  snakifyStr,
  delay,
  camelizeKeys: convertCase(camelizeStr),
  snakifyKeys: convertCase(snakifyStr),
};
