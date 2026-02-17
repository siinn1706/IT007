// app.js

// Cấu hình danh sách giải thưởng với tỷ lệ, hình ảnh và lời chúc
// LƯU Ý: Thay thế các URL hình ảnh placeholder bằng hình ảnh thật của bạn
const prizes = [
    {
        label: '500k',
        index: 0,
        weight: 18,
        // Ảnh ngựa siêu vui. Thay bằng đường dẫn file ảnh của bạn
        image: 'https://via.placeholder.com/150/FFD700/000000?text=Ngựa+Siêu+Vui+500k', 
        wishes: 'Cung hỷ phát tài! Tiền vào như nước, cả năm sung túc, vạn sự hanh thông!'
    },
    {
        label: '200k',
        index: 1,
        weight: 30,
        // Ảnh ngựa vui
        image: 'https://via.placeholder.com/150/FFA500/000000?text=Ngựa+Vui+200k', 
        wishes: 'Vạn sự như ý! Chúc bạn một năm mới tràn đầy niềm vui và may mắn!'
    },
    {
        label: '100k',
        index: 2,
        weight: 25,
        // Ảnh ngựa cười mỉm
        image: 'https://via.placeholder.com/150/FFFF00/000000?text=Ngựa+Cười+100k', 
        wishes: 'An khang thịnh vượng! Chúc mừng bạn nhận được lộc đầu xuân.'
    },
    {
        label: '50k',
        index: 3,
        weight: 9,
        // Ảnh ngựa bình thường
        image: 'https://via.placeholder.com/150/ADFF2F/000000?text=Ngựa+Bình+Thường+50k', 
        wishes: 'Lộc nhỏ đầu năm, cả năm may mắn! Chúc bạn năm mới vui vẻ.'
    },
    {
        label: '20k',
        index: 4,
        weight: 9,
        // Ảnh ngựa hơi buồn
        image: 'https://via.placeholder.com/150/87CEEB/000000?text=Ngựa+Hơi+Buồn+20k', 
        wishes: 'Của ít lòng nhiều! Chúc bạn năm mới nhiều sức khỏe và bình an.'
    },
    {
        label: '10k',
        index: 5,
        weight: 9,
        // Ảnh ngựa buồn khóc
        image: 'https://via.placeholder.com/150/808080/FFFFFF?text=Ngựa+Khóc+10k', 
        wishes: 'Vui là chính! Đừng buồn nhé, chúc bạn năm mới luôn lạc quan yêu đời.'
    }
];

let currentRotation = 0;
let isSpinning = false;

// Lấy các element từ DOM
const spinBtn = document.getElementById('spinBtn');
const wheel = document.getElementById('wheel');
const modal = document.getElementById('resultModal');
const closeBtn = document.getElementsByClassName('close-btn')[0];
const horseImage = document.getElementById('horseImage');
const modalPrize = document.getElementById('modalPrize');
const modalWishes = document.getElementById('modalWishes');
const tickSound = document.getElementById('tickSound');
const winSound = document.getElementById('winSound');

// Gán sự kiện click cho nút quay
spinBtn.addEventListener('click', spinWheel);

// Gán các sự kiện để đóng modal
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
    // Đóng modal nếu click ra vùng ngoài (lớp phủ mờ)
    if (event.target == modal) {
        closeModal();
    }
});

// Hàm random theo tỷ lệ (weighted random) - giữ nguyên logic cũ
function getRandomPrize() {
    let rand = Math.random() * 100;
    let sum = 0;
    for (let prize of prizes) {
        sum += prize.weight;
        if (rand <= sum) {
            return prize;
        }
    }
    return prizes[prizes.length - 1]; // Fallback an toàn
}

// Hàm kích hoạt hiệu ứng pháo hoa
function triggerConfetti() {
    // Sử dụng thư viện canvas-confetti global
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 }, // Bắn từ vị trí hơi thấp hơn giữa màn hình để không che modal
            colors: ['#ffeb3b', '#e53935', '#ffffff', '#ffca28'], // Màu sắc lễ hội Tết
            disableForReducedMotion: true
        });
    }
}

// Hàm hiển thị modal kết quả với dữ liệu tương ứng
function showModal(prize) {
    // Cập nhật nội dung modal
    horseImage.src = prize.image;
    modalPrize.innerText = prize.label;
    modalWishes.innerText = prize.wishes;
    
    // Hiển thị modal bằng cách đổi display thành flex
    modal.style.display = 'flex';
    
    // Phát âm thanh chiến thắng (cần reset về 0 để phát lại được)
    winSound.currentTime = 0; 
    winSound.play().catch(e => console.log("Trình duyệt chặn tự động phát âm thanh, cần tương tác trước."));
    
    // Bắn pháo hoa chúc mừng
    triggerConfetti();
}

// Hàm đóng modal và reset trạng thái nút bấm
function closeModal() {
    modal.style.display = 'none';
    spinBtn.disabled = false; // Cho phép quay tiếp
}

// Hàm quay vòng quay chính
function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;
    spinBtn.disabled = true; // Vô hiệu hóa nút khi đang quay

    // Phát âm thanh tích tắc (reset và phát)
    tickSound.currentTime = 0;
    tickSound.play().catch(e => console.log("Cần tương tác với trang để phát âm thanh."));

    // 1. Xác định trước kết quả quay theo tỷ lệ
    const winningPrize = getRandomPrize();

    // 2. Tính toán góc quay đích
    // Góc của ô trúng thưởng là (index * 60 + 30). Để đưa ô này về vị trí 0 độ (mũi tên), cần quay đến 360 - góc đó.
    const targetRotation = 360 - (winningPrize.index * 60 + 30);
    // Quay thêm 8 vòng (8 * 360 = 2880 độ) để tạo cảm giác hồi hộp
    const extraSpins = 8 * 360; 
    
    // Tính toán chênh lệch góc để đảm bảo luôn quay tới
    let currentMod = currentRotation % 360;
    let diff = targetRotation - currentMod;
    if (diff < 0) diff += 360;
    
    const totalRotation = currentRotation + extraSpins + diff;

    // Áp dụng CSS transform để bắt đầu quay
    wheel.style.transform = `rotate(${totalRotation}deg)`;
    currentRotation = totalRotation; // Lưu lại góc quay hiện tại cho lần sau

    // 3. Xử lý khi kết thúc quay (sau 4s, khớp với transition trong CSS)
    setTimeout(() => {
        isSpinning = false;
        // Dừng âm thanh tích tắc
        tickSound.pause();
        
        // Hiển thị modal kết quả sau một khoảng dừng ngắn (300ms) cho tự nhiên
        setTimeout(() => {
            showModal(winningPrize);
        }, 300);
        
    }, 4000); 
}
