let searchData = {};
let filterdatas = [];
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
      showDropDownClass(result);
      showDropDownClasses(result);
      showDropDownIDS(result);

      searchData = result;

      multiSearch();
      countStudent();
    },
  });
}

function multiSearch() {
  let userName = document.getElementById("userName").value;
  let userID = document.getElementById("userId").value;
  let className = document.getElementById("className").value;
  let startDatePicker = document.getElementById("start-date").value;

  let endDatePicker = document.getElementById("end-date").value;

  let parseData = JSON.parse(searchData);

  const filterData = parseData?.log
    ?.filter((e) => e.user_name === userName)
    .filter(
      (e) => e.access_date >= startDatePicker && e.access_date <= endDatePicker
    )
    .filter((e) => e.registration_id === userID)
    .filter((e) => e.department === className);

  searchResult(filterData);
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

//class to show in dropdown
function showDropDownClass(data) {
  let parseData = JSON.parse(data);
  parseData?.log?.forEach((element) => {
    let name = document.getElementById("className");
    name.innerHTML += `<option>${element.department}</option>`;
  });
}

function showDropDownClasses(data) {
  let parseData = JSON.parse(data);
  parseData?.log?.forEach((element) => {
    let name = document.getElementById("classNameOne");
    name.innerHTML += `<option>${element.department}</option>`;
  });
}

function showDropDownIDS(data) {
  let parseData = JSON.parse(data);
  parseData?.log?.forEach((element) => {
    let name = document.getElementById("id");
    name.innerHTML += `<option>${element.registration_id}</option>`;
  });
}

//count the particular student how many days he present or absent
function countStudent() {
  let classNameOne = document.getElementById("classNameOne").value;

  let present_absent_data = document.getElementById("absent-present-data");

  let parseData = JSON.parse(searchData);

  let data = parseData?.log?.filter((e) => e.department === classNameOne);
  filterdatas = data;

  for (let j = 0; j < data?.length; j++) {
    let row = ` <tr>

                                <td>${data[j]?.user_name}</td>
                                <td>${data[j]?.access_date}</td>
                                <td>${data[j]?.department}</td>
                                <td>${data[j]?.registration_id}</td>
                                <td>0</td>
                                <td>0</td>
                                </tr>

                          `;
    present_absent_data.innerHTML += row;
  }
}

// filter method

function filterData() {
  let date_arr = [];

  let startDatePickerOne = document.getElementById("start-date-one").value;
  let present_absent_data = document.getElementById("absent-present-data");

  let endDatePickerOne = document.getElementById("end-date-one").value;

  let presentCount = 0;
  let absentCount = 0;
  let finalFilter = filterdatas
    .filter(
      (e) =>
        e.access_date >= startDatePickerOne && e.access_date <= endDatePickerOne
    )
    .filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.registration_id === value.registration_id &&
            t.access_date === value.access_date
        )
    );
  finalFilter.forEach((e1) => {
    finalFilter
      .filter((e) => e.registration_id === e1.registration_id)
      .forEach((element) => {
        presentCount = presentCount + 1;
      });
    date_arr.push({
      user_name: e1.user_name,
      access_date: e1.access_date,
      department: e1.department,
      registration_id: e1.registration_id,
      present: presentCount,
      absent: absentCount,
    });

    presentCount = 0;
  });
  console.log(date_arr);
  present_absent_data.innerHTML = "";
  for (let j = 0; j < date_arr?.length; j++) {
    let row = ` <tr>

                                <td>${date_arr[j]?.user_name}</td>
                                <td>${date_arr[j]?.access_date}</td>
                                <td>${date_arr[j]?.department}</td>
                                <td>${date_arr[j]?.registration_id}</td>
                                <td>${date_arr[j]?.present}</td>
                                <td>${date_arr[j]?.absent}</td>
                                </tr>

                          `;
    present_absent_data.innerHTML += row;
  }
  console.log("ssfs", filterdatas);
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
