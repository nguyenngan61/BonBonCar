// Hiển thị thời gian mở khóa
document.addEventListener('DOMContentLoaded', () => {
    const timeEl = document.getElementById('unlock-time');
    if (timeEl) {
        const now = new Date();
        timeEl.textContent = now.toLocaleString('vi-VN');
    }
});
