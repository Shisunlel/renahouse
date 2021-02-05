const mongoose = require("mongoose"),
  House = require("./models/house"),
  User = require("./models/user"),
  Comment = require("./models/comment");

function seeDB() {
  //remove all house
  House.deleteMany({}, (err) => {
    if (err) console.log("Error houses deletion", err);
  });
  //remove all user
  User.deleteMany({}, (err) => {
    if (err) console.log("Error user deletion", err);
  });
  //remove all comments
  Comment.deleteMany({}, (err) => {
    if (err) console.log("Error comment deletion", err);
  });
  //create user
  let user = new User({ username: "joe", password: "123" });
  User.create(user, (err, users) => {
    users.save();
  });
  //seed data
  let houseData = [
    {
      title: "OLYMPIA MALL Condo",
      price: "26",
      description:
        "Refreshing studio centrally located nearby riverside yet comfortably cozy with shiny bright natural light. The space also surrounded by various restaurants, cafes and at a walking distance to all top attractions in Phnom Penh like the Royal Palace, National Museum, Independent Monument, and Central Market. Fast and easy to travel around, saving you a ton of time and commuting expenses. Besides, with the safe and secure neighborhood it’s also perfect for both business and long stay.",
      image: [
        "https://a0.muscache.com/im/pictures/1873aabc-2f87-4177-9b7f-1af59a82cc3f.jpg?im_w=960",
      ],
      location: "Phnom Penh",
      type: "Entire Apartment",
    },
    {
      title: "Cozy Studio near Royal Palace and Chaktomuk River",
      price: "21",
      description:
        "The studio is well equipped with the necessity for your short-term stay in Phnom Penh. Perfect for couple travelers who wish to explore the diversity, culture, and modernity of the capital with walking distance to all major tourist attractions in the city. Surrounding by restaurants, food kiosks, pubs and bars, nightlife is exciting and vibrant. The space Large and spacious studio with necessary appliance. Located at the 3rd floor of building with a small veranda to indulge yourself with the city-scape.",
      image: [
        "https://a0.muscache.com/im/pictures/9e5b7c64-7c90-41e8-b502-0b2530705d7a.jpg?im_w=960",
      ],
      location: "Phnom Penh",
      type: "Entire Apartment",
    },
    {
      title: "John amazing house",
      price: "23",
      description:
        "This apt has everything you need for a comfortable stay. One queen size bed, has windows with natural lights, individual bathroom, a small kitchen, and a cozy living hall. Centrally located in BKK1, within 2-5 mins walking distance to eateries such as Starbucks, Marugame Udon Bar, Jaru Korean BBQ, KOI Bubble Tea, Brown Coffee, Domino's Pizza and etc.",
      image: [
        "https://a0.muscache.com/im/pictures/5102731d-8726-480c-b88f-b6753d552776.jpg?im_w=960",
      ],
      location: "Phnom Penh",
      type: "Entire Apartment",
    },
    {
      title: "OLYMPIA MALL Condo",
      price: "26",
      description:
        "Refreshing studio centrally located nearby riverside yet comfortably cozy with shiny bright natural light. The space also surrounded by various restaurants, cafes and at a walking distance to all top attractions in Phnom Penh like the Royal Palace, National Museum, Independent Monument, and Central Market. Fast and easy to travel around, saving you a ton of time and commuting expenses. Besides, with the safe and secure neighborhood it’s also perfect for both business and long stay.",
      image: [
        "https://a0.muscache.com/im/pictures/1873aabc-2f87-4177-9b7f-1af59a82cc3f.jpg?im_w=960",
      ],
      location: "Phnom Penh",
      type: "Entire Apartment",
    },
    {
      title: "Cozy Studio near Royal Palace and Chaktomuk River",
      price: "21",
      description:
        "The studio is well equipped with the necessity for your short-term stay in Phnom Penh. Perfect for couple travelers who wish to explore the diversity, culture, and modernity of the capital with walking distance to all major tourist attractions in the city. Surrounding by restaurants, food kiosks, pubs and bars, nightlife is exciting and vibrant. The space Large and spacious studio with necessary appliance. Located at the 3rd floor of building with a small veranda to indulge yourself with the city-scape.",
      image: [
        "https://a0.muscache.com/im/pictures/9e5b7c64-7c90-41e8-b502-0b2530705d7a.jpg?im_w=960",
      ],
      location: "Phnom Penh",
      type: "Entire Apartment",
    },
    {
      title: "John amazing house",
      price: "23",
      description:
        "This apt has everything you need for a comfortable stay. One queen size bed, has windows with natural lights, individual bathroom, a small kitchen, and a cozy living hall. Centrally located in BKK1, within 2-5 mins walking distance to eateries such as Starbucks, Marugame Udon Bar, Jaru Korean BBQ, KOI Bubble Tea, Brown Coffee, Domino's Pizza and etc.",
      image: [
        "https://a0.muscache.com/im/pictures/5102731d-8726-480c-b88f-b6753d552776.jpg?im_w=960",
      ],
      location: "Phnom Penh",
      type: "Entire Apartment",
    },
    {
      title: "OLYMPIA MALL Condo",
      price: "26",
      description:
        "Refreshing studio centrally located nearby riverside yet comfortably cozy with shiny bright natural light. The space also surrounded by various restaurants, cafes and at a walking distance to all top attractions in Phnom Penh like the Royal Palace, National Museum, Independent Monument, and Central Market. Fast and easy to travel around, saving you a ton of time and commuting expenses. Besides, with the safe and secure neighborhood it’s also perfect for both business and long stay.",
      image: [
        "https://a0.muscache.com/im/pictures/1873aabc-2f87-4177-9b7f-1af59a82cc3f.jpg?im_w=960",
      ],
      location: "Phnom Penh",
      type: "Entire Apartment",
    },
    {
      title: "Cozy Studio near Royal Palace and Chaktomuk River",
      price: "21",
      description:
        "The studio is well equipped with the necessity for your short-term stay in Phnom Penh. Perfect for couple travelers who wish to explore the diversity, culture, and modernity of the capital with walking distance to all major tourist attractions in the city. Surrounding by restaurants, food kiosks, pubs and bars, nightlife is exciting and vibrant. The space Large and spacious studio with necessary appliance. Located at the 3rd floor of building with a small veranda to indulge yourself with the city-scape.",
      image: [
        "https://a0.muscache.com/im/pictures/9e5b7c64-7c90-41e8-b502-0b2530705d7a.jpg?im_w=960",
      ],
      location: "Phnom Penh",
      type: "Entire Apartment",
    },
    {
      title: "John amazing house",
      price: "23",
      description:
        "This apt has everything you need for a comfortable stay. One queen size bed, has windows with natural lights, individual bathroom, a small kitchen, and a cozy living hall. Centrally located in BKK1, within 2-5 mins walking distance to eateries such as Starbucks, Marugame Udon Bar, Jaru Korean BBQ, KOI Bubble Tea, Brown Coffee, Domino's Pizza and etc.",
      image: [
        "https://a0.muscache.com/im/pictures/5102731d-8726-480c-b88f-b6753d552776.jpg?im_w=960",
      ],
      location: "Phnom Penh",
      type: "Entire Apartment",
    },
    {
      title: "OLYMPIA MALL Condo",
      price: "26",
      description:
        "Refreshing studio centrally located nearby riverside yet comfortably cozy with shiny bright natural light. The space also surrounded by various restaurants, cafes and at a walking distance to all top attractions in Phnom Penh like the Royal Palace, National Museum, Independent Monument, and Central Market. Fast and easy to travel around, saving you a ton of time and commuting expenses. Besides, with the safe and secure neighborhood it’s also perfect for both business and long stay.",
      image: [
        "https://a0.muscache.com/im/pictures/1873aabc-2f87-4177-9b7f-1af59a82cc3f.jpg?im_w=960",
      ],
      location: "Phnom Penh",
      type: "Entire Apartment",
    },
    {
      title: "Cozy Studio near Royal Palace and Chaktomuk River",
      price: "21",
      description:
        "The studio is well equipped with the necessity for your short-term stay in Phnom Penh. Perfect for couple travelers who wish to explore the diversity, culture, and modernity of the capital with walking distance to all major tourist attractions in the city. Surrounding by restaurants, food kiosks, pubs and bars, nightlife is exciting and vibrant. The space Large and spacious studio with necessary appliance. Located at the 3rd floor of building with a small veranda to indulge yourself with the city-scape.",
      image: [
        "https://a0.muscache.com/im/pictures/9e5b7c64-7c90-41e8-b502-0b2530705d7a.jpg?im_w=960",
      ],
      location: "Phnom Penh",
      type: "Entire Apartment",
    },
    {
      title: "John amazing house",
      price: "23",
      description:
        "This apt has everything you need for a comfortable stay. One queen size bed, has windows with natural lights, individual bathroom, a small kitchen, and a cozy living hall. Centrally located in BKK1, within 2-5 mins walking distance to eateries such as Starbucks, Marugame Udon Bar, Jaru Korean BBQ, KOI Bubble Tea, Brown Coffee, Domino's Pizza and etc.",
      image: [
        "https://a0.muscache.com/im/pictures/5102731d-8726-480c-b88f-b6753d552776.jpg?im_w=960",
      ],
      location: "Phnom Penh",
      type: "Entire Apartment",
    },
  ];

  let dateString = new Date().toLocaleDateString();

  let commentData = [
    {
      text: "This place is great, but I wish there was Internet",
      author: {
        id: user._id,
        username: user.username,
      },
      created: dateString,
    },
  ];

  houseData.forEach((seed) => {
    House.create(seed, (err, newHouse) => {
      console.log("House created");
      commentData.forEach((comments) => {
        Comment.create(comments, (err, newComment) => {
            User.find({}, (err, user)=>{
                newHouse.host["id"] = user[0].id;
                newHouse.host["username"] = user[0].username;
                newHouse.comments.push(newComment);
                newHouse.save();
            });
        });
      });
    });
  });
}

module.exports = seeDB;
