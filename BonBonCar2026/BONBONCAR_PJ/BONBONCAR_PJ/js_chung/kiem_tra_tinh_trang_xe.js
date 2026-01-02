document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.ktxe-box');

    boxes.forEach(box => {
        const input = box.querySelector('input[type="file"]');
        const wrapper = box.querySelector('.img-wrapper');
        const imgEl = box.querySelector('.preview-img');
        const prevBtn = box.querySelector('.prev-btn');
        const nextBtn = box.querySelector('.next-btn');
        const labelText = box.querySelector('span');
        // ===== GHI CHÚ ẢNH =====
const noteBtn = box.querySelector('.add-note-btn');
const notePanel = box.querySelector('.img-note-panel');
const noteRadios = box.querySelectorAll('.note-tags input[type="radio"]');
const noteTextarea = box.querySelector('.note-text');

if (noteBtn && notePanel) {

    // Bật / tắt panel ghi chú
    noteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // tránh trigger chọn file
        notePanel.hidden = !notePanel.hidden;
    });

    // Click tag → tự điền vào textarea
    noteRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.checked) {
                noteTextarea.value = radio.value;
            }
        });
    });
}


        let images = [];      // lưu URL ảnh
        let currentIndex = 0;

        // ===== Nút xóa ảnh =====
        const removeSingleBtn = document.createElement('button');
        removeSingleBtn.type = 'button';
        removeSingleBtn.className = 'remove-single';
        removeSingleBtn.innerHTML = '✖';
        removeSingleBtn.style.display = 'none'; // Ẩn mặc định
        wrapper.appendChild(removeSingleBtn);

        

        // ===== Cập nhật giao diện =====
        function updateView() {
            if (!images.length) {
                imgEl.style.display = 'none';
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
                removeSingleBtn.style.display = 'none'; // Ẩn nút xóa
                labelText.style.display = 'block';
                return;
            }

            imgEl.src = images[currentIndex];
            imgEl.style.display = 'block';
            labelText.style.display = 'none';
            removeSingleBtn.style.display = 'block'; // Hiện nút xóa

            prevBtn.style.display = images.length > 1 ? 'block' : 'none';
            nextBtn.style.display = images.length > 1 ? 'block' : 'none';
        }

        // ===== Chọn ảnh =====
        input.addEventListener('change', e => {
            const files = Array.from(e.target.files);
            files.forEach(file => {
                images.push(URL.createObjectURL(file));
            });

            currentIndex = images.length - files.length;
            updateView();

            // Cho phép chọn lại cùng 1 ảnh
            input.value = '';
        });

        // ===== Chuyển ảnh =====
        prevBtn.addEventListener('click', () => {
            if (!images.length) return;
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateView();
        });

        nextBtn.addEventListener('click', () => {
            if (!images.length) return;
            currentIndex = (currentIndex + 1) % images.length;
            updateView();
        });

        // ===== Xóa ảnh hiện tại =====
        removeSingleBtn.addEventListener('click', () => {
            if (!images.length) return;

            images.splice(currentIndex, 1);

            if (currentIndex >= images.length) {
                currentIndex = images.length - 1;
            }

            updateView();
        });

        updateView(); // Init

    });

});

