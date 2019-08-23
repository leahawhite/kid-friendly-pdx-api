function makeUsersArray() {
  return [
    {
      id: 1,
      display_name: "",
      email: "administrator@xxx.com",
      password: "lool00",
      date_created: "2019-07-06",
    },
    {
      id: 2,
      display_name: "Leah",
      email: "leahawhite@gmail.com",
      password: "lool00",
      date_created: "2019-07-06",
    },
    { 
      id: 3,
      display_name: "Charlie",
      email: "charlie@alwayssunny.com",
      password: "Charlie100%",
      date_created: "2019-06-13",
    }
  ]
}

module.exports = {
  makeUsersArray
}