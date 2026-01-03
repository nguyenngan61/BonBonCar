// 1. Hàm mở popup chung (Dùng cho tất cả)
function openPopup(id) {
  var el = document.getElementById(id);
  if (el) el.style.display = "flex";
}

// 2. Hàm đóng popup chung
function closePopup(id) {
  var el = document.getElementById(id);
  if (el) {
    el.style.display = "none";
    // Nếu là modal ảnh thì ẩn kiểu block
    if (id === "imageModal") el.style.display = "none";
  }
}

// 3. Đóng khi click ra vùng đen
window.onclick = function (event) {
  if (
    event.target.classList.contains("ins-modal-overlay") ||
    event.target.id === "imageModal"
  ) {
    event.target.style.display = "none";
  }
};

// 4. Xử lý Ảnh Gallery
var galleryImages = document.querySelectorAll(".img-trigger");
var modalImg = document.getElementById("img01");
var currentIndexEl = document.getElementById("current-index");
var totalIndexEl = document.getElementById("total-img"); // Thẻ tổng số ảnh
var imageModal = document.getElementById("imageModal");
var thumbnailRow = document.getElementById("thumbnailRow");
var imagesSrc = [];
var currentIndex = 0;

if (galleryImages.length > 0) {
  // Cập nhật tổng số ảnh
  if (totalIndexEl) totalIndexEl.innerText = galleryImages.length;

  // Xóa thumbnail cũ (nếu có) để tránh bị nhân đôi khi reload
  if (thumbnailRow) thumbnailRow.innerHTML = "";

  galleryImages.forEach(function (img, index) {
    imagesSrc.push(img.src);

    // A. Sự kiện click mở ảnh từ lưới
    img.onclick = function () {
      if (imageModal) {
        imageModal.style.display = "block";
        currentIndex = index;
        updateImageDisplay();
      }
    };

    // B. TỰ ĐỘNG TẠO THUMBNAIL TRONG MODAL
    if (thumbnailRow) {
      var thumb = document.createElement("img");
      thumb.src = img.src;
      thumb.className = "demo"; // Class để CSS nhận diện
      thumb.onclick = function () {
        // Click vào thumbnail nhảy tới ảnh đó
        currentIndex = index;
        updateImageDisplay();
      };
      thumbnailRow.appendChild(thumb);
    }
  });

  // Tạo thumbnail nếu cần...
  var thumbContainer = document.getElementById("modal-thumbs");
  if (thumbContainer && imagesSrc.length > 0) {
    thumbContainer.innerHTML = ""; // Xóa cũ
    imagesSrc.forEach(function (src, i) {
      var t = document.createElement("img");
      t.src = src;
      t.className = "thumb-img";
      t.onclick = function () {
        currentIndex = i;
        if (modalImg) modalImg.src = imagesSrc[currentIndex];
        if (currentIndexEl) currentIndexEl.innerText = currentIndex + 1;
      };
      thumbContainer.appendChild(t);
    });
  }
}
function closeImageModal() {
  if (imageModal) imageModal.style.display = "none";
}
function changeSlide(n) {
  currentIndex += n;

  // Xử lý vòng lặp (Đang ở cuối bấm Next về đầu, đang ở đầu bấm Prev về cuối)
  if (currentIndex >= imagesSrc.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = imagesSrc.length - 1;

  // Quan trọng: Gọi hàm cập nhật hiển thị sau khi đổi chỉ số
  updateImageDisplay();
}
function updateImageDisplay() {
  // A. Cập nhật ảnh to
  if (modalImg) modalImg.src = imagesSrc[currentIndex];

  // B. Cập nhật số trang (Ví dụ: 3 / 7)
  if (currentIndexEl) currentIndexEl.innerText = currentIndex + 1;

  // C. Cập nhật Thumbnail (Đồng bộ ảnh nhỏ)
  var allThumbs = document.querySelectorAll(".demo");

  // Bước 1: Xóa class active của TẤT CẢ ảnh nhỏ
  allThumbs.forEach(function (t) {
    t.classList.remove("active");
  });

  // Bước 2: Thêm class active cho ảnh nhỏ HIỆN TẠI
  if (allThumbs[currentIndex]) {
    allThumbs[currentIndex].classList.add("active");

    // [MỚI] Tự động cuộn thanh thumbnail đến ảnh đang chọn
    allThumbs[currentIndex].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }
}
// 5. Nút Like & Share
var btnLike = document.getElementById("btn-like");
if (btnLike)
  btnLike.onclick = function () {
    this.classList.toggle("active");
  };

var btnShare = document.getElementById("btn-share");
var copyPopup = document.getElementById("copyPopup");
if (btnShare && copyPopup) {
  btnShare.onclick = function () {
    copyPopup.style.display = "flex";
    setTimeout(function () {
      copyPopup.style.display = "none";
    }, 2000);
  };
}

// 6. Gán sự kiện cho các nút "Xem thêm" (Bảo hiểm) - Nếu chưa gán trực tiếp
var btnIns1 = document.getElementById("btn-ins-1");
if (btnIns1)
  btnIns1.onclick = function () {
    openPopup("insModal1");
  };

var btnIns2 = document.getElementById("btn-ins-2");
if (btnIns2)
  btnIns2.onclick = function () {
    openPopup("insModal2");
  };
/* --- LOGIC XEM THÊM / RÚT GỌN REVIEW --- */
const btnToggleReviews = document.getElementById("btn-toggle-reviews");
const extraReviews = document.querySelectorAll(".extra-review");
let isExpanded = false; // Trạng thái ban đầu là chưa mở rộng

if (btnToggleReviews) {
  btnToggleReviews.addEventListener("click", function () {
    if (!isExpanded) {
      // HÀNH ĐỘNG 1: MỞ RA
      extraReviews.forEach((item) => {
        item.style.display = "flex"; // Hiện các review ẩn
      });
      // Đổi nội dung nút
      btnToggleReviews.innerHTML =
        'Rút gọn <i class="fa-solid fa-chevron-up"></i>';
      isExpanded = true;
    } else {
      // HÀNH ĐỘNG 2: THU VÀO
      extraReviews.forEach((item) => {
        item.style.display = "none"; // Ẩn đi
      });
      // Đổi nội dung nút về ban đầu
      btnToggleReviews.innerHTML =
        'Xem tất cả (10) <i class="fa-solid fa-chevron-down"></i>';
      // Cuộn nhẹ lại lên đầu phần review để người dùng không bị hẫng
      document
        .querySelector(".reviews-section")
        .scrollIntoView({ behavior: "smooth" });
      isExpanded = false;
    }
  });
}
/* --- XỬ LÝ SLIDER XE TƯƠNG TỰ (ĐÃ FIX LỖI) --- */
// 1. Lấy đúng thẻ bao quanh (Container)
const carSlider = document.querySelector(".similar-cars-slider"); // Dùng class cho chắc
const btnPrevCar = document.getElementById("btn-prev-car");
const btnNextCar = document.getElementById("btn-next-car");

if (carSlider && btnPrevCar && btnNextCar) {
  // Kích thước trượt = Chiều rộng card (320px) + Gap (25px) * Số lượng muốn trượt (ví dụ 3 xe)
  // Hoặc trượt một khoảng cố định lớn để qua trang mới
  const scrollAmount = 800;

  // Bấm nút PHẢI -> Trượt tới
  btnNextCar.onclick = function () {
    carSlider.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  // Bấm nút TRÁI -> Trượt lùi
  btnPrevCar.onclick = function () {
    carSlider.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };
} else {
  console.log(
    "Không tìm thấy Slider hoặc Nút bấm! Kiểm tra lại ID trong HTML."
  );
}
/* --- XỬ LÝ CALENDAR POPUP --- */
function openCalendarPopup() {
  document.getElementById("calendarModal").style.display = "flex";
}

function closeCalendarPopup() {
  document.getElementById("calendarModal").style.display = "none";
}

// Đóng khi click ra ngoài vùng modal
window.onclick = function (event) {
  // Danh sách ID của TẤT CẢ các popup trong trang
  const modals = [
    "calendarModal", // Lịch
    "deliveryModal", // Map giao xe
    "couponModal", // DS Mã giảm giá
    "couponDetailModal", // Chi tiết mã
    "rentalInsuranceModal", // Bảo hiểm thuê xe
    "personalInsuranceModal", // Bảo hiểm người
  ];

  // Duyệt qua từng modal, nếu click trúng vùng nền đen (overlay) thì đóng nó
  modals.forEach(function (id) {
    const modal = document.getElementById(id);
    if (modal && event.target == modal) {
      modal.style.display = "none";
    }
  });
};
// --- LOGIC CHỌN ĐỊA ĐIỂM ---

// 1. Mở Popup
function openDeliveryPopup() {
  document.getElementById("deliveryModal").style.display = "flex";
}

// 2. Đóng Popup
function closeDeliveryPopup() {
  document.getElementById("deliveryModal").style.display = "none";
}

// 3. Chọn "Tự đến lấy" -> Reset giao diện
function selectSelfPickup() {
  // Kích hoạt ô Tự lấy
  document.getElementById("opt-self").classList.add("selected");

  // Hủy kích hoạt ô Giao tận nơi
  document.getElementById("opt-delivery").classList.remove("selected");
}

// 4. Hàm giả lập tính phí (trong Modal)
function calculateFeeFake() {
  const input = document.getElementById("addressInput").value;
  // Demo: Cứ nhập dài hơn 5 chữ là hiện giá
  if (input.length > 5) {
    document.getElementById("distanceVal").innerText = "5.2 km";
    document.getElementById("feeVal").innerText = "104.000đ";
  } else {
    document.getElementById("distanceVal").innerText = "0 km";
    document.getElementById("feeVal").innerText = "0đ";
  }
  function resetDeliveryBill() {
    currentDeliveryFee = 0;
    const delVal = document.getElementById("bill-delivery-val");
    delVal.innerText = "Miễn phí";
    delVal.className = "b-value text-green";
    calculateTotalBill();
  }

  // --- CHẠY LẦN ĐẦU KHI LOAD TRANG ---
  document.addEventListener("DOMContentLoaded", () => {
    calculateTotalBill();
  });
}

// 5. Xác nhận Giao xe tận nơi
function confirmDelivery() {
  const address = document.getElementById("addressInput").value;
  const feeText = document.getElementById("feeVal").innerText;

  if (!address) {
    alert("Vui lòng nhập địa chỉ!");
    return;
  }

  // A. Tắt ô Tự lấy (CSS sẽ chuyển nó về màu xám)
  document.getElementById("opt-self").classList.remove("selected");

  // B. Bật ô Giao tận nơi (CSS sẽ chuyển nó về màu đẹp)
  const optDel = document.getElementById("opt-delivery");
  optDel.classList.add("selected");

  // C. Cập nhật dữ liệu vào ô Giao tận nơi
  // 1. Tag giá tiền (Chuyển display block để hiện ra)
  const feeTag = document.getElementById("del-fee-tag");
  feeTag.style.display = "inline-block";
  feeTag.innerText = feeText; // "104.000đ"

  // 2. Địa chỉ
  const addrDisplay = document.getElementById("del-user-address");
  addrDisplay.style.display = "block";
  addrDisplay.innerText = address;

  // D. Đóng Modal
  closeDeliveryPopup();
  function updateBillFromDelivery(feeStr) {
    // feeStr là chuỗi "104.000đ" hoặc "0đ"

    // 1. Lưu phí giao xe mới
    currentDeliveryFee = parseMoney(feeStr);

    // 2. Cập nhật hiển thị dòng Phí giao xe
    const delVal = document.getElementById("bill-delivery-val");

    if (currentDeliveryFee > 0) {
      delVal.innerText = feeStr; // "104.000đ"
      delVal.className = "b-value text-red"; // Chữ đỏ
    } else {
      delVal.innerText = "Miễn phí";
      delVal.className = "b-value text-green"; // Chữ xanh
    }

    // 3. Tính lại tổng
    calculateTotalBill();
  }
}

// Đóng khi click ra ngoài
window.onclick = function (event) {
  const modal = document.getElementById("deliveryModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
  // (Giữ lại logic đóng các modal khác nếu có)
  const calModal = document.getElementById("calendarModal");
  if (event.target == calModal) calModal.style.display = "none";
};
/* --- HÀM CẬP NHẬT BẢN ĐỒ & TÍNH PHÍ GIAO XE --- */
function updateMapPreview() {
  // 1. Lấy giá trị ô nhập & Các thẻ hiển thị
  var address = document.getElementById("addressInput").value;
  var distEl = document.getElementById("distanceVal");
  var feeEl = document.getElementById("feeVal");

  // 2. Nếu ô trống -> Reset về "..."
  if (address.trim() === "") {
    distEl.innerText = "...";
    feeEl.innerText = "...";
    return; // Dừng lại, không load map
  }

  // 3. Cập nhật iframe Bản đồ
  var mapUrl =
    "https://maps.google.com/maps?q=Hồ" +
    encodeURIComponent(address) +
    "&t=&z=15&ie=UTF8&iwloc=&output=embed";
  document.getElementById("deliveryMap").src = mapUrl;

  // 4. GIẢ LẬP TÍNH PHÍ (Vì chưa có API thực tế)
  // Random khoảng cách từ 2km đến 15km để demo
  var randomDist = Math.floor(Math.random() * 14) + 2;

  // Tính tiền: 20.000đ / 1 km
  var totalFee = randomDist * 20000;

  // 5. Hiển thị ra màn hình (Format tiền tệ đẹp)
  distEl.innerText = randomDist + " km";

  // toLocaleString('vi-VN') giúp thêm dấu chấm (120.000)
  feeEl.innerText = totalFee.toLocaleString("vi-VN") + "đ";
}
/* --- DỮ LIỆU CHI TIẾT MÃ (Giả lập DB) --- */
const couponData = {
  BONNGAY: {
    amountText: "Ưu đãi 500,000đ",
    date: "Áp dụng từ 29/11/2025 đến 02/12/2025",
    conditions: [
      "Có giá trị đến hết ngày 02/12/2025.",
      "Áp dụng cho chuyến đi đầu tiên trên BONBONCAR.",
      "Không áp dụng chung với các CTKM khác.",
      "Chỉ áp dụng đối với dịch vụ Thuê Xe Tự Lái Theo Ngày.",
    ],
    active: true,
  },
  TULAI: {
    amountText: "Ưu đãi 8% (tối đa 80,000đ)",
    date: "Áp dụng từ 01/12/2025 đến 31/12/2025",
    conditions: [
      "Có giá trị đến hết ngày 31/12/2025.",
      "Áp dụng cho mọi khách hàng.",
      "Chỉ áp dụng đối với dịch vụ Thuê Xe Tự Lái.",
    ],
    active: true,
  },
};

/* --- CÁC HÀM XỬ LÝ --- */
/* --- 1. VIẾT HÀM ĐÓNG CHO RIÊNG THƯ VIỆN ẢNH CỦA BẠN --- */
function closeImageModal() {
  var modal = document.getElementById("imageModal");
  if (modal) {
    modal.style.display = "none";
  }
}

/* --- 2. CẬP NHẬT WINDOW.ONCLICK (QUẢN LÝ TẤT CẢ POPUP) --- */
window.onclick = function (event) {
  // Danh sách TẤT CẢ ID popup (Cập nhật 'imageModal' vào đây)
  const modals = [
    "calendarModal", // Lịch
    "deliveryModal", // Map
    "couponModal", // DS Mã
    "couponDetailModal", // Chi tiết mã
    "insModal1", // Bảo hiểm 1
    "insModal2", // Bảo hiểm 2
    "imageModal", // <--- ĐÂY LÀ ID ĐÚNG TRONG CODE CỦA BẠN
  ];

  modals.forEach(function (id) {
    const modal = document.getElementById(id);
    // Nếu modal đang mở VÀ click trúng vùng nền đen thì đóng
    if (modal && event.target == modal) {
      modal.style.display = "none";
    }
  });
};
// 1. Mở/Đóng Popup Danh sách
function openCouponPopup() {
  document.getElementById("couponModal").style.display = "flex";
}
function closeCouponPopup() {
  document.getElementById("couponModal").style.display = "none";
}

// 2. Áp dụng mã (Cập nhật giao diện bên ngoài)
function applyCoupon(code, value) {
  // Cập nhật text bên ngoài
  document.getElementById("selectedCouponCode").innerText = "Mã " + code;
  document.getElementById("selectedCouponValue").innerText =
    "-" + value.toLocaleString("vi-VN");

  // Đóng popup
  closeCouponPopup();
  closeDetail(); // Đóng luôn cả detail nếu đang mở
}

// 3. Mở Popup Chi tiết (Render nội dung động)
function openDetail(code, event) {
  if (event) event.preventDefault(); // Chặn thẻ a load lại trang

  const data = couponData[code];
  if (!data) return; // Không có dữ liệu thì thôi

  // Tạo HTML động
  let html = `
        <div class="detail-icon"><i class="fa-solid fa-certificate"></i></div>
        <div class="detail-code">${code}</div>
        <div class="detail-date">${data.date}</div>
        <div class="detail-amount">${data.amountText}</div>
        <ul class="detail-list">
            ${data.conditions.map((cond) => `<li>• ${cond}</li>`).join("")}
        </ul>
    `;

  // Thêm nút áp dụng tùy trạng thái active
  if (data.active) {
    // Nếu mã BONNGAY giá trị 500k, TULAI 80k (Hardcode demo)
    let val = code === "BONNGAY" ? 500000 : 80000;
    html += `<button class="btn-detail-apply" onclick="applyCoupon('${code}', ${val})">Áp dụng</button>`;
  } else {
    html += `<button class="btn-detail-apply" style="background:#555; cursor:not-allowed;">Chưa đủ điều kiện</button>`;
  }

  document.getElementById("detailContent").innerHTML = html;
  document.getElementById("couponDetailModal").style.display = "flex";
}

function closeDetail() {
  document.getElementById("couponDetailModal").style.display = "none";
}

// Click ngoài thì đóng popup
window.onclick = function (event) {
  // ... (Giữ code cũ của delivery/calendar) ...

  const cpModal = document.getElementById("couponModal");
  if (event.target == cpModal) cpModal.style.display = "none";

  const detailModal = document.getElementById("couponDetailModal");
  if (event.target == detailModal) detailModal.style.display = "none";
};
/* --- CÁC HÀM MỞ/ĐÓNG POPUP BẢO HIỂM MỚI --- */
// Hàm mở (Dùng chung cho cả 2 modal)
function openInsModal(modalId) {
  document.getElementById(modalId).style.display = "flex";
}

// Hàm đóng (Đã có trong HTML onclick="closeInsModal(...)")
function closeInsModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

/* --- CẬP NHẬT WINDOW.ONCLICK (QUẢN LÝ TẤT CẢ POPUP) --- */
window.onclick = function (event) {
  // Danh sách TẤT CẢ ID popup trong trang
  const modals = [
    "calendarModal", // Lịch
    "deliveryModal", // Map
    "couponModal", // DS Mã
    "couponDetailModal", // Chi tiết mã
    "insModal1", // Bảo hiểm thuê xe (MỚI)
    "insModal2", // Bảo hiểm người (MỚI)
  ];

  modals.forEach(function (id) {
    const modal = document.getElementById(id);
    // Nếu click trúng vùng đen (overlay) thì đóng
    if (modal && event.target == modal) {
      modal.style.display = "none";
    }
  });
};

/* =========================================================
   LOGIC TỔNG HỢP: LỊCH - GIAO XE - TÍNH TIỀN (ĐÃ FIX LỖI)
   ========================================================= */

// --- 1. KHAI BÁO BIẾN TOÀN CỤC ---
const PRICE_LEVEL_1 = 585000; // 4h
const PRICE_LEVEL_2 = PRICE_LEVEL_1 * 1.1; // 8h
const PRICE_LEVEL_3 = PRICE_LEVEL_2 * 1.1; // 12h

const VAT = 55000;
const DEPOSIT = 3000000;
const HOLD_FEE = 100000;
const INS1_PRICE = 45000;
const INS2_PRICE = 40000;

// Các biến động (Thay đổi theo lựa chọn của user)
let currentRentPrice = PRICE_LEVEL_1;
let currentDeliveryFee = 0;
let currentCouponVal = 0; // Mặc định là 0 (Chưa áp mã)
let currentCouponCode = ""; // Mặc định trống

let startDate = null;
let endDate = null;
let currentYear = 2026;
let currentMonth = 0;

document.addEventListener("DOMContentLoaded", () => {
  populateTimeOptions();
  renderCalendar();
  // Mặc định chọn mã BONNGAY khi vào trang (nếu muốn)
  applyCoupon("BONNGAY", 500000);
});

// --- 2. LOGIC TÍNH TỔNG BILL ---
function calculateTotalBill() {
  // Lấy trạng thái checkbox
  const chk1 = document.getElementById("chk-ins1");
  const chk2 = document.getElementById("chk-ins2");

  const isIns1 = chk1 ? chk1.checked : false;
  const isIns2 = chk2 ? chk2.checked : false;

  // Cập nhật text hiển thị giá bảo hiểm (0đ hoặc giá thật)
  if (document.getElementById("val-ins1"))
    document.getElementById("val-ins1").innerText = isIns1
      ? formatMoney(INS1_PRICE)
      : "0";

  if (document.getElementById("val-ins2"))
    document.getElementById("val-ins2").innerText = isIns2
      ? formatMoney(INS2_PRICE)
      : "0";

  // CỘNG TỔNG
  let total = currentRentPrice + currentDeliveryFee + VAT + DEPOSIT + HOLD_FEE;

  if (isIns1) total += INS1_PRICE;
  if (isIns2) total += INS2_PRICE;

  // TRỪ MÃ GIẢM GIÁ (Đảm bảo không âm tiền)
  total -= currentCouponVal;
  if (total < 0) total = 0;

  // HIỂN THỊ
  if (document.getElementById("total-final"))
    document.getElementById("total-final").innerText = formatMoney(total);
}

// --- 3. FIX LỖI BẢO HIỂM (QUAN TRỌNG) ---
// Thêm tham số 'event' để kiểm tra xem user click vào đâu
function toggleInsurance(event, id) {
  // Nếu user click trực tiếp vào ô vuông checkbox -> Dừng lại, để mặc định trình duyệt xử lý
  if (event.target.type === "checkbox") {
    calculateTotalBill(); // Chỉ cần tính lại tiền
    return;
  }

  // Nếu user click vào dòng chữ -> Tự tay đảo trạng thái checkbox
  const chk = document.getElementById("chk-" + id);
  if (chk) {
    chk.checked = !chk.checked;
    calculateTotalBill();
  }
}

// --- 4. FIX LỖI MÃ GIẢM GIÁ (MỚI) ---
// Hàm này sẽ được gọi từ Popup Mã giảm giá
function applyCoupon(code, value) {
  // 1. Lưu giá trị vào biến toàn cục
  currentCouponCode = code;
  currentCouponVal = value;

  // 2. Cập nhật giao diện Bảng giá (Bill Widget)
  const uiCode = document.getElementById("selectedCouponCode");
  const uiVal = document.getElementById("bill-coupon-val");

  if (uiCode) uiCode.innerText = "Mã " + code;
  if (uiVal) uiVal.innerText = "-" + formatMoney(value);

  // 3. Tính lại tổng tiền
  calculateTotalBill();

  // 4. Đóng popup mã giảm giá (Nếu có function đó)
  closeCouponPopup();
}

// --- 5. CÁC HÀM CŨ (CONFIRM, RENDER...) GIỮ NGUYÊN ---
// (Chỉ cần đảm bảo hàm confirmBooking cập nhật currentRentPrice xong gọi calculateTotalBill là được)

function confirmBooking() {
  if (!startDate || !endDate) {
    alert("Vui lòng chọn ngày!");
    return;
  }
  const s = document.getElementById("time-start").value;
  const e = document.getElementById("time-end").value;

  const info = calculateBookingInfo(s, e);
  currentRentPrice = info.totalPrice; // Cập nhật giá thuê

  // Update Widget trên
  const old = info.totalPrice * 1.2;
  document.getElementById("widget-start-date").innerText =
    formatDate(startDate);
  document.getElementById("widget-start-time").innerText = s;
  document.getElementById("widget-end-date").innerText = formatDate(endDate);
  document.getElementById("widget-end-time").innerText = e;
  document.getElementById("widget-final-price").innerText = formatCurrency(
    info.totalPrice
  );
  document.getElementById("widget-original-price").innerText =
    formatCurrency(old);
  document.getElementById(
    "widget-duration"
  ).innerText = `- ${info.durationLabel}`;

  // Update Bảng giá dưới
  document.getElementById("bill-rent-price").innerText =
    formatMoney(currentRentPrice);
  document.getElementById(
    "bill-rent-label"
  ).innerText = `Giá thuê ${info.durationLabel}`;

  calculateTotalBill(); // Tính lại tiền
  toggleCalendar(false);
}

function confirmDelivery() {
  const addr = document.getElementById("addressInput").value;
  const feeText = document.getElementById("feeVal").innerText;
  if (!addr) {
    alert("Nhập địa chỉ!");
    return;
  }

  document.getElementById("opt-self").classList.remove("selected");
  document.getElementById("opt-delivery").classList.add("selected");

  document.getElementById("del-fee-tag").innerText = feeText;
  document.getElementById("del-fee-tag").style.display = "inline-block";

  document.getElementById("del-user-address").innerText = addr;
  document.getElementById("del-user-address").style.display = "block";

  currentDeliveryFee = parseMoney(feeText); // Cập nhật phí ship

  const uiDel = document.getElementById("bill-delivery-val");
  uiDel.innerText = feeText;
  uiDel.className = "b-value text-red";

  calculateTotalBill(); // Tính lại tiền
  closeDeliveryPopup();
}

function selectSelfPickup() {
  document.getElementById("opt-self").classList.add("selected");
  document.getElementById("opt-delivery").classList.remove("selected");
  currentDeliveryFee = 0;

  const uiDel = document.getElementById("bill-delivery-val");
  uiDel.innerText = "Miễn phí";
  uiDel.className = "b-value text-green";

  calculateTotalBill();
}

// --- UTILS ---
function populateTimeOptions() {
  /* Giữ nguyên */ const s = document.getElementById("time-start");
  const e = document.getElementById("time-end");
  if (!s) return;
  s.innerHTML = "";
  e.innerHTML = "";
  let h = "";
  for (let i = 7; i <= 20; i++) {
    let v = (i < 10 ? "0" + i : i) + ":00";
    let d = (i < 10 ? "0" + i : i) + " : 00";
    h += `<option value="${v}">${d}</option>`;
  }
  s.innerHTML = h;
  e.innerHTML = h;
  s.value = "07:00";
  e.value = "20:00";
}
function calculateBookingInfo(s, e) {
  /* Giữ nguyên logic tính giá thuê */ const sd = new Date(startDate);
  const [sh, sm] = s.split(":").map(Number);
  sd.setHours(sh, sm, 0, 0);
  const ed = new Date(endDate);
  const [eh, em] = e.split(":").map(Number);
  ed.setHours(eh, em, 0, 0);
  const ms = ed - sd;
  if (ms <= 0) return { totalPrice: PRICE_LEVEL_1, durationLabel: "4 giờ" };
  const th = ms / 3600000;
  const td = Math.ceil(th / 24);
  let p = 0,
    l = "";
  if (th <= 4) {
    p = PRICE_LEVEL_1;
    l = "4 giờ";
  } else if (th <= 8) {
    p = PRICE_LEVEL_2;
    l = "8 giờ";
  } else if (th <= 12) {
    p = PRICE_LEVEL_3;
    l = "12 giờ";
  } else {
    p = td * PRICE_LEVEL_3;
    l = `${td} ngày`;
  }
  return { totalPrice: Math.round(p), durationLabel: l };
}
function formatMoney(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function parseMoney(s) {
  return parseInt(s.replace(/[^\d]/g, "")) || 0;
}
function formatCurrency(n) {
  return Math.round(n / 1000) + "k";
}
function formatDate(d) {
  let dd = d.getDate();
  let mm = d.getMonth() + 1;
  let yy = d.getFullYear();
  return `${dd < 10 ? "0" + dd : dd}/${mm < 10 ? "0" + mm : mm}/${yy}`;
}
function isSameDay(d1, d2) {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
}
function toggleCalendar(s) {
  const m = document.getElementById("calendarModal");
  if (s) m.classList.add("active");
  else m.classList.remove("active");
}
function renderCalendar() {
  renderMonth(currentYear, currentMonth, "month-left", "days-left");
  let nm = currentMonth + 1;
  let ny = currentYear;
  if (nm > 11) {
    nm = 0;
    ny++;
  }
  renderMonth(ny, nm, "month-right", "days-right");
}
function renderMonth(y, m, tid, gid) {
  const mn = [
    "Tháng 01",
    "Tháng 02",
    "Tháng 03",
    "Tháng 04",
    "Tháng 05",
    "Tháng 06",
    "Tháng 07",
    "Tháng 08",
    "Tháng 09",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  document.querySelector(`#${tid} .month-title`).innerText = `${mn[m]}/${y}`;
  const g = document.getElementById(gid);
  g.innerHTML = "";
  const fd = new Date(y, m, 1).getDay();
  const dim = new Date(y, m + 1, 0).getDate();
  for (let i = 0; i < fd; i++)
    g.innerHTML += `<div class="day-cell empty"></div>`;
  for (let i = 1; i <= dim; i++) {
    let d = new Date(y, m, i);
    let c = "day-cell";
    if (i === 21 || i === 28 || i === 30) c += " partially-booked";
    if (i === 14 || i === 15) c += " holiday";
    if (startDate && isSameDay(d, startDate)) c += " selected range-start";
    else if (endDate && isSameDay(d, endDate)) c += " selected range-end";
    else if (startDate && endDate && d > startDate && d < endDate)
      c += " in-range";
    let div = document.createElement("div");
    div.className = c;
    div.innerText = i;
    div.onclick = () => selectDate(d);
    g.appendChild(div);
  }
}
function selectDate(d) {
  if (!startDate || (startDate && endDate)) {
    startDate = d;
    endDate = null;
  } else if (d < startDate) {
    startDate = d;
  } else {
    endDate = d;
  }
  renderCalendar();
  updatePreviewInModal();
}
function updatePreviewInModal() {
  const s = document.getElementById("time-start").value;
  const e = document.getElementById("time-end").value;
  if (startDate)
    document.getElementById("preview-start").innerText = `${formatDate(
      startDate
    )} - ${s}`;
  if (endDate)
    document.getElementById("preview-end").innerText = `${formatDate(
      endDate
    )} - ${e}`;
}
function changeMonth(s) {
  currentMonth += s;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  } else if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
}
function calculateTotal() {
  updatePreviewInModal();
}
// Hàm đóng mở popup coupon + Delivery
function openDeliveryPopup() {
  document.getElementById("deliveryModal").style.display = "flex";
}
function closeDeliveryPopup() {
  document.getElementById("deliveryModal").style.display = "none";
}
function openCouponPopup() {
  document.getElementById("couponModal").style.display = "flex";
}
function closeCouponPopup() {
  document.getElementById("couponModal").style.display = "none";
}
function calculateFeeFake() {
  const v = document.getElementById("addressInput").value;
  if (v.length > 5) {
    document.getElementById("distanceVal").innerText = "5.2 km";
    document.getElementById("feeVal").innerText = "104.000đ";
  } else {
    document.getElementById("distanceVal").innerText = "0 km";
    document.getElementById("feeVal").innerText = "0đ";
  }
}
/* =========================================================
   LƯU DỮ LIỆU ĐỂ CHUYỂN SANG TRANG ĐẶT XE
   ========================================================= */
/* Cập nhật trong file JS của chi_tiet_xe */
function goToBooking() {
  // 1. Kiểm tra ngày
  if (!startDate || !endDate) {
    alert("Vui lòng chọn ngày trước!");
    return;
  }

  // 2. Lấy thông tin thời gian
  const sTime = document.getElementById("widget-start-time").innerText;
  const sDate = document.getElementById("widget-start-date").innerText;
  const eTime = document.getElementById("widget-end-time").innerText;
  const eDate = document.getElementById("widget-end-date").innerText;

  // 3. Xử lý địa chỉ
  let finalAddress = "Phường Linh Chiểu, Quận Thủ Đức";
  // Kiểm tra class selected ở ô Giao tận nơi
  const deliveryOption = document.getElementById("opt-delivery");
  if (deliveryOption && deliveryOption.classList.contains("selected")) {
    finalAddress = document.getElementById("del-user-address").innerText;
  }

  // 4. TÍNH TOÁN CHI TIẾT TIỀN (Lấy từ biến toàn cục chúng ta đã có)
  // Lưu ý: Biến currentRentPrice, currentDeliveryFee... đã được cập nhật khi bạn chọn lịch/giao xe

  // Tính tổng bảo hiểm (nếu có tick)
  let insTotal = 0;
  if (document.getElementById("chk-ins1").checked) insTotal += INS1_PRICE;
  if (document.getElementById("chk-ins2").checked) insTotal += INS2_PRICE;

  // Lấy tổng tiền cuối cùng từ giao diện cho chắc ăn
  const totalString = document.getElementById("total-final").innerText;
  const totalMoney = parseInt(totalString.replace(/[^\d]/g, "")) || 0;

  // 5. ĐÓNG GÓI DỮ LIỆU ĐẦY ĐỦ
  const bookingData = {
    start: `${sTime} ${sDate}`,
    end: `${eTime} ${eDate}`,
    address: finalAddress,

    // CÁC KHOẢN TIỀN CHI TIẾT
    rentPrice: currentRentPrice, // Giá thuê xe
    deliveryFee: currentDeliveryFee, // Phí giao xe (Quan trọng!)
    insuranceFee: insTotal, // Phí bảo hiểm
    couponVal: currentCouponVal, // Giá giảm
    couponCode: currentCouponCode, // Mã giảm
    vat: VAT, // Thuế

    total: totalMoney, // Tổng cộng
  };

  localStorage.setItem("bookingData", JSON.stringify(bookingData));
  window.location.href = "../dat_xe/dat_xe.html";
}

// Hàm phụ trợ parseMoney (nếu chưa có trong file JS này)
function parseMoney(str) {
  return parseInt(str.replace(/[^\d]/g, "")) || 0;
}
