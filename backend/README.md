# YogaSun Backend Server

## 설치 및 실행 방법

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# MongoDB 연결 문자열
MONGODB_URI=mongodb://localhost:27017/yogasun

# JWT 시크릿 키 (실제 운영환경에서는 강력한 랜덤 키를 사용하세요)
JWT_SECRET=your-super-secret-jwt-key-here

# JWT 만료 시간
JWT_EXPIRE=30d

# 서버 포트
PORT=5001

# 환경
NODE_ENV=development
```

### 3. MongoDB 실행
MongoDB가 로컬에 설치되어 있지 않다면 Docker를 사용하여 실행할 수 있습니다:

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. 서버 실행
```bash
# 개발 모드 (자동 재시작)
npm run dev

# 프로덕션 모드
npm start
```

## API 엔드포인트

### 인증 (Authentication)
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `POST /api/auth/logout` - 로그아웃
- `GET /api/auth/profile` - 프로필 조회 (인증 필요)
- `PUT /api/auth/profile` - 프로필 수정 (인증 필요)

### 요가 (Yoga)
- `GET /api/yoga/classes` - 요가 클래스 목록
- `GET /api/yoga/instructors` - 강사 목록
- `GET /api/yoga/levels` - 요가 레벨 정보
- `GET /api/yoga/free-trial` - 무료 체험 클래스

## 데이터베이스 스키마

### User 모델
- `name`: 사용자 이름 (필수)
- `email`: 이메일 (필수, 고유)
- `password`: 비밀번호 (필수, 최소 6자)
- `role`: 사용자 역할 (user, instructor, admin)
- `profile`: 프로필 정보 (아바타, 전화번호, 생년월일 등)
- `subscription`: 구독 정보
- `isActive`: 계정 활성화 상태
- `lastLogin`: 마지막 로그인 시간

## 보안 기능

- 비밀번호 bcrypt 해싱
- JWT 토큰 기반 인증
- CORS 설정
- 입력값 검증
- 에러 처리



