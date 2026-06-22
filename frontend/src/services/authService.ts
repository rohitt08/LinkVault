const API_URL = 'http://localhost:8080/api/auth';

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const text = await response.text();
    let errorMessage = text || 'Failed to login';
    try {
      const json = JSON.parse(text);
      if (json.message) errorMessage = json.message;
    } catch (e) {
      // ignore
    }
    throw new Error(errorMessage);
  }
  const data = await response.json();
  localStorage.setItem('user', JSON.stringify(data));
  return data;
};

export const register = async (fullName: string, email: string, password: string) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, email, password }),
  });
  if (!response.ok) {
    const text = await response.text();
    let errorMessage = text || 'Failed to register';
    try {
      const json = JSON.parse(text);
      if (json.message) errorMessage = json.message;
    } catch (e) {
      // ignore
    }
    throw new Error(errorMessage);
  }
  return await response.json();
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};
