export type Role = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  photoUrl?: string;
  // Student specific
  rollNo?: string;
  classSection?: string;
  parentName?: string;
  // Teacher specific
  subjectSpecialty?: string;
  assignedClass?: string;
}

export interface SubjectGrade {
  id: string;
  studentId: string;
  subject: string;
  examName: string; // e.g. First Term, Mid Term, Final Exam
  score: number; // e.g. 85
  maxScore: number; // e.g. 100
  gradedBy: string; // Teacher name
  date: string;
  remarks?: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'late';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: AttendanceStatus;
  markedBy: string; // Teacher ID/Name
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  classSection: string;
  dueDate: string;
  publishedDate: string;
  publishedBy: string; // Teacher Name
}

export interface SystemAnnouncement {
  id: string;
  title: string;
  content: string;
  category: 'academic' | 'event' | 'holiday' | 'administration';
  date: string;
  publishedBy: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl?: string;
}

export interface SystemNotification {
  id: string;
  userId: string; // 'all' or specific userId
  title: string;
  message: string;
  type: 'assignment' | 'grade' | 'attendance' | 'announcement';
  read: boolean;
  date: string;
}
