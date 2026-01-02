// 1. Chuyển Tab Nhận xét
function openFbTab(tabName) {
  document.getElementById("fb-content-owner").style.display = "none";
  document.getElementById("fb-content-renter").style.display = "none";

  document.getElementById("tab-fb-owner").classList.remove("active");
  document.getElementById("tab-fb-renter").classList.remove("active");

  document.getElementById("fb-content-" + tabName).style.display = "block";
  document.getElementById("tab-fb-" + tabName).classList.add("active");
}

// 2. Logic Xem thêm / Rút gọn (Giống trang chi tiết)
const btnToggleFb = document.getElementById("btn-toggle-fb");
const extraFbItems = document.querySelectorAll(".extra-fb");
let isFbExpanded = false;

if (btnToggleFb) {
  btnToggleFb.addEventListener("click", function () {
    if (!isFbExpanded) {
      // MỞ RA
      extraFbItems.forEach((item) => {
        item.style.display = "flex";
      });
      btnToggleFb.innerHTML = 'Rút gọn <i class="fa-solid fa-chevron-up"></i>';
      isFbExpanded = true;
    } else {
      // THU VÀO
      extraFbItems.forEach((item) => {
        item.style.display = "none";
      });
      btnToggleFb.innerHTML =
        'Xem tất cả (10) <i class="fa-solid fa-chevron-down"></i>';
      isFbExpanded = false;
    }
  });
}

function openCarTab(tabName) {
  // 1. Ẩn hết nội dung
  document.getElementById("content-driver").style.display = "none";
  document.getElementById("content-self").style.display = "none";

  // 2. Bỏ active hết các nút
  document.getElementById("tab-driver").classList.remove("active");
  document.getElementById("tab-self").classList.remove("active");

  // 3. Hiện tab được chọn
  document.getElementById("content-" + tabName).style.display = "block";
  document.getElementById("tab-" + tabName).classList.add("active");
}
