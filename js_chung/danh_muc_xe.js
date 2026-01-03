document.addEventListener("DOMContentLoaded", () => {
  // ============================================================
  // 1. KHAI BÁO TOÀN BỘ BIẾN (Chỉ khai báo 1 lần tại đây)
  // ============================================================

  // --- Modal Số Chỗ ---
  const openSeatBtn = document.getElementById("openModalBtn");
  const seatModal = document.getElementById("seatModal");
  const closeSeatBtn = document.querySelector("#seatModal .close-btn");
  const seatItems = document.querySelectorAll(".car-type-item");
  const applySeatBtn = document.querySelector("#seatModal .btn-apply");
  const seatDisplay = document.getElementById("seatDisplay"); // Span hiển thị chữ bên ngoài
  let selectedSeat = null; // Biến lưu trạng thái chọn

  // --- Dropdown Địa điểm & Thời gian ---
  const btnLoc = document.getElementById("openLocation");
  const btnTime = document.getElementById("openTime");
  const dropLoc = document.getElementById("locationDropdown");
  const dropTime = document.getElementById("timeDropdown");
  const locValueDisplay = document.getElementById("locValue");
  const displayTime = document.querySelector("#openTime .display-value");

  // --- Input Tính Toán Thời Gian ---
  const startDateInput = document.getElementById("startDate");
  const startTimeInput = document.getElementById("startTime");
  const endDateInput = document.getElementById("endDate");
  const endTimeInput = document.getElementById("endTime");
  const displayDuration = document.getElementById("totalDuration");
  const btnXacNhanTime = document.querySelector(".btn-chon-gio"); // Nút xác nhận trong modal giờ

  // --- Nút Tìm Kiếm ---
  const btnSearch = document.querySelector(".btn-search");

  // ============================================================
  // 2. HÀM TIỆN ÍCH
  // ============================================================

  // Hàm đóng tất cả dropdown và modal (trừ cái đang thao tác nếu cần)
  function closeAll() {
    if (dropLoc) dropLoc.classList.remove("active");
    if (dropTime) dropTime.classList.remove("active");
    // Không đóng seatModal ở đây để tránh xung đột khi vừa click mở
  }

  // ============================================================
  // 3. XỬ LÝ MODAL SỐ CHỖ (Fix lỗi không mở được)
  // ============================================================

  // A. Mở Modal
  if (openSeatBtn) {
    openSeatBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Ngăn sự kiện nổi bọt
      closeAll(); // Đóng các dropdown khác cho gọn

      if (seatModal) {
        seatModal.style.display = "flex"; // QUAN TRỌNG: Hiện modal
        console.log("Đã mở modal số chỗ");
      }
    });
  }

  // B. Đóng Modal (Nút X)
  if (closeSeatBtn) {
    closeSeatBtn.addEventListener("click", () => {
      if (seatModal) seatModal.style.display = "none";
    });
  }

  // C. Chọn loại xe (Click vào hình xe 4 chỗ/7 chỗ)
  seatItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Reset active cũ
      seatItems.forEach((i) => i.classList.remove("active-seat"));
      // Active cái mới click
      item.classList.add("active-seat");

      // Lấy giá trị (4 hoặc 7)
      const val = item.getAttribute("data-value") || item.innerText;
      if (val.includes("4")) selectedSeat = 4;
      if (val.includes("7")) selectedSeat = 7;

      console.log("Đã chọn xe:", selectedSeat, "chỗ");
    });
  });

  // D. Nút Áp Dụng (Trong Modal)
  if (applySeatBtn) {
    applySeatBtn.addEventListener("click", () => {
      if (selectedSeat) {
        // 1. Cập nhật chữ hiển thị bên ngoài (thay chữ "SỐ CHỖ")
        if (seatDisplay) {
          seatDisplay.innerText = selectedSeat + " Chỗ";
          seatDisplay.style.fontWeight = "bold";
          seatDisplay.style.color = "#000000ff";
        }

        // 2. Đóng Modal
        if (seatModal) seatModal.style.display = "none";

        // 3. === QUAN TRỌNG: CHUYỂN TRANG ===
        console.log("Đang chuyển hướng đến xe " + selectedSeat + " chỗ...");

        if (selectedSeat == 4) {
          window.location.href = "xe4cho.html"; // Đảm bảo file này nằm cùng thư mục
        } else if (selectedSeat == 7) {
          window.location.href = "xe7cho.html";
        }
      } else {
        alert("Vui lòng chọn loại xe trước!");
      }
    });
  }

  // E. Click ra ngoài vùng trắng thì đóng Modal
  window.addEventListener("click", (e) => {
    if (seatModal && e.target === seatModal) {
      seatModal.style.display = "none";
    }
    // Đóng luôn các dropdown nếu click ra ngoài
    if (
      !e.target.closest(".search-box") &&
      !e.target.closest(".modal-content")
    ) {
      closeAll();
    }
  });

  // ============================================================
  // 4. XỬ LÝ DROPDOWN ĐỊA ĐIỂM & THỜI GIAN
  // ============================================================

  // Mở/Đóng Dropdown Địa điểm
  if (btnLoc) {
    btnLoc.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAll();
      if (seatModal) seatModal.style.display = "none";
      dropLoc.classList.toggle("active");
    });
  }

  // Mở/Đóng Dropdown Thời gian
  if (btnTime) {
    btnTime.addEventListener("click", (e) => {
      if (e.target.closest(".time-modal-content")) return; // Click bên trong không đóng
      e.stopPropagation();
      closeAll();
      if (seatModal) seatModal.style.display = "none";
      dropTime.classList.add("active");
    });
  }

  // Chọn địa điểm từ list
  document.querySelectorAll(".location-list li").forEach((li) => {
    li.addEventListener("click", (e) => {
      e.stopPropagation();
      if (locValueDisplay) locValueDisplay.innerText = li.innerText;
      if (dropLoc) dropLoc.classList.remove("active");
    });
  });

  // Nút xác nhận thời gian (trong dropdown time)
  if (btnXacNhanTime) {
    btnXacNhanTime.addEventListener("click", () => {
      if (startDateInput && startTimeInput) {
        // Format lại ngày tháng để hiển thị đẹp hơn
        const [y, m, d] = startDateInput.value.split("-");
        if (displayTime) {
          displayTime.innerText = `${startTimeInput.value}, ${d}/${m}/${y}`;
        }
        if (dropTime) dropTime.classList.remove("active");
      }
    });
  }

  // ============================================================
  // 5. TÍNH TOÁN THỜI GIAN (Duration)
  // ============================================================
  function calculateDuration() {
    if (!startDateInput || !startTimeInput || !endDateInput || !endTimeInput)
      return;

    const start = new Date(startDateInput.value + "T" + startTimeInput.value);
    const end = new Date(endDateInput.value + "T" + endTimeInput.value);
    const diff = end - start;

    if (displayDuration) {
      if (diff <= 0) {
        displayDuration.innerText = "Chưa hợp lệ";
        displayDuration.style.color = "red";
      } else {
        displayDuration.style.color = "#333";
        const diffHours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diffHours / 24);
        const hours = diffHours % 24;
        displayDuration.innerText =
          days > 0 ? `${days} ngày ${hours} giờ` : `${hours} giờ`;
      }
    }
  }

  // Gắn sự kiện tính toán khi thay đổi input
  [startDateInput, startTimeInput, endDateInput, endTimeInput].forEach(
    (inp) => {
      if (inp) inp.addEventListener("input", calculateDuration);
    }
  );
  // Chạy lần đầu
  calculateDuration();

  // ============================================================
  // 6. NÚT TÌM XE (Chuyển trang)
  // ============================================================
  if (btnSearch) {
    btnSearch.addEventListener("click", (e) => {
      e.preventDefault();

      const locationText = locValueDisplay
        ? locValueDisplay.innerText.trim()
        : "";
      const startDate = startDateInput ? startDateInput.value : "";
      const startTime = startTimeInput ? startTimeInput.value : "";

      // Logic chuyển trang demo
      if (
        locationText.includes("Hồ Chí Minh") &&
        startDate === "2026-01-06" &&
        startTime === "07:00"
      ) {
        window.location.href = "danh_muc_thue(trangngaythang).html";
      } else {
        window.location.href = "danh_muc_thue(trangngayconlai).html";
      }
    });
  }
});
