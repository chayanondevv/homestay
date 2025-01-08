const roomData = [
  {
    roomType: "Standard Room",
    roomDesc: "บ้านเดี่ยว 1 ห้องนอน",
    price: "999",
  },
  {
    roomType: "Superior Room",
    roomDesc: "บ้านเดี่ยว 1 ห้องนอน 1 ห้องรับแขก",
    price: "1299",
  },
];
const extraBed = 300;
const options = { day: "2-digit", month: "short", year: "numeric" };
// Window
window.onload = function () {
  const storedBookings = localStorage.getItem("bookings");
  if (storedBookings) {
    // Convert JSON -> Array
    const bookings = JSON.parse(storedBookings);
    setBookingHeader(bookings[0]);
    setBookingDetail(bookings[0]);
    // Clear localStorage
    localStorage.removeItem("bookings");
  }
};

// Process
function setBookingHeader(bookings) {
  let customerName = "คุณ" + " " + bookings.customerName;
  let bookingByElement = document.querySelector("#bookingBy strong");
  let bookingTelElement = document.querySelector("#bookingTel strong");
  let bookingPaymentElement = document.querySelector("#bookingPayment strong");
  // Set text content
  bookingByElement.innerText = customerName;
  bookingTelElement.innerText = bookings.customerPhone;
  bookingPaymentElement.innerText = bookings.paymentOption;
}
function setBookingDetail(booking) {
  // Total Price
  let totalPrice = 0;

  // เพิ่มข้อมูลจาก storedBookings ลงในตาราง

  // ดึง tbody ของตาราง
  let tbody;
  tbody = document.getElementById("booking-items");

  let row;
  row = document.createElement("tr");

  // Find Room Price
  let priceExtraBed;
  priceExtraBed = booking.extraBed1 * booking.nights1 * extraBed;

  let filteredRooms;
  filteredRooms = roomData.filter(
    (room) => room.roomType === booking.roomType1
  );

  let priceRoom;
  priceRoom =
    parseFloat(filteredRooms[0].price) * booking.nights1 + priceExtraBed;

  let descRoom;
  descRoom = filteredRooms[0].roomDesc;

  totalPrice = totalPrice + priceRoom + priceExtraBed;

  // Set Cell
  // Room Type
  let roomTypeCell;
  roomTypeCell = document.createElement("td");
  roomTypeCell.textContent = descRoom;
  roomTypeCell.style.textAlign = "left";

  // Check-In
  let checkInCell;
  let checkInDate1 = new Date(booking.checkInDate1);
  let formattedcheckInDate1 = checkInDate1.toLocaleDateString("en-GB", options);

  checkInCell = document.createElement("td");
  checkInCell.textContent = formattedcheckInDate1;

  // Check-Out
  let checkOutCell;
  let checkOutDate1 = new Date(booking.checkOutDate1);
  let formattedcheckOutDate1 = checkOutDate1.toLocaleDateString(
    "en-GB",
    options
  );

  checkOutCell = document.createElement("td");
  checkOutCell.textContent = formattedcheckOutDate1;

  // Extra Beds
  let extraBedCell;
  extraBedCell = document.createElement("td");
  extraBedCell.textContent = booking.extraBed1;
  // Nights
  let nightsCell;
  nightsCell = document.createElement("td");
  nightsCell.textContent = booking.nights1;
  // Price
  let priceCell;
  priceCell = document.createElement("td");
  priceCell.style.textAlign = "right";
  priceCell.textContent = new Intl.NumberFormat("en-US").format(priceRoom);

  // Add Cell To Row
  row.appendChild(roomTypeCell);
  row.appendChild(extraBedCell);
  row.appendChild(checkInCell);
  row.appendChild(checkOutCell);
  row.appendChild(nightsCell);
  row.appendChild(priceCell);

  // Add Row To Table
  tbody.appendChild(row);

  // Room 2
  if (booking.roomType2 !== "") {
    let row;
    row = document.createElement("tr");

    let priceExtraBed;
    priceExtraBed = booking.extraBed1 * booking.nights1 * extraBed;

    // Find Room Price
    let filteredRooms;
    filteredRooms = roomData.filter(
      (room) => room.roomType === booking.roomType2
    );

    let priceRoom;
    priceRoom =
      parseFloat(filteredRooms[0].price) * booking.nights2 + priceExtraBed;

    let descRoom;
    descRoom = filteredRooms[0].roomDesc;

    totalPrice = totalPrice + priceRoom + priceExtraBed;

    // Set Cell
    // Room Type
    let roomTypeCell;
    roomTypeCell = document.createElement("td");
    roomTypeCell.textContent = descRoom;
    roomTypeCell.style.textAlign = "left";

    // Check-In
    let checkInCell;
    let checkInDate2 = new Date(booking.checkInDate2);
    let formattedcheckInDate2 = checkInDate2.toLocaleDateString(
      "en-GB",
      options
    );
    checkInCell = document.createElement("td");
    checkInCell.textContent = formattedcheckInDate2;

    // Check-Out
    let checkOutCell;
    let checkOutDate2 = new Date(booking.checkOutDate2);
    let formattedcheckOutDate2 = checkOutDate2.toLocaleDateString(
      "en-GB",
      options
    );
    checkOutCell = document.createElement("td");
    checkOutCell.textContent = formattedcheckOutDate2;

    // Extra Beds
    let extraBedCell;
    extraBedCell = document.createElement("td");
    extraBedCell.textContent = booking.extraBed2;
    // Nights
    let nightsCell;
    nightsCell = document.createElement("td");
    nightsCell.textContent = booking.nights2;
    // Price
    let priceCell;
    priceCell = document.createElement("td");
    priceCell.style.textAlign = "right";
    priceCell.textContent = new Intl.NumberFormat("en-US").format(priceRoom);

    // Add Cell To Row
    row.appendChild(roomTypeCell);
    row.appendChild(extraBedCell);
    row.appendChild(checkInCell);
    row.appendChild(checkOutCell);
    row.appendChild(nightsCell);
    row.appendChild(priceCell);

    // Add Row To Table
    tbody.appendChild(row);
  }

  let totalPriceByElement = document.querySelector("#total-price");
  let depositpriceByElement = document.querySelector("#deposit");
  let overduepriceByElement = document.querySelector("#overdue");
  // Set text content
  totalPriceByElement.innerText = new Intl.NumberFormat("en-US").format(
    totalPrice
  );
  depositpriceByElement.innerText = new Intl.NumberFormat("en-US").format(
    booking.deposit
  );
  overduepriceByElement.innerText = new Intl.NumberFormat("en-US").format(
    parseFloat(totalPrice) - parseFloat(booking.deposit)
  );

  //   document.getElementById('total-price').value = "11111";
}

// Button
function printPage() {
  window.print(); // เรียกหน้าต่างพิมพ์ของเบราว์เซอร์
}
