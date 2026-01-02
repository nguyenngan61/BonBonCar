document.addEventListener("DOMContentLoaded", function () {

  /* ==============================
     SCROLL XUỐNG FORM ĐĂNG KÝ
  ============================== */
  const btnScroll = document.getElementById("btn-scroll-register");
  const target = document.getElementById("dang-ky-thue-xe");

  if (btnScroll && target) {
    btnScroll.addEventListener("click", function () {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }

  /* ==============================
     ƯỚC TÍNH THU NHẬP
  ============================== */
  const brandSelect = document.querySelector('select[name="brand"]');
  const modelSelect = document.querySelector('select[name="model"]');
  const daysSelect  = document.querySelector('select[name="days"]');
  const resultBox   = document.getElementById("estimate-result");

  if (!brandSelect || !modelSelect || !daysSelect || !resultBox) return;

  const priceTable = {
    TOYOTA: {
      "8S LUX": 12000000,
      "FADIL": 10000000
    },
    VINFAST: {
      "E34": 15000000,
      "FADIL 1.4": 11000000
    },
    HYUNDAI: { "Khác": 9000000 },
    MAZDA: { "Khác": 10500000 },
    MITSUBISHI: { "Khác": 9800000 }
  };

  function calculateIncome() {
    const brand = brandSelect.value;
    const model = modelSelect.value;
    const days  = daysSelect.value;

    if (!brand || !model || !days) return;

    const basePrice =
      priceTable[brand] && priceTable[brand][model]
        ? priceTable[brand][model]
        : null;

    if (!basePrice) {
      resultBox.innerHTML =
        "Chưa có mẫu xe tương tự trên BonbonCar. <b>Đăng ký cho thuê ngay</b> để trở thành những chủ xe đầu tiên.";
      return;
    }

    let multiplier = 1;
    if (days === "high") multiplier = 1.3;
    if (days === "full") multiplier = 1.6;

    const income = Math.round(basePrice * multiplier);

    resultBox.innerHTML = `
      💰 <b>Thu nhập ước tính:</b>
      <span style="color:#16a085;font-weight:700">
        ${income.toLocaleString("vi-VN")} đ / tháng
      </span>
    `;
  }

  brandSelect.addEventListener("change", calculateIncome);
  modelSelect.addEventListener("change", calculateIncome);
  daysSelect.addEventListener("change", calculateIncome);

});
/* ==============================
   XỬ LÝ FORM ĐĂNG KÝ CUỐI TRANG
============================== */
const rentForm = document.getElementById("rent-car-form");

if (rentForm) {
  rentForm.addEventListener("submit", function (e) {
    // Ngăn chặn trình duyệt load lại trang
    e.preventDefault();

    // Hiển thị thông báo
    alert("Chúc mừng bạn đã đăng ký thành công! BonbonCar sẽ liên hệ với bạn trong vòng 48 giờ.");

    // Xóa dữ liệu đã nhập trong form (tùy chọn)
    rentForm.reset();
  });
}
document.addEventListener("DOMContentLoaded", function () {
  /* ==========================================================
     CẬP NHẬT ĐƯỜNG DẪN MENU (HEADER) QUA JAVASCRIPT
  ========================================================== */

  // 1. Cập nhật nút Đăng nhập (class .btn-login)
  const btnLogin = document.querySelector('.btn-login');
  if (btnLogin) {
    btnLogin.setAttribute('href', 'dang_nhap.html'); // 
  }

  // 2. Cập nhật các liên kết trong menu chính (nav-center)
  const navLinks = document.querySelectorAll('.nav-center a');

  navLinks.forEach(link => {
    const linkText = link.textContent.trim().toLowerCase();

    if (linkText.includes('về bonboncar')) {
      link.setAttribute('href', 've_chung_toi.html');
    } 
    else if (linkText.includes('blog')) {
      link.setAttribute('href', 'blog_tin_tuc.html');
    } 
    else if (linkText.includes('liên hệ')) {
      link.setAttribute('href', 'lien_he.html');
    }
  });

  // 3. Cập nhật các liên kết trong Dropdown Chính sách
  const policyLinks = document.querySelectorAll('.dropdown-list li a');
  policyLinks.forEach(link => {
    // Giả sử tất cả mục trong dropdown Chính sách đều dẫn về chinh_sach.html
    link.setAttribute('href', 'chinh_sach.html');
  });

});