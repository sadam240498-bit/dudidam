import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  UserCircle, 
  MapPin, 
  FileText, 
  LayoutDashboard, 
  Calendar, 
  Users, 
  LogOut, 
  Menu,
  X,
  CheckCircle,
  AlertTriangle,
  Clock,
  Briefcase
} from 'lucide-react';
import { UserRole, Student } from './types';
import GeminiImageEditor from './components/GeminiImageEditor';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// --- Components (Inline for single file requirement structure, usually split) ---

// 1. Navigation
const Navbar = ({ role, onNavigate, onLogout, toggleMenu }: any) => (
  <nav className="bg-brand-900 text-white shadow-md sticky top-0 z-40">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('HOME')}>
        <Building2 className="w-8 h-8 text-brand-500" />
        <div>
          <h1 className="text-xl font-bold leading-none">SIM-PKL</h1>
          <p className="text-xs text-brand-100 opacity-80">SMK PGRI Subang</p>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        {role === UserRole.PUBLIC && (
          <>
            <button onClick={() => onNavigate('HOME')} className="hover:text-brand-100">Home</button>
            <button onClick={() => onNavigate('PROFILE')} className="hover:text-brand-100">Profile</button>
            <button onClick={() => onNavigate('LOGIN_STUDENT')} className="bg-white text-brand-900 px-4 py-2 rounded-full font-bold hover:bg-brand-50 transition">Login Siswa</button>
            <button onClick={() => onNavigate('LOGIN_ADMIN')} className="border border-white/30 px-4 py-2 rounded-full font-medium hover:bg-white/10 transition">Login Guru</button>
          </>
        )}
        {role === UserRole.STUDENT && (
          <>
            <button onClick={() => onNavigate('DASHBOARD_STUDENT')} className="flex items-center gap-1 hover:text-brand-100"><LayoutDashboard size={18} /> Dashboard</button>
            <button onClick={() => onNavigate('ATTENDANCE')} className="flex items-center gap-1 hover:text-brand-100"><MapPin size={18} /> Absensi</button>
            <button onClick={() => onNavigate('REPORT')} className="flex items-center gap-1 hover:text-brand-100"><FileText size={18} /> Laporan</button>
            <button onClick={onLogout} className="text-red-300 hover:text-red-100"><LogOut size={18} /></button>
          </>
        )}
        {(role === UserRole.TEACHER || role === UserRole.ADMIN) && (
          <>
             <button onClick={() => onNavigate('DASHBOARD_ADMIN')} className="flex items-center gap-1 hover:text-brand-100"><LayoutDashboard size={18} /> Monitor</button>
             <button onClick={() => onNavigate('DATA_STUDENT')} className="flex items-center gap-1 hover:text-brand-100"><Users size={18} /> Siswa</button>
             <button onClick={() => onNavigate('SCHEDULE')} className="flex items-center gap-1 hover:text-brand-100"><Calendar size={18} /> Jadwal</button>
             <button onClick={onLogout} className="text-red-300 hover:text-red-100"><LogOut size={18} /></button>
          </>
        )}
      </div>

      {/* Mobile Toggle */}
      <button className="md:hidden p-2" onClick={toggleMenu}>
        <Menu size={24} />
      </button>
    </div>
  </nav>
);

// 2. Public View
const PublicHome = ({ onNavigate }: any) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-900 to-brand-700 text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Siap Kerja, Santun, Mandiri</h1>
          <p className="text-xl text-brand-100">Sistem Informasi Manajemen Praktik Kerja Lapangan SMK PGRI Subang. Memantau progres, absensi, dan kinerja siswa secara real-time.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button onClick={() => onNavigate('LOGIN_STUDENT')} className="bg-brand-500 hover:bg-brand-400 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg transform transition hover:scale-105">
              Login Siswa
            </button>
            <button onClick={() => onNavigate('PROFILE')} className="bg-white text-brand-900 hover:bg-slate-100 px-8 py-4 rounded-lg font-bold text-lg shadow-lg">
              Profil Sekolah
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats / Countdown */}
      <div className="bg-white py-12 px-4 border-b">
        <div className="container mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-xl bg-blue-50 border border-blue-100">
            <h3 className="text-3xl font-bold text-brand-600 mb-2">1,560</h3>
            <p className="text-slate-600">Siswa Aktif PKL</p>
          </div>
          <div className="p-6 rounded-xl bg-amber-50 border border-amber-100">
            <h3 className="text-3xl font-bold text-amber-600 mb-2">124</h3>
            <p className="text-slate-600">Mitra DUDI</p>
          </div>
          <div className="p-6 rounded-xl bg-green-50 border border-green-100">
            <h3 className="text-3xl font-bold text-green-600 mb-2">98%</h3>
            <p className="text-slate-600">Tingkat Kelulusan</p>
          </div>
        </div>
      </div>

      {/* Majors */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Program Keahlian</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['RPL', 'TKJ', 'Multimedia', 'Akuntansi', 'Pemasaran', 'OTKP', 'Perhotelan'].map((major) => (
            <div key={major} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition text-center">
              <Briefcase className="w-10 h-10 mx-auto text-brand-500 mb-4" />
              <h4 className="font-semibold text-slate-700">{major}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 3. Student Dashboard
const StudentDashboard = ({ onNavigate }: any) => {
  const [showEditor, setShowEditor] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState<'NONE' | 'CHECKED_IN' | 'CHECKED_OUT'>('NONE');

  const handleCheckIn = () => {
    // Mock Geolocation check
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(() => {
        setAttendanceStatus('CHECKED_IN');
        alert("Check-in successful within DUDI radius.");
      }, (err) => {
        alert("Geolocation required: " + err.message);
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Halo, Ahmad Dani</h2>
          <p className="text-slate-500">XII RPL 1 - PT. Telkom Indonesia</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-sm text-slate-400">Sisa Hari PKL</p>
          <p className="text-3xl font-bold text-brand-600">45 Hari</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Attendance Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg text-brand-600">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Absensi Harian</h3>
          </div>
          
          <div className="space-y-4">
             <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg">
                <span className="text-slate-600">Status Hari Ini:</span>
                <span className={`font-bold ${attendanceStatus === 'NONE' ? 'text-red-500' : 'text-green-600'}`}>
                  {attendanceStatus === 'NONE' ? 'Belum Absen' : 'Hadir'}
                </span>
             </div>

             <div className="grid grid-cols-2 gap-4">
               <button 
                onClick={handleCheckIn}
                disabled={attendanceStatus !== 'NONE'}
                className="py-4 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 disabled:bg-slate-300 transition flex flex-col items-center justify-center gap-2"
               >
                 <Clock size={20} />
                 Check In
               </button>
               <button 
                onClick={() => setAttendanceStatus('CHECKED_OUT')}
                disabled={attendanceStatus !== 'CHECKED_IN'}
                className="py-4 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 disabled:bg-slate-300 transition flex flex-col items-center justify-center gap-2"
               >
                 <LogOut size={20} />
                 Check Out
               </button>
             </div>
             <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1">
               <AlertTriangle size={12} />
               Lokasi Anda akan direkam untuk validasi.
             </p>
          </div>
        </div>

        {/* Report & Tools Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-100 rounded-lg text-amber-600">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Laporan & Tools</h3>
          </div>

          <div className="space-y-4">
            <button className="w-full text-left p-4 rounded-lg border hover:border-brand-300 hover:bg-brand-50 transition flex items-center justify-between group">
              <div>
                <h4 className="font-bold text-slate-700">Input Laporan Harian</h4>
                <p className="text-sm text-slate-500">Log aktivitas hari ini.</p>
              </div>
              <CheckCircle className="text-slate-300 group-hover:text-brand-500" />
            </button>

            <button 
              onClick={() => setShowEditor(true)}
              className="w-full text-left p-4 rounded-lg border border-purple-200 bg-purple-50 hover:bg-purple-100 transition flex items-center justify-between group"
            >
              <div>
                <h4 className="font-bold text-purple-900 flex items-center gap-2">
                  AI Image Enhancer
                  <span className="bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded-full">NEW</span>
                </h4>
                <p className="text-sm text-purple-700">Edit foto dokumentasi dengan Gemini AI.</p>
              </div>
              <div className="p-2 bg-white rounded-full shadow-sm">
                <Building2 className="w-5 h-5 text-purple-600" /> 
              </div>
            </button>
          </div>
        </div>
      </div>

      {showEditor && (
        <GeminiImageEditor 
          onCancel={() => setShowEditor(false)}
          onSave={(img) => {
            console.log("Image saved", img);
            setShowEditor(false);
            alert("Image saved to your temporary report draft!");
          }}
        />
      )}
    </div>
  );
}

// 4. Admin Dashboard
const AdminDashboard = () => {
  // Mock data for charts
  const attendanceData = [
    { name: 'RPL', hadir: 95, sakit: 2, alfa: 3 },
    { name: 'TKJ', hadir: 88, sakit: 5, alfa: 7 },
    { name: 'MM', hadir: 92, sakit: 3, alfa: 5 },
    { name: 'AKL', hadir: 98, sakit: 1, alfa: 1 },
  ];

  const pieData = [
    { name: 'Hadir', value: 850, color: '#16a34a' },
    { name: 'Sakit', value: 45, color: '#ca8a04' },
    { name: 'Izin', value: 30, color: '#2563eb' },
    { name: 'Alfa', value: 15, color: '#dc2626' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Dashboard Monitoring</h2>
          <p className="text-slate-500">Overview aktivitas PKL hari ini.</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700">Export Report</button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-700 mb-6">Absensi per Jurusan</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hadir" stackId="a" fill="#16a34a" name="Hadir" />
                <Bar dataKey="sakit" stackId="a" fill="#ca8a04" name="Sakit" />
                <Bar dataKey="alfa" stackId="a" fill="#dc2626" name="Alfa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-700 mb-2">Total Kehadiran</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-xs text-slate-500">
             {pieData.map(d => <div key={d.name} className="flex items-center gap-1"><div className="w-2 h-2 rounded-full" style={{backgroundColor: d.color}}></div>{d.name}</div>)}
          </div>
        </div>
      </div>
      
      {/* Quick Action Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Laporan Terbaru (Butuh Verifikasi)</h3>
          <button className="text-brand-600 text-sm font-medium hover:underline">Lihat Semua</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-3">Siswa</th>
                <th className="px-6 py-3">DUDI</th>
                <th className="px-6 py-3">Tanggal</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">Budi Santoso</td>
                  <td className="px-6 py-4">PT. Mencari Cinta Sejati</td>
                  <td className="px-6 py-4">24 Okt 2023</td>
                  <td className="px-6 py-4"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">Pending</span></td>
                  <td className="px-6 py-4">
                    <button className="text-brand-600 hover:text-brand-800 font-medium">Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState('HOME');
  const [userRole, setUserRole] = useState<UserRole>(UserRole.PUBLIC);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simple auth simulation
  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setCurrentView(role === UserRole.STUDENT ? 'DASHBOARD_STUDENT' : 'DASHBOARD_ADMIN');
  };

  const handleLogout = () => {
    setUserRole(UserRole.PUBLIC);
    setCurrentView('HOME');
  };

  const renderView = () => {
    switch (currentView) {
      case 'HOME': return <PublicHome onNavigate={setCurrentView} />;
      case 'LOGIN_STUDENT': 
        return (
          <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
             <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
                <div className="text-center">
                  <UserCircle className="w-16 h-16 mx-auto text-brand-500 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-800">Login Siswa</h2>
                  <p className="text-slate-500">Masukkan NISN dan Password</p>
                </div>
                <div className="space-y-4">
                  <input type="text" placeholder="NISN" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
                  <input type="password" placeholder="Password" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
                  <button onClick={() => handleLogin(UserRole.STUDENT)} className="w-full bg-brand-600 text-white py-3 rounded-lg font-bold hover:bg-brand-700 transition">Masuk</button>
                </div>
                <button onClick={() => setCurrentView('HOME')} className="w-full text-center text-slate-400 text-sm hover:text-slate-600">Kembali ke Beranda</button>
             </div>
          </div>
        );
      case 'LOGIN_ADMIN':
        return (
          <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
             <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
                <div className="text-center">
                  <Building2 className="w-16 h-16 mx-auto text-slate-700 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-800">Login Guru / Admin</h2>
                </div>
                <div className="space-y-4">
                  <input type="email" placeholder="Email / NIP" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-500 outline-none" />
                  <input type="password" placeholder="Password" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-500 outline-none" />
                  <button onClick={() => handleLogin(UserRole.ADMIN)} className="w-full bg-slate-800 text-white py-3 rounded-lg font-bold hover:bg-slate-900 transition">Masuk Dashboard</button>
                </div>
                <button onClick={() => setCurrentView('HOME')} className="w-full text-center text-slate-400 text-sm hover:text-slate-600">Kembali ke Beranda</button>
             </div>
          </div>
        );
      case 'DASHBOARD_STUDENT': return <StudentDashboard onNavigate={setCurrentView} />;
      case 'DASHBOARD_ADMIN': return <AdminDashboard />;
      case 'ATTENDANCE': return <StudentDashboard onNavigate={setCurrentView} />; // Reuse for demo
      case 'REPORT': return <StudentDashboard onNavigate={setCurrentView} />; // Reuse for demo
      default: return <PublicHome onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar 
        role={userRole} 
        onNavigate={setCurrentView} 
        onLogout={handleLogout}
        toggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
      />
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute top-0 right-0 h-full w-64 bg-white p-6 shadow-2xl flex flex-col gap-4" onClick={e => e.stopPropagation()}>
             <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-lg">Menu</h3>
               <button onClick={() => setIsMobileMenuOpen(false)}><X /></button>
             </div>
             {userRole === UserRole.PUBLIC && (
               <>
                <button onClick={() => { setCurrentView('HOME'); setIsMobileMenuOpen(false); }} className="text-left py-2 border-b">Home</button>
                <button onClick={() => { setCurrentView('LOGIN_STUDENT'); setIsMobileMenuOpen(false); }} className="text-left py-2 border-b">Login Siswa</button>
               </>
             )}
             {userRole === UserRole.STUDENT && (
               <>
                <button onClick={() => { setCurrentView('DASHBOARD_STUDENT'); setIsMobileMenuOpen(false); }} className="text-left py-2 border-b">Dashboard</button>
                <button onClick={() => { setCurrentView('ATTENDANCE'); setIsMobileMenuOpen(false); }} className="text-left py-2 border-b">Absensi</button>
                <button onClick={handleLogout} className="text-left py-2 text-red-500 mt-auto">Logout</button>
               </>
             )}
          </div>
        </div>
      )}

      <main>
        {renderView()}
      </main>
      
      {/* Sticky Mobile CTA for Students */}
      {userRole === UserRole.STUDENT && currentView === 'DASHBOARD_STUDENT' && (
        <div className="md:hidden fixed bottom-6 right-6 z-40">
           <button 
             onClick={() => setCurrentView('ATTENDANCE')} 
             className="bg-brand-600 text-white p-4 rounded-full shadow-lg flex items-center gap-2 font-bold animate-bounce"
           >
             <MapPin size={24} />
             Absen
           </button>
        </div>
      )}
    </div>
  );
};

export default App;
