document.addEventListener("DOMContentLoaded", () => {
  /* ===============================
     XỬ LÝ UPLOAD ẢNH (XE + BẰNG LÁI)
     =============================== */

  const boxes = document.querySelectorAll(".ktxe-box");

  boxes.forEach((box) => {
    const input = box.querySelector('input[type="file"]');
    const wrapper = box.querySelector(".img-wrapper");
    const imgEl = box.querySelector(".preview-img");
    const prevBtn = box.querySelector(".prev-btn");
    const nextBtn = box.querySelector(".next-btn");
    const labelText = box.querySelector("span");

    // ===== GHI CHÚ (CHỈ ẢNH XE) =====
    const noteBtn = box.querySelector(".add-note-btn");
    const notePanel = box.querySelector(".img-note-panel");
    const noteRadios = box.querySelectorAll('.note-tags input[type="radio"]');
    const noteTextarea = box.querySelector(".note-text");

    if (noteBtn && notePanel) {
      noteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        notePanel.hidden = !notePanel.hidden;
      });

      noteRadios.forEach((radio) => {
        radio.addEventListener("change", () => {
          if (radio.checked && noteTextarea) {
            noteTextarea.value = radio.value;
          }
        });
      });
    }

    let images = [];
    let currentIndex = 0;

    // ===== NÚT XOÁ ẢNH =====
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "remove-single";
    removeBtn.innerHTML = "✖";
    removeBtn.style.display = "none";
    wrapper.appendChild(removeBtn);

    function updateView() {
      if (!images.length) {
        imgEl.style.display = "none";
        labelText.style.display = "block";
        removeBtn.style.display = "none";
        if (prevBtn) prevBtn.style.display = "none";
        if (nextBtn) nextBtn.style.display = "none";
        return;
      }

      imgEl.src = images[currentIndex];
      imgEl.style.display = "block";
      labelText.style.display = "none";
      removeBtn.style.display = "block";

      if (prevBtn && nextBtn) {
        prevBtn.style.display = images.length > 1 ? "block" : "none";
        nextBtn.style.display = images.length > 1 ? "block" : "none";
      }
    }

    // ===== CHỌN ẢNH =====
    input.addEventListener("change", (e) => {
      const files = Array.from(e.target.files);
      if (!files.length) return;

      // 👉 BẰNG LÁI: CHỈ 1 ẢNH
      if (box.classList.contains("ktxe-license")) {
        images = [URL.createObjectURL(files[0])];
      }
      // 👉 ẢNH XE: NHIỀU ẢNH
      else {
        files.forEach((file) => images.push(URL.createObjectURL(file)));
      }

      currentIndex = 0;
      updateView();

      // reset input chỉ khi multiple
      if (input.hasAttribute("multiple")) {
        input.value = "";
      }
    });

    // ===== PREV / NEXT (CHỈ ẢNH XE) =====
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => {
        if (!images.length) return;
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateView();
      });

      nextBtn.addEventListener("click", () => {
        if (!images.length) return;
        currentIndex = (currentIndex + 1) % images.length;
        updateView();
      });
    }

    // ===== XOÁ ẢNH =====
    removeBtn.addEventListener("click", () => {
      if (!images.length) return;
      images.splice(currentIndex, 1);
      if (currentIndex >= images.length) currentIndex = images.length - 1;
      updateView();
    });

    updateView();
  });

  /* ===============================
     BẮT BUỘC 2 ẢNH BẰNG LÁI KHI MỞ KHÓA
     =============================== */

  const unlockBtn = document.querySelector(".ktxe-btn");
  const licenseBoxes = document.querySelectorAll(".ktxe-license");

  if (!unlockBtn || licenseBoxes.length < 2) return;

  unlockBtn.addEventListener("click", (e) => {
    let missing = [];

    licenseBoxes.forEach((box, index) => {
      const img = box.querySelector(".preview-img");

      if (!img || !img.src || img.style.display === "none") {
        missing.push(index === 0 ? "mặt trước" : "mặt sau");
        box.classList.add("license-error");
      } else {
        box.classList.remove("license-error");
      }
    });

    if (missing.length > 0) {
      e.preventDefault(); // ⛔ CHẶN CHUYỂN TRANG

      alert(
        "Vui lòng chèn đầy đủ hình ảnh bằng lái xe.\n" +
          "Thiếu: " +
          missing.join(" và ")
      );
    }
  });
});
