document.addEventListener("DOMContentLoaded", () => {
  // ===== Modal =====
  const openSearch = document.getElementById("openSearch");
  const modal = document.getElementById("searchModal");
  const overlay = document.getElementById("overlay");
  const closeModal = document.getElementById("closeModal");

  // ===== Input (Đảm bảo ID trong HTML phải trùng khớp các tên này) =====
  const pickupDate = document.getElementById("pickupDate");
  const pickupTime = document.getElementById("pickupTime");
  const returnDate = document.getElementById("returnDate");
  const returnTime = document.getElementById("returnTime");

  // ===== Output =====
  const rentalDuration = document.getElementById("rentalDuration");
  const searchBtn = document.getElementById("searchBtn");
  const timeError = document.getElementById("timeError");

  // ===== HÀM MỞ/ĐÓNG MODAL =====
  function openModal() {
    if (modal) modal.classList.add("active");
    if (overlay) overlay.classList.add("active");
    calculateRentalTime(); // Tính toán ngay khi mở
  }

  function closeModalFn() {
    if (modal) modal.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
  }

  if (openSearch) openSearch.addEventListener("click", openModal);
  if (closeModal) closeModal.addEventListener("click", closeModalFn);
  if (overlay) overlay.addEventListener("click", closeModalFn);

  // ===== TÍNH THỜI GIAN THUÊ =====
  function calculateRentalTime() {
    // Kiểm tra xem các thẻ input có tồn tại không trước khi lấy giá trị
    if (!pickupDate || !pickupTime || !returnDate || !returnTime) return;

    // Nếu chưa nhập đủ thông tin
    if (
      !pickupDate.value ||
      !pickupTime.value ||
      !returnDate.value ||
      !returnTime.value
    ) {
      if (rentalDuration) rentalDuration.innerText = "--";
      if (searchBtn) {
        searchBtn.classList.add("disabled");
        searchBtn.style.pointerEvents = "none"; // Khóa click
        searchBtn.style.opacity = "0.5";
      }
      if (timeError) timeError.style.display = "none";
      return;
    }

    // Tạo đối tượng Date
    const pickup = new Date(`${pickupDate.value}T${pickupTime.value}`);
    const dropoff = new Date(`${returnDate.value}T${returnTime.value}`);

    // ❌ TRẢ TRƯỚC NHẬN (Lỗi)
    if (dropoff <= pickup) {
      if (rentalDuration) rentalDuration.innerText = "--";
      if (timeError) timeError.style.display = "block";

      if (searchBtn) {
        searchBtn.classList.add("disabled");
        searchBtn.style.pointerEvents = "none";
        searchBtn.style.opacity = "0.5";
      }
      return;
    }

    // ✅ HỢP LỆ
    if (timeError) timeError.style.display = "none";

    const diffMs = dropoff - pickup;
    // Làm tròn lên (VD: 1 giờ 5 phút => tính 2 giờ)
    const totalHours = Math.ceil(diffMs / (1000 * 60 * 60));

    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;

    let text = "";
    if (days > 0) text += `${days} ngày `;
    if (hours > 0) text += `${hours} giờ`;

    // Hiển thị kết quả
    if (rentalDuration) rentalDuration.innerText = text.trim();

    // Bật nút tìm xe
    if (searchBtn) {
      searchBtn.classList.remove("disabled");
      searchBtn.style.pointerEvents = "auto";
      searchBtn.style.opacity = "1";
      // Chuyển trang khi bấm nút (nếu là thẻ a)
      searchBtn.onclick = function () {
        window.location.href = "cac_trang_con/danh_muc_thue.html";
      };
    }
  }

  // ===== Event Listener =====
  // Sử dụng 'input' thay vì 'change' để cập nhật ngay lập tức khi người dùng chọn
  const inputs = [pickupDate, pickupTime, returnDate, returnTime];
  inputs.forEach((input) => {
    if (input) {
      input.addEventListener("input", calculateRentalTime);
    }
  });

  // Tính ngay khi load trang (nếu HTML đã có sẵn value)
  calculateRentalTime();
});

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
