
const API = 'http://localhost:5000';

function fetchSourceEmoji() {
  return fetch(`${API}/emoji`)
    .then(r => r.json());
}

function transferSourceEmojiToDestination(emojiNames) {
  const body = JSON.stringify({ emoji: emojiNames });
  return fetch(`${API}/transfer`, {
    body,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
    .then(r => r.json());
}

export {
  fetchSourceEmoji,
  transferSourceEmojiToDestination,
};
