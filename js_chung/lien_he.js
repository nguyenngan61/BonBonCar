/* ===============================
   TOGGLE DROPDOWN ĐỊA ĐIỂM
================================ */
function toggleLocation() {
  const dropdown = document.getElementById("location-dropdown");
  if (!dropdown) return;

  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

/* ===============================
   CHỌN ĐỊA ĐIỂM + ĐỔI GOOGLE MAP
================================ */
function chooseLocation(el) {
  if (!el) return;

  // đổi text thanh chọn
  document.getElementById("selected-location").innerText =
    "📍 " + el.innerText.trim();

  // đổi map
  const address = el.getAttribute("data-address");
  const iframe = document.getElementById("map-frame");

  if (address && iframe) {
    iframe.src =
      "https://www.google.com/maps?q=" +
      encodeURIComponent(address) +
      "&output=embed";
  }

  // đóng dropdown
  document.getElementById("location-dropdown").style.display = "none";
}

/* ===============================
   DỮ LIỆU CÂU TRẢ LỜI (FULL)
================================ */
const answerData = {
  /* ===== HƯỚNG DẪN ===== */

  "Cách đặt xe": `
<b>B1:</b> Vào trang web chính thức của BonbonCar (nhập đúng địa chỉ để tránh nhầm).<br><br>
<b>B2:</b> Chọn nơi bạn muốn nhận xe và nơi trả xe (có thể giống hoặc khác nhau).<br><br>
<b>B3:</b> Chọn ngày và giờ nhận xe và ngày giờ trả xe theo kế hoạch của bạn.<br><br>
<b>B4:</b> Nhấn vào xe bạn thích để xem chi tiết: ảnh, giá theo ngày/giờ, thông số kỹ thuật, điều khoản thuê.<br><br>
<b>B5:</b> Chọn xe phù hợp rồi bấm <b>Đặt xe</b>.<br><br>
<b>B6:</b> Nhập họ tên, số điện thoại, email, CMND/CCCD (nếu cần) và các thông tin bắt buộc khác.<br><br>
<b>B7:</b> Chọn hình thức thanh toán: thẻ/tài khoản ngân hàng, ví điện tử hoặc trả tiền khi nhận xe (tuỳ BonbonCar cho phép).<br><br>
<b>B8:</b> Kiểm tra lại thông tin, giá tổng, rồi bấm <b>Xác nhận / Thanh toán</b>.
`,

  "Cách ký gửi xe": `
<b>B1:</b> Truy cập mục <b>Ký gửi xe</b> trên BonbonCar.<br>
<b>B2:</b> Điền thông tin xe (loại xe, đời xe, biển số, tình trạng).<br>
<b>B3:</b> Gửi hồ sơ xe để BonbonCar xét duyệt.<br>
<b>B4:</b> Ký hợp đồng hợp tác cho thuê.<br>
<b>B5:</b> Xe được đưa lên hệ thống để khách đặt thuê.
`,

  "Quy trình nhận xe": `
<b>B1:</b> Đến đúng địa điểm & thời gian nhận xe đã đặt.<br>
<b>B2:</b> Mở app BonbonCar → chọn chuyến thuê.<br>
<b>B3:</b> Mở khóa xe bằng app (không cần chìa).<br>
<b>B4:</b> Kiểm tra ngoại thất, nội thất xe.<br>
<b>B5:</b> Xác nhận nhận xe → bắt đầu sử dụng.
`,

  "Quy trình trả xe": `
<b>B1:</b> Đưa xe về đúng vị trí trả xe đã đăng ký.<br>
<b>B2:</b> Kiểm tra và dọn dẹp xe gọn gàng.<br>
<b>B3:</b> Thực hiện trả xe trên app.<br>
<b>B4:</b> Khóa xe bằng ứng dụng.<br>
<b>B5:</b> BonbonCar đối soát và hoàn cọc (nếu không phát sinh phí).
`,

  "Hướng dẫn thanh toán": `
<b>B1:</b> Thanh toán được thực hiện trên app BonbonCar.<br>
<b>B2:</b> Chọn hình thức: chuyển khoản / QR / ví điện tử (theo hệ thống hỗ trợ).<br>
<b>B3:</b> Thanh toán tiền thuê và đặt cọc (nếu có).<br>
<b>B4:</b> Nhận xác nhận thanh toán thành công.
`,

  "Cách huỷ đặt xe": `
<b>B1:</b> Vào mục <b>Chuyến đi của tôi</b> trên app.<br>
<b>B2:</b> Chọn chuyến muốn huỷ.<br>
<b>B3:</b> Nhấn <b>Huỷ đặt xe</b>.<br>
<b>B4:</b> Hệ thống áp dụng chính sách hoàn tiền / khấu trừ theo thời gian huỷ.
`,

  "Hỗ trợ khi gặp sự cố trên đường": `
<b>B1:</b> Dừng xe tại nơi an toàn.<br>
<b>B2:</b> Gọi hotline hỗ trợ BonbonCar hoặc chat trong app.<br>
<b>B3:</b> Cung cấp thông tin chuyến xe & sự cố gặp phải.<br>
<b>B4:</b> Làm theo hướng dẫn từ bộ phận hỗ trợ (đổi xe / cứu hộ / xử lý kỹ thuật).
`,

  /* ===== CÂU HỎI THƯỜNG GẶP ===== */

  "Tại sao tôi nên chọn thuê xe tự lái BonbonCar?": `
Tại BonbonCar, chúng tôi:<br><br>
<b>(1)</b> Áp dụng gói thuê xe tự lái linh hoạt 4h, 8h, 12h, 24h giúp bạn tiết kiệm nhất khi thuê. 
Bạn có thể lấy xe 24/24 và thời gian bắt đầu tính tiền từ lúc lấy xe. Bạn được hưởng trọn vẹn số giờ đặt thuê.<br><br>
<b>(2)</b> Thủ tục thuê xe & nhận xe cực kì nhanh gọn 24/24, bạn chỉ cần chuẩn bị CCCD / Hộ chiếu 
và Bằng lái xe (ít nhất 1 năm).<br><br>
<b>(3)</b> Bảo hiểm hai chiều, chính sách xử lý sự cố minh bạch nếu có vấn đề xảy ra.<br><br>
Ngoài ra, đội ngũ chăm sóc khách hàng của BonbonCar luôn sẵn sàng hỗ trợ 24/7 để đảm bảo bạn có một trải nghiệm tốt nhất.
`,

  "Thủ tục cho thuê xe ô tô tự lái bao gồm những gì?": `
Thủ tục thuê xe tại BonbonCar bao gồm:<br><br>
<b>(1)</b> Yêu cầu bằng lái trên 1 năm.<br>
<b>(2)</b> Kiểm tra hồ sơ bao gồm CCCD và Bằng Lái Xe.<br>
<b>(3)</b> Nhận chuyển khoản tiền giữ chỗ 500.000 đồng.<br>
<b>(4)</b> Khi nhận xe và làm hợp đồng, thanh toán tiền thuê + cọc 
10 triệu cho xe thường / 30 triệu cho xe cao cấp.
`,

  "Đặt cọc xe máy và thủ tục hoàn cọc ra sao?": `
BonbonCar hiện chỉ nhận tiền giữ chỗ bằng chuyển khoản.<br><br>
Sau khi hoàn tất chuyến đi, trong vòng 24 tiếng, BonbonCar sẽ hoàn cọc 
sau khi kiểm tra tình trạng xe, báo cáo tốc độ trên cao tốc, phí VETC 
cũng như mức xăng hao hụt so với khi giao xe.
`,

  "Vị trí nhận xe tại đâu?": `
Chúng tôi có xe cho thuê tại gần như tất cả các quận nội thành 
và có dịch vụ giao nhận xe trong TP.HCM.<br><br>
Đội ngũ CSKH của BonbonCar sẽ tư vấn mẫu xe và sắp xếp việc nhận trả xe tối ưu nhất cho bạn.
`,

  "Tôi có phải nhận và trả xe đúng giờ?": `
Việc nhận xe đúng giờ giúp bạn tối ưu thời gian sử dụng xe.<br><br>
Phí thuê xe được tính từ giờ nhận xe đã đặt. Nếu bạn muốn gia hạn, 
vui lòng liên hệ sớm để tránh phát sinh phí trả trễ 
(150.000đ/giờ xe thường – 400.000đ/giờ xe cao cấp hoặc lễ tết).
`,

  "Tôi có cần vệ sinh hay đổ xăng khi trả xe?": `
Bạn cần trả xe theo hiện trạng ban đầu để tránh chi phí phát sinh.<br><br>
Vui lòng vệ sinh, rửa xe nếu cần. Nếu xe quá dơ hoặc thiếu xăng, 
BonbonCar sẽ tính thêm phụ phí (27.000đ/lít xăng).
`,

  "Trường hợp xe xảy ra sự cố tôi cần làm gì?": `
Vui lòng liên hệ đội ngũ chăm sóc khách hàng của BonbonCar càng sớm càng tốt.<br><br>
Không tự ý đưa xe vào garage sửa chữa khi chưa có sự đồng ý bằng văn bản 
từ phía BonbonCar.
`,
};

/* ===============================
   POPUP
================================ */
function openPopup(title, content) {
  document.getElementById(
    "popup-content"
  ).innerHTML = `<h3>${title}</h3><p>${content}</p>`;
  document.getElementById("popup-overlay").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup-overlay").style.display = "none";
}

/* ===============================
   GẮN CLICK TỰ ĐỘNG
================================ */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".support-box li").forEach((item) => {
    item.style.cursor = "pointer";
    item.addEventListener("click", () => {
      const q = item.innerText.trim();
      openPopup(q, answerData[q] || "Nội dung đang cập nhật...");
    });
  });
});
