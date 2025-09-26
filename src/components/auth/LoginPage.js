import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice'; 

// LoginPage now receives the navigation handler as a prop
const LoginPage = ({ handleLoginSuccess }) => { // <-- Receive the navigation prop
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [nickname, setNickname] = useState('');
  const [pin, setPin] = useState(['', '', '', '']);

  // Mock Authentication Function
  const handleLoginSubmit = () => {
    const fullPin = pin.join('');
    
    // --- REAL APP MOCK LOGIC ---
    if (nickname.trim() && fullPin === '1234') { 
      // 1. Authenticate the user (Update Redux Auth State)
      dispatch(loginSuccess({ nickname }));
      
      // 2. Start the Onboarding Flow (Calls handleStartOnboarding)
      handleLoginSuccess(); 
    } else {
      alert("Login failed. Try Nickname: test, PIN: 1234");
    }
  };
  
  // Handler for PIN input to auto-focus next field (simplified)
  const handlePinChange = (index, value) => {
    const newPin = [...pin];
    newPin[index] = value.slice(-1); // Take only the last character typed
    setPin(newPin);

    // Auto-focus next field on valid input
    if (value && index < 3) {
      const nextInput = document.getElementById(`pin-${index + 2}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        {t("login.title", "Log in")}
      </h2>
      <p className="text-gray-600 text-sm">
        {t("login.welcome", "Welcome to (website name)")}
      </p>

      {/* Nickname Input */}
      <div className="w-full">
        <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
          {t("login.nickname", "Nickname")}*
        </label>
        <input
          id="nickname"
          type="text"
          placeholder={t("login.nicknamePlaceholder", "Enter a nickname")}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black"
        />
      </div>

      {/* PIN Input */}
      <div className="w-full">
        <label htmlFor="pin-1" className="block text-sm font-medium text-gray-700 mb-1">
          {t("login.pin", "PIN")}*
        </label>
        <div className="flex justify-between space-x-2">
          {pin.map((digit, index) => (
            <input
              key={index}
              id={`pin-${index + 1}`}
              type="password"
              maxLength="1"
              value={digit}
              onChange={(e) => handlePinChange(index, e.target.value)}
              className="w-1/4 px-4 py-3 text-center border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black text-xl"
              style={{ width: '20%' }}
              onKeyDown={(e) => {
                  if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
                      document.getElementById(`pin-${index}`).focus();
                  }
              }}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleLoginSubmit}
        className="w-full bg-black text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors"
      >
        <span>{t("common.continue", "Continue")}</span>
        <span aria-hidden="true">→</span>
      </button>

      {/* Separator / Sign Up / Google Options */}
      <div className="w-full text-center text-sm pt-4">
        <p className="text-gray-600 mb-4">
          {t("login.noAccount", "Dont have an account yet?")}{" "}
          <button
            onClick={() => navigate('/signup')} 
            className="text-blue-600 font-semibold hover:underline"
          >
            {t("login.signUp", "Sign Up")}
          </button>
          {" "}
          {t("common.or", "or")}{" "}
          <button
            className="inline-flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg bg-white shadow-sm hover:bg-gray-50"
          >
            {/* Image placeholder */}
            <img src="/assets/google-icon.svg" alt="Google" className="w-4 h-4" /> 
            <span>{t("login.google", "Continue with Google")}</span>
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;