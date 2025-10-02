# Hướng Dẫn Triển Khai - Ý Thức Xã Hội Trong Bối Cảnh Số

## Tổng quan

Dự án "Ý Thức Xã Hội Trong Bối Cảnh Số" là một trang web nghiên cứu tương tác về ý thức xã hội trong thời đại mạng xã hội và công nghệ số.

## Yêu cầu hệ thống

- Node.js 16+ 
- npm hoặc yarn
- Git

## Cài đặt local

```bash
# Clone repository
git clone [repository-url]
cd social-consciousness-digital-age

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Truy cập `http://localhost:5173` để xem trang web.

## Build cho production

```bash
# Build static files
npm run build

# Preview production build
npm run preview
```

## Triển khai lên Vercel

### Tự động (Khuyến nghị)

1. Kết nối repository với Vercel
2. Import project từ Git
3. Vercel sẽ tự động detect Vite và build

### Thủ công

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy production
vercel --prod
```

## Triển khai lên Netlify

1. Build project: `npm run build`
2. Upload thư mục `dist` lên Netlify
3. Hoặc kết nối Git repository với Netlify

## Cấu hình môi trường

### Vercel
File `vercel.json` đã được cấu hình:
- Rewrites cho SPA routing
- Headers cho security
- Static file serving

### Netlify
Tạo file `_redirects` trong thư mục `public`: