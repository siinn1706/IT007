# TỔNG HỢP ÔN TẬP HDH (Chương 5–6–7–8) — 1 file

> File này là **bản gộp** của:
> - `TAKENOTE_bo_sung_Ch5-8.md` (ghi chú cá nhân của bạn + phần mình bổ sung)
> - `OnTap_HDH_Ch5-8.md` (tóm tắt lý thuyết + bộ trắc nghiệm đã giải)

## Lưu ý về “số chương”
Một số tài liệu/slide đánh số chương khác nhau (ví dụ có nơi Ch5 là Scheduling, có nơi Ch5 là Synchronization).  
Trong file này, mình giữ **tiêu đề theo chủ đề** để bạn học không bị lệch số chương:
- CPU Scheduling
- Synchronization
- Deadlock
- Memory & Virtual Memory

---

## PHẦN A — Lý thuyết + checklist (từ TAKENOTE đã bổ sung)

# TAKENOTE (bổ sung để ôn cuối kỳ Chương 5–6–7–8)

> Mình đã đọc file takenote của bạn và bổ sung các ý hay ra thi + chỉnh vài chỗ dễ nhầm. fileciteturn1file0

---

## 0) Sửa nhanh vài chỗ dễ nhầm (rất hay bị bắt lỗi)

- **Semaphore (kiểu “chuẩn” trong OS)**  
  - `wait(S)` (P): `S = S - 1`; nếu **S < 0** thì tiến trình **block** (đưa vào hàng đợi của semaphore).  
  - `signal(S)` (V): `S = S + 1`; nếu **S ≤ 0** thì **wakeup** một tiến trình đang đợi (đưa về **ready queue**).  
  - *Chú ý:* “wakeup” là **đưa về ready**, không phải “đưa vào block”.

- **Deadlock cần đủ 4 điều kiện Coffman**: mutual exclusion, hold&wait, no preemption, circular wait.  
  *Chỉ cần “thiếu 1 điều kiện” thì deadlock không xảy ra.*

- **RAG có chu trình**:  
  - Nếu **mỗi loại tài nguyên chỉ có 1 instance** → có chu trình **⇔** deadlock.  
  - Nếu **nhiều instance** → có chu trình **chưa chắc** deadlock (chỉ là dấu hiệu nguy cơ).

- **Paging vs Segmentation**  
  - Paging: chia **đều** (page/frame bằng nhau).  
  - Segmentation: chia **không đều** theo “đoạn” logic (code/data/stack…).

---

## 1) Bổ sung theo chương (ưu tiên phần cuối kỳ 5–6–7–8)

> Lưu ý: Ở nhiều tài liệu, số chương có thể hơi khác nhau. Mình giữ đúng “mạch nội dung” bạn đang ghi:  
> **Ch5: Đồng bộ (Semaphore/Monitor)** → **Ch6: Deadlock** → **Ch7: Cấp phát bộ nhớ + Paging/Segmentation** → **Ch8: Bộ nhớ ảo/Demand paging + thay trang**.

---

# Chương 5 – Đồng bộ (Synchronization)

### 5.1. Vùng tranh chấp (Critical Section) – 3 tính chất bắt buộc
1. **Mutual Exclusion**: tại một thời điểm chỉ 1 tiến trình/luồng ở CS.
2. **Progress**: CS rỗng và có người muốn vào thì phải chọn được ai vào (không “kẹt vô lý”).
3. **Bounded waiting**: mỗi tiến trình chỉ chờ hữu hạn lượt (tránh starvation).

### 5.2. Race condition là gì?
- **Race condition**: kết quả sai/không ổn định do **truy cập đồng thời dữ liệu chia sẻ** mà không đồng bộ.

### 5.3. Mutex vs Binary semaphore (hay hỏi)
- **Mutex**: khóa loại trừ tương hỗ, thường có khái niệm **owner** (ai lock thì người đó unlock).  
- **Binary semaphore**: giá trị 0/1, có thể dùng giống mutex nhưng **không nhất thiết** có owner (tùy thư viện/OS).

### 5.4. Semaphore “đếm” (counting) dùng khi nào?
- Khi có **k tài nguyên giống nhau** (k máy in, k buffer slot, k kết nối…).  
- Thường khởi tạo `S = k`.

### 5.5. Bounded-buffer (Producer/Consumer) – mẫu code chuẩn
- Semaphore thường dùng:
  - `mutex = 1` (khóa truy cập buffer)
  - `empty = N` (số ô trống)
  - `full = 0` (số ô đầy)

- Producer:
  - `wait(empty)` → `wait(mutex)` → put → `signal(mutex)` → `signal(full)`
- Consumer:
  - `wait(full)` → `wait(mutex)` → get → `signal(mutex)` → `signal(empty)`

> Nếu chỉ dùng `empty/full` mà **không có mutex**, vẫn có thể lỗi vì 2 tiến trình cùng sửa buffer cùng lúc.

### 5.6. Monitor & Condition variable (tóm tắt đúng “ý thi”)
- Monitor: gom dữ liệu chia sẻ + hàm thao tác vào 1 khối, bảo đảm **chỉ 1 luồng vào monitor** tại một thời điểm.
- Condition variable: chỉ có `wait()` và `signal()`:
  - `wait(cv)`: nhả lock của monitor và ngủ.
  - `signal(cv)`: đánh thức 1 tiến trình đang đợi.
- Thực tế nhiều hệ dùng kiểu **Mesa**: sau `signal`, tiến trình được đánh thức phải **kiểm tra lại điều kiện** bằng vòng `while`.

### 5.7. Dining philosophers – cách tránh deadlock (nhớ 2 ý)
- Cách phổ biến:
  - Chỉ cho tối đa **4** người ngồi vào bàn (nếu có 5 đũa).
  - Hoặc **bất đối xứng**: triết gia chẵn cầm phải trước, lẻ cầm trái trước.
  - Hoặc chỉ cầm khi **cả 2 đũa sẵn**.
- Tránh deadlock chưa chắc tránh được **starvation** (đói).

### 5.8. Memory ordering & Memory barrier (hay gặp gần đây)
- Trên CPU/compiler hiện đại có thể **đảo thứ tự đọc/ghi** để tối ưu.
- **Memory barrier**: “chặn” để đảm bảo thứ tự hiển thị bộ nhớ như mong muốn khi đồng bộ.

---

# Chương 6 – Deadlock

### 6.1. Định nghĩa
- Deadlock: tập tiến trình **mỗi thằng giữ một phần tài nguyên và chờ phần còn lại**, tạo vòng chờ.

### 6.2. 4 điều kiện Coffman (cần thuộc)
1) Mutual exclusion  
2) Hold and wait  
3) No preemption  
4) Circular wait

### 6.3. RAG & WFG (phân biệt rõ)
- **RAG**: có **process** và **resource type**  
  - Request: `P → R`  
  - Assignment: `R → P`
- **WFG**: chỉ còn **process**, có cạnh `Pi → Pj` nghĩa là Pi đang chờ tài nguyên do Pj giữ.  
  - WFG dùng tốt nhất khi **mỗi loại tài nguyên 1 instance**.

### 6.4. 4 hướng xử lý deadlock (hay hỏi lý thuyết)
1) **Ignore**: chấp nhận có deadlock (một số hệ làm vậy vì hiếm xảy ra).  
2) **Prevention**: phá 1 trong 4 điều kiện (ví dụ áp thứ tự cấp phát tài nguyên để phá circular wait).  
3) **Avoidance**: né unsafe state (Banker).  
4) **Detection & Recovery**: phát hiện rồi phục hồi (kill process, thu hồi tài nguyên…).

### 6.5. Banker (cách làm bài “chuỗi an toàn”)
- Bảng thường có:
  - `Available` (Work ban đầu)
  - `Max`
  - `Allocation`
  - `Need = Max - Allocation`
- Thuật toán tìm chuỗi an toàn:
  1) Work = Available; Finish[i]=false
  2) Tìm i sao cho Finish[i]=false và Need[i] ≤ Work
  3) Work = Work + Allocation[i]; Finish[i]=true
  4) Lặp đến khi không tìm được nữa
- Nếu tất cả Finish=true → **safe** (có chuỗi an toàn). Ngược lại → **unsafe**.

> Mẹo: khi đề hỏi “Request của Pi có được cấp không?”, luôn kiểm tra:  
> `Request ≤ Need` và `Request ≤ Available`, rồi giả lập cấp phát và chạy Banker xem còn safe không.

---

# Chương 7 – Bộ nhớ (cấp phát liên tục + Paging/Segmentation)

### 7.1. Fixed partition vs Variable partition
- Fixed partition: dễ quản lý, nhưng hay bị **internal fragmentation** (thừa trong partition).
- Variable partition: linh hoạt, nhưng dễ **external fragmentation** (nhiều lỗ trống rời rạc).

### 7.2. 4 thuật toán chọn lỗ trống (bạn đã ghi đúng, bổ sung cách nhớ)
- **First-fit**: lỗ đầu tiên đủ lớn (nhanh).
- **Best-fit**: lỗ “vừa khít nhất” (dễ tạo nhiều lỗ nhỏ).
- **Worst-fit**: lỗ lớn nhất (hy vọng còn lại vẫn đủ to).
- **Next-fit**: tiếp tục từ vị trí lần cấp phát trước (giống first-fit nhưng không quay lại đầu).

### 7.3. Paging – công thức dịch địa chỉ (hay ra tính toán)
- Địa chỉ logic = `(p, d)` (page number, offset)
- Địa chỉ vật lý = `(frame(p), d)`
- Nếu page size = `2^k` bytes → **offset = k bit**  
  Ví dụ: 4KB = 2^12 → offset 12 bit.

### 7.4. Page table, TLB và EAT (thuộc 1 công thức)
- TLB: cache ánh xạ page → frame.
- Khi page table nằm trong RAM:
  - Hit: `ε + x`
  - Miss: `ε + 2x`
  - **EAT = ε + x(2 − α)**  
    - α: hit ratio  
    - ε: thời gian tra TLB  
    - x: 1 lần truy cập RAM

---

# Chương 8 – Bộ nhớ ảo (Virtual Memory) + Demand paging + Thay trang

### 8.1. Demand paging
- Chỉ nạp trang khi cần → gặp trang chưa có trong RAM thì **page fault**.

### 8.2. Quy trình xử lý page fault (cần nhớ thứ tự ý chính)
1) Trap vào kernel (OS)  
2) Kiểm tra hợp lệ (illegal → kill)  
3) Tìm frame trống hoặc chọn victim  
4) Nếu victim bẩn → ghi ra đĩa  
5) Đọc trang cần vào frame  
6) Cập nhật page table/TLB  
7) Cho tiến trình chạy lại lệnh bị lỗi

### 8.3. Thuật toán thay trang (page replacement)
- **FIFO**: thay trang vào sớm nhất; có thể bị **Belady anomaly**.
- **OPT**: thay trang được dùng xa nhất tương lai (tốt nhất, nhưng chỉ dùng để so sánh).
- **LRU**: thay trang ít dùng gần đây nhất (gần OPT).

### 8.4. Thrashing & Working set
- Thrashing: page fault liên tục do thiếu frame.
- Working set (Δ): tập trang được dùng trong cửa sổ thời gian Δ.
- Tổng working set > số frame → thrashing → giảm đa chương / swap bớt tiến trình.

### 8.5. Swap & pagefile
- Windows hay có `pagefile.sys` (bạn ghi `page.sys` dễ nhầm tên).

---

## 2) “Checklist” ôn thi nhanh (bám đúng kiểu câu trắc nghiệm)
- Semaphore: phân biệt **wait/signal**, khi nào block/wakeup.
- Monitor: condition variable chỉ `wait/signal`; thường phải dùng `while`.
- Deadlock: 4 điều kiện; chu trình trong RAG chỉ chắc chắn deadlock khi 1 instance/type.
- Banker: tính Need, tìm safe sequence, kiểm Request.
- Memory: internal vs external fragmentation; first/best/worst/next fit.
- Paging: offset bit, page number bit; dịch địa chỉ.
- TLB/EAT: **EAT = ε + x(2 − α)**.
- Replacement: FIFO/OPT/LRU; Belady anomaly; thrashing/working set.

---

# (Ghi chú gốc của bạn – giữ nguyên để bạn đối chiếu)

```txt
Mid-term: 1,2,3,4
Final-term: 5,6,7,8,9

Chapter 1:
    
    - Hardware-manager program. 
    - Giúp người dùng sử dụng hệ thống. 
    - User: people, account... 
    - Hardware: tài nguyên hữu hình and vô hình. 
    - Application program: giải quyết bài toán.
    - *Chức năng chính: 6. 

    - Phân loại máy tính: 6. 

        - PC: portable computer. 
        - Server: máy cung cấp dịch vụ, lớn, mạnh. 
        - PDA: personal digital accessory. 
        - Fablet: combination giữa laptop and tablet. 
        - RTOS: real-time operating system. 

    - Phân loại xử lí: 5. 

        - Uniprogramming OS (đơn chương): không cần hệ điều hành. 
            - Trước uniprogramming: batch system (xử lí theo lô). 
            - Hardware. 
        - Multiprogramming OS (đa chương): cần hệ điều hành. 
            - Software. 
            - OS ra đời. 
        - Multitasking vs Multiprogramming: task tương tác người dùng. 
        - Timeshare(Lập lịch cho CPU): multitasking. 
        - Phân tán: cơ sở dữ liệu phân tán, chung, phân tán, kết hợp thay đổi từng thời điểm 1. 
        - Oracle: nổi tiếng về phân tán. 
        - Nhúng realtime: mang tính điều khiển. 
        - *Spooling: hàng đợi. 

    - 3 phần chính: CPU, disk (SUB MEMORY), MEMORY. 
    - Program(disk) load vào MEMORY: job. 
    - job tương tác với user: task. 
    - Sercurity: bảo vệ ngoài. 
    - Protection: đảm bảo an ninh nội bộ. 
    - CPU không trực tiếp quản lí. 
    - Hard real-time and Soft real-time. 
    - OS giữa user-program. 

    - operater(Thao tác đơn) -> script(xử lí theo lô) -> program. 
    - Timeshare quan trọng nhất. 

Chapter 2:

    - Omnibus: các thành phần nối với bus chung. 
    - Secondary-memory: đĩa cứng. 
    
    - Mô hình máy tính:

        CPU--------------MEMORY-----------------IO
                            |
                            |
                    Secondary MEMORY

    - RAM: 

        - ROM(Read only memory). 
        - RAM(Read and write memory). 
        - *Hybrid(combined of 2): lưu vĩnh viễn + thay đổi dữ liệu. 
            NVRAM.

    - Càng dễ dùng càng yếu bảo mật. 

    - Processing:

        - Programm. 
        - Main memory. 
        - Dispath CPU(cấp phát). 
    
    - Program and Process. 

        - Program sẽ thành Process. 
        - Second vs main memory. 
        - Không cấp phát và cấp phát CPU. 

    - HDD đọc theo BLOCK. 
    - FLASH MEMORY không bền. 
    - REGISTER và MEMORY đều là RAM(Ramdom Access memory). 

        - Giải quyết tắc nghẽn cỗ chai. 
        - DRAM: 1 transitor / SRAM: 6 transitor. 
        - REGISTER: SR, CACHE: SR, MAIN MEMORY: DR. 

    - Online: 6 above, Offline: 2 under. 
    - Accounting: lưu lịch sử hệ thống, dùng càng lâu file nhật ký càng nhiều. 

    - SYSTEM CALL:

        - USER / KERNEL. 
        - USER -(SYSTEM CALL)> OS(KERNEL) -> USER. 
        - Phần không cần đưa vào main mem -> SYSTEM PROGRAM. 

.            USER:
                                USER PROGRAM <-------------
                                    |                      |
                                    |                      |
OS----------KERNEL(MAIN MEM):       |                      |
|                                (SYSTEM CALL)---------(return result to user)
|
|
(SYSTEM PROGRAM) k dc load vào main mem -> SECONDARY MEM               

    - BIOS: Basic input output systemProce.


Chapter 5:

    - Semaphore: value, link list, tránh busy waiting.
        - Block: waiting.
        - Wakeup: from queue to block.
        - 2 tác vụ: wait giảm value nhỏ hơn 0 thì block, signal tăng value âm thì wakeup.
        - Automic: đơn nguyên.
        - Cost: chấp nhận dc.
        - Dù tránh busy waiting thì vẫn dính.
        - Wait: tranh giành resource, signal ngược lại.

*    - Bài toán đồng hành (conquerence): bài 8

            P1 -> P5 (S1)
            |
            -----------(S2)
                        |
            P2 -> P3(S3)---------(S5) 
                |(S4)   |         |
               -> P4 -> P6(S6) -> P7(S7)

            S1.value = S2.value = ... = S7.value = 0
            semaphore: s1, ..., s7

            P1: signal(s1, s2)
            P2: signal(s3, s4)
            P3: signal(s5), wait(s3)
            P4: signal(s6), wait(s4)
            P5: wait(s1)
            P6: wait(s2, s6), signal(s7)
            P7: wait(s5, s7)

Chapter 6:

    - Mutex.
    - Process vừa hold vừa wait.
    - Non preemtive.
    - Chu trình đợi
    - Thiếu 1/4 điều kiện, k xảy ra deadlock.
    - RGA.
    - K chứa chu trình, k deadlock.
    - Ưu tiên cao, chạy trước.

Chapter 7:

    - Best fit: vừa nhỏ nhất.
    - Worst fit: vừa lớn nhất.
    - First fit: cái đầu tiên từ đầu.
    - Next fit: cái đầu tiên từ vị trí cấp phát cuối.
    - Phân trang: logic -> physic.
        - Instuction to Ram.
        - Băm bằng nhau: phân trang, k bằng nhau: phân đoạn.

    - Page table nằm ở cache và bộ nhớ chính.

Chapter 8:

    - Swap in từ bộ nhớ phụ sang bộ nhớ chính.
    - Phân trang đều, phân đoạn không đều.
    - 3 ưu điểm *.
    - File page.sys trong windows.
    - Hiểu sơ đồ.
        Từ bộ nhớ phụ, tham chiếu vào page table.
        
    - Tránh lỗi trang để chạy nhanh.

2021-2022

Monitor
Chuỗi an toàn
Best fit, next fit, worse fit
Khung trang
Bài tập semaphore
Bài tập về chuỗi an toàn
Đồ thị cấp phát tài nguyên
Sleep and wake up
TLB
Thay thế trang
1010101011011101
Ngăn deadlock: chỉ cần 1 điều kiện xảy ra,
Tránh deadlock: cần đầy đủ thông tin tiến trình
Bỏ qua: chấp nhận deadlock xảy ra
Critical region: nhiều đoạn code hợp lại
Sleep and wakeup cần hệ điều hành hổ trợ
Binary semaphore có 2 giá trị, counting semaphore có nhiều giá trị
Đồ thị wait for chỉ có các tiến trình
Đồ thị cấp phát tài nguyên: có hướng, cạnh yêu cầu cạnh cấp phát, tiến trình và loại tài nguyên 
Không gian địa chỉ ảo 32 bit, 4KB kích thước trang: 12 bit offset, 20bit page number
Kích thước mỗi mục (entry): 2MB = 2^21, 2^(21-20) = 2 byte = 16 bit   
Chiều semaphore: signal -> wait
Effective memory reference time = EAT
Đồ thị có chu trình thì có deadlock
Available = available + allocation (nếu need nhỏ hơn available)

```


---

## PHẦN B — Tóm tắt ôn tập + Bộ trắc nghiệm đã giải (từ OnTap)

# Ôn tập Hệ Điều Hành – Chương 5–6–7–8 (tóm tắt lý thuyết + trắc nghiệm đã giải)

> Phạm vi: **Chương 5–6–7–8** (theo mạch nội dung thường dùng: Scheduling → Synchronization → Deadlock → Memory/Virtual Memory).  
> Bộ trắc nghiệm được lọc từ các đề bạn đã gửi và **giải kèm giải thích ngắn**.

---

## Mục lục
- [Chương 5 – CPU Scheduling](#chương-5--cpu-scheduling)
- [Chương 6 – Process Synchronization](#chương-6--process-synchronization)
- [Chương 7 – Deadlock](#chương-7--deadlock)
- [Chương 8 – Memory Management & Virtual Memory](#chương-8--memory-management--virtual-memory)
- [Bộ trắc nghiệm đã giải (lọc theo chương)](#bộ-trắc-nghiệm-đã-giải-lọc-theo-chương)
  - [Chương 6 – Trắc nghiệm](#chương-6--trắc-nghiệm)
  - [Chương 7 – Trắc nghiệm](#chương-7--trắc-nghiệm)
  - [Chương 8 – Trắc nghiệm](#chương-8--trắc-nghiệm)

---

# Chương 5 – CPU Scheduling

## 1) Khái niệm cốt lõi
- **CPU burst / I/O burst**: tiến trình chạy CPU một đoạn, rồi chờ I/O, rồi lại quay về CPU.
- **Scheduling**: chọn tiến trình nào được chạy CPU tiếp theo.
- **Preemptive vs Non-preemptive**
  - *Non-preemptive*: đã cấp CPU thì chạy cho tới khi tự nhường (block/exit).
  - *Preemptive*: HĐH có thể “giành” CPU (hết quantum, có tiến trình ưu tiên cao hơn, v.v.).

## 2) Tiêu chí đánh giá
- **CPU utilization** (tận dụng CPU), **throughput** (số tiến trình hoàn thành / thời gian)
- **Turnaround time** = thời gian hoàn tất − thời gian đến
- **Waiting time** = tổng thời gian nằm trong ready queue
- **Response time** = thời gian từ lúc đến đến lần đầu được chạy CPU

## 3) Các giải thuật hay thi
- **FCFS**: tới trước chạy trước (dễ bị “đoàn tàu” – convoy effect).
- **SJF / SRTF**
  - SJF: chọn burst ngắn nhất (non-preemptive).
  - SRTF: “ngắn nhất còn lại” (preemptive).
  - Ưu: giảm waiting trung bình; Nhược: cần ước lượng burst, có thể starvation.
- **Priority scheduling**: ưu tiên cao chạy trước; cần **aging** để chống starvation.
- **Round Robin (RR)**: mỗi tiến trình một **quantum**; quantum nhỏ → phản hồi tốt nhưng overhead context switch tăng.
- **Multilevel queue / Multilevel feedback queue**: nhiều hàng đợi; feedback queue thường “đẩy xuống” khi dùng CPU nhiều.

## 4) Ghi nhớ nhanh
- RR ≈ “chia time slice”
- SJF tốt về waiting nhưng “khó biết burst”
- Priority cần **aging**
- Preemptive thường cho phản hồi tốt hơn nhưng phức tạp hơn

---

# Chương 6 – Process Synchronization

## 1) Vùng tranh chấp (Critical Section)
Bài toán CS yêu cầu giải pháp đúng phải thỏa:
1. **Mutual exclusion**: không có 2 tiến trình cùng ở CS.
2. **Progress**: nếu CS rỗng và có tiến trình muốn vào thì phải quyết được ai vào, không bị trì hoãn vô hạn do tiến trình “không liên quan”.
3. **Bounded waiting**: mỗi tiến trình chỉ phải chờ hữu hạn (tránh starvation).

## 2) Nhóm giải pháp đồng bộ
- **Busy waiting (spin)**: kiểm tra liên tục.
- **Sleep & Wakeup (blocking)**: tiến trình bị block và HĐH đánh thức.

## 3) Công cụ/hình thức đồng bộ
- **Atomic**: test-and-set, compare-and-swap, disable interrupt (chỉ chắc trên **1 CPU**).
- **Mutex lock**: khóa loại trừ tương hỗ.
- **Semaphore**
  - **Binary** (0/1) ~ giống mutex (nhưng mutex thường có “owner” rõ).
  - **Counting**: đếm số tài nguyên.
  - Quy ước thường dùng:
    - `wait(S)`: S--; nếu **S < 0** thì block.
    - `signal(S)`: S++; nếu **S ≤ 0** thì wake một tiến trình đang đợi.
- **Monitor + condition variable**
  - Vào monitor qua **hàm trong monitor**.
  - Condition variable chỉ thao tác bằng `wait()`/`signal()`.

## 4) Các bài toán kinh điển
- **Bounded-buffer (Producer/Consumer)**: cần `empty`, `full`, và **mutex** cho buffer.
- **Readers–Writers**: có thể có Writer starvation nếu ưu tiên Reader.
- **Dining philosophers**:
  - Cầm trái rồi cầm phải đồng loạt → dễ deadlock.
  - Giảm deadlock: cho tối đa 4 người, hoặc bất đối xứng, hoặc chỉ cầm khi **cả 2 đũa** sẵn sàng.
  - Starvation vẫn có thể nếu không thiết kế công bằng.

## 5) Memory ordering & barrier
- CPU/compiler có thể **reorder** load/store.
- **Memory barrier**: ép thứ tự/hiển thị cập nhật bộ nhớ đúng như mong muốn.

---

# Chương 7 – Deadlock

## 1) Định nghĩa
Deadlock: tiến trình bị kẹt vì **chờ tài nguyên**/sự kiện sẽ không bao giờ xảy ra.

## 2) 4 điều kiện cần (Coffman)
1. **Mutual exclusion**
2. **Hold and wait**
3. **No preemption**
4. **Circular wait**

## 3) Resource Allocation Graph (RAG) & Wait-for graph (WFG)
- RAG: đỉnh gồm **process** và **resource type**.
  - Request edge: **P → R**
  - Assignment edge: **R → P**
- Nếu **mỗi resource type chỉ 1 instance**:
  - RAG có **chu trình ⇔ deadlock**
  - WFG có **chu trình ⇔ deadlock**

## 4) Cách xử lý deadlock
- **Prevention**: phá ít nhất 1 trong 4 điều kiện cần.
- **Avoidance**: không để vào **unsafe state** (Banker).
- **Detection & Recovery**: phát hiện rồi phục hồi (kill process, thu hồi tài nguyên nếu có thể).

---

# Chương 8 – Memory Management & Virtual Memory

## 1) Address & binding
- **Logical (virtual) address** vs **Physical address**
- Binding: compile time / load time / run time.

## 2) Contiguous allocation (phân vùng)
- Fixed partitioning → **internal fragmentation**
- Variable partitioning → **external fragmentation**
- First-fit / Best-fit / Worst-fit / Next-fit

## 3) Paging
- Pages / Frames
- Page table: ánh xạ **page → frame**
- Dịch địa chỉ: `(p, d)` → `(frame(p), d)`

## 4) TLB & EAT
- TLB = cache ánh xạ page→frame.
- **EAT = ε + x(2 − α)**

## 5) Virtual memory: demand paging + page fault
- Các bước xử lý page fault: trap → tìm frame/victim → I/O → cập nhật page table/TLB → chạy lại.

## 6) Page replacement
- FIFO (có Belady anomaly), OPT, LRU.

## 7) Thrashing & Working set
- Working set, thrashing, giảm đa chương / swap out.

---

# Bộ trắc nghiệm đã giải (lọc theo chương)

> Trình bày: mỗi câu có [Năm-HK] và “Câu số”, kèm đáp án và giải thích ngắn.

---

## Chương 6 – Trắc nghiệm (Synchronization)

### Nhóm: critical section, semaphore/monitor, atomic, memory barrier

**[2022-2023 HK1] Câu 2**: Các giải pháp đồng bộ được chia thành nhóm nào?  
→ **Đáp án: A** (Busy waiting – Sleep & Wakeup)

**[2022-2023 HK1] Câu 10**: Để tiến trình đợi trong monitor cần khai báo biến gì?  
→ **Đáp án: A** (biến điều kiện)

**[2022-2023 HK1] Câu 12**: Giải pháp nào KHÔNG cùng nhóm với các giải pháp còn lại (Semaphore/Monitor/Critical Region/Cấm ngắt)?  
→ **Đáp án: D** (Cấm ngắt là hướng phần cứng; các cái kia là công cụ/khái niệm đồng bộ mức cao)

**[2022-2023 HK1] Câu 18**: Trên hệ nhiều CPU, cấm ngắt không đảm bảo mutual exclusion vì sao?  
→ **Đáp án: A** (chỉ cấm trên CPU hiện tại; CPU khác vẫn truy cập vùng nhớ chung)

**[2022-2023 HK1] Câu 25**: Lời giải CS KHÔNG cần thỏa mãn tính chất nào?  
→ **Đáp án: B** ((3),(5) không phải yêu cầu bắt buộc)

**[2022-2023 HK2] Câu 3**: Đoạn mã thao tác dữ liệu chia sẻ gọi là gì?  
→ **Đáp án: C** (Critical section)

**[2022-2023 HK2] Câu 6**: `region v when B do S` nghĩa là gì?  
→ **Đáp án: B** (khi thực thi S thì độc quyền truy cập v; “when B” là điều kiện canh gác)

**[2022-2023 HK2] Câu 7**: Peterson & Bakery giống nhau điểm nào?  
→ **Đáp án: A** (đều là busy waiting bằng phần mềm)

**[2022-2023 HK2] Câu 8**: TestAndSet lock – phát biểu SAI?  
→ **Đáp án: B** (không đảm bảo bounded waiting; có thể starvation)

**[2022-2023 HK2] Câu 13**: CS cần thỏa tính chất nào?  
→ **Đáp án: C** ((1) mutual exclusion, (2) progress, (5) bounded waiting)

**[2023-2024 HK1] Câu 4**: Mutex – câu SAI?  
→ **Đáp án: D** (`signal(S)` không phải để “xin tài nguyên”; thường `wait()` mới là xin)

**[2023-2024 HK1] Câu 7**: Condition variable KHÔNG có đặc điểm nào?  
→ **Đáp án: C** (không được truy cập từ ngoài monitor)

**[2023-2024 HK1] Câu 13**: Peterson đúng trên máy hiện đại cần gì?  
→ **Đáp án: B** (memory barrier)

**[2023-2024 HK1] Câu 14**: Truy cập đồng thời dữ liệu chia sẻ → gọi là gì?  
→ **Đáp án: A** (race condition)

**[2023-2024 HK1] Câu 15**: Peterson có thể sai trên máy hiện đại do?  
→ **Đáp án: B** (reordering bởi CPU/compiler)

**[2023-2024 HK1] Câu 16**: Bounded-buffer chỉ dùng `empty/full` (không mutex) – nhận xét đúng?  
→ **Đáp án: B** (thiếu mutual exclusion khi thao tác buffer)

**[2023-2024 HK1] Câu 24**: Dining philosopher – phát biểu đúng?  
→ **Đáp án: C** (chỉ cầm khi cả 2 đũa sẵn sàng → tránh deadlock, vẫn có thể starvation)

**[2023-2024 HK1] Câu 25**: Semaphore – phát biểu đúng?  
→ **Đáp án: B** (thứ tự wait/signal & giá trị khởi tạo ảnh hưởng đúng đắn/hiệu suất)

**[2023-2024 HK2] Câu 3**: Semaphore – phát biểu SAI?  
→ **Đáp án: B** (signal không phải để “xin tài nguyên”)

**[2023-2024 HK2] Câu 5**: Giải pháp đồng bộ nào không cần OS hỗ trợ?  
→ **Đáp án: D** (Peterson)

**[2023-2024 HK2] Câu 8**: Reader-Writer (ưu tiên Reader) – phát biểu SAI?  
→ **Đáp án: D** (mutex không dùng để loại trừ cho Writer; nó bảo vệ readcount)

**[2023-2024 HK2] Câu 15**: Memory barrier là gì?  
→ **Đáp án: B** (chỉ thị ép cập nhật bộ nhớ “hiển thị” đúng thứ tự với CPU khác)

**[2024-2025 HK1] Câu 2**: Busy waiting và Sleep&Wakeup khác nhau ở?  
→ **Đáp án: C** (Sleep&Wakeup cần OS để block/wakeup)

**[2024-2025 HK1] Câu 8**: Semaphore – phát biểu SAI?  
→ **Đáp án: B** (signal **tăng** semaphore, không giảm)

**[2024-2025 HK1] Câu 10**: 2 mô hình bộ nhớ phổ biến?  
→ **Đáp án: B** (strong ordering vs weak ordering)

**[2024-2025 HK1] Câu 12**: Giải pháp Dining philosopher gây deadlock?  
→ **Đáp án: D** (cầm trái trước rồi phải, không kiểm tra)

**[2024-2025 HK1] Câu 14**: Monitor – phát biểu SAI?  
→ **Đáp án: D** (condition variable không cho truy cập tùy ý từ ngoài)

**[2024-2025 HK1] Câu 20**: CS solution KHÔNG cần đảm bảo?  
→ **Đáp án: C** (không bắt buộc “liên tục kiểm tra điều kiện” = busy waiting)

---

## Chương 7 – Trắc nghiệm (Deadlock)

**[2022-2023 HK1] Câu 4**: “RAG có chu trình thì deadlock” – phát biểu nào sai?  
→ **Đáp án: B** (chu trình chỉ chắc chắn deadlock khi mỗi resource type có 1 instance)

**[2022-2023 HK1] Câu 5**: Hệ thống nào deadlock?  
→ **Đáp án: A** (chỉ hệ (1) có vòng chờ kín)

**[2022-2023 HK1] Câu 7**: Chuỗi nào KHÔNG an toàn?  
→ **Đáp án: D** (đến bước P4 thì thiếu R4)

**[2022-2023 HK1] Câu 20**: Wait-for graph – phát biểu SAI?  
→ **Đáp án: C** (đỉnh là **process**, không phải resource)

**[2022-2023 HK1] Câu 22**: Phát biểu đúng?  
→ **Đáp án: D** (phục hồi bằng cách chấm dứt tiến trình để phá chu trình)

**[2022-2023 HK1] Câu 23**: “Không cho phép ít nhất 1 trong 4 điều kiện cần” là phương pháp nào?  
→ **Đáp án: B** (prevention)

**[2022-2023 HK2] Câu 5**: Deadlock xảy ra cần mấy điều kiện?  
→ **Đáp án: C** (cần đủ **4**)

**[2022-2023 HK2] Câu 11**: Tránh deadlock khi mỗi loại tài nguyên có nhiều thực thể dùng giải thuật nào?  
→ **Đáp án: A** (Banker)

**[2022-2023 HK2] Câu 14**: RAG – phát biểu SAI?  
→ **Đáp án: C** (cạnh yêu cầu phải là **P → R**)

**[2022-2023 HK2] Câu 18**: Phát biểu đúng?  
→ **Đáp án: B** (WFG phát hiện deadlock khi mỗi loại tài nguyên có 1 instance)

**[2023-2024 HK1] Câu 1**: Mutual exclusion trong deadlock là gì?  
→ **Đáp án: C** (ít nhất 1 tài nguyên được giữ theo chế độ không chia sẻ)

**[2023-2024 HK1] Câu 8**: Avoidance làm gì?  
→ **Đáp án: A** (không để hệ thống đi vào unsafe state)

**[2023-2024 HK1] Câu 18**: RAG – phát biểu đúng?  
→ **Đáp án: D** (chu trình ⇒ deadlock nếu mỗi resource type có 1 instance)

**[2023-2024 HK1] Câu 19**: Recovery bằng terminate – hiệu quả?  
→ **Đáp án: B** (chấm dứt lần lượt tới khi hết deadlock)

**[2023-2024 HK2] Câu 2**: Chuỗi nào KHÔNG an toàn?  
→ **Đáp án: D**

**[2023-2024 HK2] Câu 4**: Điều kiện nào KHÔNG cần để deadlock xảy ra?  
→ **Đáp án: D** (áp thứ tự tài nguyên là cách phòng tránh)

**[2023-2024 HK2] Câu 10**: Hệ nào deadlock?  
→ **Đáp án: C**

**[2017-2018 HK2] Câu 7**: Có bao nhiêu chuỗi an toàn?  
→ **Đáp án: B (2)**

**[2017-2018 HK2] Câu 15**: Phục hồi deadlock – cái nào KHÔNG phải lựa chọn?  
→ **Đáp án: A** (Banker là avoidance)

**[2024-2025 HK1] Câu 6**: Chuỗi an toàn?  
→ **Đáp án: C**

**[2024-2025 HK1] Câu 7**: Request nào được đáp ứng?  
→ **Đáp án: D**

**[2024-2025 HK1] Câu 9**: RAG & deadlock – phát biểu SAI?  
→ **Đáp án: D** (chu trình chưa chắc deadlock nếu nhiều instance)

---

## Chương 8 – Trắc nghiệm (Memory & Virtual Memory)

**[2022-2023 HK1] Câu 1**: Phát biểu đúng về paging?  
→ **Đáp án: A** (physical chia frame, logical chia page)

**[2022-2023 HK1] Câu 9**: Điều kiện cần cho VM?  
→ **Đáp án: B** (OS quản lý di chuyển trang/đoạn)

**[2022-2023 HK1] Câu 11**: “Chỉ nạp trang khi được yêu cầu” là kỹ thuật nào?  
→ **Đáp án: C** (demand paging)

**[2022-2023 HK1] Câu 13**: 32 frames → frame index bao nhiêu bit?  
→ **Đáp án: A (5 bit)**

**[2022-2023 HK1] Câu 14**: Page table size (128 pages, 4B/entry)?  
→ **Đáp án: C (512B)**

**[2022-2023 HK1] Câu 15**: EAT thay đổi theo α (TLB)  
→ **Đáp án: B (213ns)**

**[2022-2023 HK1] Câu 16**: LRU thay trang nào?  
→ **Đáp án: A**

**[2022-2023 HK1] Câu 17**: Working set – phát biểu SAI?  
→ **Đáp án: A**

**[2022-2023 HK2] Câu 9**: Bộ nhớ còn trống nhưng không liên tục gọi là gì?  
→ **Đáp án: A** (external fragmentation)

**[2022-2023 HK2] Câu 10**: TLB α=0.9, x=240ns, ε=36ns → EAT?  
→ **Đáp án: B (300ns)**

**[2023-2024 HK1] Câu 10**: Mục tiêu page replacement?  
→ **Đáp án: C** (min page faults)

**[2023-2024 HK1] Câu 21**: Tập trang tham chiếu gần nhau gọi là gì?  
→ **Đáp án: A** (locality)

**[2024-2025 HK1] Câu 3**: Belady anomaly là gì (câu SAI nằm ở đâu)?  
→ **Đáp án: D** (lỗi trang có thể tăng khi tăng frame)

**[2024-2025 HK1] Câu 17**: Thứ tự xử lý page fault đúng?  
→ **Đáp án: A**

