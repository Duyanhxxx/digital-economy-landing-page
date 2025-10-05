# 🌍 Hệ Thống i18n - Hướng Dẫn Sử Dụng

## ✅ ĐÃ HOÀN THÀNH

### 1. Cấu trúc file
```
/public
  /js
    ├── i18n.js              ✅ Hệ thống i18n hoàn chỉnh
    └── main.js              ✅ Đã tích hợp i18n
  /locales
    ├── vi.json              ✅ Tiếng Việt (hoàn chỉnh)
    ├── en.json              ✅ English (hoàn chỉnh)
    ├── ja.json              ✅ 日本語 (hoàn chỉnh)
    └── zh.json              ✅ 中文 (hoàn chỉnh)
  /components
    ├── navigation.html      ✅ Có language selector + data-i18n
    ├── hero.html            ✅ Có data-i18n đầy đủ
    ├── concept.html         ✅ Có data-i18n đầy đủ
    ├── chatbox.html         ✅ Có data-i18n đầy đủ
    ├── analysis.html        ⚠️ Cần thêm data-i18n
    ├── solutions.html       ⚠️ Cần thêm data-i18n
    ├── conclusion.html      ⚠️ Cần thêm data-i18n
    └── footer.html          ⚠️ Cần thêm data-i18n
  /css
    └── navigation.css       ✅ CSS cho language selector
```

---

## 🚀 CÁCH SỬ DỤNG

### Bước 1: Mở trang web
1. Chạy server local (Live Server hoặc `npm run dev`)
2. Trang sẽ tự động load **Tiếng Việt** làm mặc định
3. Nhìn góc phải trên navbar, bạn sẽ thấy dropdown chọn ngôn ngữ

### Bước 2: Đổi ngôn ngữ
1. Click vào dropdown **language selector**
2. Chọn ngôn ngữ mong muốn:
   - 🇻🇳 Tiếng Việt
   - 🇺🇸 English
   - 🇯🇵 日本語
   - 🇨🇳 中文
3. Trang sẽ tự động dịch **KHÔNG reload**
4. Ngôn ngữ được lưu trong `localStorage`

### Bước 3: Reload trang
- Khi reload, trang sẽ tự động load lại ngôn ngữ đã chọn

---

## 📝 HƯỚNG DẪN THÊM DATA-I18N CHO COMPONENTS CÒN LẠI

### Nguyên tắc chung:
Với mỗi text cần dịch, thêm thuộc tính `data-i18n="key.path"`

### Ví dụ cụ thể:

#### **BEFORE:**
```html
<h2 class="section-title">Phân Tích Sâu Về Ý Thức Xã Hội Số</h2>
```

#### **AFTER:**
```html
<h2 class="section-title" data-i18n="analysis.title">Phân Tích Sâu Về Ý Thức Xã Hội Số</h2>
```

---

## 🔧 CODE MẪU CHO COMPONENTS CÒN LẠI

### 1️⃣ `analysis.html` - Ví dụ

```html
<!-- SECTION TITLE -->
<h2 class="section-title" data-i18n="analysis.title">Phân Tích Sâu Về Ý Thức Xã Hội Số</h2>

<!-- AUTHENTIC SECTION -->
<div class="direction-header">
    <div class="direction-icon">
        <i class="fas fa-users"></i>
    </div>
    <h3 data-i18n="analysis.authenticTitle">Ý Thức Xã Hội Thực Sự</h3>
    <p data-i18n="analysis.authenticDesc">Những biểu hiện chân thực của ý thức cộng đồng</p>
</div>

<!-- CARD EXAMPLE -->
<div class="impact-card">
    <div class="impact-icon">
        <i class="fas fa-heart-pulse"></i>
    </div>
    <h4 data-i18n="analysis.authentic1Title">Phản ứng tự nhiên với vấn đề xã hội</h4>
    <p data-i18n="analysis.authentic1Desc">Sự quan tâm chân thành đến các vấn đề môi trường, giáo dục, y tế</p>
    <div class="example">
        <strong data-i18n="analysis.authentic1Example">Ví dụ:</strong> 
        <span data-i18n="analysis.authentic1ExampleText">Phong trào dọn rác bãi biển tự phát của sinh viên</span>
    </div>
</div>
```

### 2️⃣ `solutions.html` - Ví dụ

```html
<!-- SECTION TITLE -->
<h2 class="section-title" data-i18n="solutions.title">Giải Pháp Phát Triển Ý Thức Xã Hội Chân Thực</h2>
<p class="section-subtitle" data-i18n="solutions.subtitle">Cách thức để sinh viên và xã hội phát triển ý thức xã hội thực sự trong thời đại số</p>

<!-- SOLUTION CARD -->
<div class="solution-card featured">
    <div class="solution-icon">
        <i class="fas fa-brain"></i>
    </div>
    <h3 data-i18n="solutions.solution1Title">Giáo Dục Tư Duy Phản Biện</h3>
    <p data-i18n="solutions.solution1Desc">Phát triển khả năng phân tích, đánh giá thông tin một cách khách quan và độc lập</p>
    <div class="solution-benefits">
        <span class="benefit-tag" data-i18n="solutions.solution1Tag1">Kiểm chứng thông tin</span>
        <span class="benefit-tag" data-i18n="solutions.solution1Tag2">Tư duy độc lập</span>
        <span class="benefit-tag" data-i18n="solutions.solution1Tag3">Phân tích đa chiều</span>
    </div>
</div>

<!-- FRAMEWORK STEPS -->
<h3 data-i18n="solutions.frameworkTitle">Khung Hành Động Cho Sinh Viên</h3>
<div class="framework-steps">
    <div class="step">
        <div class="step-number" data-i18n="solutions.step1Number">1</div>
        <h4 data-i18n="solutions.step1Title">Quan sát</h4>
        <p data-i18n="solutions.step1Desc">Nhận biết các xu hướng và phân tích nguồn gốc</p>
    </div>
    <!-- Repeat for step 2, 3, 4... -->
</div>
```

### 3️⃣ `conclusion.html` - Ví dụ

```html
<!-- SECTION TITLE -->
<h2 class="section-title" data-i18n="conclusion.title">Kết Luận</h2>

<!-- MAIN CONCLUSION -->
<div class="main-conclusion">
    <h3 data-i18n="conclusion.mainTitle">Ý Thức Xã Hội Trong Thời Đại Số: Thực Tế Phức Tạp</h3>
    <p data-i18n="conclusion.mainDesc">
        Ý thức xã hội trong bối cảnh số không hoàn toàn là thực tế tự nhiên, 
        cũng không hoàn toàn là sản phẩm được "sản xuất"...
    </p>
</div>

<!-- INSIGHTS -->
<h3 data-i18n="conclusion.insightsTitle">Những Nhận Thức Quan Trọng</h3>
<div class="insight-card">
    <i class="fas fa-eye"></i>
    <h4 data-i18n="conclusion.insight1Title">Nhận thức về thao túng</h4>
    <p data-i18n="conclusion.insight1Desc">Hiểu rõ cách thức mạng xã hội và các nhóm quyền lực có thể ảnh hưởng đến suy nghĩ</p>
</div>

<!-- QUOTE -->
<blockquote data-i18n="conclusion.quote">
    "Ý thức xã hội thực sự không phải là thứ được tạo ra bởi thuật toán, 
    mà là kết quả của sự suy ngẫm sâu sắc và hành động có ý thức của mỗi cá nhân."
</blockquote>
```

### 4️⃣ `footer.html` - Ví dụ

```html
<!-- INTEGRITY -->
<h3 data-i18n="footer.integrityTitle">
    <i class="fas fa-certificate"></i> Academic Integrity Statement
</h3>
<p data-i18n="footer.integrityDesc">
    Tôi cam kết rằng nội dung này được tạo ra với sự trung thực học thuật...
</p>

<!-- REFERENCES -->
<h3 data-i18n="footer.referencesTitle">Nguồn Tham Khảo</h3>
<div class="reference-item">
    <i class="fas fa-external-link-alt"></i>
    <a href="..." target="_blank">
        <span data-i18n="footer.ref1">Bộ Thông tin và Truyền thông - Báo cáo Chuyển đổi số Quốc gia 2023</span>
    </a>
</div>

<!-- AI USAGE -->
<h3 data-i18n="footer.aiTitle">
    <i class="fas fa-robot"></i> Phụ Lục AI Usage
</h3>
<div class="ai-tool">
    <h4 data-i18n="footer.ai1Title">Claude 3.5 Sonnet (Anthropic)</h4>
    <p data-i18n="footer.ai1Desc">Được sử dụng để phân tích dữ liệu từ các nguồn chính thống Việt Nam...</p>
</div>
```

---

## 🎨 THUỘC TÍNH ĐẶC BIỆT

### 1. `data-i18n-placeholder` - Cho input placeholder
```html
<input type="text" 
       data-i18n-placeholder="chatbox.placeholder" 
       placeholder="Hỏi về ý thức xã hội số...">
```

### 2. `data-i18n-title` - Cho tooltip/title
```html
<button data-i18n-title="nav.home" title="Trang chủ">
    <i class="fas fa-home"></i>
</button>
```

---

## 🔍 KIỂM TRA XEM I18N HOẠT ĐỘNG

### Mở Console (F12):
```javascript
// Kiểm tra ngôn ngữ hiện tại
console.log(i18n.currentLang);

// Đổi ngôn ngữ thủ công
i18n.setLanguage('en');

// Lấy translation của một key
console.log(i18n.t('nav.home'));
```

---

## 📦 THÊM NGÔN NGỮ MỚI

### Bước 1: Tạo file JSON mới
```bash
/locales/fr.json  # Tiếng Pháp
/locales/es.json  # Tiếng Tây Ban Nha
```

### Bước 2: Cập nhật `i18n.js`
```javascript
this.supportedLanguages = {
    vi: { name: 'Tiếng Việt', flag: '🇻🇳' },
    en: { name: 'English', flag: '🇺🇸' },
    ja: { name: '日本語', flag: '🇯🇵' },
    zh: { name: '中文', flag: '🇨🇳' },
    fr: { name: 'Français', flag: '🇫🇷' }, // MỚI
    es: { name: 'Español', flag: '🇪🇸' }   // MỚI
};
```

### Bước 3: Thêm option trong `navigation.html`
```html
<select id="language-selector" class="language-selector">
    <option value="vi">🇻🇳 Tiếng Việt</option>
    <option value="en">🇺🇸 English</option>
    <option value="ja">🇯🇵 日本語</option>
    <option value="zh">🇨🇳 中文</option>
    <option value="fr">🇫🇷 Français</option>
    <option value="es">🇪🇸 Español</option>
</select>
```

---

## 🐛 TROUBLESHOOTING

### Lỗi: "Translation not found for key: xxx"
- **Nguyên nhân**: Key không tồn tại trong file JSON
- **Giải pháp**: Kiểm tra file `/locales/{lang}.json` và thêm key tương ứng

### Lỗi: "Failed to load language file"
- **Nguyên nhân**: File JSON không tồn tại hoặc đường dẫn sai
- **Giải pháp**: Kiểm tra file `/locales/{lang}.json` có tồn tại không

### Text không đổi khi chuyển ngôn ngữ
- **Nguyên nhân**: Thiếu thuộc tính `data-i18n`
- **Giải pháp**: Thêm `data-i18n="key.path"` vào element

### Dropdown không xuất hiện
- **Nguyên nhân**: CSS chưa load hoặc HTML chưa đúng
- **Giải pháp**: Kiểm tra file `navigation.css` và `navigation.html`

---

## ⚡ PERFORMANCE TIPS

1. **Lazy loading**: File JSON chỉ load khi cần
2. **Caching**: Translations được cache trong memory
3. **Smooth transition**: Text fade in/out khi đổi ngôn ngữ
4. **localStorage**: Lưu ngôn ngữ đã chọn để tránh load lại

---

## 🎯 CHECKLIST ĐỂ HOÀN THIỆN

- [x] Tạo hệ thống i18n.js
- [x] Tạo 4 file JSON ngôn ngữ
- [x] Thêm language selector vào navigation
- [x] Thêm CSS cho language selector
- [x] Tích hợp vào main.js
- [x] Thêm data-i18n cho navigation
- [x] Thêm data-i18n cho hero
- [x] Thêm data-i18n cho concept
- [x] Thêm data-i18n cho chatbox
- [ ] Thêm data-i18n cho analysis
- [ ] Thêm data-i18n cho solutions
- [ ] Thêm data-i18n cho conclusion
- [ ] Thêm data-i18n cho footer
- [ ] Test tất cả ngôn ngữ
- [ ] Deploy lên Vercel/GitHub Pages

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề:
1. Mở Console (F12) xem lỗi
2. Kiểm tra file JSON có đúng format không
3. Kiểm tra đường dẫn file có đúng không
4. Xem hướng dẫn ở trên

---

## 🎉 KẾT QUẢ MONG ĐỢI

Sau khi hoàn thành:
- ✅ Dropdown ngôn ngữ ở góc phải trên navbar
- ✅ Chuyển đổi ngôn ngữ mượt mà không reload
- ✅ Hỗ trợ 4 ngôn ngữ: Việt, Anh, Nhật, Trung
- ✅ Lưu ngôn ngữ vào localStorage
- ✅ Animation fade khi đổi text
- ✅ Loading spinner khi đang tải file JSON
- ✅ Responsive trên mobile

---

## 📄 FILE CẦN CẬP NHẬT THÊM

Bạn cần thêm `data-i18n` vào các file sau (dùng code mẫu ở trên):

1. **`components/analysis.html`** - ~100 text items
2. **`components/solutions.html`** - ~50 text items
3. **`components/conclusion.html`** - ~30 text items
4. **`components/footer.html`** - ~20 text items
5. **`components/interactive.html`** (Optional) - Form tương tác

**Lưu ý**: Tất cả các key đã có sẵn trong 4 file JSON (`vi.json`, `en.json`, `ja.json`, `zh.json`). 
Bạn chỉ cần thêm thuộc tính `data-i18n` vào HTML theo code mẫu.

---

**Chúc bạn thành công! 🚀**
