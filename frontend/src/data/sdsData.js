// Centralized data for SDS website — used by Home, Events, and Team pages

export const pastEvents = [
  {
    title: 'Hack & Forge',
    subtitle: '24 HR Hackathon',
    date: '14–15 March 2025',
    time: '1 PM onwards',
    type: 'Hackathon',
    recap: '24-hour hackathon powered by Unstop with prizes worth ₹20K. Teams built real solutions under pressure — from ideation to a working demo in a single day.',
    stats: [{ label: 'Duration', value: '24H' }, { label: 'Prize Pool', value: '₹20K' }, { label: 'Powered by', value: 'Unstop' }],
    accent: '#F97316',
    emoji: '⚡',
    organizers: ['Vaibhav Raj', 'Himanshu Pravash'],
  },
  {
    title: "DSS'26 Speaker Session",
    subtitle: 'Siddhartha Samant — AI Lead, Deloitte',
    date: '15 March 2025',
    time: '11:00 AM – 1:00 PM',
    location: 'Seminar Hall 3',
    type: 'Talk',
    recap: 'BIT Mesra alumni Siddhartha Samant shared insights on AI at enterprise scale, real-world deployment challenges, and career advice for aspiring AI engineers.',
    stats: [{ label: 'Speaker', value: '1' }, { label: 'Venue', value: 'SH3' }, { label: 'Audience', value: '200+' }],
    accent: '#2563EB',
    emoji: '🎤',
  },
  {
    title: "DSS'26 Speaker Session",
    subtitle: 'Shridhar Mankar — 5 Minutes Engineering',
    date: '15 March 2025',
    time: '4:00 PM',
    location: 'Seminar Hall 3',
    type: 'Talk',
    recap: 'Teacher, Podcaster, and TEDx Speaker with 838K+ YouTube subscribers spoke on simplifying complex engineering concepts and building in public.',
    stats: [{ label: 'Subscribers', value: '838K+' }, { label: 'Venue', value: 'SH3' }, { label: 'Format', value: 'Talk' }],
    accent: '#3B82F6',
    emoji: '🎙️',
  },
  {
    title: "Coder's Cup",
    date: '14 March 2025',
    time: '4 PM – 6 PM',
    type: 'Competition',
    recap: "Competitive coding contest powered by Unstop. Sharp problems, sharper solutions — a 2-hour sprint to test algorithmic thinking under time pressure.",
    stats: [{ label: 'Duration', value: '2H' }, { label: 'Format', value: 'Solo' }, { label: 'Platform', value: 'Unstop' }],
    accent: '#FB923C',
    emoji: '🏆',
    organizers: ['Lakshay Mittal', 'Himanshu Pravash'],
  },
  {
    title: 'Render Replicas',
    date: '15 March 2025',
    time: '2 PM – 4 PM',
    type: 'Workshop',
    recap: 'Hands-on AI image-rendering challenge — participants replicated target renders using prompt engineering, blending technical precision with visual creativity.',
    stats: [{ label: 'Date', value: 'Mar 15' }, { label: 'Time', value: '2–4PM' }, { label: 'Mode', value: 'Hands-on' }],
    accent: '#10B981',
    emoji: '🎨',
    organizers: ['Lakshay Mittal', 'Himanshu Pravash'],
  },
]

export const upcomingEvents = [
  { title: 'DataHack 3.0', date: 'Aug 15–16, 2025', type: 'Hackathon', desc: '48-hour data science hackathon open to all BIT Mesra students. Build, analyze, win.' },
  { title: 'ML Workshop Series', date: 'Sep 5, 2025', type: 'Workshop', desc: 'Hands-on deep dive into supervised learning, feature engineering, and model deployment.' },
  { title: 'Industry Talk: Data @ Scale', date: 'Sep 20, 2025', type: 'Talk', desc: 'Guest lecture from a senior data engineer at a top tech company. Real-world pipelines.' },
  { title: 'Kaggle Competition Sprint', date: 'Oct 3–10, 2025', type: 'Competition', desc: 'Team-based Kaggle sprint with mentorship, weekly check-ins, and prizes.' },
]

export const typeColors = {
  Hackathon: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  Workshop: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Talk: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Competition: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
}

// Team photos — imported by Team.jsx
export const team = [
  { name: 'Vaibhav Raj', role: 'President', domain: 'ML & Systems', img: 'vaibhav.png' },
  { name: 'Himanshu Pravash', role: 'Vice President', domain: 'Data Engineering', img: 'himanshu.png' },
  { name: 'Shanvi Vats', role: 'Vice President', domain: 'Research', img: 'shanvi.png' },
  { name: 'Lakshay Mittal', role: 'Director', domain: 'Events & Outreach', img: 'lakshay.png' },
  { name: 'Devashish Komiya', role: 'Director', domain: 'Technical', img: 'devashish.png' },
  { name: 'Vedant Pasari', role: 'General Secretary', domain: 'Operations', img: 'vedant.png' },
  { name: 'Aditi Kumari', role: 'Joint Secretary', domain: 'Coordination', img: 'aditi.png' },
]
