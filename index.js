var product_data = [
  {
    productId: "12",
    productName: "ProductA",
    productPrice: "1562",
    ProductDateCreated: "2015-07-24T12:58:17.430Z",
    TotalProduct: 294,
  },
  {
    productId: "13",
    productName: "ProductB",
    productPrice: "8545",
    TotalProduct: 294,
    ProductHits: "2015-08-01T00:00:00Z",
  },
  {
    productId: "14",
    productName: "ProductC",
    productPrice: "8654",
    TotalProduct: 78,
    ProductHits: "2015-08-10T00:00:00Z",
  },
  {
    productId: "15",
    productName: "ProductD",
    productPrice: "87456",
    TotalProduct: 878,
    ProductHits: "2015-05-12T00:00:00Z",
  },
];

var startDate = new Date("2015-08-04");
var endDate = new Date("2015-08-12");

var resultProductData = product_data.filter(function (a) {
  var hitDates = a.ProductHits || {};
  // extract all date strings
  hitDates = Object.keys(hitDates);
  // improvement: use some. this is an improment because .map()
  // and .filter() are walking through all elements.
  // .some() stops this process if one item is found that returns true in the callback function and returns true for the whole expression
  hitDateMatchExists = hitDates.some(function (dateStr) {
    var date = new Date(dateStr);
    return date >= startDate && date <= endDate;
  });
  return hitDateMatchExists;
});
console.log(resultProductData);
