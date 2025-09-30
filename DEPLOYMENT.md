# Hướng dẫn Deploy lên Vercel

## Bước 1: Chuẩn bị project
```bash
# Install dependencies
npm install

# Build project để test
npm run build

# Preview build
npm run preview
```

## Bước 2: Setup Environment Variables trên Vercel

### Cách 1: Qua Vercel Dashboard
1. Đăng nhập vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Import project từ GitHub/GitLab
3. Vào Settings → Environment Variables
4. Thêm biến môi trường:
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: `your_actual_gemini_api_key`
   - **Environment**: Production, Preview, Development

### Cách 2: Qua Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy với environment variables
vercel --prod -e VITE_GEMINI_API_KEY=your_actual_gemini_api_key
```

## Bước 3: Deploy

### Deploy qua Git (Recommended)
1. Push code lên GitHub/GitLab
2. Connect repository với Vercel
3. Vercel sẽ tự động deploy khi có commit mới

### Deploy qua CLI
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Bước 4: Kiểm tra

1. Mở URL được cung cấp bởi Vercel
2. Test chatbox AI để đảm bảo API key hoạt động
3. Kiểm tra responsive trên mobile

## Lưu ý quan trọng

- **KHÔNG** commit file `.env` lên Git
- API key phải được set trong Vercel Environment Variables
- Project sử dụng Vite nên cần prefix `VITE_` cho environment variables
- Chatbox sẽ fallback về demo mode nếu API key không hợp lệ