document.addEventListener("DOMContentLoaded", function () {
  // Lấy form và popup
  const form = document.getElementById("registerForm");
  const toast = document.getElementById("register-toast");
  const backBtn = document.getElementById("backToLogin");

  // Lấy các input
  const phone = document.getElementById("phone");
  const password = document.getElementById("password");
  const fullname = document.getElementById("fullname");
  const confirmPassword = document.getElementById("confirmPassword");
  const agreePolicy = document.getElementById("agreePolicy");

  // Bắt sự kiện submit
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // ❌ chặn reload trang

    // 1️⃣ Kiểm tra nhập đầy đủ
    if (
      phone.value.trim() === "" ||
      password.value.trim() === "" ||
      fullname.value.trim() === "" ||
      confirmPassword.value.trim() === ""
    ) {
      alert("Vui lòng nhập đầy đủ tất cả thông tin.");
      return;
    }

    // 2️⃣ Kiểm tra mật khẩu trùng khớp
    if (password.value !== confirmPassword.value) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    // 3️⃣ Kiểm tra checkbox chính sách
    if (!agreePolicy.checked) {
      alert("Bạn phải đồng ý với Chính sách & quy định của OTOD.");
      return;
    }

    // ✅ TẤT CẢ HỢP LỆ → HIỆN POPUP
    toast.style.display = "flex";
  });

  // Nút quay về đăng nhập
  backBtn.addEventListener("click", function () {
    window.location.href = "dang_nhap.html";
  });
});