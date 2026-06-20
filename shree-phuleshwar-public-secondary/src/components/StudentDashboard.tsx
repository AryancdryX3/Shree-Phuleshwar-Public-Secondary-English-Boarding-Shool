import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Calendar, 
  Award, 
  Clock, 
  Bell, 
  TrendingUp, 
  Download,
  Info
} from 'lucide-react';
import { User, SubjectGrade, AttendanceRecord, Assignment, SystemNotification } from '../types';

interface StudentDashboardProps {
  student: User;
  grades: SubjectGrade[];
  attendance: AttendanceRecord[];
  assignments: Assignment[];
  notifications: SystemNotification[];
  onMarkNotificationRead: (id: string) => void;
}

export default function StudentDashboard({ 
  student, 
  grades, 
  attendance, 
  assignments, 
  notifications,
  onMarkNotificationRead
}: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<'grades' | 'attendance' | 'assignments'>('grades');
  const [estimateSubject, setEstimateSubject] = useState('Mathematics');
  const [estimateScore, setEstimateScore] = useState<number>(85);
  const [submittedAssignmentIds, setSubmittedAssignmentIds] = useState<string[]>([]);

  // Filter student specific grades
  const studentGrades = grades.filter(g => g.studentId === student.id);
  
  // Filter student specific attendance
  const studentAttendance = attendance.filter(a => a.studentId === student.id);
  
  // Count attendance stats
  const presentCount = studentAttendance.filter(a => a.status === 'present').length;
  const absentCount = studentAttendance.filter(a => a.status === 'absent').length;
  const lateCount = studentAttendance.filter(a => a.status === 'late').length;
  const totalDays = studentAttendance.length;
  const attendanceRate = totalDays > 0 ? Math.round((presentCount / totalDays) * 105) > 100 ? 100 : Math.round((presentCount / totalDays) * 100) : 100;

  // Grade point converter
  const getLetterGrade = (score: number) => {
    if (score >= 90) return { r: 'A+', c: 'text-emerald-700 bg-emerald-50 border-emerald-100' };
    if (score >= 80) return { r: 'A', c: 'text-indigo-700 bg-indigo-50 border-indigo-100' };
    if (score >= 70) return { r: 'B', c: 'text-indigo-600 bg-indigo-50/50 border-indigo-100/50' };
    if (score >= 60) return { r: 'C', c: 'text-amber-700 bg-amber-50 border-amber-100' };
    if (score >= 40) return { r: 'D', c: 'text-orange-700 bg-orange-50 border-orange-100' };
    return { r: 'F', c: 'text-rose-700 bg-rose-50 border-rose-100' };
  };

  // Calculate cumulative average
  const averageGradeScore = studentGrades.length > 0 
    ? Math.round(studentGrades.reduce((acc, curr) => acc + curr.score, 0) / studentGrades.length)
    : 0;
  
  const overallLetter = getLetterGrade(averageGradeScore);

  // Prospective cumulative logic
  const handleEstimateCalculate = () => {
    alert(`If you achieve ${estimateScore}% in your upcoming ${estimateSubject} exam, your estimated average score would adjust to ${Math.round((averageGradeScore + estimateScore) / 2)}% (${getLetterGrade(Math.round((averageGradeScore + estimateScore) / 2)).r})! Keep studying hard.`);
  };

  const handleSubmittingAssignment = (id: string) => {
    setSubmittedAssignmentIds(prev => [...prev, id]);
  };

  return (
    <div id="student-dashboard-root" className="space-y-8 animate-in fade-in duration-200">
      
      {/* Overview stats header */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Profile Card */}
        <div className="lg:col-span-1 bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-slate-100 mb-4 bg-slate-50">
            {student.photoUrl ? (
              <img 
                src={student.photoUrl} 
                alt={student.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white text-3xl font-black font-display">
                {student.name.charAt(0)}
              </div>
            )}
          </div>
          <h3 className="text-xl font-extrabold text-slate-800 leading-snug">{student.name}</h3>
          <p className="text-xs font-bold text-indigo-600 tracking-wider mt-1 font-mono uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100/50">
            {student.classSection}
          </p>
          
          <div className="w-full border-t border-slate-100 my-4 pt-4 text-left space-y-2.5 text-xs text-slate-600">
            <p className="flex justify-between items-center">
              <span className="font-bold text-slate-400">Roll Number:</span>
              <span className="font-mono font-extrabold text-slate-800">{student.rollNo}</span>
            </p>
            <p className="flex justify-between items-center">
              <span className="font-bold text-slate-400">Guardian:</span>
              <span className="font-bold text-slate-800">{student.parentName}</span>
            </p>
            <p className="flex justify-between items-center">
              <span className="font-bold text-slate-400">Portal ID:</span>
              <span className="font-mono text-[10px] font-bold text-indigo-600 bg-indigo-50/50 px-2 py-0.5 rounded-lg">SF-{student.id.toUpperCase()}</span>
            </p>
          </div>
        </div>

        {/* Dynamic visual statistics cards */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          {/* Card 1: Attendance percentage */}
          <div className="bg-gradient-to-tr from-slate-900 via-indigo-950 to-indigo-900 text-white rounded-[2rem] p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute right-3 top-3 opacity-10">
              <Calendar size={120} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-black tracking-widest text-indigo-300">Attendance Log</span>
              <span className="text-[9px] font-extrabold bg-white/10 px-2 py-0.5 rounded-full tracking-wider uppercase">TERM 1</span>
            </div>
            
            <div className="my-4">
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-black tracking-tight">{attendanceRate}%</span>
                <span className="text-xs text-indigo-200">Present Rate</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full mt-2.5 overflow-hidden">
                <div className="bg-gradient-to-r from-rose-400 to-indigo-400 h-full rounded-full animate-pulse" style={{ width: `${attendanceRate}%` }}></div>
              </div>
            </div>

            <div className="flex justify-between text-[11px] font-semibold text-indigo-200 border-t border-white/5 pt-3">
              <span>{presentCount} Present</span>
              <span>{absentCount} Absent</span>
              <span>{lateCount} Late</span>
            </div>
          </div>

          {/* Card 2: Average tracking GPA */}
          <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Academic Score</span>
              <span className="text-[9px] uppercase font-bold bg-indigo-550 text-white px-2 py-0.5 rounded-full border border-indigo-600 font-mono tracking-wider">
                CGPA Track
              </span>
            </div>

            <div className="my-3 flex items-center space-x-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl border ${overallLetter.c}`}>
                {overallLetter.r}
              </div>
              <div>
                <span className="block text-3xl font-black text-slate-800 leading-none">{averageGradeScore}%</span>
                <span className="text-xs text-slate-400 font-semibold">Cumulative Grade</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-2.5 flex items-center space-x-2 text-xs text-slate-500 border border-slate-100">
              <Award className="w-4 h-4 text-rose-500" />
              <span>Upper Decile of Shree Phuleshwar</span>
            </div>
          </div>

          {/* Card 3: Active pending tasks */}
          <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Active Homework</span>
              <span className="text-[9px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full uppercase border border-rose-100">
                Action Required
              </span>
            </div>

            <div className="my-2">
              <div className="flex items-baseline space-x-1.5">
                <span className="text-4xl font-black text-slate-800">
                  {assignments.filter(a => !submittedAssignmentIds.includes(a.id)).length}
                </span>
                <span className="text-xs font-bold text-slate-505">pending handouts</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Reminders synchronised to bulletins
              </p>
            </div>

            <button 
              onClick={() => setActiveTab('assignments')} 
              className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold text-indigo-650 transition-colors border border-slate-200 uppercase tracking-widest text-center"
            >
              Examine Homework
            </button>
          </div>

        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="border-b border-slate-200 flex space-x-6 text-sm font-bold">
        {[
          { key: 'grades', name: 'Grade Tracker & Report Card', icon: Award },
          { key: 'attendance', name: 'Attendance Registry', icon: Calendar },
          { key: 'assignments', name: 'Homework & Syllabus', icon: BookOpen }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
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

      {/* TAB CONTENT: GRADES */}
      {activeTab === 'grades' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-indigo-50/20 p-4 rounded-2xl border border-indigo-100">
            <div className="flex items-center space-x-2.5 mb-3 sm:mb-0">
              <Info className="w-5 h-5 text-indigo-600" />
              <p className="text-xs sm:text-sm text-slate-700 font-semibold">
                These are published results certified by the <strong>Academic Lead Council</strong> for Shree Phuleshwar Boarding School.
              </p>
            </div>
            <button className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-700 transition" onClick={() => window.print()}>
              <Download className="w-3.5 h-3.5 text-indigo-600" />
              <span>PDF Report Card</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Grades grid */}
            <div className="space-y-4">
              <h4 className="text-slate-800 font-extrabold text-lg">Exam Term Performance</h4>
              {studentGrades.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-[2rem] border border-slate-200 text-slate-400 text-sm">
                  No evaluated grade records currently uploaded for this account.
                </div>
              ) : (
                <div className="space-y-4">
                  {studentGrades.map((g) => {
                    const status = getLetterGrade(g.score);
                    return (
                      <div key={g.id} className="bg-white rounded-[1.5rem] p-5 border border-slate-200 shadow-xs hover:shadow-sm transition-all relative">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">{g.examName} • {g.date}</span>
                            <h5 className="font-extrabold text-slate-800 text-base">{g.subject}</h5>
                          </div>
                          <span className={`px-2.5 py-1 text-xs font-black rounded-lg border ${status.c}`}>
                            {status.r}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="my-3">
                          <div className="flex justify-between text-xs font-bold text-slate-650 mb-1">
                            <span>Score: {g.score}/{g.maxScore}</span>
                            <span>{g.score}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${(g.score / g.maxScore) * 100}%` }}></div>
                          </div>
                        </div>

                        {g.remarks && (
                          <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-sans italic mt-3">
                            "{g.remarks}" <span className="font-bold text-slate-750 not-italic block mt-1">— {g.gradedBy} (Subject Head)</span>
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Side interactive Estimator Panel */}
            <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm h-fit">
              <h4 className="font-extrabold text-slate-800 text-lg mb-2 flex items-center space-x-1.5 font-display">
                <TrendingUp className="w-5 h-5 text-indigo-600 animate-pulse" />
                <span>Interactive GPA Estimator</span>
              </h4>
              <p className="text-xs text-indigo-950 mb-4 bg-indigo-50/40 p-3 text-indigo-800 rounded-xl border border-indigo-100/50">
                Plan ahead! Enter expected score on your upcoming examinations to preview potential modifications in cumulative grading values.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-550 mb-1.5">Subject Assessment</label>
                  <select 
                    value={estimateSubject}
                    onChange={(e) => setEstimateSubject(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-50 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-550 mb-1.5">Anticipated Score (0 - 100)</label>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={estimateScore}
                      onChange={(e) => setEstimateScore(Number(e.target.value))}
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-650"
                    />
                    <span className="font-mono font-bold text-lg text-slate-800 w-12 text-right">{estimateScore}%</span>
                  </div>
                </div>

                <button 
                  onClick={handleEstimateCalculate} 
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all duration-150 shadow-sm active:scale-95"
                >
                  Estimate Prospective Grade
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB CONTENT: ATTENDANCE */}
      {activeTab === 'attendance' && (
        <div id="attendance-panel" className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 mb-6">
            <div>
              <h4 className="text-slate-800 font-extrabold text-lg">Daily Attendance Log</h4>
              <p className="text-xs text-slate-400 font-semibold">Classroom attendance register compiled by Mrs. Gita Adhikari</p>
            </div>
            <div className="flex space-x-2 mt-2 sm:mt-0 text-xs font-extrabold">
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-full">
                ● Present Rate: {attendanceRate}%
              </span>
              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-800 border border-indigo-100 rounded-full">
                ● Punct Status: Good
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar list */}
            <div className="lg:col-span-2 space-y-3">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block">Recent Logged Sessions</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {studentAttendance.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl text-slate-400 font-semibold col-span-2 text-sm">
                    No registry logged yet for this current calendar week.
                  </div>
                ) : (
                  studentAttendance.map((rec) => (
                    <div 
                      key={rec.id} 
                      className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                        rec.status === 'present' ? 'bg-emerald-50/40 border-emerald-100' :
                        rec.status === 'absent' ? 'bg-rose-50/40 border-rose-100' :
                        'bg-amber-50/40 border-amber-100'
                      }`}
                    >
                      <div>
                        <span className="block text-xs text-slate-700 font-bold font-mono">
                          {new Date(rec.date).toLocaleDateString('ne-NP', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) === 'Invalid Date' ? rec.date : new Date(rec.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                        </span>
                        <span className="text-[10px] text-slate-400 italic mt-0.5 block">Marked by {rec.markedBy}</span>
                      </div>
                      <span className={`px-2.5 py-0.5 text-[10px] uppercase font-black tracking-wider rounded-full ${
                        rec.status === 'present' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                        rec.status === 'absent' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                        'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {rec.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Visual Attendance Calendar card */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block mb-4">Registry Visualizer</span>
              
              {/* Calendar Grid Representation */}
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, dIdx) => (
                  <div key={dIdx} className="text-slate-400 py-1 font-mono">{day}</div>
                ))}
              </div>
              
              {/* Predefined aesthetic static calendar mock for Saptari School June 2026 */}
              <div className="grid grid-cols-7 gap-2">
                {/* Offset for beginning of Monday */}
                <div className="text-center py-2.5 text-slate-355 font-sans border border-transparent">-</div>
                {/* June days */}
                {Array.from({ length: 15 }).map((_, idx) => {
                  const dayNum = idx + 1;
                  // Map specific days we have logs for
                  const logDate = `2026-06-${dayNum < 10 ? '0' + dayNum : dayNum}`;
                  const record = studentAttendance.find(a => a.date === logDate);
                  
                  let bgCol = "bg-white text-slate-650 border border-slate-200";
                  if (record) {
                    if (record.status === 'present') bgCol = "bg-emerald-500 text-white shadow-xs shadow-emerald-205";
                    else if (record.status === 'absent') bgCol = "bg-rose-500 text-white shadow-xs shadow-rose-205";
                    else bgCol = "bg-amber-500 text-white shadow-xs shadow-amber-205";
                  }

                  return (
                    <div 
                      key={idx} 
                      title={`${record ? record.status : 'No record'}`}
                      className={`text-center py-2 rounded-xl text-xs font-black transition-all cursor-help flex items-center justify-center h-8 w-8 mx-auto ${bgCol}`}
                    >
                      {dayNum}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 space-y-2 text-[11px] font-bold text-slate-500">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-emerald-505"></div>
                  <span>Present Session</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-amber-505"></div>
                  <span>Late Admission Flag</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-rose-550"></div>
                  <span>Absence recorded</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: ASSIGNMENTS */}
      {activeTab === 'assignments' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="text-slate-800 font-extrabold text-lg">Homework Handouts & syllabus</h4>
            <span className="text-xs bg-indigo-50/50 px-3 py-1 text-indigo-700 font-semibold border border-indigo-150 rounded-full font-mono tracking-wider">
              Syllabus Year: 2026 - 2027
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main assignment card column */}
            <div className="lg:col-span-2 space-y-4">
              {assignments.length === 0 ? (
                <div className="p-12 text-center bg-slate-50 rounded-[2rem] border border-slate-200 text-slate-400 font-bold">
                  All assignments completed successfully. Excellent!
                </div>
              ) : (
                assignments.map((asg) => {
                  const isSubmitted = submittedAssignmentIds.includes(asg.id);
                  return (
                    <div 
                      key={asg.id} 
                      className={`bg-white rounded-[1.5rem] p-6 border transition-all duration-300 relative ${
                        isSubmitted 
                          ? 'border-emerald-200 bg-emerald-50/5 opacity-75 grayscale' 
                          : 'border-slate-200 hover:border-indigo-200 hover:shadow-xs'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-100 font-mono mb-4 text-[10px] font-bold">
                        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                          <span className="font-extrabold bg-indigo-600 text-white px-2 py-0.5 rounded uppercase tracking-wider">
                            {asg.subject}
                          </span>
                          <span className="text-slate-400">Published: {asg.publishedDate}</span>
                        </div>
                        <div className="flex items-center text-rose-550 font-bold">
                          <Clock className="w-3.5 h-3.5 mr-1 text-rose-500 animate-pulse" />
                          <span>Deadline: {asg.dueDate}</span>
                        </div>
                      </div>

                      <h5 className="font-extrabold text-slate-850 text-lg leading-tight">{asg.title}</h5>
                      <p className="text-sm text-slate-600 mt-2 font-normal leading-relaxed">{asg.description}</p>
                      
                      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-xs text-slate-400 font-semibold italic">Grader: {asg.publishedBy} (Subject Head)</span>
                        
                        {isSubmitted ? (
                          <div className="flex items-center text-emerald-600 font-bold text-xs">
                            <CheckCircle className="w-4 h-4 mr-1 text-emerald-500" />
                            <span>Submitted to Academy</span>
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleSubmittingAssignment(asg.id)}
                            className="bg-emerald-605 hover:bg-emerald-650 bg-emerald-600 text-white font-semibold text-xs uppercase tracking-wider px-4 py-2 rounded-xl h-fit transition-all shadow-sm active:scale-95 flex items-center space-x-1 cursor-pointer"
                          >
                            <span>Mark as Submitted</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Sidebar with school guidelines */}
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-805 text-white rounded-[2rem] p-6 shadow-sm">
                <h5 className="font-bold text-indigo-400 text-sm mb-2 uppercase tracking-wide">Automated Notifications</h5>
                <p className="text-xs text-slate-350 leading-relaxed font-sans mb-4">
                  Whenever secondary teachers publish a grade, mark daily attendance parameters, or assign Homework booklets, instant push alerts populate into your notification board.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-xs">
                    <Bell className="w-4 h-4 text-indigo-400" />
                    <span>Instant visual prompt feeds</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Real-time submission tracker</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] p-5 border border-slate-200 shadow-sm space-y-3.5">
                <span className="text-xs font-black uppercase text-slate-400 block tracking-widest">Syllabus Resources</span>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-150 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-8次0 block">Class 10 Board Chemistry</span>
                    <span className="text-slate-400 text-[10px]">PDF Syllabus File • 4.2 MB</span>
                  </div>
                  <button className="p-1 px-2.5 bg-indigo-50 text-indigo-600 border border-indigo-150 rounded-lg hover:bg-indigo-100 transition cursor-pointer" onClick={() => alert('Downloading Chemistry syllabus booklet...')}>
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-150 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-8次0 block">Calculus Arithmetic Guide</span>
                    <span className="text-slate-400 text-[10px]">PDF File • 1.8 MB</span>
                  </div>
                  <button className="p-1 px-2.5 bg-indigo-50 text-indigo-600 border border-indigo-150 rounded-lg hover:bg-indigo-100 transition cursor-pointer" onClick={() => alert('Downloading Calculus guidebook notes...')}>
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
