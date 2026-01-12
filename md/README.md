# README — Ôn tập Hệ điều hành (Chương 5–8)

> Dựa trên *TAKENOTE.txt* của bạn và nội dung trong các slide bài giảng (Week07→Week13).  
> Mục tiêu: chỉ ra phần bạn đã ghi, phần còn thiếu, bổ sung kiến thức + giải nghĩa các **keyword tiếng Anh** hay gặp.

---

## Chương 5 — Process Synchronization (Đồng bộ tiến trình)

### 1) Bạn đã ghi trong TAKENOTE (đang có)
- **Semaphore**: có `value`, có **queue (linked list)** để chờ ⇒ giảm **busy waiting**; có `wait()` và `signal()`, cơ chế **block / wakeup**.
- Có bài “đồng hành” dùng nhiều semaphore để ép **thứ tự** các tiến trình.

### 2) Những ý quan trọng còn thiếu (bổ sung theo slide)

#### 5.1 Race condition & vùng tranh chấp
- **Shared data** (dữ liệu dùng chung): biến toàn cục, bảng dữ liệu, file, cấu trúc dữ liệu…
- **Race condition**: kết quả cuối cùng phụ thuộc vào **thứ tự xen kẽ** (interleaving) giữa các tiến trình/tiểu trình khi cùng đụng vào shared data.
- **Critical section problem**: bài toán thiết kế cách cho nhiều tiến trình vào “vùng tranh chấp” một cách đúng.

**Cấu trúc 1 tiến trình khi có critical section**
- **Entry section**: đoạn xin quyền vào vùng tranh chấp.
- **Critical section (CS)**: đoạn code đụng shared data.
- **Exit section**: đoạn nhả quyền.
- **Remainder section**: phần còn lại.

#### 5.3 Tiêu chuẩn của lời giải (3 tiêu chuẩn “kinh điển”)
- **Mutual exclusion** (loại trừ tương hỗ): tại 1 thời điểm **chỉ 1** tiến trình được vào CS.
- **Progress** (tiến triển): nếu CS đang trống, việc chọn tiến trình vào CS **không được trì hoãn vô hạn** bởi các tiến trình khác.
- **Bounded waiting** (chờ đợi giới hạn): không tiến trình nào bị chờ **mãi mãi** ⇒ tránh **starvation**.

#### 5.4 Nhóm giải pháp phần mềm (software solutions)
Slide thường đi qua các ý:
- Dùng biến **turn** (đến lượt ai) ⇒ đơn giản nhưng dễ **busy waiting**.
- Dùng **flag[]** (đánh dấu ai muốn vào CS) + biến phụ trợ.
- **Peterson’s algorithm** (cho 2 tiến trình): thỏa cả 3 tiêu chuẩn (mutual exclusion / progress / bounded waiting).
- **Bakery algorithm** (cho n tiến trình): “lấy số thứ tự” như mua bánh; số nhỏ hơn được vào trước.

> Ghi nhớ: giải pháp phần mềm thường **tốn CPU** vì hay dùng vòng `while(...)` chờ (busy waiting).

#### 5.5 Hỗ trợ từ phần cứng (hardware support)
- **Atomic instruction / atomic operation**: thao tác “không thể bị chia nhỏ”, thực hiện như 1 bước.
- Hai lệnh hay gặp trong slide:
  - **test_and_set()**: vừa kiểm tra vừa gán (thường trả về giá trị cũ).
  - **compare_and_swap() (CAS)**: nếu giá trị hiện tại đúng như mong đợi thì mới gán giá trị mới.
- **Atomic variable**: biến có thao tác đọc/ghi nguyên tử (phần cứng/ISA hỗ trợ).
- **Spinlock**: khóa kiểu “xoay vòng chờ” (busy waiting); nhanh khi thời gian giữ khóa ngắn.

#### 5.6 Công cụ đồng bộ mức HĐH / ngôn ngữ
**(a) Mutex lock**
- **Mutex**: khóa loại trừ tương hỗ. Thường có 2 thao tác `lock()` / `unlock()`.
- Dễ hiểu: “ai giữ khóa thì vào CS; người khác phải chờ”.

**(b) Semaphore**
- **Counting semaphore**: giá trị đếm (0,1,2,…), dùng cho “đếm số tài nguyên”.
- **Binary semaphore**: chỉ 0/1, gần giống mutex (nhưng semantics khác).
- Hai thao tác chuẩn:
  - `wait(S)` (còn gọi **P** / **down**): giảm S; nếu S < 0 ⇒ **block** tiến trình vào hàng đợi.
  - `signal(S)` (còn gọi **V** / **up**): tăng S; nếu S ≤ 0 ⇒ **wakeup** 1 tiến trình đang chờ.

**(c) Monitor + condition variable**
- **Monitor**: cấu trúc bậc cao (như 1 “hộp”) *đóng gói* shared data + các hàm thao tác, và **tự đảm bảo mutual exclusion** bên trong.
- **Condition variable**: biến điều kiện trong monitor, thường có:
  - `wait()` (thả mutex/monitor và ngủ)
  - `signal()` (đánh thức 1 tiến trình đang đợi điều kiện)

#### 5.7 Liveness
- **Liveness**: đảm bảo hệ thống “chạy tiếp được”, không bị kẹt.

- **Sleep() / Wakeup()** (ngủ / đánh thức): primitive mà HĐH hỗ trợ để tránh busy waiting  
  (thực tế semaphore/mutex/condition variable đều dựa trên ý tưởng “ngủ khi không vào được”, “đánh thức khi có thể vào”).
- Hai lỗi hay nhầm:

  - **Priority inversion**: tiến trình ưu tiên cao bị “kẹt” vì tiến trình ưu tiên thấp đang giữ khóa (thường gặp khi có scheduling ưu tiên).
  - **Deadlock**: kẹt vòng tròn, không ai đi tiếp được.
  - **Starvation**: có người “nhịn đói” mãi vì luôn bị ưu tiên thấp.

#### 5.8 Các bài toán kinh điển
**(1) Bounded-buffer / Producer–Consumer**
- Mục tiêu: producer chỉ sản xuất khi còn chỗ trống; consumer chỉ lấy khi có hàng.
- Mẫu semaphore kinh điển: `mutex` (khóa buffer), `empty` (số ô trống), `full` (số ô đầy).

**(2) Readers–Writers**
- Nhiều **reader** được đọc cùng lúc, nhưng **writer** cần độc quyền.
- Có nhiều biến thể: ưu tiên reader (dễ làm writer đói), ưu tiên writer (dễ làm reader đói), hoặc cân bằng.

**(3) Dining Philosophers**
- 5 triết gia, 5 chiếc đũa: nếu ai cũng cầm 1 đũa trái và chờ đũa phải ⇒ **deadlock**.
- Giải pháp hay gặp: bất đối xứng (người lẻ cầm trái trước, người chẵn cầm phải trước), dùng semaphore, hoặc dùng monitor.
- Chú ý: có thể tránh deadlock nhưng vẫn có nguy cơ **starvation** nếu không khéo.

### 3) Bài “đồng hành” (dùng semaphore ép thứ tự)
Bạn đã làm đúng hướng: coi mỗi mũi tên “Pi phải xong trước Pj” là một semaphore Sj:
- Tiến trình trước sẽ `signal(Sj)`
- Tiến trình sau sẽ `wait(Sj)`
Mẹo: luôn khởi tạo `Sj = 0`, để tiến trình sau **bị chặn** cho đến khi nhận signal.

---

## Chương 6 — Deadlocks (Kẹt tài nguyên)

### 1) Bạn đã ghi trong TAKENOTE (đang có)
- Có nhắc **Mutex**, “process vừa hold vừa wait”, **non-preemptive**, “chu trình đợi”, **RAG** (resource allocation graph), “đồ thị có chu trình thì deadlock”, “chuỗi an toàn”, “ngăn/ tránh/ bỏ qua”.

### 2) Những ý quan trọng còn thiếu (bổ sung theo slide)

#### 6.1 Deadlock là gì?
- **Deadlock**: một tập tiến trình bị kẹt vì **mỗi tiến trình đang giữ ít nhất 1 tài nguyên và chờ tài nguyên** do tiến trình khác giữ.

#### 6.1.3 4 điều kiện cần để deadlock xảy ra (Coffman conditions)
1. **Mutual exclusion**: có tài nguyên chỉ cho 1 tiến trình dùng (non-shareable).
2. **Hold and wait**: đang giữ tài nguyên A vẫn tiếp tục đợi thêm tài nguyên B.
3. **No preemption**: tài nguyên không bị “giật lại” cưỡng bức.
4. **Circular wait**: tồn tại vòng chờ P0→P1→…→P0.

> Mẹo thi: chỉ cần “phá” **ít nhất 1 điều kiện** ⇒ *ngăn* deadlock.

#### 6.2 Resource-Allocation Graph (RAG) & Wait-for Graph
- **RAG**: đồ thị có **process node** và **resource-type node**.
  - **Request edge**: Pi → Rj (đang xin)
  - **Assignment edge**: Rj → Pi (đang được cấp)
- Kết luận quan trọng:
  - Nếu **mỗi loại tài nguyên chỉ có 1 instance**: có chu trình ⇔ deadlock.
  - Nếu **nhiều instance**: có chu trình **chưa chắc** deadlock (chỉ là dấu hiệu nguy hiểm).
- **Wait-for graph**: rút gọn RAG chỉ còn tiến trình (edge Pi→Pj nếu Pi đang chờ tài nguyên do Pj giữ). Dùng tốt khi mỗi resource-type có 1 instance.

#### 6.3 Cách xử lý deadlock (4 hướng + 1 “bỏ qua”)
1. **Deadlock prevention** (ngăn): phá 1 trong 4 điều kiện.
2. **Deadlock avoidance** (tránh): chỉ cấp phát nếu hệ thống vẫn ở **safe state**.
3. **Deadlock detection & recovery** (phát hiện & khôi phục): cho phép xảy ra, rồi phát hiện và xử lý.
4. **Ignore** (Ostrich algorithm): “lờ đi” vì hiếm hoặc chi phí xử lý cao (một số OS thực tế dùng).

#### 6.4 Avoidance: Safe state, Safe sequence, Banker’s algorithm
- **Safe state**: tồn tại một **safe sequence** (chuỗi an toàn) sao cho mỗi tiến trình lần lượt hoàn thành được.
- Các ma trận/ vector phải nhớ:
  - **Available[j]**: số instance còn rảnh của tài nguyên Rj
  - **Max[i,j]**: Pi có thể cần tối đa bao nhiêu Rj
  - **Allocation[i,j]**: Pi đang giữ bao nhiêu Rj
  - **Need[i,j] = Max[i,j] − Allocation[i,j]**
- **Safety algorithm (ý tưởng)**: thử “giả lập” cho các tiến trình nào có `Need ≤ Available` chạy xong, rồi trả tài nguyên lại `Available += Allocation`. Nếu cho chạy hết được ⇒ safe.

#### 6.5 Detection & Recovery (ý tưởng thi)
- **Detection**: thuật toán giống safety nhưng thay “Need” bằng “Request”/tình trạng cấp phát hiện tại; hoặc dùng wait-for graph (trường hợp 1 instance).
- **Recovery**:
  - Hủy tiến trình (kill all / kill từng cái theo tiêu chí).
  - **Resource preemption** (giật tài nguyên) + rollback (khôi phục trạng thái), nhưng khó.

---

## Chương 7 — Memory Management (Quản lý bộ nhớ)

### 1) Bạn đã ghi trong TAKENOTE (đang có)
- Các chiến lược cấp phát liên tục: **First fit / Best fit / Worst fit / Next fit**.
- Khái niệm **paging** (phân trang), “logic → physical”, page table ở cache + main memory.

### 2) Những ý quan trọng còn thiếu (bổ sung theo slide)

#### 7.1 Cấp phát liên tục (contiguous allocation) & Partitioning
- **Fixed partitioning**: chia RAM thành các vùng cố định ⇒ dễ quản lý nhưng dễ lãng phí.
- **Dynamic partitioning**: tạo vùng theo nhu cầu ⇒ xuất hiện **holes** (lỗ trống).
- **External fragmentation** (phân mảnh ngoại): tổng trống đủ nhưng bị chia nhỏ, không ghép lại được thành 1 vùng liên tục.
  - Giải pháp: **compaction** (kết khối) — dồn các vùng đang dùng lại, gom trống thành 1 cục (tốn chi phí).
- **Internal fragmentation** (phân mảnh nội): cấp dư bên trong 1 vùng (do làm tròn kích thước, đặc biệt khi paging).

#### 7.2 Chiến lược chọn hole (First/Best/Worst/Next fit)
- **First fit**: gặp hole đủ lớn đầu tiên ⇒ nhanh, thường dùng.
- **Best fit**: chọn hole vừa khít nhất ⇒ giảm lãng phí nhưng dễ tạo nhiều lỗ nhỏ.
- **Worst fit**: chọn hole lớn nhất ⇒ hy vọng lỗ còn lại vẫn đủ lớn.
- **Next fit**: giống first fit nhưng bắt đầu tìm từ vị trí cấp phát gần nhất.

#### 7.3 Paging (Phân trang)
- **Page**: đơn vị của *không gian địa chỉ logic/ảo*.
- **Frame**: đơn vị của *RAM vật lý* (cùng kích thước với page).
- **Page table**: ánh xạ `page number → frame number`.
- Tách địa chỉ:
  - **page number (p)** + **offset (d)**
- Ví dụ hay thi (bạn có ghi): **VA 32-bit**, **page size = 4KB = 2^12**
  - offset = 12 bit
  - page number = 32 − 12 = 20 bit

#### 7.4 TLB & Effective Access Time (EAT)
- **TLB (Translation Lookaside Buffer)**: cache phần cứng lưu một số ánh xạ page→frame gần đây.
- **Hit ratio (α)**: tỉ lệ tìm thấy trong TLB.
- **EAT (Effective Access Time)** (công thức dạng ý tưởng):
  - Hit: `ε + x`
  - Miss: `ε + x + x` (phải đi RAM 2 lần: đọc page table + đọc dữ liệu)
  - `EAT = α(ε + x) + (1−α)(ε + 2x)`
  - (ε: thời gian tra TLB; x: 1 lần truy xuất RAM)

#### 7.5 Segmentation (Phân đoạn) & so sánh
- **Segmentation**: chia theo “đơn vị logic” (code, data, stack…) ⇒ kích thước **không đều**.
- Địa chỉ dạng: **segment number + offset**.
- Segment table thường có:
  - **base**: địa chỉ bắt đầu đoạn
  - **limit**: độ dài đoạn (dùng để kiểm tra vượt biên/protection)
- So sánh nhanh:
  - Paging: kích thước bằng nhau ⇒ dễ quản lý, ít phân mảnh ngoại; nhưng có phân mảnh nội.
  - Segmentation: sát logic chương trình ⇒ hỗ trợ bảo vệ/chia sẻ tốt; nhưng dễ phân mảnh ngoại.

---

## Chương 8 — Virtual Memory (Bộ nhớ ảo)

### 1) Bạn đã ghi trong TAKENOTE (đang có)
- **Swap in** từ bộ nhớ phụ sang bộ nhớ chính.
- Nhắc Windows có **pagefile** (thường là `pagefile.sys`), Linux hay gọi là **swap partition/swapfile**, “tránh lỗi trang để chạy nhanh”.

### 2) Những ý quan trọng còn thiếu (bổ sung theo slide)

#### 8.1 Khái niệm bộ nhớ ảo
- **Virtual memory**: cho phép tiến trình “thấy” không gian địa chỉ lớn hơn RAM thật.
- Hai hướng kỹ thuật:
  - **Demand Paging** (phân trang theo yêu cầu)
  - **Demand Segmentation** (phân đoạn theo yêu cầu)
- Trong môn thường tập trung **Demand Paging**.

#### 8.2 Demand Paging & Page Fault
- **Valid/Invalid bit**: đánh dấu trang có đang nằm trong RAM không.
- **Page fault**: CPU tham chiếu 1 page chưa có trong RAM.
- Luồng xử lý page fault (ý tưởng):
  1. Trap vào HĐH
  2. Kiểm tra hợp lệ (địa chỉ có thuộc tiến trình không)
  3. Tìm frame trống; nếu không có thì phải **page replacement**
  4. Đọc trang từ disk vào frame
  5. Cập nhật page table/TLB
  6. Chạy lại lệnh gây fault

#### 8.3 Page Replacement Algorithms (thay trang)
Mục tiêu: giảm **number of page faults**.

- **FIFO**: trang vào trước ra trước.
  - Có thể gặp **Belady’s anomaly**: tăng số frame nhưng số page fault lại tăng.
- **OPT (Optimal)**: thay trang sẽ được dùng xa nhất trong tương lai (lý thuyết, dùng làm “mốc tốt nhất” để so sánh).
- **LRU (Least Recently Used)**: thay trang lâu không dùng nhất.
  - Khó triển khai hoàn hảo, thường cần phần cứng/chi phí.
- Xấp xỉ LRU thường gặp:
  - **Second-chance / Clock**: dùng **reference bit** (bit tham chiếu) để “cho cơ hội lần 2”.

#### 8.4 Cấp phát frame (Frame allocation)
- OS phải quyết định mỗi tiến trình có bao nhiêu **frame**.
- Gợi ý hay hỏi:
  - **Fixed allocation** (cố định) vs **Variable allocation** (thay đổi)
  - **Proportional allocation**: cấp theo kích thước tiến trình
  - Có thể kèm **priority allocation** (ưu tiên)

#### 8.5 Thrashing, Locality, Working set
- **Thrashing**: page fault quá nhiều ⇒ CPU rảnh vì cứ chờ I/O đọc trang ⇒ hệ thống “trì trệ”.
- **Locality**: chương trình hay truy cập một cụm trang trong 1 khoảng thời gian.
- **Working set (WS)**:
  - Với cửa sổ Δ, **WS(Δ)** là tập các trang được dùng gần đây nhất trong khoảng đó.
  - Ý tưởng: nếu cấp đủ frame để chứa working set ⇒ giảm thrashing.
- Một cách điều khiển khác: **Page-Fault Frequency (PFF)**: theo dõi tần suất lỗi trang để tăng/giảm frame.

---

## Tóm tắt keyword tiếng Anh hay gặp (nhớ nhanh)
- **Race condition**: tranh chấp do xen kẽ thực thi.
- **Critical section / Entry / Exit / Remainder**: vùng tranh chấp / xin vào / ra / phần còn lại.
- **Mutual exclusion / Progress / Bounded waiting**: 3 tiêu chuẩn lời giải.
- **Busy waiting / Spinlock**: chờ bằng vòng lặp / khóa xoay.
- **Mutex**: khóa loại trừ tương hỗ.
- **Semaphore (counting/binary)**: đếm tài nguyên / 0-1.
- **Monitor / Condition variable**: cấu trúc đồng bộ bậc cao / biến điều kiện.
- **Deadlock / Starvation**: kẹt vòng tròn / đói tài nguyên.
- **RAG / Wait-for graph**: đồ thị cấp phát tài nguyên / đồ thị đợi.
- **Safe state / Safe sequence / Banker’s algorithm**: trạng thái an toàn / chuỗi an toàn / giải thuật banker.
- **Paging / Frame / Page table / TLB / EAT**: phân trang / khung / bảng trang / bộ đệm dịch / thời gian truy xuất hiệu dụng.
- **Virtual memory / Demand paging / Page fault**: bộ nhớ ảo / phân trang theo yêu cầu / lỗi trang.
- **FIFO / OPT / LRU / Belady’s anomaly**: thay trang FIFO / tối ưu / gần đây nhất / nghịch lý Belady.
- **Thrashing / Locality / Working set**: trì trệ / tính cục bộ / tập làm việc.

---

## Checklist ôn thi nhanh (Ch5–8)
- Ch5: 3 tiêu chuẩn CS, Peterson, test_and_set/CAS, semaphore vs mutex, monitor + condition variable, bounded-buffer/readers-writers/dining philosophers.
- Ch6: 4 điều kiện deadlock, RAG & wait-for graph, prevention vs avoidance vs detection vs recovery, safe sequence + Banker (Available/Max/Allocation/Need).
- Ch7: first/best/worst/next fit, internal vs external fragmentation + compaction, paging + địa chỉ 32-bit/4KB, TLB + EAT.
- Ch8: demand paging + xử lý page fault, FIFO/OPT/LRU + Belady, frame allocation, thrashing + working set.

