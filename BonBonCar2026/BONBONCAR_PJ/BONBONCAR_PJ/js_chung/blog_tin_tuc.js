document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("categoryToggle");
  const dropdown = document.querySelector(".category-dropdown");

  if (!toggle || !dropdown) {
    console.log("❌ Không tìm thấy element dropdown");
    return;
  }

  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    dropdown.classList.toggle("active");
  });

  document.addEventListener("click", function () {
    dropdown.classList.remove("active");
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const searchIcon = document.querySelector(".blog-search");
  const searchBox = document.getElementById("blogSearchOverlay");
  const searchInput = document.getElementById("blogSearchInput");

  if (!searchIcon || !searchBox) return;

  searchIcon.addEventListener("click", function (e) {
    e.stopPropagation();
    searchBox.style.display = "block";
    searchInput.focus();
  });

  // Click ra ngoài thì đóng
  document.addEventListener("click", function () {
    searchBox.style.display = "none";
  });

  // Click trong input không bị đóng
  searchBox.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});
