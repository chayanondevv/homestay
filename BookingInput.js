// script.js

// ฟังก์ชันที่จะถูกเรียกเมื่อคลิกปุ่ม 'Generate Receipt'
function getNights(checkIn, checkOut) {
  // แปลงค่า date เป็น Date object
  const checkInDate = document.getElementById(checkIn).value;
  const checkOutDate = document.getElementById(checkOut).value;
  let daysDiff;
  if (checkInDate && checkOutDate) {
    daysDiff = calculateDateDifference(checkInDate, checkOutDate);
  }
  return daysDiff;
}
function formatPhoneNumber(phone) {
  // Regex to format the phone number into xxx-xxx-xxxx
  return phone.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1-$2-$3");
}

function submitBooking() {
  // เก็บข้อมูลการจองใน localStorage
  nightRoom1 = getNights("checkInDate1", "checkOutDate1");
  nightRoom2 = getNights("checkInDate2", "checkOutDate2");
  customerPhone = formatPhoneNumber(
    document.getElementById("customerPhone").value
  );

  const bookingData = [
    {
      customerName: document.getElementById("customerName").value,
      customerPhone: customerPhone,
      customerEmail: document.getElementById("customerEmail").value,
      roomType1: document.getElementById("roomType1").value,
      roomType2: document.getElementById("roomType2").value,
      extraBed1: document.getElementById("extraBed1").value,
      extraBed2: document.getElementById("extraBed2").value,
      checkInDate1: document.getElementById("checkInDate1").value,
      checkInDate2: document.getElementById("checkInDate2").value,
      checkOutDate1: document.getElementById("checkOutDate1").value,
      checkOutDate2: document.getElementById("checkOutDate2").value,
      nights1: nightRoom1,
      nights2: nightRoom2,
      deposit: document.getElementById("deposit").value,
      paymentOption: document.getElementById("paymentOption").value,
    },
  ];

  // เก็บข้อมูลการจอง
  localStorage.setItem("bookings", JSON.stringify(bookingData));

  window.location.href = "BookingReport.html";
}
function calculateDateDifference(Date1, Date2) {
  // แปลงค่า date เป็น Date object
  const startDate = new Date(Date1);
  const endDate = new Date(Date2);

  // หาผลต่างระหว่างวันที่ในหน่วยมิลลิวินาที
  const timeDiff = endDate.getTime() - startDate.getTime();

  // คำนวณเป็นจำนวนวันโดยการหาร 1000 * 3600 * 24 (มิลลิวินาทีใน 1 วัน)
  const daysDiff = timeDiff / (1000 * 3600 * 24);

  return daysDiff;
}

function printPage() {
  window.print(); // เรียกหน้าต่างพิมพ์ของเบราว์เซอร์
}

window.onload = function () {
  // ตรวจสอบว่ามีข้อมูลการจองใน localStorage หรือไม่
  const storedBookings = localStorage.getItem("bookings");

  if (storedBookings) {
    // แปลงข้อมูลการจองจาก JSON กลับเป็นอาร์เรย์
    const bookings = JSON.parse(storedBookings);

    // ดึง tbody ของตาราง
    const tbody = document.getElementById("booking-items");

    // เพิ่มข้อมูลจาก storedBookings ลงในตาราง
    bookings.forEach((booking) => {
      const row = document.createElement("tr");

      // สร้างเซลล์ต่าง ๆ
      const cell1 = document.createElement("td");
      cell1.textContent = booking.roomType;

      const cell2 = document.createElement("td");
      cell2.textContent = booking.duration;

      const cell3 = document.createElement("td");
      cell3.textContent = booking.price;

      // เพิ่มเซลล์ลงในแถว
      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3);

      // เพิ่มแถวลงใน tbody
      tbody.appendChild(row);
    });

    // ลบข้อมูลจาก localStorage เมื่อแสดงผลแล้ว
    localStorage.removeItem("bookings");
  }
};
