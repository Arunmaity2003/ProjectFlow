const iconPaths = {
  grid: 'M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7Z',
  check: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
  folder: 'M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z',
  board: 'M4 4h16v16H4V4Zm5 0v16m6-16v16',
  chart: 'M4 20V10m5 10V4m6 16v-7m5 7V7',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Zm-4 12h-4',
  settings: 'M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Zm7-3.5 2-1-2-3-2 1-2-1V5h-6v3l-2 1-2-1-2 3 2 1v4l-2 1 2 3 2-1 2 1v2h6v-2l2-1 2 1 2-3-2-1v-4Z',
  search: 'M21 21l-4.4-4.4M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z',
  plus: 'M12 5v14M5 12h14',
  calendar: 'M7 2v4m10-4v4M3 9h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z',
  dots: 'M5 12h.01M12 12h.01M19 12h.01',
}

export default function Icon({ name, size = 20, strokeWidth = 1.8 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={iconPaths[name]} /></svg>
}
