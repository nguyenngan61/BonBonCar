document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("otpForm");
  const otpInput = document.getElementById("otp-code");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const otp = otpInput.value.trim();

    // ❌ Chưa nhập OTP
    if (otp === "") {
      alert("Vui lòng nhập mã xác thực");
      return;
    }

    // ❌ Không đúng định dạng (4 hoặc 6 số)
    const otpRegex = /^(\d{4}|\d{6})$/;
    if (!otpRegex.test(otp)) {
      alert("Mã xác thực phải gồm 4 hoặc 6 chữ số");
      return;
    }

    // ✅ Hợp lệ → sang trang đổi mật khẩu
    window.location.href = "doi_mat_khau.html";
  });
});
