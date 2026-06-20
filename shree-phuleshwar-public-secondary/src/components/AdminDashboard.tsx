import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Calendar, 
  ClipboardList, 
  Megaphone, 
  FileText, 
  CheckCircle, 
  Settings, 
  Award,
  Trash2
} from 'lucide-react';
import { User, SchoolEvent, SystemAnnouncement } from '../types';

interface AdminDashboardProps {
  admin: User;
  users: User[];
  events: SchoolEvent[];
  announcements: SystemAnnouncement[];
  onAddUser: (user: Omit<User, 'id'>) => void;
  onRemoveUser: (id: string) => void;
  onAddEvent: (event: Omit<SchoolEvent, 'id'>) => void;
  onPublishAnnouncement: (announcement: Omit<SystemAnnouncement, 'id'>) => void;
}

export default function AdminDashboard({
  admin,
  users,
  events,
  announcements,
  onAddUser,
  onRemoveUser,
  onAddEvent,
  onPublishAnnouncement
}: AdminDashboardProps) {
  const [activeSegment, setActiveSegment] = useState<'analytics' | 'users' | 'events' | 'notices'>('analytics');
  
  // User creation form
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'student' | 'teacher'>('student');
  const [newUserRoll, setNewUserRoll] = useState('');
  const [newUserClass, setNewUserClass] = useState('Class 10 - A');
  const [newUserSpecialty, setNewUserSpecialty] = useState('');
  const [userSuccessMsg, setUserSuccessMsg] = useState('');

  // Event creation form
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('2026-07-10');
  const [newEventTime, setNewEventTime] = useState('11:00 AM');
  const [newEventLoc, setNewEventLoc] = useState('');
  const [newEventDesc, setNewEventDesc] = useState('');
  const [eventSuccessMsg, setEventSuccessMsg] = useState('');

  // Announcement publisher
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annCategory, setAnnCategory] = useState<'academic' | 'event' | 'holiday' | 'administration'>('administration');
  const [annSuccessMsg, setAnnSuccessMsg] = useState('');

  const handleRegisterUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    onAddUser({
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      ...(newUserRole === 'student' ? {
        rollNo: newUserRoll || String(users.filter(u => u.role === 'student').length + 1),
        classSection: newUserClass,
        parentName: 'Guardian Name Specified'
      } : {
        subjectSpecialty: newUserSpecialty || 'Core Subject Coordinator',
        assignedClass: newUserClass
      })
    });

    setNewUserName('');
    setNewUserEmail('');
    setNewUserRoll('');
    setNewUserSpecialty('');
    setUserSuccessMsg(`Registered ${newUserName} successfully as a ${(newUserRole).toUpperCase()} with valid credentials.`);
    setTimeout(() => setUserSuccessMsg(''), 5000);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle || !newEventLoc || !newEventDesc) return;

    onAddEvent({
      title: newEventTitle,
      date: newEventDate,
      time: newEventTime,
      location: newEventLoc,
      description: newEventDesc
    });

    setNewEventTitle('');
    setNewEventLoc('');
    setNewEventDesc('');
    setEventSuccessMsg(`School-wide Event "${newEventTitle}" synchronized! Published automatically to the front-facing calendar.`);
    setTimeout(() => setEventSuccessMsg(''), 5000);
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;

    onPublishAnnouncement({
      title: annTitle,
      content: annContent,
      category: annCategory,
      date: new Date().toISOString().split('T')[0],
      publishedBy: admin.name
    });

    setAnnTitle('');
    setAnnContent('');
    setAnnSuccessMsg(`Urgent Notice "${annTitle}" broad-casted live. Front homepage widget now displays this record.`);
    setTimeout(() => setAnnSuccessMsg(''), 5000);
  };

  // Human, friendly stat summaries
  const studentCount = users.filter(u => u.role === 'student').length;
  const teacherCount = users.filter(u => u.role === 'teacher').length;

  return (
    <div id="admin-dashboard-container" className="space-y-8 animate-in fade-in duration-200">
      
      {/* Admin header card */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-[2rem] p-6 border border-slate-850 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-650 text-white font-black text-xl flex items-center justify-center border border-white/20">
            A
          </div>
          <div>
            <h3 className="text-xl font-extrabold tracking-tight text-white leading-none font-display">{admin.name}</h3>
            <span className="text-xs text-indigo-300 font-bold uppercase mt-1 tracking-wider block">
              Head Master Admin • Shree Phuleshwar Boarding School
            </span>
          </div>
        </div>

        {/* Human education summaries */}
        <div className="flex space-x-3 text-xs font-bold">
          <span className="px-3.5 py-1.5 bg-white/10 rounded-xl border border-white/10 font-mono tracking-wider">
            CAMPUS: OPEN
          </span>
          <span className="px-3.5 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 font-mono tracking-wider">
            PORTAL ACTIVE
          </span>
        </div>
      </div>

      {/* Control Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-0 text-sm font-bold">
        {[
          { key: 'analytics', name: 'General Overview', icon: ClipboardList },
          { key: 'users', name: 'Identity Registry', icon: Users },
          { key: 'events', name: 'Event Coordinator', icon: Calendar },
          { key: 'notices', name: 'Live notices', icon: Megaphone }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeSegment === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveSegment(tab.key as any)}
              className={`flex items-center space-x-2 pb-3 px-1.5 border-b-2 transition-all cursor-pointer ${
                active 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: GENERAL OVERVIEW ANALYTICS */}
      {activeSegment === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Stat Box 1 */}
            <div className="bg-white rounded-3xl p-5 border border-slate-250 shadow-sm">
              <span className="text-slate-405 text-xs font-bold uppercase tracking-widest block">Total Pupils</span>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-4xl font-black text-slate-800">{studentCount + 440}</span>
                <span className="text-xs text-indigo-600 font-bold">+18% termly</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 font-sans font-medium">Active secondary enrollments</p>
            </div>

            {/* Stat Box 2 */}
            <div className="bg-white rounded-3xl p-5 border border-slate-250 shadow-sm">
              <span className="text-slate-450 text-xs font-bold uppercase tracking-widest block">Core Faculty</span>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-4xl font-black text-slate-800">{teacherCount + 15}</span>
                <span className="text-xs text-rose-500 font-bold">1:16 ratio</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 font-sans font-medium font-sans">Assigned certified instructors</p>
            </div>

            {/* Stat Box 3 */}
            <div className="bg-white rounded-3xl p-5 border border-slate-250 shadow-sm">
              <span className="text-slate-405 text-xs font-bold uppercase tracking-widest block">Mean Attendance</span>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-4xl font-black text-slate-800">92.8%</span>
                <span className="text-xs text-emerald-600 font-bold">Perfect</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 font-sans font-medium font-sans">Across all 10 grades sections</p>
            </div>

            {/* Stat Box 4 */}
            <div className="bg-white rounded-3xl p-5 border border-slate-250 shadow-sm">
              <span className="text-slate-455 text-xs font-bold uppercase tracking-widest block">Notices Log</span>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-4xl font-black text-slate-800">{announcements.length}</span>
                <span className="text-xs text-amber-500 font-bold">Broadcasting</span>
              </div>
              <p className="text-xs text-slate-400 mt-2 font-sans font-medium font-sans">Active notifications and briefs</p>
            </div>

          </div>

          {/* Quick Administration Log of entries */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-lg mb-3 flex items-center space-x-2 font-display">
                <Settings className="w-5 h-5 text-indigo-500" />
                <span>Registrar Console Audit</span>
              </h4>
              <p className="text-xs text-slate-400 mb-4 font-semibold">Latest school status indexes configured</p>
              
              <div className="space-y-3 font-sans text-xs font-bold">
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-2xl flex justify-between items-center">
                  <span className="text-slate-500">Board Examinations Syllabus Year</span>
                  <span className="text-slate-800">2026 - 2027 Approved</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-2xl flex justify-between items-center">
                  <span className="text-slate-500">Admissions status</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-150 text-[10px] uppercase tracking-wider">OPEN FOR APPLICATIONS</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-2xl flex justify-between items-center">
                  <span className="text-slate-500">Academic Infrastructure</span>
                  <span className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-150 text-[10px] uppercase tracking-wider">Secure Portal active</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h4 className="font-extrabold text-slate-800 text-lg mb-3 font-display">Academic Access Guidelines</h4>
              <ul className="space-y-3.5 text-xs text-slate-500 leading-relaxed font-sans font-medium">
                <li>
                  <strong className="text-slate-700">Authorized Roles:</strong> Administrators govern school event listings, bulletin postings, and registration directories. Teachers handle test results entry and attendance marks. Students access grade visualization systems and automated assignment details.
                </li>
                <li>
                  <strong className="text-slate-700">Database Guidelines:</strong> All data logs remain isolated relative to the specific authenticated school session. Always check class boundaries before updating rosters.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USER REGISTRATION MANAGEMENT */}
      {activeSegment === 'users' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form to Register User */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm h-fit">
            <h4 className="font-extrabold text-slate-800 text-lg mb-3">Register Student or Teacher</h4>
            
            {userSuccessMsg && (
              <div className="p-3.5 mb-4 bg-emerald-50 text-emerald-805 text-xs font-semibold rounded-2xl border border-emerald-150 leading-snug">
                {userSuccessMsg}
              </div>
            )}

            <form onSubmit={handleRegisterUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Academy Role Type</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setNewUserRole('student')}
                    className={`py-2 px-3 rounded-xl border font-black uppercase transition-all tracking-wider cursor-pointer ${
                      newUserRole === 'student' 
                        ? 'bg-indigo-600 text-white border-transparent shadow' 
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewUserRole('teacher')}
                    className={`py-2 px-3 rounded-xl border font-black uppercase transition-all tracking-wider cursor-pointer ${
                      newUserRole === 'teacher' 
                        ? 'bg-indigo-600 text-white border-transparent shadow' 
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Teacher
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Full Legal Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Binod Bastola"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full text-xs font-bold bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. binod@shreephuleshwar.edu.np"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full text-xs font-bold bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700" 
                />
              </div>

              {newUserRole === 'student' ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Roll Number</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 19"
                        value={newUserRoll}
                        onChange={(e) => setNewUserRoll(e.target.value)}
                        className="w-full text-xs font-bold bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Class Section</label>
                      <select
                        value={newUserClass}
                        onChange={(e) => setNewUserClass(e.target.value)}
                        className="w-full text-xs font-bold bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 cursor-pointer"
                      >
                        <option>Class 10 - A</option>
                        <option>Class 10 - B</option>
                        <option>Class 9 - A</option>
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Specialty Area</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Mathematics Lead"
                        value={newUserSpecialty}
                        onChange={(e) => setNewUserSpecialty(e.target.value)}
                        className="w-full text-xs font-bold bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Assigned Class</label>
                      <select
                        value={newUserClass}
                        onChange={(e) => setNewUserClass(e.target.value)}
                        className="w-full text-xs font-bold bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 cursor-pointer"
                      >
                        <option>Class 10 - B</option>
                        <option>Class 10 - A</option>
                        <option>Class 9 - A</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <button 
                type="submit" 
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all duration-150 shadow flex items-center justify-center space-x-1 cursor-pointer"
                id="btn-register-user"
              >
                <Plus className="w-4 h-4 mr-1 text-white" />
                <span>Register Credentials</span>
              </button>
            </form>
          </div>

          {/* User entries directory */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm h-fit">
            <h4 className="font-extrabold text-slate-800 text-lg mb-4">Shree Phuleshwar Member Registry</h4>
            
            <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2 scrollbar-none">
              {users.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-150 flex items-center justify-between font-bold text-xs gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-150 flex items-center justify-center text-indigo-600 font-extrabold uppercase font-mono">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <span className="text-slate-8次0 text-sm block font-extrabold">{item.name}</span>
                      <span className="text-slate-400 block font-mono font-semibold">{item.email}</span>
                      <span className="text-[10px] text-rose-500 tracking-wider">
                        Class: {item.classSection || item.assignedClass || 'Unassigned'} | {item.rollNo ? `Roll: ${item.rollNo}` : (item.subjectSpecialty || 'Admin')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`px-2.5 py-0.5 text-[9px] uppercase font-black tracking-wider rounded-full border ${
                      item.role === 'admin' ? 'bg-amber-55 bg-amber-50 text-amber-800 border-amber-200' :
                      item.role === 'teacher' ? 'bg-indigo-55 bg-indigo-50 text-indigo-800 border-indigo-200' :
                      'bg-emerald-55 bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}>
                      {item.role}
                    </span>
                    
                    {/* Exclude removing active admins to keep secure */}
                    {item.role !== 'admin' && (
                      <button 
                        onClick={() => onRemoveUser(item.id)}
                        className="p-1 px-2 text-rose-500 bg-white hover:bg-rose-50 rounded-lg border border-slate-200 hover:text-rose-700 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: MASTER EVENT COORDINATOR */}
      {activeSegment === 'events' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* New Event Form */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm h-fit">
            <h4 className="font-extrabold text-slate-805 text-lg mb-3">Host New Academy Event</h4>
            
            {eventSuccessMsg && (
              <div className="p-3.5 mb-4 bg-emerald-50 text-emerald-805 text-xs font-semibold rounded-2xl border border-emerald-150 leading-snug">
                {eventSuccessMsg}
              </div>
            )}

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Event Display Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Science Olympiad Exhibition"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className="w-full text-xs font-bold bg-slate-550 bg-slate-20 bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Calendar Date</label>
                  <input 
                    type="date" 
                    required
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full text-xs font-bold bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 cursor-pointer" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Timings slot</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 10:00 AM - 3:00 PM"
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                    className="w-full text-xs font-bold bg-slate-550 bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Assembly Location Venue</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. School Ground Block B Auditorium"
                  value={newEventLoc}
                  onChange={(e) => setNewEventLoc(e.target.value)}
                  className="w-full text-xs font-bold bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Comprehensive Description</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="What is this celebratory agenda, who will participate..."
                  value={newEventDesc}
                  onChange={(e) => setNewEventDesc(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700" 
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all duration-150 shadow flex items-center justify-center space-x-1 cursor-pointer"
              >
                <Calendar className="w-4 h-4 mr-1 text-white" />
                <span>Deploy Calendar Event</span>
              </button>
            </form>
          </div>

          {/* Active events */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm h-fit">
            <h4 className="font-extrabold text-slate-800 text-lg mb-4">Active Public Calendar Records</h4>
            
            <div className="space-y-4">
              {events.map((ev) => (
                <div key={ev.id} className="p-4 rounded-xl bg-slate-50 border border-slate-150 flex space-x-4 hover:border-indigo-150 transition-colors">
                  <div className="flex-shrink-0 w-11 h-11 bg-rose-50 border border-rose-150 rounded-xl flex items-center justify-center text-rose-500">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-805 text-base leading-snug">{ev.title}</h5>
                    <p className="text-[11px] text-rose-550 font-bold mt-1 uppercase tracking-wide">⏰ {ev.time} | 📍 {ev.location} | 📅 {ev.date}</p>
                    <p className="text-xs text-slate-600 mt-2 font-normal leading-relaxed">{ev.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: LIVE NOTICE BROADCASTER */}
      {activeSegment === 'notices' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* New notice form */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm h-fit">
            <h4 className="font-extrabold text-slate-8次0 text-lg mb-3">Broad-cast Notice Board Item</h4>
            
            {annSuccessMsg && (
              <div className="p-3.5 mb-4 bg-emerald-50 text-emerald-805 text-xs font-semibold rounded-2xl border border-emerald-150 leading-snug">
                {annSuccessMsg}
              </div>
            )}

            <form onSubmit={handleCreateAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Notice Display Heading</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Monsoon Holiday Notice"
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  className="w-full text-xs font-bold bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Notice Category</label>
                <select
                  value={annCategory}
                  onChange={(e) => setAnnCategory(e.target.value as any)}
                  className="w-full text-xs font-bold bg-slate-50 border border-slate-205 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 cursor-pointer"
                >
                  <option value="administration">Administrative Notice</option>
                  <option value="holiday">Holiday Declaration</option>
                  <option value="academic">Academic / Exam Results</option>
                  <option value="event">Athletics / Co-curricular</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-555 uppercase tracking-widest mb-1.5">Declaration Body Details</label>
                <textarea 
                  rows={5}
                  required
                  placeholder="Write clear paragraph briefings for parents and student portals..."
                  value={annContent}
                  onChange={(e) => setAnnContent(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700" 
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all duration-150 shadow flex items-center justify-center space-x-1 cursor-pointer"
              >
                <Megaphone className="w-4 h-4 mr-1 text-white animate-pulse" />
                <span>Transmit Public Notice</span>
              </button>
            </form>
          </div>

          {/* list of notices */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm h-fit">
            <h4 className="font-extrabold text-slate-800 text-lg mb-4">Urgent Bulletins Live feed</h4>
            
            <div className="space-y-4">
              {announcements.map((no) => (
                <div key={no.id} className="p-4 rounded-xl bg-slate-50 border-l-4 border-indigo-600 hover:bg-indigo-50/20 transition-colors text-xs font-bold">
                  <div className="flex justify-between items-center mb-1 font-mono text-[9px] uppercase tracking-wide">
                    <span className="text-slate-400 font-bold">{no.date}</span>
                    <span className="bg-indigo-50 text-indigo-805 border border-indigo-150 uppercase px-2 py-0.5 rounded-full">{no.category}</span>
                  </div>
                  <h5 className="font-extrabold text-slate-805 text-base leading-snug">{no.title}</h5>
                  <p className="text-slate-600 font-normal font-sans mt-2 leading-relaxed">{no.content}</p>
                  <div className="mt-3.5 pt-3 border-t border-slate-200 text-[10px] text-slate-405 font-bold uppercase tracking-wider flex justify-between">
                    <span>Broadcaster: Admin • {no.publishedBy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
