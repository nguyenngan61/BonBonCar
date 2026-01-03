document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("forgotForm");
  const phoneInput = document.getElementById("phone");
  const errorMsg = document.getElementById("errorMsg");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // chặn submit mặc định

    const phone = phoneInput.value.trim();

    // ❌ Chưa nhập
    if (phone === "") {
      errorMsg.textContent = "Vui lòng nhập số điện thoại";
      return;
    }

    // ❌ Không đúng định dạng SĐT VN (10 số)
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phone)) {
      errorMsg.textContent = "Số điện thoại không hợp lệ";
      return;
    }

    // ✅ Hợp lệ → sang trang xác thực
    errorMsg.textContent = "";
    window.location.href = "xac_thuc.html";
  });
});

