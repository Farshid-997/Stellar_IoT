let searchData = {};
function get_data() {
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
      buildType(result);
      showDropDown(result);
      showDropDownId(result);

      countStudent(result);

      // datePicker(result);
      // dummyData = result;
      searchData = result;
      multiSearch();
    },
  });
}

// async function searchData() {
//   const searchField = document.getElementById("search-field");
//   const searchText = searchField.value;

//   searchField.value = "";
//   // const getData = await get_data();
//   let bs = JSON.parse(dummyData);

//   const url = await bs?.log?.filter((item) =>
//     item.registration_id.toLowerCase().includes(searchText.toLowerCase())
//   );

//   searchResult(url);
// }

function multiSearch() {
  let userName = document.getElementById("userName").value;
  let userID = document.getElementById("userId").value;
  let startDatePicker = document.getElementById("start-date").value;
  let endDatePicker = document.getElementById("end-date").value;

  var parseData = JSON.parse(searchData);

  cardContainer = document.getElementById("cards");
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  filteredProperties = parseData?.log?.filter((e) => {
    if (userName !== "" && e.user_name !== userName) return false;
    if (startDatePicker >= e.access_date && endDatePicker <= e.access_date)
      return true;
    if (!isNaN(userID) && e.registration_id !== userID) return false;

    return true;
  });

  // filteredProperties.forEach((e) => {
  //   var card = document.createElement("DIV");
  //   card.classList.add("card");

  //   for (var key in e) {
  //     var propHeading = document.createElement("h2");
  //     propHeading.innerHTML = key;

  //     var propValue = document.createElement("span");
  //     propValue.innerHTML = e[key];

  //     card.appendChild(propHeading);
  //     card.appendChild(propValue);
  //   }

  //   document.getElementById("cards").appendChild(card);
  // });
}

// Name data to show in the drop down
function showDropDown(data) {
  var parseData = JSON.parse(data);
  parseData?.log?.forEach((element) => {
    let name = document.getElementById("userName");
    name.innerHTML += `<option>${element.user_name}</option>`;
  });
}
// id to show in the dropdown
function showDropDownId(data) {
  var parseData = JSON.parse(data);
  parseData?.log?.forEach((element) => {
    let name = document.getElementById("userId");
    name.innerHTML += `<option>${element.registration_id}</option>`;
  });
}

//count the particular student how many days he present or absent
function countStudent(data) {
  var present_absent_data = document.getElementById("absent-present-data");
  var parseData = JSON.parse(data);

  let studentCount = 0;
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1;
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  newdate = year + "-" + month + "-" + day;
  let date_arr = [];
  for (var i = 0; i < parseData?.log.length; i++) {
    if (parseData.log[i]?.access_date !== newdate) {
      date_arr.push({
        name: parseData.log[i]?.user_name,
        count: studentCount + 1,
      });
      console.log(date_arr);
    } else {
      console.log("not found");
    }
  }

  // for loop to retreive data from array who have count of present and absent values

  for (var j = 0; j < date_arr.length; j++) {
    // var innerData = `<div>
    // <h4> Name of the Student: ${date_arr[j]?.name} The present count:${date_arr[j]?.count}</h4>

    // </div>`;

    var row = ` <tr>
                              
                                <td>${date_arr[j]?.name}</td>
                                <td>${date_arr[j]?.count}</td>
                                <td>${0}</td>
                                </tr>

                          `;
    present_absent_data.innerHTML += row;
  }
}

// show data in a table

function buildType(data) {
  var parsingData = JSON.parse(data);
  var table = document.getElementById("tr");

  for (var i = 0; i < parsingData?.log.length; i++) {
    var row = ` <tr>
                                <td>${parsingData.log[i]?.registration_id}</td>
                                <td>${parsingData.log[i]?.department}</td>
                                <td>${parsingData.log[i]?.access_time}</td>
                                <td>${parsingData.log[i]?.access_date}</td>
                                <td>${parsingData.log[i]?.user_name}</td>
                                <td>${parsingData.log[i]?.unit_id}</td>
                                <td>${parsingData.log[i]?.card}</td>
                                </tr>

                          `;
    table.innerHTML += row;
  }
}

// searching from table
function searchResult(data) {
  var table = document.getElementById("tr");
  table.innerHTML = "";
  for (var i = 0; i < data?.length; i++) {
    var row = ` <tr>
                                <td>${data[i]?.registration_id}</td>
                                <td>${data[i]?.department}</td>
                                <td>${data[i]?.access_time}</td>
                                <td>${data[i]?.access_date}</td>
                                <td>${data[i]?.user_name}</td>
                                <td>${data[i]?.unit_id}</td>
                                <td>${data[i]?.card}</td>
                                </tr>

                          `;
    table.innerHTML += row;
  }
}

// For pdf generator

function pdfGenerator() {
  var doc = new jsPDF();
  var elementHTML = $("#table").html();
  var specialElementHandlers = {
    "#tr": function (element, renderer) {
      return true;
    },
  };
  doc.fromHTML(elementHTML, 15, 15, {
    width: 170,
    elementHandlers: specialElementHandlers,
  });

  // Save the PDF
  doc.save("sample-document.pdf");
}
