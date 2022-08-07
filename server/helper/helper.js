const generateRandomUsername = function () {

  const colors = ["Yellow", "Orange", "Red", "Pink", "Violet", "Blue", "Green", "Salmon"];

  const fruits = ["Acerola", "Apple", "Apricot", "Avocado", "Banana", "Blackberry", "Blueberry", "Cherry", "Clementine", "Coconut", "Cranberrie", "Grapefruit", "Kiwi", "Lemon", "Mango", "Orange", "Papaya", "Peache", "Pear", "Pineapple", "Tangerine", "Watermelon"]

  let username = colors[Math.floor(Math.random() * colors.length)] + " " + fruits[Math.floor(Math.random() * fruits.length)]

  return username
};
