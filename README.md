# Ý Thức Xã Hội Trong Bối Cảnh Số

## Tổng quan dự án

Dự án nghiên cứu về ý thức xã hội trong thời đại số, khám phá câu hỏi: "Ý thức xã hội trong bối cảnh số có còn phản ánh trung thực tồn tại xã hội, hay nó có thể bị 'sản xuất' và 'định hướng' bởi một số nhóm quyền lực?"

## Chủ đề chính

### Hiện tượng mạng xã hội
- **Xu hướng tích cực**: Tinh thần thiện nguyện, bảo vệ môi trường, khởi nghiệp sáng tạo
- **Hiện tượng tiêu cực**: Tin giả, tôn vinh lối sống hưởng thụ, chạy theo vật chất

### Phân tích sâu
- Ý thức xã hội thực sự vs ý thức được "sản xuất"
- Tác động của thuật toán và các nhóm quyền lực
- Góc nhìn từ sinh viên và thế hệ trẻ

### Giải pháp
- Giáo dục tư duy phản biện
- Nâng cao nhận thức về thao túng
- Xây dựng cộng đồng thực
- Hành động có ý thức

## Tính năng

- **🌍 Đa ngôn ngữ (i18n)**: Hỗ trợ 4 ngôn ngữ - Tiếng Việt, English, 日本語, 中文
- **Giao diện tương tác**: Đánh giá ý thức xã hội cá nhân
- **Công cụ phân tích**: Phân tích xu hướng mạng xã hội
- **Trò chơi giáo dục**: Kiểm chứng thông tin và nhận biết fake news
- **Responsive design**: Tối ưu cho mọi thiết bị
- **Chuyển đổi mượt mà**: Không reload trang khi đổi ngôn ngữ

## Công nghệ sử dụng

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Build tool**: Vite
- **i18n System**: Custom vanilla JS (no libraries)
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)

## Cài đặt và chạy

```bash
# Clone repository
git clone [repository-url]

# Di chuyển vào thư mục dự án
cd social-consciousness-digital-age

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview production build
npm run preview
```

## 🌍 Hệ Thống Đa Ngôn Ngữ (i18n)

### Ngôn ngữ được hỗ trợ
- 🇻🇳 **Tiếng Việt** (Mặc định)
- 🇺🇸 **English**
- 🇯🇵 **日本語** (Tiếng Nhật)
- 🇨🇳 **中文** (Tiếng Trung)

### Cách sử dụng
1. Mở website, ngôn ngữ mặc định là **Tiếng Việt**
2. Nhìn góc phải trên navbar, click vào dropdown ngôn ngữ
3. Chọn ngôn ngữ bạn muốn - trang sẽ tự động dịch **không reload**
4. Ngôn ngữ được lưu vào `localStorage`, giữ nguyên sau khi reload

### Demo nhanh
Mở file `public/i18n-demo.html` để xem demo i18n độc lập với giao diện đẹp mắt.

### Thêm data-i18n cho components
Xem hướng dẫn chi tiết trong file `I18N_GUIDE.md`

```html
<!-- Ví dụ: -->
<h2 data-i18n="hero.title">Ý Thức Xã Hội Trong Bối Cảnh Số</h2>
<p data-i18n="hero.description">Khám phá mối quan hệ phức tạp...</p>
```

### Cấu trúc i18n

```
/public
  /js
    └── i18n.js              # Hệ thống i18n chính
  /locales
    ├── vi.json              # Tiếng Việt
    ├── en.json              # English
    ├── ja.json              # 日本語
    └── zh.json              # 中文
```

### API sử dụng trong JS

```javascript
import i18n from './js/i18n.js';

// Khởi tạo
await i18n.init();

// Đổi ngôn ngữ
await i18n.setLanguage('en');

// Lấy translation
const text = i18n.t('nav.home'); // "Home"

// Kiểm tra ngôn ngữ hiện tại
console.log(i18n.currentLang); // "vi"
```

## Cấu trúc dự án
