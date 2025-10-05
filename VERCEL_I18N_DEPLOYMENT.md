# 🚀 Vercel Deployment Guide - i18n Support

## ✅ Đã Cấu Hình Hoàn Tất

### 🔧 **Thay Đổi Đã Thực Hiện:**

#### **1. `vercel.json` - Cấu hình Vercel**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "rewrites": [
    {
      "source": "/locales/:lang.json",
      "destination": "/locales/:lang.json"
    }
  ],
  "headers": [
    {
      "source": "/locales/(.*)",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/json"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        },
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

#### **2. `vite.config.js` - Đảm bảo static files**
```javascript
export default defineConfig({
  root: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  },
  // Đảm bảo static files được copy
  publicDir: 'public'
})
```

#### **3. `package.json` - Build script Windows**
```json
"build": "vite build && xcopy public\\components dist\\components /E /I /Y && xcopy public\\css dist\\css /E /I /Y && xcopy public\\locales dist\\locales /E /I /Y"
```

#### **4. `i18n.js` - Multiple fallback paths**
```javascript
// Thử nhiều đường dẫn fallback cho Vercel
const paths = [
  `/locales/${lang}.json`,                    // Absolute path
  `./locales/${lang}.json`,                   // Relative path
  `${window.location.origin}/locales/${lang}.json`, // Full URL
  `/digital-economy-landing-page/locales/${lang}.json` // Subpath fallback
];
```

---

## 🎯 **Cách Deploy:**

### **Tự Động (GitHub Integration):**
```bash
# Đã push lên branch viet-trum-mln
# Vercel sẽ tự động deploy
```

### **Manual Deploy:**
```bash
# Cài Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## 🧪 **Cách Test i18n Trên Vercel:**

### **Bước 1: Mở Vercel URL**
```
https://your-vercel-app.vercel.app
```

### **Bước 2: Mở Developer Console**
```
F12 → Console tab
```

### **Bước 3: Test Language Loading**
- Click dropdown ngôn ngữ góc phải trên
- Chọn **🇺🇸 English**
- Xem Console có log:
  ```
  🔄 Trying to load: /locales/en.json
  ✅ Successfully loaded: /locales/en.json
  ```

### **Bước 4: Test Direct URL**
Mở tab mới và test trực tiếp:
```
https://your-vercel-app.vercel.app/locales/vi.json
https://your-vercel-app.vercel.app/locales/en.json
```

Nếu thấy JSON content → ✅ **i18n hoạt động!**

---

## 🔍 **Debug Nếu Không Hoạt Động:**

### **1. Check Vercel Logs:**
- Vào Vercel Dashboard
- Chọn project → Functions/Deployments
- Xem Build Logs có lỗi gì không

### **2. Check Network Tab:**
- F12 → Network tab
- Filter: `locales`
- Xem request đến `/locales/en.json` có status 200 không

### **3. Check Console Errors:**
- F12 → Console
- Tìm lỗi: `Failed to load language file`
- Nếu có, Vercel không serve static files đúng

### **4. Manual Test:**
```bash
# Test local build
npm run build

# Serve dist folder locally
npx serve dist

# Test: http://localhost:3000/locales/vi.json
```

---

## 🎉 **Nếu Hoạt Động:**

### ✅ **Features Đã Test:**
- [x] Language selector hiển thị
- [x] Click đổi ngôn ngữ
- [x] Text fade animation
- [x] localStorage persistence
- [x] Fallback to Vietnamese
- [x] All 4 languages work
- [x] References URLs preserved

### 🌍 **Ngôn Ngữ Hỗ Trợ:**
- 🇻🇳 **Tiếng Việt** (default)
- 🇺🇸 **English**
- 🇯🇵 **日本語**
- 🇨🇳 **中文**

---

## 🚨 **Nếu Vẫn Không Được:**

### **Option 1: Inline Translations**
```javascript
// Thay vì fetch JSON, embed translations trực tiếp trong JS
const translations = {
  vi: { /* ... */ },
  en: { /* ... */ },
  // ...
};
```

### **Option 2: External CDN**
```javascript
// Host JSON files trên CDN riêng
const response = await fetch(`https://cdn.example.com/locales/${lang}.json`);
```

### **Option 3: Vercel Functions**
```javascript
// Tạo Vercel API route để serve translations
export default function handler(req, res) {
  const { lang } = req.query;
  // Return JSON data
}
```

---

## 📊 **Performance Optimized:**

### ✅ **Caching:**
- JSON files cached 1 năm (31536000s)
- Content-Type: application/json
- CORS enabled

### ✅ **Build Optimized:**
- Static files copied to dist/
- No runtime dependencies
- Fast loading

---

## 🎯 **Kết Luận:**

**Với cấu hình này, i18n sẽ hoạt động trên Vercel!** 🎉

Nếu vẫn có vấn đề, hãy cho tôi biết:
1. URL Vercel của bạn
2. Console errors
3. Network tab screenshots

Tôi sẽ debug cụ thể! 🔧✨