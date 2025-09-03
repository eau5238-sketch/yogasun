// frontend/src/services/api.js 또는 유사한 파일
const API_BASE_URL = 'http://localhost:5000/api'; // 이 부분 확인

// 로그인 함수 예시
export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || '로그인 실패');
        }
        
        return data;
    } catch (error) {
        console.error('로그인 API 오류:', error);
        throw error;
    }
};