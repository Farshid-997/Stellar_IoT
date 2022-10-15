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
  let className = document.getElementById("className").value;
  let startDatePicker = document.getElementById("start-date").value;

  let endDatePicker = document.getElementById("end-date").value;
  // let totalCounter=document.getElementById('totalCounter')
  let parseData = JSON.parse(searchData);

  const filterData = parseData?.log
    ?.filter((e) => e.user_name === userName)
    .filter(
      (e) => e.access_date >= startDatePicker && e.access_date <= endDatePicker
    )
    .filter((e) => e.registration_id === userID)
    .filter((e) => e.department === className);

  // const datecount = parseData?.log?.filter(

  //   (e) =>e.user_name===userName && e.access_date >= startDatePicker && e.access_date <= endDatePicker
  // ).length;

  // let data=`<h5>Total Present of a given day is:${datecount} days </h5>`;
  // totalCounter.innerHTML=data;

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
  let startDatePickerOne = document.getElementById("start-date-one").value;
  let present_absent_data = document.getElementById("absent-present-data");

  let endDatePickerOne = document.getElementById("end-date-one").value;
  // console.log(startDatePickerOne);
  // console.log(classNameOne);
  let parseData = JSON.parse(searchData);
  // const filterData = parseData?.log?.filter(
  //   (e) => e.department === classNameOne
  // );
  console.log(present_absent_data);
  // console.log(filterData);
  let flag = true;

  let presentCount = 0;
  let absentCount = 0;
  let data = parseData?.log?.filter((e) => e.department === classNameOne);
  filterdatas = data;

  // .filter(
  //   (e) =>
  //     e.access_date >= startDatePickerOne && e.access_date <= endDatePickerOne
  // )

  // .forEach((e1) => {
  //   parseData?.log
  //     ?.filter((e) => e.registration_id === e1.registration_id)
  //     .forEach((element) => {
  //       presentCount = presentCount + 1;
  //       // if (flag) {
  //       //   presentCount = presentCount + 1;

  //       //   flag = false;
  //       // } else {
  //       //   flag = true;
  //       // }
  //     });
  //   console.log(e1.user_name, presentCount);
  //   presentCount = 0;
  // });

  // let parseData = JSON.parse(data);

  // let dateObj = new Date();

  // let month = dateObj.getUTCMonth() + 1;
  // let day = dateObj.getUTCDate();
  // let year = dateObj.getUTCFullYear();

  // newdate = year + "-" + month + "-" + day;
  // let studentPresentCount = 0;
  // let studentAbsentCount = 0;
  // let date_arr = [
  //   {
  //     name: "name",
  //     present: 0,
  //     absent: 0,
  //   },
  // ];
  // for (let i = 0; i < parseData?.log.length; i++) {
  //   if (parseData.log[i]?.access_date !== newdate) {
  //     date_arr.push({
  //       name: parseData.log[i]?.user_name,
  //       present: studentPresentCount + 1,
  //       absent: 0,
  //     });
  //   } else {
  //     date_arr.push({
  //       name: parseData.log[i]?.user_name,
  //       present: 0,
  //       absent: studentAbsentCount + 1,
  //     });
  //   }
  // }

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
  console.log("ssfs", filterdatas);
}

// filter method

function filterData() {
  let startDatePickerOne = document.getElementById("start-date-one").value;
  let present_absent_data = document.getElementById("absent-present-data");

  let endDatePickerOne = document.getElementById("end-date-one").value;

  let parseData = JSON.parse(searchData);

  console.log(present_absent_data);
  console.log("filterData");
  let flag = true;
  console.log(filterdatas, startDatePickerOne, endDatePickerOne);
  let presentCount = 0;
  let absentCount = 0;
  let finalFilter = filterdatas.filter(
    (e) =>
      e.access_date >= startDatePickerOne && e.access_date <= endDatePickerOne
  );
  console.log(finalFilter, "dhuktesi");
  present_absent_data.innerHTML = "";
  for (let j = 0; j < finalFilter?.length; j++) {
    let row = ` <tr>

                                <td>${finalFilter[j]?.user_name}</td>
                                <td>${finalFilter[j]?.access_date}</td>
                                <td>${finalFilter[j]?.department}</td>
                                <td>${finalFilter[j]?.registration_id}</td>
                                <td>0</td>
                                <td>0</td>
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
