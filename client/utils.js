// pick item at random from list that is not in exclude list
export function pickRandom(list, exclude = []) {
  const filtered = list.filter((item) => !exclude.includes(item));
  const index = Math.floor(Math.random() * filtered.length);
  return filtered[index];
}
