// IT007 OS Review - Main JavaScript
// ====================================

// Quiz Data - Extracted from TongHop_OnTap_TakeNote_Ch5-8.md
const quizData = [
    // Chapter 5 - Synchronization
    {
        id: 1,
        chapter: "ch5",
        question: "Các giải pháp đồng bộ được chia thành nhóm nào?",
        options: [
            "Busy waiting – Sleep & Wakeup",
            "Hardware – Software",
            "Atomic – Non-atomic",
            "User mode – Kernel mode"
        ],
        answer: 0,
        explanation: "Các giải pháp đồng bộ chia thành 2 nhóm chính: Busy waiting (kiểm tra liên tục) và Sleep & Wakeup (blocking - tiến trình bị block và HĐH đánh thức)."
    },
    {
        id: 2,
        chapter: "ch5",
        question: "Để tiến trình đợi trong monitor cần khai báo biến gì?",
        options: [
            "Biến điều kiện (condition variable)",
            "Biến mutex",
            "Biến semaphore",
            "Biến lock"
        ],
        answer: 0,
        explanation: "Monitor sử dụng condition variable để tiến trình đợi. Condition variable chỉ có 2 thao tác: wait() và signal()."
    },
    {
        id: 3,
        chapter: "ch5",
        question: "Trên hệ thống nhiều CPU, cấm ngắt KHÔNG đảm bảo mutual exclusion vì sao?",
        options: [
            "Chỉ cấm ngắt trên CPU hiện tại; CPU khác vẫn truy cập vùng nhớ chung",
            "Cấm ngắt không thể thực hiện được",
            "Cấm ngắt quá chậm",
            "Cấm ngắt gây deadlock"
        ],
        answer: 0,
        explanation: "Cấm ngắt chỉ có tác dụng trên CPU đang chạy. Các CPU khác trong hệ thống vẫn có thể truy cập vùng nhớ chia sẻ."
    },
    {
        id: 4,
        chapter: "ch5",
        question: "Đoạn mã thao tác dữ liệu chia sẻ gọi là gì?",
        options: [
            "Code segment",
            "Data segment",
            "Critical section",
            "Entry section"
        ],
        answer: 2,
        explanation: "Critical Section (vùng tranh chấp) là đoạn mã thao tác dữ liệu chia sẻ giữa các tiến trình/luồng."
    },
    {
        id: 5,
        chapter: "ch5",
        question: "Peterson và Bakery giống nhau ở điểm nào?",
        options: [
            "Đều là giải pháp busy waiting bằng phần mềm",
            "Đều cần hỗ trợ phần cứng",
            "Đều dùng semaphore",
            "Đều dùng monitor"
        ],
        answer: 0,
        explanation: "Peterson và Bakery đều là giải pháp đồng bộ thuộc nhóm busy waiting, được cài đặt hoàn toàn bằng phần mềm."
    },
    {
        id: 6,
        chapter: "ch5",
        question: "TestAndSet lock - phát biểu nào SAI?",
        options: [
            "Là giải pháp phần cứng",
            "Đảm bảo bounded waiting",
            "Là thao tác nguyên tử (atomic)",
            "Có thể gây busy waiting"
        ],
        answer: 1,
        explanation: "TestAndSet KHÔNG đảm bảo bounded waiting - có thể xảy ra starvation (một tiến trình có thể phải chờ vô hạn)."
    },
    {
        id: 7,
        chapter: "ch5",
        question: "Semaphore - phát biểu nào SAI?",
        options: [
            "wait(S) làm giảm giá trị semaphore",
            "signal(S) làm giảm giá trị semaphore",
            "Binary semaphore có giá trị 0 hoặc 1",
            "Counting semaphore dùng quản lý nhiều tài nguyên"
        ],
        answer: 1,
        explanation: "signal(S) làm TĂNG giá trị semaphore (S = S + 1), không phải giảm. wait(S) mới làm giảm (S = S - 1)."
    },
    {
        id: 8,
        chapter: "ch5",
        question: "Memory barrier là gì?",
        options: [
            "Vùng nhớ được bảo vệ",
            "Chỉ thị ép cập nhật bộ nhớ hiển thị đúng thứ tự với CPU khác",
            "Rào cản ngăn truy cập bộ nhớ",
            "Vùng nhớ dành riêng cho hệ điều hành"
        ],
        answer: 1,
        explanation: "Memory barrier là chỉ thị buộc CPU đảm bảo các thao tác đọc/ghi bộ nhớ được thực hiện và hiển thị đúng thứ tự với các CPU khác."
    },
    {
        id: 9,
        chapter: "ch5",
        question: "Giải pháp Dining philosopher nào gây deadlock?",
        options: [
            "Cho tối đa 4 người ngồi vào bàn",
            "Bất đối xứng: chẵn cầm phải trước, lẻ cầm trái",
            "Chỉ cầm khi cả 2 đũa sẵn sàng",
            "Mỗi người cầm đũa trái trước rồi đũa phải, không kiểm tra"
        ],
        answer: 3,
        explanation: "Nếu tất cả đều cầm đũa trái trước rồi chờ đũa phải mà không kiểm tra, sẽ tạo vòng chờ kín → deadlock."
    },
    {
        id: 10,
        chapter: "ch5",
        question: "Busy waiting và Sleep&Wakeup khác nhau ở đâu?",
        options: [
            "Busy waiting chỉ dùng được trên đơn CPU",
            "Sleep&Wakeup không cần hệ điều hành",
            "Sleep&Wakeup cần OS để block/wakeup tiến trình",
            "Busy waiting hiệu quả hơn Sleep&Wakeup"
        ],
        answer: 2,
        explanation: "Sleep&Wakeup yêu cầu hệ điều hành hỗ trợ để block tiến trình và đánh thức khi cần. Busy waiting thì tiến trình tự kiểm tra liên tục."
    },

    // Chapter 6 - Deadlock
    {
        id: 11,
        chapter: "ch6",
        question: "Deadlock xảy ra cần mấy điều kiện Coffman?",
        options: [
            "1 điều kiện",
            "2 điều kiện",
            "3 điều kiện",
            "Đủ cả 4 điều kiện"
        ],
        answer: 3,
        explanation: "Deadlock xảy ra khi đủ cả 4 điều kiện Coffman: Mutual exclusion, Hold and wait, No preemption, Circular wait."
    },
    {
        id: 12,
        chapter: "ch6",
        question: "\"RAG có chu trình thì deadlock\" - phát biểu nào đúng?",
        options: [
            "Luôn đúng",
            "Chỉ đúng khi mỗi loại tài nguyên có 1 instance",
            "Luôn sai",
            "Chỉ đúng khi có nhiều instance"
        ],
        answer: 1,
        explanation: "Chu trình trong RAG chỉ chắc chắn là deadlock khi mỗi loại tài nguyên có đúng 1 instance. Nếu nhiều instance, có chu trình chưa chắc deadlock."
    },
    {
        id: 13,
        chapter: "ch6",
        question: "Wait-for graph (WFG) - phát biểu nào SAI?",
        options: [
            "WFG chỉ chứa các tiến trình (không có tài nguyên)",
            "WFG dùng tốt nhất khi mỗi loại tài nguyên có 1 instance",
            "Đỉnh của WFG bao gồm cả process và resource",
            "Có chu trình trong WFG thì có deadlock"
        ],
        answer: 2,
        explanation: "WFG chỉ có đỉnh là process (không có resource). Cạnh Pi → Pj nghĩa là Pi đang chờ tài nguyên do Pj giữ."
    },
    {
        id: 14,
        chapter: "ch6",
        question: "\"Không cho phép ít nhất 1 trong 4 điều kiện cần\" là phương pháp nào?",
        options: [
            "Detection",
            "Prevention",
            "Avoidance",
            "Recovery"
        ],
        answer: 1,
        explanation: "Prevention (ngăn ngừa) là phương pháp phá vỡ ít nhất 1 trong 4 điều kiện Coffman để deadlock không thể xảy ra."
    },
    {
        id: 15,
        chapter: "ch6",
        question: "Tránh deadlock khi mỗi loại tài nguyên có nhiều thực thể dùng giải thuật nào?",
        options: [
            "Banker Algorithm",
            "Peterson Algorithm",
            "FIFO",
            "Round Robin"
        ],
        answer: 0,
        explanation: "Banker Algorithm được dùng để tránh deadlock (avoidance) khi hệ thống có nhiều instance của mỗi loại tài nguyên."
    },
    {
        id: 16,
        chapter: "ch6",
        question: "Mutual exclusion trong deadlock nghĩa là gì?",
        options: [
            "Các tiến trình phải chờ nhau",
            "Tài nguyên không thể bị thu hồi",
            "Ít nhất 1 tài nguyên được giữ theo chế độ không chia sẻ",
            "Tồn tại chuỗi chờ vòng"
        ],
        answer: 2,
        explanation: "Mutual exclusion trong ngữ cảnh deadlock nghĩa là ít nhất 1 tài nguyên được giữ theo chế độ không chia sẻ (chỉ 1 tiến trình dùng được)."
    },
    {
        id: 17,
        chapter: "ch6",
        question: "Avoidance trong xử lý deadlock làm gì?",
        options: [
            "Không để hệ thống đi vào unsafe state",
            "Phá vỡ 1 trong 4 điều kiện Coffman",
            "Phát hiện và phục hồi khi có deadlock",
            "Bỏ qua vấn đề deadlock"
        ],
        answer: 0,
        explanation: "Avoidance (tránh né) hoạt động bằng cách luôn giữ hệ thống ở trạng thái an toàn (safe state), không cấp phát nếu dẫn đến unsafe state."
    },
    {
        id: 18,
        chapter: "ch6",
        question: "RAG - phát biểu nào SAI?",
        options: [
            "Đỉnh gồm process và resource type",
            "Assignment edge đi từ resource đến process",
            "Request edge đi từ resource đến process",
            "RAG là đồ thị có hướng"
        ],
        answer: 2,
        explanation: "Request edge (cạnh yêu cầu) đi từ Process đến Resource (P → R), không phải ngược lại. Assignment edge đi từ R → P."
    },
    {
        id: 19,
        chapter: "ch6",
        question: "Phục hồi deadlock bằng terminate - cách nào hiệu quả?",
        options: [
            "Terminate tất cả tiến trình cùng lúc",
            "Terminate lần lượt từng tiến trình cho đến khi hết deadlock",
            "Chỉ terminate tiến trình có ưu tiên cao nhất",
            "Không terminate mà chờ timeout"
        ],
        answer: 1,
        explanation: "Cách hiệu quả là terminate lần lượt từng tiến trình (chọn victim phù hợp) cho đến khi phá được chu trình deadlock."
    },
    {
        id: 20,
        chapter: "ch6",
        question: "Điều kiện nào KHÔNG cần để deadlock xảy ra?",
        options: [
            "Mutual exclusion",
            "Hold and wait",
            "No preemption",
            "Áp thứ tự tài nguyên (resource ordering)"
        ],
        answer: 3,
        explanation: "Áp thứ tự tài nguyên là cách NGĂN NGỪA deadlock (phá circular wait), không phải điều kiện cần cho deadlock."
    },

    // Chapter 7 - Memory
    {
        id: 21,
        chapter: "ch7",
        question: "Phát biểu nào đúng về paging?",
        options: [
            "Physical memory chia thành frame, logical memory chia thành page",
            "Physical memory chia thành page, logical memory chia thành frame",
            "Cả page và frame đều ở physical memory",
            "Page và frame có kích thước khác nhau"
        ],
        answer: 0,
        explanation: "Trong paging: bộ nhớ vật lý chia thành các frame, bộ nhớ logic chia thành các page. Page và frame có kích thước bằng nhau."
    },
    {
        id: 22,
        chapter: "ch7",
        question: "Bộ nhớ còn trống nhưng không liên tục gọi là gì?",
        options: [
            "External fragmentation",
            "Internal fragmentation",
            "Page fault",
            "Thrashing"
        ],
        answer: 0,
        explanation: "External fragmentation là tình trạng có nhiều lỗ trống rời rạc trong bộ nhớ, không đủ liên tục để cấp phát cho tiến trình mới."
    },
    {
        id: 23,
        chapter: "ch7",
        question: "32 frames → frame index cần bao nhiêu bit?",
        options: [
            "5 bit",
            "6 bit",
            "4 bit",
            "32 bit"
        ],
        answer: 0,
        explanation: "32 = 2^5, nên cần 5 bit để đánh số 32 frame (từ 0 đến 31)."
    },
    {
        id: 24,
        chapter: "ch7",
        question: "Page table size với 128 pages, mỗi entry 4 bytes?",
        options: [
            "128 bytes",
            "256 bytes",
            "512 bytes",
            "1024 bytes"
        ],
        answer: 2,
        explanation: "Page table size = số pages × kích thước entry = 128 × 4 = 512 bytes."
    },
    {
        id: 25,
        chapter: "ch7",
        question: "TLB với α=0.9, x=240ns, ε=36ns → EAT là bao nhiêu?",
        options: [
            "276 ns",
            "300 ns",
            "264 ns",
            "240 ns"
        ],
        answer: 1,
        explanation: "EAT = ε + x(2-α) = 36 + 240×(2-0.9) = 36 + 240×1.1 = 36 + 264 = 300 ns."
    },
    {
        id: 26,
        chapter: "ch7",
        question: "First-fit là thuật toán chọn lỗ trống như thế nào?",
        options: [
            "Lỗ đầu tiên đủ lớn",
            "Lỗ nhỏ nhất đủ lớn",
            "Lỗ lớn nhất",
            "Lỗ tiếp theo từ vị trí cấp phát trước"
        ],
        answer: 0,
        explanation: "First-fit chọn lỗ trống đầu tiên (từ đầu danh sách) có kích thước đủ lớn để cấp phát."
    },
    {
        id: 27,
        chapter: "ch7",
        question: "Fixed partition gây ra loại fragmentation nào?",
        options: [
            "Internal fragmentation",
            "External fragmentation",
            "Cả hai loại",
            "Không gây fragmentation"
        ],
        answer: 0,
        explanation: "Fixed partition gây internal fragmentation vì mỗi partition có kích thước cố định, phần thừa trong partition không dùng được."
    },
    {
        id: 28,
        chapter: "ch7",
        question: "Page size = 4KB thì offset cần bao nhiêu bit?",
        options: [
            "10 bit",
            "11 bit",
            "12 bit",
            "13 bit"
        ],
        answer: 2,
        explanation: "4KB = 4096 bytes = 2^12 bytes, nên cần 12 bit để biểu diễn offset trong page."
    },
    {
        id: 29,
        chapter: "ch7",
        question: "TLB (Translation Lookaside Buffer) là gì?",
        options: [
            "Cache ánh xạ page → frame",
            "Bộ nhớ đệm cho I/O",
            "Vùng nhớ swap",
            "Bảng quản lý tiến trình"
        ],
        answer: 0,
        explanation: "TLB là cache lưu trữ ánh xạ page → frame thường dùng gần đây, giúp giảm thời gian tra page table."
    },
    {
        id: 30,
        chapter: "ch7",
        question: "Paging vs Segmentation - điểm khác nhau chính?",
        options: [
            "Paging chia đều, Segmentation chia không đều theo đoạn logic",
            "Paging dùng cho virtual memory, Segmentation thì không",
            "Segmentation nhanh hơn Paging",
            "Paging gây external fragmentation, Segmentation gây internal"
        ],
        answer: 0,
        explanation: "Paging chia bộ nhớ thành các phần bằng nhau (page/frame), còn Segmentation chia theo đoạn logic (code/data/stack) với kích thước khác nhau."
    },

    // Chapter 8 - Virtual Memory
    {
        id: 31,
        chapter: "ch8",
        question: "\"Chỉ nạp trang khi được yêu cầu\" là kỹ thuật nào?",
        options: [
            "Paging",
            "Segmentation",
            "Demand paging",
            "Swapping"
        ],
        answer: 2,
        explanation: "Demand paging là kỹ thuật chỉ nạp trang vào bộ nhớ khi tiến trình thực sự cần đến nó (lazy loading)."
    },
    {
        id: 32,
        chapter: "ch8",
        question: "LRU thay thế trang nào?",
        options: [
            "Trang ít được dùng gần đây nhất",
            "Trang vào sớm nhất",
            "Trang sẽ được dùng xa nhất trong tương lai",
            "Trang ngẫu nhiên"
        ],
        answer: 0,
        explanation: "LRU (Least Recently Used) thay thế trang ít được sử dụng gần đây nhất, dựa trên nguyên lý locality."
    },
    {
        id: 33,
        chapter: "ch8",
        question: "Belady anomaly xảy ra với thuật toán nào?",
        options: [
            "LRU",
            "OPT",
            "FIFO",
            "LFU"
        ],
        answer: 2,
        explanation: "Belady anomaly (page fault có thể tăng khi tăng số frame) xảy ra với FIFO, không xảy ra với LRU và OPT."
    },
    {
        id: 34,
        chapter: "ch8",
        question: "Thrashing là gì?",
        options: [
            "Page fault liên tục do thiếu frame",
            "Bộ nhớ bị phân mảnh",
            "Deadlock trong memory management",
            "Lỗi truy cập bộ nhớ"
        ],
        answer: 0,
        explanation: "Thrashing là tình trạng tiến trình dành phần lớn thời gian để xử lý page fault thay vì thực thi, do thiếu frame."
    },
    {
        id: 35,
        chapter: "ch8",
        question: "Working set (Δ) là gì?",
        options: [
            "Tập trang được dùng trong cửa sổ thời gian Δ",
            "Tổng số frame trong hệ thống",
            "Số lần page fault",
            "Kích thước page table"
        ],
        answer: 0,
        explanation: "Working set là tập các trang mà tiến trình tham chiếu trong cửa sổ thời gian Δ gần đây nhất."
    },
    {
        id: 36,
        chapter: "ch8",
        question: "Mục tiêu của page replacement là gì?",
        options: [
            "Tăng số frame",
            "Giảm kích thước page",
            "Giảm thiểu số page fault",
            "Tăng tốc độ I/O"
        ],
        answer: 2,
        explanation: "Mục tiêu của các thuật toán page replacement là giảm thiểu số lần page fault để tăng hiệu năng hệ thống."
    },
    {
        id: 37,
        chapter: "ch8",
        question: "OPT (Optimal) replacement thay trang nào?",
        options: [
            "Trang vào sớm nhất",
            "Trang ít dùng gần đây nhất",
            "Trang sẽ được dùng xa nhất trong tương lai",
            "Trang có kích thước lớn nhất"
        ],
        answer: 2,
        explanation: "OPT thay thế trang sẽ được dùng xa nhất trong tương lai. Đây là thuật toán tối ưu nhưng không thực tế vì không biết trước tương lai."
    },
    {
        id: 38,
        chapter: "ch8",
        question: "Thứ tự xử lý page fault đúng là gì?",
        options: [
            "Trap → Kiểm tra → Tìm frame → Ghi victim (nếu dirty) → Đọc trang → Cập nhật → Chạy lại",
            "Tìm frame → Trap → Đọc trang → Cập nhật → Chạy lại",
            "Đọc trang → Trap → Tìm frame → Cập nhật → Chạy lại",
            "Cập nhật → Đọc trang → Tìm frame → Trap → Chạy lại"
        ],
        answer: 0,
        explanation: "Quy trình: 1) Trap vào OS 2) Kiểm tra hợp lệ 3) Tìm frame trống/victim 4) Ghi victim nếu dirty 5) Đọc trang 6) Cập nhật 7) Chạy lại."
    },
    {
        id: 39,
        chapter: "ch8",
        question: "Locality (tính cục bộ) là gì?",
        options: [
            "Tập trang tham chiếu gần nhau",
            "Vùng nhớ dành riêng cho tiến trình",
            "Kích thước của working set",
            "Số frame cấp cho tiến trình"
        ],
        answer: 0,
        explanation: "Locality là nguyên lý cho rằng tiến trình có xu hướng tham chiếu đến một tập trang gần nhau trong một khoảng thời gian."
    },
    {
        id: 40,
        chapter: "ch8",
        question: "Khi xảy ra thrashing, giải pháp là gì?",
        options: [
            "Tăng số tiến trình",
            "Giảm đa chương / swap bớt tiến trình",
            "Tăng tốc độ I/O",
            "Giảm kích thước page"
        ],
        answer: 1,
        explanation: "Khi thrashing (tổng working set > số frame), cần giảm đa chương (số tiến trình) hoặc swap bớt tiến trình ra đĩa."
    }
];

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const chapterCards = document.querySelectorAll('.chapter-card');
const ctaButton = document.querySelector('.cta-button');
const filterButtons = document.querySelectorAll('.filter-btn');
const quizContainer = document.getElementById('quiz-container');
const correctCountEl = document.getElementById('correct-count');
const totalAnsweredEl = document.getElementById('total-answered');
const totalQuestionsEl = document.getElementById('total-questions');
const resetBtn = document.getElementById('reset-quiz');

// State
let userAnswers = {};
let currentFilter = 'all';
let shuffledQuestions = []; // Store shuffled options mapping
let shuffledQuestionOrder = []; // Store shuffled question order

// Shuffle array utility
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initQuiz();
    updateQuizStats();
});

// Navigation
function initNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.dataset.page;
            navigateTo(targetPage);
            navMenu.classList.remove('active');
        });
    });

    // Chapter cards
    chapterCards.forEach(card => {
        card.addEventListener('click', () => {
            const target = card.dataset.target;
            navigateTo(target);
        });
    });

    // CTA button
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            const target = ctaButton.dataset.target;
            navigateTo(target);
        });
    }
}

function navigateTo(pageId) {
    // Update nav links
    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageId);
    });

    // Update pages
    pages.forEach(page => {
        page.classList.toggle('active', page.id === pageId);
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Quiz
function initQuiz() {
    renderQuiz();
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.chapter;
            renderQuiz();
        });
    });

    // Reset button
    resetBtn.addEventListener('click', resetQuiz);
}

function renderQuiz() {
    let filteredQuestions = currentFilter === 'all' 
        ? quizData 
        : quizData.filter(q => q.chapter === currentFilter);

    // Shuffle question order if not already done for current filter
    const filterKey = currentFilter;
    if (!shuffledQuestionOrder[filterKey]) {
        const questionIds = filteredQuestions.map(q => q.id);
        shuffledQuestionOrder[filterKey] = shuffleArray(questionIds);
    }

    // Reorder questions based on shuffled order
    const orderedIds = shuffledQuestionOrder[filterKey];
    filteredQuestions = orderedIds
        .map(id => filteredQuestions.find(q => q.id === id))
        .filter(q => q !== undefined);

    totalQuestionsEl.textContent = filteredQuestions.length;

    // Shuffle options for each question if not already shuffled
    filteredQuestions.forEach(q => {
        if (!shuffledQuestions[q.id]) {
            // Create array of indices and shuffle
            const indices = q.options.map((_, i) => i);
            const shuffledIndices = shuffleArray(indices);
            shuffledQuestions[q.id] = {
                indices: shuffledIndices,
                // Map original answer to new position
                correctIndex: shuffledIndices.indexOf(q.answer)
            };
        }
    });

    quizContainer.innerHTML = filteredQuestions.map((q, index) => {
        const questionState = userAnswers[q.id];
        const answered = questionState !== undefined;
        const shuffleInfo = shuffledQuestions[q.id];
        const isCorrect = answered && questionState === shuffleInfo.correctIndex;
        
        return `
            <div class="quiz-question ${answered ? (isCorrect ? 'answered-correct' : 'answered-wrong') : ''}" data-id="${q.id}">
                <div class="question-header">
                    <span class="question-num">${index + 1}</span>
                    <span class="question-chapter">${getChapterName(q.chapter)}</span>
                    ${answered ? `<button class="btn-retry" data-qid="${q.id}">🔄 Làm lại</button>` : ''}
                </div>
                <p class="question-text">${q.question}</p>
                <div class="options">
                    ${shuffleInfo.indices.map((originalIndex, i) => {
                        const letter = String.fromCharCode(65 + i);
                        let optionClass = answered ? 'disabled' : '';
                        if (answered) {
                            if (i === shuffleInfo.correctIndex) optionClass += ' correct';
                            else if (i === questionState && questionState !== shuffleInfo.correctIndex) optionClass += ' wrong';
                        }
                        if (questionState === i) optionClass += ' selected';
                        
                        return `
                            <div class="option ${optionClass}" data-option="${i}">
                                <span class="option-letter">${letter}</span>
                                <span class="option-text">${q.options[originalIndex]}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="explanation ${answered ? 'show' : ''}">
                    <p class="explanation-title">💡 Giải thích:</p>
                    <p>${q.explanation}</p>
                </div>
            </div>
        `;
    }).join('');

    // Add click handlers for options
    document.querySelectorAll('.quiz-question').forEach(questionEl => {
        const qId = parseInt(questionEl.dataset.id);
        const shuffleInfo = shuffledQuestions[qId];
        
        questionEl.querySelectorAll('.option').forEach(optionEl => {
            optionEl.addEventListener('click', () => {
                if (userAnswers[qId] !== undefined) return;
                
                const selectedOption = parseInt(optionEl.dataset.option);
                userAnswers[qId] = selectedOption;
                
                // Update UI
                const isCorrect = selectedOption === shuffleInfo.correctIndex;
                questionEl.classList.add(isCorrect ? 'answered-correct' : 'answered-wrong');
                
                questionEl.querySelectorAll('.option').forEach((opt, i) => {
                    opt.classList.add('disabled');
                    if (i === shuffleInfo.correctIndex) opt.classList.add('correct');
                    if (i === selectedOption && !isCorrect) opt.classList.add('wrong');
                    if (i === selectedOption) opt.classList.add('selected');
                });
                
                // Add retry button
                const header = questionEl.querySelector('.question-header');
                if (!header.querySelector('.btn-retry')) {
                    const retryBtn = document.createElement('button');
                    retryBtn.className = 'btn-retry';
                    retryBtn.dataset.qid = qId;
                    retryBtn.textContent = '🔄 Làm lại';
                    retryBtn.addEventListener('click', () => retryQuestion(qId));
                    header.appendChild(retryBtn);
                }
                
                questionEl.querySelector('.explanation').classList.add('show');
                updateQuizStats();
            });
        });
    });

    // Add click handlers for retry buttons
    document.querySelectorAll('.btn-retry').forEach(btn => {
        btn.addEventListener('click', () => {
            const qId = parseInt(btn.dataset.qid);
            retryQuestion(qId);
        });
    });
}

function getChapterName(chapter) {
    const names = {
        'ch5': 'Chương 5 - Đồng bộ',
        'ch6': 'Chương 6 - Deadlock',
        'ch7': 'Chương 7 - Bộ nhớ',
        'ch8': 'Chương 8 - VM'
    };
    return names[chapter] || chapter;
}

function updateQuizStats() {
    const filteredQuestions = currentFilter === 'all' 
        ? quizData 
        : quizData.filter(q => q.chapter === currentFilter);
    
    let correct = 0;
    let answered = 0;
    
    filteredQuestions.forEach(q => {
        if (userAnswers[q.id] !== undefined && shuffledQuestions[q.id]) {
            answered++;
            if (userAnswers[q.id] === shuffledQuestions[q.id].correctIndex) correct++;
        }
    });
    
    correctCountEl.textContent = correct;
    totalAnsweredEl.textContent = answered;
}

function retryQuestion(qId) {
    // Remove user answer
    delete userAnswers[qId];
    // Re-shuffle options for this question
    const q = quizData.find(q => q.id === qId);
    const indices = q.options.map((_, i) => i);
    const shuffledIndices = shuffleArray(indices);
    shuffledQuestions[qId] = {
        indices: shuffledIndices,
        correctIndex: shuffledIndices.indexOf(q.answer)
    };
    // Re-render quiz
    renderQuiz();
    updateQuizStats();
}

function resetQuiz() {
    userAnswers = {};
    shuffledQuestions = []; // Reset shuffled options
    shuffledQuestionOrder = []; // Reset shuffled question order
    renderQuiz();
    updateQuizStats();
}

// Smooth scroll for TOC links
document.querySelectorAll('.toc a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            const navHeight = 80;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});
