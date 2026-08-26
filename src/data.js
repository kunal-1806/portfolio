// src/data.js — single source of truth for ALL site content.

export const PROFILE = {
  name: 'Kunal Tyagi',
  role: 'AI & Backend Developer',
  bio: 'I focus on building Retrieval-Augmented Generation (RAG) models, terminal coding assistants, and reliable backend systems.',
  email: 'kunaltyagi1606@gmail.com',
  phone: '+91-7599429696',
  location: 'Punjab, India',
  linkedin: 'https://www.linkedin.com/in/kunal-tyagi1806/',
  github: 'https://github.com/kunal-1806',
}

export const SKILLS = [
  { category: 'Languages', items: ['Python', 'C'] },
  { category: 'Frameworks & Libs', items: ['LangChain', 'LangGraph', 'FastAPI', 'Streamlit', 'Chromadb'] },
  { category: 'Databases', items: ['PostgreSQL', 'SQL'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'Linux', 'VS Code'] },
  { category: 'Core CS & Soft Skills', items: ['DSA', 'OOP', 'DBMS', 'OS', 'Computer Networks', 'Analytical Thinking', 'Collaboration', 'Persistence', 'Innovation'] },
]

export const PROJECTS = [
  {
    title: 'RAG Based Chatbot',
    date: 'Feb 2026',
    repo: 'https://github.com/kunal-1806/rag--chatbot-',
    points: [
      'Vector embeddings for semantic document understanding',
      'Similarity search across embedded knowledge base',
      'Chunking / indexing pipeline for fast retrieval',
      'Dynamic context retrieval for accurate answers',
    ],
    tech: ['Python', 'Streamlit', 'LangChain', 'Chromadb'],
  },
  {
    title: 'Terminal-Based AI Coding Assistant',
    date: 'Nov 2025',
    repo: 'https://github.com/kunal-1806/Claude-clone',
    points: [
      'File I/O automation inside the terminal',
      'Context retrieval across project files',
      'Streaming API responses in real time',
      'Dynamic window management with interactive UI',
    ],
    tech: ['Python', 'rich', 'click'],
  },
  {
    title: 'Adaptive Frequency-Hopping 2-Way Communication System',
    date: 'Mar 2025',
    points: [
      'ESP32 & Arduino Nano dual-microcontroller setup',
      'Dynamic multi-band RF transmission',
    ],
    tech: ['ESP32', 'Arduino Nano'],
  },
]

export const CERTIFICATES = [
  { title: 'DBMS Part - 1', issuer: 'Infosys', date: 'Feb 2026', src: '/cert-dbms.pdf' },
  { title: 'Data Analysis with Pandas & Python', issuer: 'Infosys', date: 'Mar 2026', src: '/cert-pandas.pdf' },
  { title: 'Programming Fundamentals using Python', issuer: 'Infosys', date: 'June 2025', src: '/cert-python.pdf' },
]

export const EDUCATION = [
  { school: 'Lovely Professional University', degree: 'B.Tech CSE', score: 'CGPA: 8.80', period: 'Aug 2025 – Present' },
  { school: 'Indraprastha Public School', degree: 'Intermediate', score: '80%', period: 'Aug 2022 – Mar 2024' },
]

export const ACHIEVEMENTS = [
  { text: 'Solved 150+ Python programming problems on Codetantra', date: 'Jan 2025' },
]

export const RESUME = {
  viewSrc: '/resume.pdf',
  downloadHref: '/cv-pel134.pdf',
}

export const ABOUT = {
  paragraphs: [
    "I'm a B.Tech CSE student at Lovely Professional University (CGPA 8.80) who enjoys working close to the machinery of language-model applications — designing chunking and indexing pipelines, wiring vector stores, and making retrieval genuinely reliable.",
    'Most of my recent work sits at the intersection of AI and developer tooling: a RAG-based chatbot with dynamic context retrieval, a terminal-based AI coding assistant with streaming responses, and an adaptive frequency-hopping communication system on ESP32 and Arduino.',
    'When I step away from projects, I sharpen my fundamentals — 150+ solved Python problems and Infosys certifications in DBMS, data analysis with Pandas, and Python programming.',
  ],
}
