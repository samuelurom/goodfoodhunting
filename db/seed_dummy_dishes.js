const pg = require("pg");
const _ = require("lodash");

const db = new pg.Pool({
  database: "goodfoodhunting",
});

const dishes = [
  "Arepas",
  "Barbecue Ribs",
  "Bruschette with Tomato",
  "Bunny Chow",
  "Caesar Salad",
  "California Maki",
  "Caprese Salad",
  "Cauliflower Penne",
  "Cheeseburger",
  "Chicken Fajitas",
  "Chicken Milanese",
  "Chicken Parm",
  "Chicken Wings",
  "Chilli con Carne",
  "Ebiten maki",
  "Fettuccine Alfredo",
  "Fish and Chips",
  "French Fries",
  "Sausages",
  "French Toast",
  "Hummus",
  "Katsu Curry",
  "Kebab",
  "Lasagne",
  "Linguine with Clams",
  "Massaman Curry",
  "Meatballs with Sauce",
  "Mushroom Risotto",
  "Pappardelle alla Bolognese",
  "Pasta Carbonara",
  "Pasta and Beans",
  "Pasta with Tomato and Basil",
  "Peking Duck",
  "Philadelphia Maki",
  "Pho",
  "Pierogi",
  "Pizza",
  "Poke",
  "Pork Belly Buns",
  "Pork Sausage Roll",
  "Poutine",
  "Ricotta Stuffed Ravioli",
  "Risotto with Seafood",
  "Salmon Nigiri",
  "Scotch Eggs",
  "Seafood Paella",
  "Som Tam",
  "Souvlaki",
  "Stinky Tofu",
  "Sushi",
  "Tacos",
  "Teriyaki Chicken Donburi",
  "Tiramisù",
  "Tuna Sashimi",
  "Vegetable Soup",
];

const sql = `
  INSERT INTO dishes (title, image_url)
  VALUES ($1, $2);
`;

const seedDummyDishes = () => {
  const numRandomDishes = 10;
  const selectedDishes = _.sampleSize(dishes, numRandomDishes);

  selectedDishes.forEach((title) => {
    const image_url = "https://fakeimg.pl/400x320";

    db.query(sql, [title, image_url], (err, dbRes) => {
      if (err) {
        console.error("Error inserting dishes:", err);
      } else {
        console.log("Dish inserted successfully:", title);
      }
    });
  });
};

seedDummyDishes();
