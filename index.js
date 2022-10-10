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
      // totalCount(result)
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
    .filter(
      (e) => e.access_date >= startDatePicker && e.access_date <= endDatePicker
    )
    .filter((e) => e.registration_id === userID);

  const datecount = parseData?.log?.filter(
    (e) =>e.user_name===userName && e.access_date >= startDatePicker && e.access_date <= endDatePicker
  ).length;

  console.log(datecount);
  searchResult(filterData);
}

//total absent and present count
// function totalCount(data){

// }

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

  let dateObj = new Date();

  let month = dateObj.getUTCMonth() + 1;
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  newdate = year + "-" + month + "-" + day;
  let studentPresentCount = 0;
  let studentAbsentCount = 0;
  let date_arr = [
    {
      name: "name",
      present: 0,
      absent: 0,
    },
  ];
  for (let i = 0; i < parseData?.log.length; i++) {
    if (parseData.log[i]?.access_date !== newdate) {
      date_arr.push({
        name: parseData.log[i]?.user_name,
        present: studentPresentCount + 1,
        absent: 0,
      });
    } else {
      date_arr.push({
        name: parseData.log[i]?.user_name,
        present: 0,
        absent: studentAbsentCount + 1,
      });
    }
  }

  // for loop to retreive data from array who have count of present and absent values

  for (let j = 0; j < date_arr.length; j++) {
    let row = ` <tr>
                              
                                <td>${date_arr[j]?.name}</td>
                                <td>${date_arr[j]?.present}</td>
                                <td>${date_arr[j]?.absent}</td>
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

// function pdfGenerator() {
//   let doc = new jsPDF();
//   let elementHTML = $("#table").html();
//   let specialElementHandlers = {
//     "#tr": function (element, renderer) {
//       return true;
//     },
//   };
//   doc.fromHTML(elementHTML, 15, 15, {
//     width: 170,
//     elementHandlers: specialElementHandlers,
//   });

//   doc.save("sample-document.pdf");
// }

function pdfGenerator() {
  var pdf = new jsPDF("p", "pt", "letter");
  // source can be HTML-formatted string, or a reference
  // to an actual DOM element from which the text will be scraped.
  source = $("#containers")[0];

  // we support special element handlers. Register them with jQuery-style
  // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
  // There is no support for any other type of selectors
  // (class, of compound) at this time.
  specialElementHandlers = {
    // element with id of "bypass" - jQuery style selector
    "#bypassme": function (element, renderer) {
      // true = "handled elsewhere, bypass text extraction"
      return true;
    },
  };
  margins = {
    top: 80,
    bottom: 60,
    left: 40,
    width: 522,
  };
  // all coords and widths are in jsPDF instance's declared units
  // 'inches' in this case
  pdf.fromHTML(
    source, // HTML string or DOM elem ref.
    margins.left, // x coord
    margins.top,

    {
      // y coord
      width: margins.width, // max width of content on PDF
      elementHandlers: specialElementHandlers,
    },
    function (dispose) {
      // dispose: object with X, Y of the last line add to the PDF
      //          this allow the insertion of new lines after html
      pdf.save("studentData.pdf");
    },
    margins
  );
}
