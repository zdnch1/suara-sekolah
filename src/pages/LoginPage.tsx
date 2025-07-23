import React, { useState } from 'react';
import { Eye, EyeOff, MessageSquare, Users, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nikNis: '',
    password: '',
    name: '',
    role: 'siswa' as 'siswa' | 'guru' | 'osis' | 'admin',
    kelas: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const success = await login(formData.nikNis, formData.password);
        if (!success) {
          setError('NIK/NIS atau password salah');
        }
      } else {
        const success = await register(formData);
        if (!success) {
          setError('Gagal mendaftar. Coba lagi.');
        }
      }
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-500 p-12 items-center justify-center">
        <div className="text-white text-center max-w-md">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
              <img 
                src="https://i.ibb.co/Z6RcBhY" 
                alt="SMKN 2 Bekasi Logo" 
                className="w-16 h-16 object-contain"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTIiIGZpbGw9IiM3OTU1RjciLz4KPHRleHQgeD0iMzIiIHk9IjQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjgiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UzwvdGV4dD4KPC9zdmc+Cg==';
                }}
              />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">SuaraSekolah.id</h1>
          <p className="text-xl mb-8 opacity-90">Sekolah Nggak Harus Kaku!</p>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <MessageSquare size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Speak Up Corner</h3>
                <p className="text-sm opacity-80">Curhat & ngadu dengan aman</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <Users size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Chat Internal</h3>
                <p className="text-sm opacity-80">Ngobrol sama teman & guru</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <Zap size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">AI Konselor</h3>
                <p className="text-sm opacity-80">Bantuan & motivasi 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="lg:hidden flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <img 
                  src="https://i.ibb.co/Z6RcBhY/logo-smkn2-bekasi.png" 
                  alt="SMKN 2 Bekasi Logo" 
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iIzc5NTVGNyIvPgo8dGV4dCB4PSIyNCIgeT0iMzAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TPC90ZXh0Pgo8L3N2Zz4K';
                  }}
                />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back!' : 'Join Us!'}
            </h2>
            <p className="text-gray-400">
              {isLogin ? 'Login ke portal sekolah kekinian' : 'Daftar sekarang dan bergabung'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="siswa">Siswa</option>
                    <option value="guru">Guru</option>
                    <option value="osis">OSIS</option>
                  </select>
                </div>

                {formData.role === 'siswa' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Kelas
                    </label>
                    <input
                      type="text"
                      name="kelas"
                      value={formData.kelas}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Contoh: 11 IPA 1"
                    />
                  </div>
                )}
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                NIK/NIS
              </label>
              <input
                type="text"
                name="nikNis"
                value={formData.nikNis}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Masukkan NIK atau NIS"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Masukkan password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-11 text-gray-400 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {loading ? 'Loading...' : (isLogin ? 'Masuk' : 'Daftar')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              {isLogin ? 'Belum punya akun? Daftar di sini' : 'Sudah punya akun? Login di sini'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;