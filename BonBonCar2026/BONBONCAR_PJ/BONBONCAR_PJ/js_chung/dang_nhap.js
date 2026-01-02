document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const phone = document.getElementById("loginPhone");
  const password = document.getElementById("loginPassword");
  const toast = document.getElementById("login-toast");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // chặn reload

    // 1️⃣ Kiểm tra nhập đủ
    if (phone.value.trim() === "" || password.value.trim() === "") {
      alert("Vui lòng nhập số điện thoại và mật khẩu.");
      return;
    }

    // 2️⃣ Hợp lệ → hiện thông báo
    toast.style.display = "block";

    // 3️⃣ (Tuỳ chọn) tự ẩn sau 2 giây
    setTimeout(() => {
      toast.style.display = "none";
    }, 2000);
  });
});