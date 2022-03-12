export function read(property) {
  const json = window.localStorage.getItem(property);
  if (json !== "undefined") {
    return JSON.parse(json);
  }
  //return json === null ? [] : JSON.parse(json);
}
