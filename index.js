import express from "express";

const app = express();

// convert res to json
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ success: true, message: "Welcome to the Emoji Server" });
});

// GET /emojis

app.get("/emojis", (req, res) => {
  if (emojis) {
    res.send({ sucess: true, emojis });
  } else {
    res.status(404).send({ success: false, error: "Emojis array not found" });
  }
});

// GET /emojis/:emojiId

app.get("/emojis/:emojiId", (req, res) => {
  // get the ID from the URL & store it in the variable emojiID
  const emojiId = req.params.emojiId;

  // find method iterates over each emoji in the emojis array; if the emoji id equals emojiId (converted to a num) assign an emoji as a response if not send error res
  const emoji = emojis.find((emoji) => emoji.id === Number(emojiId));

  if (emoji) {
    res.send({ sucess: true, emoji });
  } else {
    res.status(404).send({ success: false, error: "Emoji not found" });
  }
});

// POST /emojis - create emoji

app.post("/emojis", (req, res) => {
  const { name, character } = req.body;

  if (!name) {
    return res.send({
      success: false,
      error: "Name must be provided to create emoji!",
    });
  }
  const emoji = {
    id: emojis.length + 1,
    name,
    character,
  };

  emojis.push(emoji);
  res.send({ success: true, emoji });
});

// PUT/emojis/:emojiId - update emoji

app.put("/emojis/:emojiId", (req, res) => {
  // get the emojiId
  const emojiId = req.params.emojiId;

  // get the name & character properties
  const { name, character } = req.body;

  // finding emoji based on id property; find the emoji whos id matches the emojiId (converted to num)
  const emoji = emojis.find((emoji) => emoji.id === Number(emojiId));

  // if emoji w/ id is found, & if the name & character properties are provided then update with new values else send error
  if (emoji) {
    if (name) {
      emoji.name = name;
    }
    if (character) {
      emoji.character = character;
    }
    res.send({ sucess: true, emoji });
  } else {
    res.status(404).send({ sucess: false, error: "Emoji can't be updated" });
  }
});

// DELETE /emojis/:emojiId

app.delete("/emojis/:emojiId", (req, res) => {
  const emojiId = req.params.emojiId;

  // findIndex method to get the index of the emoji in the array & the id of the emoji should equal emojiId in the link
  const index = emojis.findIndex((emoji) => emoji.id === Number(emojiId));

  // if the emoji is not found in the array send error; if found use splice method to modify the array (remove emoji)
  if (index !== -1) {
    emojis.splice(index, 1);
    res.send({ sucess: true, message: "Emoji deleted" });
  } else {
    res.status(404).send({ success: false, error: "Emoji not found" });
  }
});

// fake database

let emojis = [
  { id: 1, character: "😀", name: "Grinning Face" },
  { id: 2, character: "🚀", name: "Rocket" },
  { id: 3, character: "🌟", name: "Star" },
  { id: 4, character: "🎉", name: "Party Popper" },
  { id: 5, character: "🐱", name: "Cat Face" },
  { id: 6, character: "🌺", name: "Hibiscus" },
  { id: 7, character: "🍔", name: "Hamburger" },
  { id: 8, character: "🚲", name: "Bicycle" },
  { id: 9, character: "📚", name: "Books" },
  { id: 10, character: "🎈", name: "Balloon" },
  { id: 11, character: "🍕", name: "Pizza" },
  { id: 12, character: "🏖️", name: "Beach with Umbrella" },
  { id: 13, character: "🎸", name: "Guitar" },
  { id: 14, character: "🌈", name: "Rainbow" },
  { id: 15, character: "🌊", name: "Ocean Wave" },
  { id: 16, character: "🍦", name: "Ice Cream" },
  { id: 17, character: "🎨", name: "Artist Palette" },
  { id: 18, character: "🐶", name: "Dog Face" },
  { id: 19, character: "🌄", name: "Sunrise Over Mountains" },
  { id: 20, character: "🎓", name: "Graduation Cap" },
  { id: 21, character: "🍂", name: "Fallen Leaf" },
  { id: 22, character: "🍁", name: "Maple Leaf" },
  { id: 23, character: "🎃", name: "Jack-O-Lantern" },
  { id: 24, character: "🎄", name: "Christmas Tree" },
  { id: 25, character: "❄️", name: "Snowflake" },
  { id: 26, character: "🌻", name: "Sunflower" },
  { id: 27, character: "🌍", name: "Earth Globe Europe-Africa" },
  { id: 28, character: "🌞", name: "Sun with Face" },
  { id: 29, character: "🌚", name: "New Moon Face" },
  { id: 30, character: "🎶", name: "Musical Notes" },
];

//catch all - doesn't care what the request type is

app.use((req, res) => {
  res.send({ success: false, error: "No route found." });
});

app.use((error, req, res, next) => {
  res.send({ success: false, error: error.message });
});

//

const port = 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
