import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  PlusCircle, 
  Calendar, 
  Award, 
  Users, 
  Send,
  AlertTriangle,
  ClipboardList
} from 'lucide-react';
import { User, SubjectGrade, AttendanceRecord, Assignment, AttendanceStatus } from '../types';

interface TeacherDashboardProps {
  teacher: User;
  students: User[];
  grades: SubjectGrade[];
  assignments: Assignment[];
  onAddGrade: (grade: Omit<SubjectGrade, 'id'>) => void;
  onPublishAssignment: (assignment: Omit<Assignment, 'id'>) => void;
  onUpdateAttendance: (records: Omit<AttendanceRecord, 'id'>[]) => void;
}

export default function TeacherDashboard({
  teacher,
  students,
  grades,
  assignments,
  onAddGrade,
  onPublishAssignment,
  onUpdateAttendance
}: TeacherDashboardProps) {
  const [activePanel, setActivePanel] = useState<'grades' | 'attendance' | 'assignment'>('grades');
  
  // Grade Form State
  const [gradeStudentId, setGradeStudentId] = useState(students[0]?.id || '');
  const [gradeSubject, setGradeSubject] = useState('Mathematics');
  const [gradeExamName, setGradeExamName] = useState('First Term Exam');
  const [gradeScore, setGradeScore] = useState<number>(85);
  const [gradeMaxScore] = useState<number>(100);
  const [gradeRemarks, setGradeRemarks] = useState('');
  const [gradeSuccessMessage, setGradeSuccessMessage] = useState('');

  // Assignment Form State
  const [asgTitle, setAsgTitle] = useState('');
  const [asgSubject, setAsgSubject] = useState('Science');
  const [asgClass, setAsgClass] = useState('Class 10 - A');
  const [asgDueDate, setAsgDueDate] = useState('2026-06-25');
  const [asgDescription, setAsgDescription] = useState('');
  const [asgSuccessMessage, setAsgSuccessMessage] = useState('');

  // Attendance Sheet State (Map of StudentID -> AttendanceStatus)
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceSheet, setAttendanceSheet] = useState<Record<string, AttendanceStatus>>(
    students.reduce((acc, student) => {
      acc[student.id] = 'present';
      return acc;
    }, {} as Record<string, AttendanceStatus>)
  );
  const [attendanceSuccessMessage, setAttendanceSuccessMessage] = useState('');

  const submitGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradeStudentId) return;
    
    onAddGrade({
      studentId: gradeStudentId,
      subject: gradeSubject,
      examName: gradeExamName,
      score: Number(gradeScore),
      maxScore: gradeMaxScore,
      gradedBy: teacher.name,
      date: new Date().toISOString().split('T')[0],
      remarks: gradeRemarks
    });

    setGradeRemarks('');
    setGradeSuccessMessage(`Grade uploaded successfully! Notification has been dispatched to ${students.find(s => s.id === gradeStudentId)?.name}.`);
    setTimeout(() => setGradeSuccessMessage(''), 5000);
  };

  const submitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!asgTitle || !asgDescription) return;

    onPublishAssignment({
      title: asgTitle,
      description: asgDescription,
      subject: asgSubject,
      classSection: asgClass,
      dueDate: asgDueDate,
      publishedDate: new Date().toISOString().split('T')[0],
      publishedBy: teacher.name
    });

    setAsgTitle('');
    setAsgDescription('');
    setAsgSuccessMessage(`"Automated Assignment Notification" triggered! Homework posted to all portals for ${asgClass}.`);
    setTimeout(() => setAsgSuccessMessage(''), 5000);
  };

  const handleAttendanceChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceSheet(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const submitAttendance = () => {
    const listToPost = Object.entries(attendanceSheet).map(([studentId, status]) => ({
      studentId,
      date: attendanceDate,
      status: status as AttendanceStatus,
      markedBy: teacher.name
    }));

    onUpdateAttendance(listToPost);
    setAttendanceSuccessMessage(`Successfully logged class attendance registry for ${attendanceDate}. Absent student notifications transmitted.`);
    setTimeout(() => setAttendanceSuccessMessage(''), 5000);
  };

  return (
    <div id="teacher-dashboard-panel" className="space-y-8 animate-in fade-in duration-200">
      
      {/* Teacher Profile strip */}
      <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white font-black text-xl flex items-center justify-center border-2 border-indigo-500 shadow-sm">
            T
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-8次0 leading-none font-display">{teacher.name}</h3>
            <span className="text-xs text-indigo-600 font-bold mt-1 block">
              Department Lead: {teacher.subjectSpecialty} • {teacher.assignedClass}
            </span>
          </div>
        </div>

        {/* Rapid summary totals */}
        <div className="flex space-x-4 text-xs font-semibold">
          <div className="bg-indigo-50/50 text-indigo-800 border border-indigo-150 rounded-2xl px-4 py-2.5 text-center min-w-24">
            <span className="block font-black text-xl text-indigo-755">{students.length}</span>
            <span className="text-slate-400 uppercase text-[9px] font-bold tracking-wider">Assigned Pupils</span>
          </div>
          <div className="bg-rose-50/50 text-rose-800 border border-rose-150 rounded-2xl px-4 py-2.5 text-center min-w-24">
            <span className="block font-black text-xl text-rose-755">{assignments.length}</span>
            <span className="text-slate-400 uppercase text-[9px] font-bold tracking-wider">Published HWs</span>
          </div>
        </div>
      </div>

      {/* Control Tabs */}
      <div className="flex space-x-4 border-b border-slate-200 pb-0 text-sm font-bold">
        {[
          { key: 'grades', name: 'Gradebook Console', icon: Award },
          { key: 'attendance', name: 'Attendance Registry', icon: ClipboardList },
          { key: 'assignment', name: 'Publish Homework Booklet', icon: PlusCircle }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activePanel === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActivePanel(tab.key as any)}
              className={`flex items-center space-x-2 pb-3 border-b-2 transition-all cursor-pointer ${
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

      {/* PANEL 1: GRADEBOOK */}
      {activePanel === 'grades' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Submission Form */}
          <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm h-fit">
            <h4 className="font-extrabold text-slate-800 text-lg mb-3">Record Student Assessment</h4>
            
            {gradeSuccessMessage && (
              <div className="p-3.5 mb-4 bg-emerald-50 text-emerald-805 text-xs font-semibold rounded-2xl border border-emerald-150 leading-tight">
                {gradeSuccessMessage}
              </div>
            )}

            <form onSubmit={submitGrade} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Target Student</label>
                <select 
                  value={gradeStudentId}
                  onChange={(e) => setGradeStudentId(e.target.value)}
                  className="w-full text-xs font-bold bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer text-slate-700"
                  required
                >
                  <option value="">-- Choose Pupil --</option>
                  {students.map((st) => (
                    <option key={st.id} value={st.id}>{st.name} ({st.classSection})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Course Area</label>
                  <select 
                    value={gradeSubject}
                    onChange={(e) => setGradeSubject(e.target.value)}
                    className="w-full text-xs font-bold bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer text-slate-700"
                  >
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>English</option>
                    <option>Social Studies</option>
                    <option>Nepali</option>
                    <option>Computer Science</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Assessment Term</label>
                  <select 
                    value={gradeExamName}
                    onChange={(e) => setGradeExamName(e.target.value)}
                    className="w-full text-xs font-bold bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer text-slate-700"
                  >
                    <option>First Term Exam</option>
                    <option>Mid Term Exam</option>
                    <option>Pre-Board Exam</option>
                    <option>Final Board assessment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Score Out of 100</label>
                <input 
                  type="number" 
                  min="0" 
                  max="100" 
                  required
                  value={gradeScore}
                  onChange={(e) => setGradeScore(Number(e.target.value))}
                  className="w-full text-sm bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono font-bold text-slate-800" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Remarks & Student Guidance</label>
                <textarea 
                  rows={3}
                  value={gradeRemarks}
                  onChange={(e) => setGradeRemarks(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700" 
                  placeholder="Feedback on their board copy..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all duration-150 shadow"
                id="btn-add-grade"
              >
                Certify & Publish Grade
              </button>
            </form>
          </div>

          {/* List of recent grades */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm h-fit">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
              <h4 className="font-extrabold text-slate-800 text-lg">Logged Student Achievements</h4>
              <span className="text-xs text-slate-400 font-semibold">{grades.length} entries recorded</span>
            </div>

            <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2 scrollbar-none">
              {grades.map((gr) => {
                const associatedStudent = students.find(s => s.id === gr.studentId);
                return (
                  <div key={gr.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-150 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-bold gap-3 hover:border-indigo-100 transition-colors">
                    <div>
                      <span className="text-slate-400 text-[9px] block font-mono uppercase tracking-wide">{gr.date} • {gr.examName}</span>
                      <span className="text-slate-800 text-sm block font-extrabold mt-0.5">{associatedStudent?.name || 'Unknown Student'}</span>
                      <span className="text-indigo-650 text-[11px] font-bold block mt-1">{gr.subject} | Graded by: {gr.gradedBy}</span>
                      {gr.remarks && <p className="text-slate-500 font-normal italic mt-1.5 font-sans bg-white p-2 rounded-lg border border-slate-100">"{gr.remarks}"</p>}
                    </div>

                    <div className="flex-shrink-0 text-center bg-white border border-slate-200 rounded-xl p-2.5 h-fit w-fit font-mono min-w-16 shadow-xs">
                      <span className="block font-black text-rose-500 text-base">{gr.score}%</span>
                      <span className="text-[8px] text-slate-400 uppercase tracking-widest font-sans font-extrabold">Exam Pass</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* PANEL 2: ATTENDANCE */}
      {activePanel === 'attendance' && (
        <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 mb-6 gap-3">
            <div>
              <h4 className="font-extrabold text-slate-805 text-lg">Daily Attendance Register</h4>
              <p className="text-xs text-slate-400 font-semibold">Select target calendar date and mark today's pupil present/absent logs</p>
            </div>
            
            <div className="flex items-center mt-2 sm:mt-0 font-bold">
              <label className="text-xs text-slate-450 uppercase tracking-wider mr-2">Target Date:</label>
              <input 
                type="date" 
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="p-2 border border-slate-200 bg-slate-50 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-indigo-550 text-slate-700 cursor-pointer" 
              />
            </div>
          </div>

          {attendanceSuccessMessage && (
            <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-4 rounded-2xl text-xs mb-6 font-semibold leading-tight flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-650 flex-shrink-0" />
              <span>{attendanceSuccessMessage}</span>
            </div>
          )}

          <div className="space-y-4">
            {students.map((student) => {
              const currentStatus = attendanceSheet[student.id] || 'present';
              return (
                <div key={student.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-150 flex flex-col sm:flex-row sm:items-center sm:justify-between font-semibold gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center font-bold text-xs text-indigo-600 uppercase">
                      {student.photoUrl ? (
                        <img src={student.photoUrl} alt={student.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <span>{student.name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <span className="text-slate-800 text-sm block font-extrabold">{student.name}</span>
                      <span className="text-xs text-slate-400 font-mono">Roll: {student.rollNo} • Guardian: {student.parentName}</span>
                    </div>
                  </div>

                  {/* Tri-state controller buttons */}
                  <div className="flex space-x-2 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => handleAttendanceChange(student.id, 'present')}
                      className={`px-3.5 py-1.5 rounded-xl transition-all uppercase tracking-widest cursor-pointer text-[10px] ${
                        currentStatus === 'present' 
                          ? 'bg-emerald-600 text-white shadow' 
                          : 'bg-white text-emerald-600 border border-emerald-200 hover:bg-emerald-50/50'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAttendanceChange(student.id, 'absent')}
                      className={`px-3.5 py-1.5 rounded-xl transition-all uppercase tracking-widest cursor-pointer text-[10px] ${
                        currentStatus === 'absent' 
                          ? 'bg-rose-600 text-white shadow' 
                          : 'bg-white text-rose-600 border border-rose-200 hover:bg-rose-50/50'
                      }`}
                    >
                      Absent
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAttendanceChange(student.id, 'late')}
                      className={`px-3.5 py-1.5 rounded-xl transition-all uppercase tracking-widest cursor-pointer text-[10px] ${
                        currentStatus === 'late' 
                          ? 'bg-amber-550 bg-amber-500 text-white shadow' 
                          : 'bg-white text-amber-600 border border-amber-200 hover:bg-amber-50/50'
                      }`}
                    >
                      Late
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
            <button
              onClick={submitAttendance}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition shadow active:scale-95 cursor-pointer"
            >
              Log Today's Attendance Registry
            </button>
          </div>
        </div>
      )}

      {/* PANEL 3: PUBLISH ASSIGNMENT */}
      {activePanel === 'assignment' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Homework Publisher Form */}
          <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm h-fit">
            <h4 className="font-extrabold text-slate-800 text-lg mb-3">Publish Homework Booklet</h4>
            
            {asgSuccessMessage && (
              <div className="p-3.5 mb-4 bg-emerald-50 text-emerald-805 text-xs font-semibold rounded-2xl border border-emerald-150 leading-tight">
                {asgSuccessMessage}
              </div>
            )}

            <form onSubmit={submitAssignment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Homework Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Exercises 4.2 on Quadratic Formula"
                  value={asgTitle}
                  onChange={(e) => setAsgTitle(e.target.value)}
                  className="w-full text-xs font-bold bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700 font-sans" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Course Area</label>
                  <select 
                    value={asgSubject}
                    onChange={(e) => setAsgSubject(e.target.value)}
                    className="w-full text-xs font-bold bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer text-slate-700"
                  >
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>English</option>
                    <option>Social Studies</option>
                    <option>Nepali</option>
                    <option>Computer Science</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Target Class</label>
                  <select 
                    value={asgClass}
                    onChange={(e) => setAsgClass(e.target.value)}
                    className="w-full text-xs font-bold bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer text-slate-700"
                  >
                    <option>Class 10 - A</option>
                    <option>Class 10 - B</option>
                    <option>Class 9 - A</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Submission Deadline</label>
                <input 
                  type="date" 
                  required
                  value={asgDueDate}
                  onChange={(e) => setAsgDueDate(e.target.value)}
                  className="w-full text-xs font-bold bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-slate-700 cursor-pointer" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-550 uppercase tracking-widest mb-1.5">Comprehensive Instructions</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Detail step-by-step instructions, target pages, copy guidelines..."
                  value={asgDescription}
                  onChange={(e) => setAsgDescription(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-700" 
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all duration-150 shadow flex items-center justify-center space-x-1 cursor-pointer animate-pulse"
              >
                <Send className="w-4 h-4 mr-1 text-white" />
                <span>Transmit Homework Alert</span>
              </button>
            </form>
          </div>

          {/* Active homework bulletins */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm h-fit">
            <h4 className="font-extrabold text-slate-800 text-lg mb-4">Active Academic Booklets</h4>
            
            <div className="space-y-4">
              {assignments.map((as) => (
                <div key={as.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-150 relative hover:border-indigo-150 transition-colors">
                  <div className="flex justify-between items-center mb-2.5 font-mono text-[9px] font-bold uppercase tracking-wide">
                    <span className="bg-indigo-100 text-indigo-850 border border-indigo-200 px-2 py-0.5 rounded-full">{as.subject} • {as.classSection}</span>
                    <span className="text-rose-550">⏰ Deadline: {as.dueDate}</span>
                  </div>
                  <h5 className="font-extrabold text-slate-800 text-base leading-snug">{as.title}</h5>
                  <p className="text-xs text-slate-650 mt-2 font-normal font-sans leading-relaxed">{as.description}</p>
                  <div className="mt-3.5 pt-3 border-t border-slate-200 text-[10px] text-slate-400 font-bold uppercase tracking-wide flex justify-between">
                    <span>Published: {as.publishedDate}</span>
                    <span>Broadcaster: {as.publishedBy}</span>
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
