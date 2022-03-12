export function read(property) {
  const json = window.localStorage.getItem(property);
  if (json !== "undefined") {
    return JSON.parse(json);
  }
  //return json === null ? [] : JSON.parse(json);
}

export function write(elements, property) {
  const json = JSON.stringify(elements);
  window.localStorage.setItem(property, json);
  return elements;
}

export function appendToStorage(element, property) {
  if (read(property) == null) {
    write([], property);
  }
  const elements = read(property);
  elements.push(element);
  write(elements, property);
}

export function remove(id) {
  const actions = read();
  const index = actions.findIndex((element) => element.id === id);
  if (index !== -1) {
    actions.splice(index, 1);
    write(actions);
  }
}

export function removeAll() {
  window.localStorage.clear();
}

export function removeItem(property) {
  window.localStorage.removeItem(property);
}
