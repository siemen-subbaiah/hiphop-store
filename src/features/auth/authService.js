import { NEXT_URL } from '../../../config';

// REGISTER USER!

const register = async (userData) => {
  const res = await fetch(`${NEXT_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await res.json();

  return data;
};

// LOGIN USER!
const login = async (userData) => {
  const res = await fetch(`${NEXT_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await res.json();

  return data;
};

// LOGOUT USER!
const logout = async () => {
  const res = await fetch(`${NEXT_URL}/api/logout`, {
    method: 'POST',
  });

  return res;
};

const authService = { register, login, logout };

export default authService;
