function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// IT TOGGLES THE MODE SO ANSWERS GET SHOWN OR NOT;
const togglePlayMode = (a) => setPlayMode(a);
const toggleShowMode = (a) => setShowMode(a);
const toggleFetchMode = (a) => setFetchMode(a);

export { shuffle, togglePlayMode, toggleShowMode, toggleFetchMode };
