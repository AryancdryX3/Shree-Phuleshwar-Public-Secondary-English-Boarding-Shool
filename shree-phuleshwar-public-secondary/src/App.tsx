import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  ArrowLeft, 
  Sparkles, 
  Bell, 
  LogOut, 
  MapPin, 
  Phone, 
  ShieldAlert, 
  VolumeX, 
  Volume2,
  Lock,
  UserCheck
} from 'lucide-react';
import { 
  MOCK_USERS, 
  INITIAL_GRADES, 
  INITIAL_ATTENDANCE, 
  INITIAL_ASSIGNMENTS, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_EVENTS, 
  INITIAL_NOTIFICATIONS 
} from './data';
import { 
  User, 
  SubjectGrade, 
  AttendanceRecord, 
  Assignment, 
  SystemAnnouncement, 
  SchoolEvent, 
  SystemNotification,
  Role
} from './types';
import LandingPage from './components/LandingPage';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import AdminDashboard from './components/AdminDashboard';
import NotificationCenter from './components/NotificationCenter';
import CrestLogo from './components/CrestLogo';

export default function App() {
  // Navigation: 'landing' or 'dashboard'
  const [viewMode, setViewMode] = useState<'landing' | 'dashboard'>('landing');
  
  // Backing simulated databases
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [grades, setGrades] = useState<SubjectGrade[]>(INITIAL_GRADES);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [announcements, setAnnouncements] = useState<SystemAnnouncement[]>(INITIAL_ANNOUNCEMENTS);
  const [events, setEvents] = useState<SchoolEvent[]>(INITIAL_EVENTS);
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);

  // Active selected user for sandbox impersonation
  const [activeUser, setActiveUser] = useState<User>(MOCK_USERS[0]); // Starts as student Aarav Sharma
  
  // Reactive Alerts Toast state
  const [alertToast, setAlertToast] = useState<{ id: string; msg: string; type: string } | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Trigger Toast Alert helper
  const triggerToast = (msg: string, type: 'assignment' | 'grade' | 'attendance' | 'success') => {
    const id = Date.now().toString();
    setAlertToast({ id, msg, type });
    
    // Play light synth chime
    if (soundEnabled && typeof window !== 'undefined' && window.AudioContext) {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(type === 'success' ? 587.33 : 440, ctx.currentTime); // D5 or A4
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } catch (e) {
        console.log('Audio feedback not supported', e);
      }
    }

    setTimeout(() => {
      setAlertToast(prev => prev?.id === id ? null : prev);
    }, 4500);
  };

  // HANDLER: Switch roles inside dashboard
  const handleImpersonateUser = (userId: string) => {
    const found = users.find(u => u.id === userId);
    if (found) {
      setActiveUser(found);
      triggerToast(`Flipped portal view to ${found.name} (${found.role.toUpperCase()})`, 'success');
    }
  };

  // HANDLER: Go to dashboard directly from anywhere or specific role
  const enterDashboardPortal = (preferredRole?: Role) => {
    if (preferredRole) {
      const match = users.find(u => u.role === preferredRole);
      if (match) setActiveUser(match);
    }
    setViewMode('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // HANDLER: Create User (Admin Action)
  const handleAddUser = (newUser: Omit<User, 'id'>) => {
    const id = `user_${Date.now()}`;
    const formattedUser: User = { ...newUser, id };
    
    setUsers(curr => [...curr, formattedUser]);
    triggerToast(`Registered account credential ${newUser.name} into database!`, 'success');
  };

  // HANDLER: Remove User (Admin Action)
  const handleRemoveUser = (id: string) => {
    setUsers(curr => curr.filter(u => u.id !== id));
    triggerToast('Account credential removed successfully', 'success');
  };

  // HANDLER: Add Event (Admin Action)
  const handleAddEvent = (newEvent: Omit<SchoolEvent, 'id'>) => {
    const id = `ev_${Date.now()}`;
    const formattedEvent: SchoolEvent = { ...newEvent, id };
    setEvents(curr => [formattedEvent, ...curr]);
    triggerToast(`School event "${newEvent.title}" published live!`, 'success');
  };

  // HANDLER: Add Announcement (Admin/Staff Notice Board Action)
  const handlePublishAnnouncement = (newAnn: Omit<SystemAnnouncement, 'id'>) => {
    const id = `ann_${Date.now()}`;
    const formattedAnn: SystemAnnouncement = { ...newAnn, id };
    setAnnouncements(curr => [formattedAnn, ...curr]);
    triggerToast(`Urgent Admin Notice published: "${newAnn.title}"`, 'success');
  };

  // HANDLER: Add Grades (Teacher Action)
  const handleAddGrade = (newGrade: Omit<SubjectGrade, 'id'>) => {
    const id = `g_${Date.now()}`;
    const formattedGrade: SubjectGrade = { ...newGrade, id };
    setGrades(curr => [formattedGrade, ...curr]);

    // Send corresponding Notification to target student automatically
    const targetStudent = users.find(u => u.id === newGrade.studentId);
    if (targetStudent) {
      const notifId = `not_${Date.now()}`;
      const newNotif: SystemNotification = {
        id: notifId,
        userId: targetStudent.id,
        title: 'New Term Grade Certified',
        message: `${newGrade.gradedBy} posted your ${newGrade.examName} score inside ${newGrade.subject}: ${newGrade.score}/100. Check remarks.`,
        type: 'grade',
        read: false,
        date: new Date().toISOString()
      };
      setNotifications(curr => [newNotif, ...curr]);
      triggerToast(`Grade posted! Notification dispatched to student ${targetStudent.name}.`, 'grade');
    }
  };

  // HANDLER: Publish Assignment (Teacher Action) - Automatically triggers notification
  const handlePublishAssignment = (newAsg: Omit<Assignment, 'id'>) => {
    const id = `asg_${Date.now()}`;
    const formattedAsg: Assignment = { ...newAsg, id };
    setAssignments(curr => [formattedAsg, ...curr]);

    // Dispatches automated assignment notification to all students of that class!
    const classmates = users.filter(u => u.role === 'student' && u.classSection === newAsg.classSection);
    const dateStr = new Date().toISOString();
    
    const newNotifs: SystemNotification[] = classmates.map((cl, idx) => ({
      id: `not_asg_${Date.now()}_${idx}`,
      userId: cl.id,
      title: 'New Homework Assigned',
      message: `${newAsg.publishedBy} released homework "${newAsg.title}" due on ${newAsg.dueDate}.`,
      type: 'assignment',
      read: false,
      date: dateStr
    }));

    setNotifications(curr => [...newNotifs, ...curr]);
    triggerToast(`Homework published! "Automated Assignment Notifications" sent to class.`, 'assignment');
  };

  // HANDLER: Update Attendance (Teacher Action)
  const handleUpdateAttendance = (newRecords: Omit<AttendanceRecord, 'id'>[]) => {
    const dateStr = new Date().toISOString();
    const formattedRecords: AttendanceRecord[] = newRecords.map((rec, idx) => ({
      ...rec,
      id: `at_${Date.now()}_${idx}`
    }));

    // Merge into attendance registry
    setAttendance(curr => [...formattedRecords, ...curr]);

    // Dispense targeted notifications for attendees marked absent or late
    const absentNotifs: SystemNotification[] = formattedRecords
      .filter(rec => rec.status === 'absent' || rec.status === 'late')
      .map((rec, idx) => {
        const associatedStudent = users.find(u => u.id === rec.studentId);
        return {
          id: `not_att_${Date.now()}_${idx}`,
          userId: rec.studentId,
          title: `Daily Attendance Registered`,
          message: `You have been logged as "${rec.status}" for date ${rec.date} by ${rec.markedBy}.`,
          type: 'attendance' as const,
          read: false,
          date: dateStr
        };
      });

    setNotifications(curr => [...absentNotifs, ...curr]);
    triggerToast(`Attendance registered for today! Absentees alerted automatically.`, 'attendance');
  };

  // HANDLER: Notification operations
  const handleMarkNotifRead = (id: string) => {
    setNotifications(curr => curr.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleClearAllNotifs = () => {
    setNotifications([]);
    triggerToast('Notification cleared', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-950 overflow-x-hidden">
      
      {/* REACTIVE SYSTEM TOAST ALARMS */}
      <AnimatePresence>
        {alertToast && (
          <motion.div
            id="toast-alarm-container"
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
            className="fixed top-20 right-4 z-50 max-w-sm w-full bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-indigo-500/20 flex items-start space-x-3"
          >
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <Sparkles className="w-5 h-5 animate-pulse text-amber-300" />
            </div>
            <div className="flex-1">
              <span className="block text-indigo-300 text-xs font-bold uppercase tracking-widest font-mono">System Dynamic Notice</span>
              <p className="text-xs font-semibold leading-relaxed text-gray-200 mt-1">{alertToast.msg}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        
        {/* VIEW 1: LANDING PAGE */}
        {viewMode === 'landing' ? (
          <motion.div 
            key="landing-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LandingPage 
              onEnterDashboard={enterDashboardPortal} 
              events={events}
              announcements={announcements}
            />
          </motion.div>
        ) : (
          
          /* VIEW 2: PORTAL INTERACTIVE DASHBOARD SYSTEM */
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="min-h-screen bg-slate-50 py-8"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* TOP HEADER CONTROLS */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
                
                {/* School title & Back trigger */}
                <div className="flex items-center space-x-4">
                  <button 
                    id="btn-return-home"
                    onClick={() => setViewMode('landing')}
                    className="p-2 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 shadow-sm transition text-indigo-600"
                    title="Return to Public Website"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <CrestLogo size={48} />
                  <div>
                    <h1 className="text-xl font-extrabold tracking-tight text-slate-800 leading-snug">
                      Shree Phuleshwar Boarding Portal
                    </h1>
                    <span className="text-xs text-indigo-600 font-bold uppercase tracking-wider block">
                      Autonomous Academy Administration Grid
                    </span>
                  </div>
                </div>

                {/* Simulated Audio Indicator and Log Out */}
                <div className="flex items-center space-x-2.5 font-sans">
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 transition-all flex items-center space-x-1"
                    title={soundEnabled ? "Mute audio alarms feedback" : "Unmute audio alarms feedback"}
                  >
                    {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-rose-500" />}
                    <span className="text-[10px] uppercase font-bold tracking-wider hidden lg:inline">Chime SFX</span>
                  </button>

                  <button 
                    onClick={() => setViewMode('landing')} 
                    className="px-4 py-2 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl text-xs uppercase tracking-wider transition-all flex items-center space-x-1.5 shadow-sm"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-450" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>

              {/* DEMO SANDBOX IMPERSONATOR / ROLE SWITCH BAR - ABSOLUTE BEST PRACTICE FOR INTERACTION */}
              <div id="role-impersonator-bar" className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-slate-800 font-black text-sm flex items-center">
                      <Sparkles className="w-4 h-4 text-indigo-600 mr-2 animate-spin" strokeWidth={2.5} />
                      <span>Administrative Sandbox Switching Center</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Choose any profile to preview customized layouts for <strong>Students</strong>, <strong>Teachers</strong>, or <strong>Admins</strong> instantly!
                    </p>
                  </div>

                  {/* Impersonator switches list */}
                  <div className="flex flex-wrap gap-2">
                    {users.map((u) => {
                      const isActive = activeUser.id === u.id;
                      return (
                        <button
                          key={u.id}
                          onClick={() => handleImpersonateUser(u.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold font-sans transition-all flex items-center space-x-1.5 border border-slate-205 uppercase tracking-wide cursor-pointer ${
                            isActive 
                              ? 'bg-indigo-600 text-white border-transparent shadow-md shadow-indigo-100 ring-2 ring-indigo-500' 
                              : 'bg-slate-50 text-slate-500 hover:bg-white hover:text-indigo-600'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${
                            u.role === 'admin' ? 'bg-amber-400' :
                            u.role === 'teacher' ? 'bg-indigo-500' : 'bg-emerald-505'
                          }`}></span>
                          <span>{u.name} ({(u.role).toUpperCase()})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* PORTAL MAIN CONTENT SPLIT GRID WITH NOTIFICATION CENTER BAR */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* LEFT CONSOLE COLUMN: ACTIVE PANEL CONTENT */}
                <div className="lg:col-span-3">
                  
                  {/* Active user state banner */}
                  <div className="mb-4 flex items-center justify-between bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm text-xs text-slate-500">
                    <div className="flex items-center space-x-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="font-semibold text-slate-400">Simulated Active Viewport:</span>
                      <span className="font-extrabold text-indigo-750 uppercase bg-indigo-50 px-2 py-0.5 rounded-full text-[11px]">
                        {(activeUser.role)} panel
                      </span>
                    </div>
                    <span className="font-mono text-slate-405 font-bold hidden sm:inline text-[11px]">User ID: SF-{activeUser.id.toUpperCase()}</span>
                  </div>

                  {/* ACTIVE VIEW SWITCHER */}
                  {activeUser.role === 'student' && (
                    <StudentDashboard 
                      student={activeUser}
                      grades={grades}
                      attendance={attendance}
                      assignments={assignments}
                      notifications={notifications.filter(n => n.userId === activeUser.id || n.userId === 'all')}
                      onMarkNotificationRead={handleMarkNotifRead}
                    />
                  )}

                  {activeUser.role === 'teacher' && (
                    <TeacherDashboard 
                      teacher={activeUser}
                      students={users.filter(u => u.role === 'student')}
                      grades={grades}
                      assignments={assignments.filter(a => a.publishedBy === activeUser.name)}
                      onAddGrade={handleAddGrade}
                      onPublishAssignment={handlePublishAssignment}
                      onUpdateAttendance={handleUpdateAttendance}
                    />
                  )}

                  {activeUser.role === 'admin' && (
                    <AdminDashboard 
                      admin={activeUser}
                      users={users}
                      events={events}
                      announcements={announcements}
                      onAddUser={handleAddUser}
                      onRemoveUser={handleRemoveUser}
                      onAddEvent={handleAddEvent}
                      onPublishAnnouncement={handlePublishAnnouncement}
                    />
                  )}

                </div>

                {/* RIGHT COLUMN: INTEGRATED NOTIFICATION BULLETIN BOARD */}
                <div className="lg:col-span-1 space-y-6">
                  <NotificationCenter 
                    notifications={notifications.filter(n => n.userId === activeUser.id || n.userId === 'all')}
                    onMarkRead={handleMarkNotifRead}
                    onClearAll={handleClearAllNotifs}
                  />

                  {/* Extra Helpful Guidance Box */}
                  <div className="bg-gradient-to-tr from-indigo-950 to-slate-905 rounded-[2rem] p-6 text-white border border-indigo-500/20">
                    <h5 className="font-bold text-indigo-300 text-xs uppercase tracking-widest mb-2 flex items-center">
                      <Lock className="w-4 h-4 text-indigo-400 mr-1.5" />
                      <span>Security & Roles</span>
                    </h5>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                      Changes submitted are securely stored inside memory parameters. Whenever you register a user, publish a grade, report absentees, or deploy a notice, other profiles react immediately.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
