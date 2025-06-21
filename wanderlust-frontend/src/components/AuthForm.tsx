import React, { useState } from 'react';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (username: string, password: string, signUpCode?: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUpCode, setSignUpCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password, signUpCode);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {type === 'register' && (
        <input placeholder="Sign Up Code" value={signUpCode} onChange={(e) => setSignUpCode(e.target.value)} required />
      )}
      <button type="submit">{type === 'login' ? 'Login' : 'Register'}</button>
    </form>
  );
};

export default AuthForm;