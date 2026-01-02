/* ================================================================= */
/* FILE: js/main.js - CODE XỬ LÝ CHUNG (HEADER, FOOTER, ĐIỀU HƯỚNG)  */
/* ================================================================= */
const root = window.ROOT_PATH || ".";
// 1. HÀM XÁC ĐỊNH ĐƯỜNG DẪN GỐC (ROOT PATH)
function getRootPath() {
  // Nếu URL chứa thư mục con, lùi lại 1 cấp
  if (window.location.pathname.includes("/")) {
    return "..";
  }
  return "."; // Đang ở trang chủ
}

// 2. HÀM TẢI HEADER
function loadHeader() {
  const root = getRootPath();
  const placeholder = document.getElementById("header-placeholder");
  const rootPath = window.location.href.includes("cac_trang_con")
    ? "../../"
    : "./";
  if (placeholder) {
    const headerContent = `
        <header>
          <div class="container header-inner">
            <a href="${rootPath}trang_chu.html" class="brand-logo">
              <div class="logo-circle"></div>
              <span class="brand-name">bonboncar</span>
            </a>
            
            <nav class="nav-center">
              <a href="${root}/ve_chung_toi/ve_chung_toi.html">VỀ BONBONCAR</a>
              <a href="${root}/blog/blog_tin_tuc.html">BLOG</a>
              <a href="${root}/ky_gui_xe/ky_gui_xe.html">KÝ GỬI XE</a>
              
              <a href="${root}/chinh_sach/chinh_sach_head.html">CHÍNH SÁCH</a>

              <a href="${root}/lien_he/lien_he.html">LIÊN HỆ</a>
            </nav>

            <div class="header-right">
              <div class="location-picker" id="locPicker">
                <i class="fa-solid fa-location-dot"></i>
                <span id="currentLocation">Hồ Chí Minh</span>
                <i class="fa-solid fa-chevron-down" style="font-size: 10px"></i>
                <ul class="city-dropdown" id="cityDropdown">
                  <li><a href="#" onclick="changeLocation('Hồ Chí Minh')">Hồ Chí Minh</a></li>
              
                  <li><a href="#" onclick="changeLocation('Hà Nội')">Hà Nội</a></li>
                  <li><a href="#" onclick="changeLocation('Bình Dương')">Bình Dương</a></li>
                  <li><a href="#" onclick="changeLocation('Đà Nẵng')">Đà Nẵng</a></li>
                  <li><a href="#" onclick="changeLocation('Khánh Hòa')">Khánh Hòa</a></li>
                </ul>
              </div>
              
              <div class="divider"></div>
              <a href="${root}/dang_nhap/dang_ki.html" class="link-register">Đăng Ký</a>
              <a href="${root}/dang_nhap/dang_nhap.html" class="btn-login">Đăng Nhập</a>
            </div>
          </div>
        </header>
        `;

    placeholder.innerHTML = headerContent;
    initHeaderLogic(); // Kích hoạt sự kiện sau khi header hiện ra
  }
}

// 3. HÀM TẢI FOOTER
function loadFooter() {
  const root = getRootPath();
  const placeholder = document.getElementById("footer-placeholder");
  const imgPrefix = window.location.href.includes("cac_trang_con")
    ? "../../"
    : "./";
  if (placeholder) {
    const footerContent = `
        <footer class="footer-exact">
          <div class="container">
            <div class="footer-offices">
              <div class="office-col">
                <h4>Văn phòng Hồ Chí Minh</h4>
                <p>
                  69 Đường B4, Phường An Lợi Đông,<br />Thành phố Thủ Đức, Thành phố
                  Hồ Chí Minh, Việt Nam
                </p>
              </div>
              <div class="office-col">
                <h4>Văn phòng Đà Nẵng</h4>
                 <p>
                    35 Thái Phiên, Phường Phước Ninh,<br />Quận Hải Châu, Thành phố Đà
                    Nẵng, Việt Nam
                  </p>
              </div>
              <div class="office-col">
                <h4>Văn phòng Hà Nội</h4>
                <p>
                  TIKTAK 5 - Tầng 4, Tòa nhà Lancaster Luminaire,<br />số 1152 –
                  1154, Đường Láng, Phường Láng Thượng,<br />Quận Đống Đa, Tp. Hà
                  Nội, Việt Nam
                </p>
              </div>
            </div>

            <div class="footer-divider"></div>

            <div class="footer-main-content">
              <div class="footer-info">
                <div class="footer-logo-row">
                  <div class="logo-circle-small"></div>
                  <span class="company-name">CÔNG TY TNHH BONBON MOBILITY VIỆT NAM</span>
                </div>
                <p class="tax-info">MST: 0318208708. Cấp ngày: 11/12/2023</p>

                <div class="contact-block">
                  <p class="highlight-text">1900 1335</p>
                  <p>Tổng đài hỗ trợ: 7:00 - 22:00</p>
                </div>

                <div class="contact-block">
                  <p class="highlight-text">cskh@bonboncar.vn</p>
                  <p>Gửi mail cho bonboncar</p>
                </div>

                <img 
            src="${imgPrefix}kho_anh/anh_dung_chung/bct.png" 
            alt="Đã thông báo BCT" 
            class="bct-badge" 
        />
              </div>

              <div class="footer-links">
                <h4>Chính Sách</h4>
                <ul>
                  <li><a href="${root}/chinh_sach/chinh_sach.html">Điều kiện giao dịch chung</a></li>
                  <li><a href="${root}/dat_xe/chinh_sach_bao_mat.html">Chính sách bảo vệ dữ liệu cá nhân</a></li>
                  <li><a href="${root}/dat_xe/dieu_khoan_su_dung.html">Điều khoản sử dụng nền tảng</a></li>
                  <li><a href="${root}/chinh_sach/chinh_sach_giao_nhan_Xe.html">Chính sách giao nhận xe</a></li>
                  <li><a href="${root}/chinh_sach/phuong_thuc_thanh_toan.html">Phương thức thanh toán</a></li>
                </ul>
              </div>
              
              <div class="footer-links">
                <h4>Liên Kết Nhanh</h4>
                <ul>
                  <li><a href="${root}/ve_chung_toi/ve_chung_toi.html">Về BONBONCAR</a></li>
                  <li><a href="${root}/ky_gui_xe/ky_gui_xe.html">Ký gửi xe</a></li>
                  <li><a href="${root}/blog/blog_tin_tuc.html">Blog</a></li>
                  <li><a href="#">Địa điểm</a></li>
                  <li><a href="${root}/lien_he/lien_he.html">Liên hệ với BONBONCAR</a></li>
                </ul>
              </div>

              <div class="footer-links">
                <h4>Tìm Hiểu Thêm</h4>
                <ul>
                  <li><a href="#">Hướng dẫn đặt xe</a></li>
                  <li><a href="#">Hướng dẫn thanh toán</a></li>
                  <li><a href="#">Hỏi và đáp</a></li>
                </ul>
              </div>

              <div class="footer-social">
                <a href="https://vn.linkedin.com/jobs/view/customer-service-lead-operations-at-bonboncar-4336936750"><i class="fa-brands fa-linkedin" style="color: #0077b5"></i></a>
                <a href="https://www.facebook.com/bonboncarrental?locale=vi_VN"><i class="fa-brands fa-square-facebook" style="color: #1877f2"></i></a>
                <a href="https://www.youtube.com/@Bonboncar"><i class="fa-brands fa-youtube" style="color: #ff0000"></i></a>
                <a href="https://www.instagram.com/bonboncarvn/"><i class="fa-brands fa-instagram" style="color: #c32aa3"></i></a>
                <a href="https://www.tiktok.com/@bonboncarvietnam"><i class="fa-brands fa-tiktok" style="color: #fe2c55"></i></a>
              </div>
            </div>
          </div>
        </footer>
        `;

    placeholder.innerHTML = footerContent;
  }
}

// 4. LOGIC XỬ LÝ SỰ KIỆN (DROPDOWN, CLICK)
function initHeaderLogic() {
  // A. Xử lý Dropdown Địa điểm
  const locPicker = document.getElementById("locPicker");
  const cityDropdown = document.getElementById("cityDropdown");

  if (locPicker && cityDropdown) {
    locPicker.addEventListener("click", function (e) {
      e.stopPropagation();
      cityDropdown.classList.toggle("show");
      if (document.getElementById("policyMenu"))
        document.getElementById("policyMenu").classList.remove("show");
    });
  }

  // B. Xử lý Dropdown Chính sách
  const policyTrigger = document.getElementById("policyDropdownTrigger");
  const policyMenu = document.getElementById("policyMenu");

  if (policyTrigger && policyMenu) {
    policyTrigger.addEventListener("click", function (e) {
      e.stopPropagation();
      policyMenu.classList.toggle("show");
      if (cityDropdown) cityDropdown.classList.remove("show");
    });
  }

  // C. Click ra ngoài để đóng tất cả
  window.addEventListener("click", function (e) {
    if (locPicker && !locPicker.contains(e.target) && cityDropdown) {
      cityDropdown.classList.remove("show");
    }
    if (policyTrigger && !policyTrigger.contains(e.target) && policyMenu) {
      policyMenu.classList.remove("show");
    }
  });
}

// Hàm đổi tên tỉnh
function changeLocation(cityName) {
  const el = document.getElementById("currentLocation");
  if (el) el.innerText = cityName;
}

// 5. KÍCH HOẠT CHẠY
document.addEventListener("DOMContentLoaded", function () {
  loadHeader();
  loadFooter();
});
