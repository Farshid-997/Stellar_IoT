let searchData = {};
function get_data() {
  let post_data = {
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

  let parseData = JSON.parse(searchData);
 
  

  const filterData = parseData?.log
    ?.filter((e) => e.user_name === userName)
    .filter((e) => e.access_date >= startDatePicker && e.access_date <= endDatePicker)

    .filter((e) => e.registration_id === userID);

  searchResult(filterData);
  console.log("filter", filterData);
  
}

// Name data to show in the drop down
function showDropDown(data) {
  let parseData = JSON.parse(data);
  parseData?.log?.forEach((element) => {
    let name = document.getElementById("userName");
    name.innerHTML += `<option>${element.user_name}</option>`;
  });
}
// id to show in the dropdown
function showDropDownId(data) {
  let parseData = JSON.parse(data);
  parseData?.log?.forEach((element) => {
    let name = document.getElementById("userId");
    name.innerHTML += `<option>${element.registration_id}</option>`;
  });
}

//count the particular student how many days he present or absent
function countStudent(data) {
  let present_absent_data = document.getElementById("absent-present-data");
  let parseData = JSON.parse(data);

  let studentCount = 0;
  let dateObj = new Date();

  let month = dateObj.getUTCMonth() + 1;
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  newdate = year + "-" + month + "-" + day;
  let date_arr = [];
  for (let i = 0; i < parseData?.log.length; i++) {
    if (parseData.log[i]?.access_date !== newdate) {
      date_arr.push({
        name: parseData.log[i]?.user_name,
        count: studentCount + 1,
      });
      console.log("found");
    } else {
      console.log("not found");
    }
  }

  // for loop to retreive data from array who have count of present and absent values

  for (let j = 0; j < date_arr.length; j++) {
    

    let row = ` <tr>
                              
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
  let parsingData = JSON.parse(data);
  let table = document.getElementById("tr");

  for (let i = 0; i < parsingData?.log.length; i++) {
    let row = ` <tr>
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
  let table = document.getElementById("tr");
  table.innerHTML = "";
  for (let i = 0; i < data?.length; i++) {
    let row = ` <tr>
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
  let doc = new jsPDF();
  let elementHTML = $("#table").html();
  let specialElementHandlers = {
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
