
const API = 'http://localhost:5000';

function fetchSourceEmoji() {
  return fetch(`${API}/emoji`)
    .then(r => r.json());
}

function transferSourceEmojiToDestination(emojiNames) {
  const body = JSON.stringify({ emoji: emojiNames });
  return fetch(`${API}/transfer`, { body, method: 'POST' })
    .then(r => r.json());
}

export {
  fetchSourceEmoji,
  transferSourceEmojiToDestination,
};
