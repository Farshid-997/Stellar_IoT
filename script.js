function multiSearch(data) {
  var post_data = {
    operation: "fetch_log",
    auth_user: "unive",
    auth_code: "cpkt5hsldky7r8wa835t631ohbxvrx5",
    start_date: "2022-09-01",
    end_date: "2022-09-28",
    start_time: "16:18:02",
    end_time: "16:58:08",
    access_id: "21829370",
  };
  $.ajax({
    type: "POST",
    url: "https://rumytechnologies.com/rams/json_api",
    data: JSON.stringify(post_data),
    dataType: "html",
    success: function (result) {
      multiSearch(result);

      // datePicker(result);
      //   let dummyData = {};
      //   dummyData = result;
    },
  });
  let userName = document.getElementById("userName").value;
  let userID = document.getElementById("userId").value;
  var parseData = JSON.parse(data);

  cardContainer = document.getElementById("cards");
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  // Filter out the data, retrieve an array of only the objects that
  // that meet our search criteria
  filteredProperties = parseData?.log?.filter((e) => {
    if (userName !== "" && e.user_name !== userName) return false;

    if (!isNaN(userID) && e.registration_id > userID) return false;

    return true;
  });

  // Loop through filtered objects and build the elements to display
  filteredProperties.forEach((e) => {
    // Each property is contained with a "card"
    var card = document.createElement("DIV"); // create the card div element
    card.classList.add("card"); // add some style

    // Loop through each value in the object and build elements
    for (var key in e) {
      var propHeading = document.createElement("h2");
      propHeading.innerHTML = key;

      var propValue = document.createElement("span");
      propValue.innerHTML = e[key];

      // Append the values to the card element
      card.appendChild(propHeading);
      card.appendChild(propValue);
    }

    // Add this new card to the cards container
    document.getElementById("cards").appendChild(card);
  });
}
