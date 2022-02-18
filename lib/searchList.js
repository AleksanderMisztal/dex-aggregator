export const search = (list, key, value) => {
  list = list.slice().sort((a, b) => (a[key] < b[key] ? -1 : 1));
  value = value.toLowerCase();
  let p = 0;
  let k = list.length - 1;
  let s;
  // Find first item that matches the value
  while (p < k) {
    s = (p + k) >> 1;
    if (list[s][key].toLowerCase() < value) p = s + 1;
    else k = s;
  }
  const trueP = p;
  k = list.length;
  // Find first item that doesn't match the value
  while (p < k) {
    s = (p + k) >> 1;
    if (list[s][key].toLowerCase().startsWith(value)) p = s + 1;
    else k = s;
  }
  return list.slice(trueP, k);
};
