import { 
  User, 
  SubjectGrade, 
  AttendanceRecord, 
  Assignment, 
  SystemAnnouncement, 
  SchoolEvent, 
  SystemNotification 
} from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'student_1',
    name: 'Aarav Sharma',
    email: 'aarav@shreephuleshwar.edu.np',
    role: 'student',
    rollNo: '12',
    classSection: 'Class 10 - A',
    parentName: 'Mr. Rajesh Sharma',
    photoUrl: '/src/assets/images/student_boy_one_1781977949944.jpg'
  },
  {
    id: 'student_2',
    name: 'Pooja Chaudhary',
    email: 'pooja@shreephuleshwar.edu.np',
    role: 'student',
    rollNo: '04',
    classSection: 'Class 10 - A',
    parentName: 'Mr. Dev Narayan Chaudhary',
    photoUrl: '/src/assets/images/student_girl_one_1781977967031.jpg'
  },
  {
    id: 'student_3',
    name: 'Siddharth Raj',
    email: 'siddharth@shreephuleshwar.edu.np',
    role: 'student',
    rollNo: '23',
    classSection: 'Class 10 - B',
    parentName: 'Mr. Anand Raj',
    photoUrl: '/src/assets/images/student_boy_two_1781977982738.jpg'
  },
  {
    id: 'student_4',
    name: 'Neha Yadav',
    email: 'neha@shreephuleshwar.edu.np',
    role: 'student',
    rollNo: '08',
    classSection: 'Class 10 - A',
    parentName: 'Mr. Ram Lal Yadav',
    photoUrl: '/src/assets/images/student_girl_two_1781977999085.jpg'
  },
  {
    id: 'teacher_1',
    name: 'Mrs. Gita Adhikari',
    email: 'gita@shreephuleshwar.edu.np',
    role: 'teacher',
    subjectSpecialty: 'Science & Mathematics',
    assignedClass: 'Class 10 - A'
  },
  {
    id: 'teacher_2',
    name: 'Mr. Ramesh Bhandari',
    email: 'ramesh@shreephuleshwar.edu.np',
    role: 'teacher',
    subjectSpecialty: 'English & Social Studies',
    assignedClass: 'Class 10 - B'
  },
  {
    id: 'admin_1',
    name: 'Mr. Subodh Prasad Yadav',
    email: 'subodh@shreephuleshwar.edu.np',
    role: 'admin'
  }
];

export const INITIAL_GRADES: SubjectGrade[] = [
  // Student 1 (Aarav Sharma)
  {
    id: 'g1',
    studentId: 'student_1',
    subject: 'Mathematics',
    examName: 'First Term Exam',
    score: 88,
    maxScore: 100,
    gradedBy: 'Mrs. Gita Adhikari',
    date: '2026-05-15',
    remarks: 'Excellent calculation skills, keep it up.'
  },
  {
    id: 'g2',
    studentId: 'student_1',
    subject: 'Science',
    examName: 'First Term Exam',
    score: 92,
    maxScore: 100,
    gradedBy: 'Mrs. Gita Adhikari',
    date: '2026-05-18',
    remarks: 'Superb practical presentation and notes.'
  },
  {
    id: 'g3',
    studentId: 'student_1',
    subject: 'English',
    examName: 'First Term Exam',
    score: 79,
    maxScore: 100,
    gradedBy: 'Mr. Ramesh Bhandari',
    date: '2026-05-20',
    remarks: 'Creative writer, needs spelling improvements.'
  },
  {
    id: 'g4',
    studentId: 'student_1',
    subject: 'Nepali',
    examName: 'First Term Exam',
    score: 84,
    maxScore: 100,
    gradedBy: 'Mr. Ramesh Bhandari',
    date: '2026-05-22',
    remarks: 'Good command over vernacular writing.'
  },
  // Student 2 (Pooja Chaudhary)
  {
    id: 'g5',
    studentId: 'student_2',
    subject: 'Mathematics',
    examName: 'First Term Exam',
    score: 95,
    maxScore: 100,
    gradedBy: 'Mrs. Gita Adhikari',
    date: '2026-05-15',
    remarks: 'Outstanding performance, top of the class!'
  },
  {
    id: 'g6',
    studentId: 'student_2',
    subject: 'Science',
    examName: 'First Term Exam',
    score: 94,
    maxScore: 100,
    gradedBy: 'Mrs. Gita Adhikari',
    date: '2026-05-18',
    remarks: 'Brilliant understanding of theoretical concepts.'
  },
  {
    id: 'g7',
    studentId: 'student_2',
    subject: 'English',
    examName: 'First Term Exam',
    score: 89,
    maxScore: 100,
    gradedBy: 'Mr. Ramesh Bhandari',
    date: '2026-05-20',
    remarks: 'Very articulate, great essays.'
  },
  // Student 3 (Siddharth Raj)
  {
    id: 'g8',
    studentId: 'student_3',
    subject: 'Mathematics',
    examName: 'First Term Exam',
    score: 72,
    maxScore: 100,
    gradedBy: 'Mrs. Gita Adhikari',
    date: '2026-05-15',
    remarks: 'Has core potential. Needs daily practice on algebraic sums.'
  },
  {
    id: 'g9',
    studentId: 'student_3',
    subject: 'Science',
    examName: 'First Term Exam',
    score: 80,
    maxScore: 100,
    gradedBy: 'Mrs. Gita Adhikari',
    date: '2026-05-18',
    remarks: 'Active participation in biology lab works.'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  // student 1 (Aarav Sharma) past days
  { id: 'at_1_1', studentId: 'student_1', date: '2026-06-01', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_1_2', studentId: 'student_1', date: '2026-06-02', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_1_3', studentId: 'student_1', date: '2026-06-03', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_1_4', studentId: 'student_1', date: '2026-06-04', status: 'late', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_1_5', studentId: 'student_1', date: '2026-06-05', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_1_6', studentId: 'student_1', date: '2026-06-08', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_1_7', studentId: 'student_1', date: '2026-06-09', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_1_8', studentId: 'student_1', date: '2026-06-10', status: 'absent', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_1_9', studentId: 'student_1', date: '2026-06-11', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_1_10', studentId: 'student_1', date: '2026-06-12', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_1_11', studentId: 'student_1', date: '2026-06-15', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_1_12', studentId: 'student_1', date: '2026-06-16', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_1_13', studentId: 'student_1', date: '2026-06-17', status: 'late', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_1_14', studentId: 'student_1', date: '2026-06-18', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_1_15', studentId: 'student_1', date: '2026-06-19', status: 'present', markedBy: 'Mrs. Gita Adhikari' },

  // student 2 (Pooja Chaudhary) past days
  { id: 'at_2_1', studentId: 'student_2', date: '2026-06-01', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_2_2', studentId: 'student_2', date: '2026-06-02', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_2_3', studentId: 'student_2', date: '2026-06-03', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_2_4', studentId: 'student_2', date: '2026-06-04', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_2_5', studentId: 'student_2', date: '2026-06-05', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_2_6', studentId: 'student_2', date: '2026-06-08', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_2_7', studentId: 'student_2', date: '2026-06-09', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_2_8', studentId: 'student_2', date: '2026-06-10', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_2_9', studentId: 'student_2', date: '2026-06-11', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_2_10', studentId: 'student_2', date: '2026-06-12', status: 'absent', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_2_11', studentId: 'student_2', date: '2026-06-15', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_2_12', studentId: 'student_2', date: '2026-06-16', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_2_13', studentId: 'student_2', date: '2026-06-17', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_2_14', studentId: 'student_2', date: '2026-06-18', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_2_15', studentId: 'student_2', date: '2026-06-19', status: 'present', markedBy: 'Mrs. Gita Adhikari' },

  // student 3 (Siddharth Raj) past days
  { id: 'at_3_1', studentId: 'student_3', date: '2026-06-15', status: 'present', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_3_2', studentId: 'student_3', date: '2026-06-16', status: 'absent', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_3_3', studentId: 'student_3', date: '2026-06-17', status: 'absent', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_3_4', studentId: 'student_3', date: '2026-06-18', status: 'late', markedBy: 'Mrs. Gita Adhikari' },
  { id: 'at_3_5', studentId: 'student_3', date: '2026-06-19', status: 'present', markedBy: 'Mrs. Gita Adhikari' }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg1',
    title: 'Algebraic Equations Exercise 4.2',
    description: 'Solve questions 1 to 10 on page 78 of your Mathematics textbook in your homework copy. Focus on quadratic formula questions.',
    subject: 'Mathematics',
    classSection: 'Class 10 - A',
    dueDate: '2026-06-25',
    publishedDate: '2026-06-19',
    publishedBy: 'Mrs. Gita Adhikari'
  },
  {
    id: 'asg2',
    title: 'Chemical Reactions Journal Writing',
    description: 'Write a 2-page report on redox reactions seen in real life (e.g. rusting of iron, respiration). Outline balanced chemical formulas representing these.',
    subject: 'Science',
    classSection: 'Class 10 - A',
    dueDate: '2026-06-27',
    publishedDate: '2026-06-20',
    publishedBy: 'Mrs. Gita Adhikari'
  },
  {
    id: 'asg3',
    title: 'Short Story Character Analysis',
    description: 'Read the story "The Last Leaf" and draft a detailed character profile of Behrman.',
    subject: 'English',
    classSection: 'Class 10 - A',
    dueDate: '2026-06-24',
    publishedDate: '2026-06-18',
    publishedBy: 'Mr. Ramesh Bhandari'
  }
];

export const INITIAL_ANNOUNCEMENTS: SystemAnnouncement[] = [
  {
    id: 'ann1',
    title: 'First Term Examinations Result declaration schedule',
    content: 'Dear Parents & Students, the report cards and answer papers of the First Term Examinations will be distributed on Friday, June 26, 2026, starting from 10:00 AM. 100% attendance of parents is mandatory.',
    category: 'academic',
    date: '2026-06-18',
    publishedBy: 'Mr. Subodh Prasad Yadav'
  },
  {
    id: 'ann2',
    title: 'Annual Sports Meet & Athletic Championship registration open',
    content: 'Shree Phuleshwar Annual Sports Meet is scheduled from July 10 to July 14. Students interested in under-16 football, badminton, chess, and track events can record their names with the sports instructor, Mr. Ramesh, before June 30.',
    category: 'event',
    date: '2026-06-19',
    publishedBy: 'Mr. Subodh Prasad Yadav'
  },
  {
    id: 'ann3',
    title: 'Monsoon Break & Summer Holiday Notice',
    content: 'Due to severe heavy monsoon alerts in the Saptari district, the school management has resolved to suspend dynamic physical classes on July 1 & 2. Remote reading exercises will be assigned via the student portal.',
    category: 'holiday',
    date: '2026-06-20',
    publishedBy: 'Mr. Subodh Prasad Yadav'
  }
];

export const INITIAL_EVENTS: SchoolEvent[] = [
  {
    id: 'ev1',
    title: 'Annual Cultural Day & Science Exhibition 2026',
    date: '2026-07-05',
    time: '10:00 AM - 4:00 PM',
    location: 'School Main Playground & Auditorium',
    description: 'A grand celebration featuring science model presentations, cultural dance routines depicting Nepali ethnic traditions, drama acts, and regional food stalls organized with joint parent support.'
  },
  {
    id: 'ev2',
    title: 'Inter-School Football Championship',
    date: '2026-07-18',
    time: '08:00 AM onwards',
    location: 'District Sports Stadium, Rajbiraj',
    description: 'Come cheer for Shree Phuleshwar Boarding Lions! The team has qualified for the semi-final cup against Rajbiraj Model Academy.'
  },
  {
    id: 'ev3',
    title: 'Parent-Teacher Consultative Council Meet (PTA)',
    date: '2026-06-26',
    time: '10:30 AM - 1:30 PM',
    location: 'Conference Classroom, block B',
    description: 'Discussing individual child assessment benchmarks, grade thresholds, and feedback loop mechanisms between parents and subject heads.'
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'not1',
    userId: 'student_1',
    title: 'New assignment published',
    message: 'Mrs. Gita Adhikari posted "Chemical Reactions Journal Writing" due on June 27.',
    type: 'assignment',
    read: false,
    date: '2026-06-20T08:30:00Z'
  },
  {
    id: 'not2',
    userId: 'student_1',
    title: 'Grade published',
    message: 'Science first term grade uploaded: 92/100 (A). Click to view remarks.',
    type: 'grade',
    read: true,
    date: '2026-06-18T14:22:00Z'
  }
];
