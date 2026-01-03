document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("changeForm");
  const newPassword = document.getElementById("newPassword");
  const confirmPassword = document.getElementById("confirmPassword");
  const errorMsg = document.getElementById("errorMsg");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const pass = newPassword.value.trim();
    const confirm = confirmPassword.value.trim();

    // Regex kiểm tra mật khẩu mạnh
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (pass === "" || confirm === "") {
      errorMsg.textContent = "Vui lòng nhập đầy đủ thông tin";
      return;
    }

    if (!passwordRegex.test(pass)) {
      errorMsg.textContent =
        "Mật khẩu phải có chữ hoa, chữ thường, số và ký tự đặc biệt (≥8 ký tự)";
      return;
    }

    if (pass !== confirm) {
      errorMsg.textContent = "Mật khẩu xác nhận không khớp";
      return;
    }

    // ✅ Thành công → quay về đăng nhập
    window.location.href = "dang_nhap.html";
  });
});
