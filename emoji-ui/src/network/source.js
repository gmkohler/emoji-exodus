
const API = 'http://localhost:5000/';

function fetchSourceEmoji() {
  return fetch(`${API}emoji`).then(r => r.json());
}

export { fetchSourceEmoji };