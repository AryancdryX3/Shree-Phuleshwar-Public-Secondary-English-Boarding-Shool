import React, { useState } from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Calendar, 
  UserCheck, 
  BookOpen, 
  MessageSquare,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import CrestLogo from './CrestLogo';
import { SchoolEvent, SystemAnnouncement } from '../types';

interface LandingPageProps {
  onEnterDashboard: (role?: 'student' | 'teacher' | 'admin') => void;
  events: SchoolEvent[];
  announcements: SystemAnnouncement[];
}

export default function LandingPage({ onEnterDashboard, events, announcements }: LandingPageProps) {
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactName('');
        setContactEmail('');
        setContactMessage('');
        setShowContactForm(false);
      }, 3000);
    }
  };

  return (
    <div id="landing-container" className="min-h-screen bg-slate-50 text-slate-800 font-sans overflow-x-hidden">
      
      {/* HEADER NAV */}
      <header id="main-header" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <CrestLogo size={58} className="transform hover:rotate-6 transition-transform duration-300" />
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-800 font-display leading-none">
                Shree Phuleshwar
              </h1>
              <span className="text-[11px] sm:text-xs font-bold text-indigo-600 tracking-wider">
                Public Secondary English Boarding School
              </span>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold text-slate-600">
            <a href="#home" className="hover:text-indigo-600 transition-colors border-b-2 border-transparent hover:border-indigo-600 py-1">Home</a>
            <a href="#about" className="hover:text-indigo-600 transition-colors border-b-2 border-transparent hover:border-indigo-600 py-1">About Us</a>
            <a href="#events" className="hover:text-indigo-600 transition-colors border-b-2 border-transparent hover:border-indigo-600 py-1">Events</a>
            <a href="#announcements" className="hover:text-indigo-600 transition-colors border-b-2 border-transparent hover:border-indigo-600 py-1">Notice Board</a>
            <button 
              id="btn-contact-trigger"
              onClick={() => setShowContactForm(true)} 
              className="hover:text-indigo-600 transition-colors border-b-2 border-transparent hover:border-indigo-600 py-1 font-bold"
            >
              Contact Us
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <button
              id="btn-portal-entry"
              onClick={() => onEnterDashboard()}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs sm:text-sm font-extrabold text-white rounded-2xl group bg-gradient-to-br from-indigo-500 to-rose-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-indigo-300 transform active:scale-95 transition-all duration-200"
            >
              <span className="relative px-3 sm:px-4 py-2 transition-all ease-in duration-75 bg-slate-900 rounded-[14px] group-hover:bg-opacity-0 flex items-center space-x-1 sm:space-x-2">
                <Sparkles className="w-4 h-4 text-amber-350 animate-pulse" />
                <span>Enter Dashboard Portal</span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero-section" className="relative bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white pt-12 pb-24 overflow-hidden">
        {/* Curved Wave background element container */}
        <div className="absolute inset-0 z-0 opacity-10 flex items-center justify-center pointer-events-none">
          <CrestLogo size={420} className="transform rotate-12 scale-125" />
        </div>
        
        {/* Decorative absolute subtle curved elements to match image layout perfectly */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-slate-50" style={{ clipPath: 'ellipse(60% 80% at 50% 100%)' }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-2">
          {/* Main Hero texts */}
          <div className="max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight drop-shadow-md text-white font-display">
              Shree Phuleshwar Public Secondary English Boarding School
            </h2>
            
            <p className="mt-4 text-base sm:text-lg font-extrabold tracking-widest text-indigo-300 uppercase">
              Knowledge | Discipline | Excellence
            </p>
            
            <div className="mt-4 inline-flex items-center space-x-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 text-xs sm:text-sm text-slate-200 font-mono tracking-wide">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>Address: Kalyanpur-7, Saptari (Nepal)</span>
            </div>
          </div>

          {/* Student Portrait Cards Overlapping the Bottom - MATCHING IMAGE EXACTLY */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mt-12 relative z-20">
            {[
              {
                id: 'student-avatar-1',
                src: '/src/assets/images/student_boy_one_1781977949944.jpg',
                name: 'Neha Yadav',
                roll: 'Roll: 08',
                badge: 'Primary Section'
              },
              {
                id: 'student-avatar-2',
                src: '/src/assets/images/student_girl_one_1781977967031.jpg',
                name: 'Aarav Sharma',
                roll: 'Roll: 12',
                badge: 'Class Representative'
              },
              {
                id: 'student-avatar-3',
                src: '/src/assets/images/student_boy_two_1781977982738.jpg',
                name: 'Pooja Chaudhary',
                roll: 'Roll: 04',
                badge: 'Science Club Lead'
              },
              {
                id: 'student-avatar-4',
                src: '/src/assets/images/student_girl_two_1781977999085.jpg',
                name: 'Siddharth Raj',
                roll: 'Roll: 23',
                badge: 'Sports Captain'
              }
            ].map((st, idx) => (
              <div 
                key={idx}
                id={st.id}
                className="bg-white rounded-2xl p-2.5 shadow-xl border-4 border-white transform hover:-translate-y-3 transition-transform duration-300 group cursor-pointer"
                style={{ 
                  boxShadow: '0 20px 25px -5px rgba(99, 102, 241, 0.1), 0 10px 10px -5px rgba(99, 102, 241, 0.05)'
                }}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100">
                  <img 
                    src={st.src} 
                    alt={st.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle decorative flag on the image */}
                  <div className="absolute top-2 left-2 bg-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider scale-90 sm:scale-100">
                    Nepal
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button 
              id="btn-portal-secondary-cta"
              onClick={() => onEnterDashboard()} 
              className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-sm uppercase tracking-wider"
            >
              <span>Explore Roles & Dashboard Features</span>
              <ArrowRight className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* CORE PILLARS SECTION - MATCHING PICTURE CARD FEATURE ITEMS */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-slate-50">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-display">
            Our Foundational Pillars of Education
          </h3>
          <p className="mt-2 text-slate-500 text-sm sm:text-base">
            Providing high-caliber standards from preschool to college secondary levels, centered in a robust academic and moral environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1: Academic Excellence */}
          <div 
            id="pillar-card-academic"
            className="bg-white rounded-[2rem] p-8 text-center border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
              <GraduationCap className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-3">Academic Excellence</h4>
            <p className="text-slate-500 text-sm leading-relaxed">
              Equipping classrooms with advanced scientific laboratories, high-tech computer hubs, and specialized educators delivering tailored curriculums that consistently lead to outstanding board success.
            </p>
          </div>

          {/* Card 2: Discipline & Culture */}
          <div 
            id="pillar-card-discipline"
            className="bg-white rounded-[2rem] p-8 text-center border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="mx-auto w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 mb-6">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-3">Discipline & Culture</h4>
            <p className="text-slate-500 text-sm leading-relaxed">
              Cultivating upstanding moral fiber, punctuality, and cultural appreciation. We empower children with core principles, mutual respect, and patriotic civic responsibilities to lead society elegantly.
            </p>
          </div>

          {/* Card 3: Holistic Development */}
          <div 
            id="pillar-card-holistic"
            className="bg-white rounded-[2rem] p-8 text-center border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 mb-6">
              <Heart className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-3">Holistic Development</h4>
            <p className="text-slate-500 text-sm leading-relaxed">
              Igniting student potential through continuous co-curricular contests: inter-school soccer tournaments, cultural Nepalese dance routines, art, and computer science bootcamps.
            </p>
          </div>
        </div>
      </section>

      {/* COMBINED NOTICE BOARD & EVENT LISTINGS SECTION */}
      <section id="announcements" className="py-16 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Notices Panel */}
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-orange-50 rounded-xl text-orange-600">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800">Administrative Notice Board</h3>
                    <p className="text-xs text-slate-400">Official urgent notifications and reports</p>
                  </div>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 bg-orange-100 text-orange-850 rounded-full font-bold uppercase tracking-wider">
                  Live
                </span>
              </div>

              <div id="notices-list" className="space-y-6">
                {announcements.slice(0, 3).map((ann) => (
                  <div key={ann.id} className="p-4 rounded-2xl bg-slate-50 border-l-4 border-indigo-600 hover:bg-slate-100 transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold font-mono text-slate-400">{ann.date}</span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        ann.category === 'academic' ? 'bg-indigo-100 text-indigo-805' :
                        ann.category === 'holiday' ? 'bg-rose-100 text-rose-805' :
                        ann.category === 'event' ? 'bg-emerald-100 text-emerald-805' : 'bg-slate-200 text-slate-805'
                      }`}>
                        {ann.category}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-800 leading-snug">{ann.title}</h4>
                    <p className="text-sm text-slate-600 mt-2 line-clamp-3">{ann.content}</p>
                    <div className="mt-3 flex items-center text-xs text-indigo-650 font-semibold">
                      <span>Published by Admin • {ann.publishedBy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impending School Events Calendar */}
            <div id="events" className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Upcoming School Events</h3>
                    <p className="text-xs text-slate-404">Academic & athletic schedules</p>
                  </div>
                </div>
              </div>

              <div id="events-list" className="space-y-6">
                {events.map((ev) => (
                  <div key={ev.id} className="flex space-x-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="flex-shrink-0 w-16 h-16 bg-indigo-50 text-indigo-700 rounded-2xl flex flex-col items-center justify-center p-2 border border-indigo-100/50">
                      <Calendar className="w-5 h-5 text-rose-500 mb-0.5" />
                      <span className="text-[10px] font-extrabold uppercase font-mono text-indigo-800">
                        {new Date(ev.date).toLocaleDateString('ne-NP', { month: 'short', day: 'numeric' }) === 'Invalid Date' ? 'JULY' : new Date(ev.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-lg font-black font-mono leading-none text-slate-800">
                        {new Date(ev.date).getDate() || '18'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 leading-snug">{ev.title}</h4>
                      <p className="text-xs text-rose-600 font-semibold mt-1">
                        ⌚ {ev.time} | 📍 {ev.location}
                      </p>
                      <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                        {ev.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK INQUIRY AND DETAILS MAP POPUP MODAL */}
      {showContactForm && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 max-w-lg w-full relative shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 text-2xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-2xl font-black text-slate-800 mb-2 flex items-center font-display">
              <Mail className="w-6 h-6 text-indigo-650 mr-2" />
              <span>Contact Academic Office</span>
            </h3>
            <p className="text-sm text-slate-500 mb-6 font-sans">
              Send us your admission queries or document requests. Our registrar office gets back within 24 working hours.
            </p>

            {contactSubmitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-[1.5rem] text-emerald-800 border border-emerald-250">
                <Sparkles className="w-10 h-10 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h4 className="font-bold text-lg">Inquiry Sent Successfully!</h4>
                <p className="text-sm text-emerald-750 mt-2">Thank you for writing. Representative will reach out to you directly soon.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-550 uppercase tracking-wide mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50" 
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-550 uppercase tracking-wide mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50" 
                    placeholder="name@gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-550 uppercase tracking-wide mb-1.5">Your Message / admission inquiry</label>
                  <textarea 
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50" 
                    placeholder="Describe how we can support you..."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full py-3 rounded-xl bg-indigo-650 hover:bg-indigo-700 text-white font-bold text-sm tracking-widest uppercase transition-all duration-150 shadow"
                >
                  Submit Inquiry Now
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* SOLID METRIC INTERPOLATED GRADIENT LINE - VISIBLE IN COHESION */}
      <div className="h-2 bg-gradient-to-r from-indigo-550 via-rose-500 to-amber-350 mt-16 shadow-inner"></div>

      {/* FOOTER SECTION - MATCHING PICTURE DETAIL */}
      <footer id="main-footer" className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Col 1: Contacts (Replicating exact detail on footer left) */}
          <div className="space-y-4">
            <h4 className="text-indigo-400 font-bold tracking-wider text-sm uppercase relative pb-2 border-b border-slate-800 w-fit">
              Contact Us
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-center space-x-3 hover:text-white transition-colors">
                <div className="p-1.5 bg-white/5 rounded-lg text-indigo-400">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+91 6357 8839 • +977 31-520123</span>
              </li>
              <li className="flex items-center space-x-3 hover:text-white transition-colors">
                <div className="p-1.5 bg-white/5 rounded-lg text-indigo-400">
                  <Mail className="w-4 h-4" />
                </div>
                <span>info@upr.gmail.com</span>
              </li>
              <li className="flex items-center space-x-3 hover:text-white transition-colors">
                <div className="p-1.5 bg-white/5 rounded-lg text-indigo-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>https://upx.map • Saptari (Nepal)</span>
              </li>
            </ul>
          </div>

          {/* Col 2: About Overview */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-2">
              <CrestLogo size={42} />
              <h2 className="text-lg font-bold tracking-tight text-white leading-tight font-display">
                Shree Phuleshwar Secondary
              </h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans mt-2">
              Serving the Saptari community since years with top caliber teachers, rigorous discipline guidelines, English medium coursework, and vibrant community-first holistic initiatives.
            </p>
          </div>

          {/* Col 3: Quick links */}
          <div className="space-y-4">
            <h4 className="text-rose-450 font-bold tracking-wider text-sm uppercase relative pb-2 border-b border-slate-800 w-fit">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
              <a href="#home" className="hover:text-indigo-400 transition-colors flex items-center space-x-1">
                <span>• Home</span>
              </a>
              <a href="#about" className="hover:text-indigo-400 transition-colors flex items-center space-x-1">
                <span>• Students</span>
              </a>
              <a href="#events" className="hover:text-indigo-400 transition-colors flex items-center space-x-1">
                <span>• Events</span>
              </a>
              <a href="#announcements" className="hover:text-indigo-400 transition-colors flex items-center space-x-1">
                <span>• Notice Board</span>
              </a>
              <button 
                onClick={() => onEnterDashboard()} 
                className="hover:text-amber-400 transition-colors text-left flex items-center space-x-1 font-bold text-indigo-300"
              >
                <span>• Dashboard</span>
                <ExternalLink className="w-3 h-3 ml-0.5 text-indigo-400" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright ribbon */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-900 text-center text-xs text-slate-500 uppercase tracking-widest font-mono">
          Copyright © 2026 Saptari (Nepal). All rights reserved.
        </div>
      </footer>

    </div>
  );
}
