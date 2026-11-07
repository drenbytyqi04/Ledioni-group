// Ikona lineare (24×24, stroke = currentColor). Të vizatuara për këtë faqe.
const paths = {
  bridge: '<path d="M2 16h20"/><path d="M2 10c3.5 0 6.5-3 10-3s6.5 3 10 3"/><path d="M5 10v6M9 7.8V16M15 7.8V16M19 10v6"/><path d="M2 19h20"/>',
  road: '<path d="M8 3 4 21M16 3l4 18"/><path d="M12 4v3M12 10.5v3M12 17v3"/>',
  building: '<path d="M4 21V5l8-2v18"/><path d="M12 8h8v13"/><path d="M2 21h20"/><path d="M7 8h2M7 12h2M7 16h2M15 12h2M15 16h2"/>',
  compass: '<circle cx="12" cy="5" r="2"/><path d="m11 7-6 14M13 7l6 14"/><path d="M7.5 15.5a10 10 0 0 0 9 0"/>',
  ruler: '<path d="m3 17 14-14 4 4L7 21z"/><path d="m7 13 2 2M10 10l2 2M13 7l2 2"/>',
  pipe: '<path d="M3 7h9a4 4 0 0 1 4 4v10"/><path d="M3 11h9v10"/><path d="M2 5v8M10 19h8"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  excavator: '<path d="M2 20h11"/><rect x="3" y="15" width="10" height="5" rx="2.5"/><path d="M5 15v-4h5l1 4"/><path d="M10 11 15 5l5 4"/><path d="m20 9-1 5-3-1"/>',
  trowel: '<path d="m4 20 9-9"/><path d="M13 11 18 6l2 2-1 7-6-4z"/><path d="M3 21l2-2"/>',
  shield: '<path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  helmet: '<path d="M3 17h18"/><path d="M5 17v-3a7 7 0 0 1 14 0v3"/><path d="M10 7.3V11M14 7.3V11"/><path d="M3 17v1.5h18V17"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.8 7L4 20l1.2-4.6A8 8 0 1 1 21 12z"/><path d="M8 11h8M8 14h5"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  landmark: '<path d="M3 21h18M4 18h16"/><path d="M5 18v-7M9.5 18v-7M14.5 18v-7M19 18v-7"/><path d="M3 11h18L12 4z"/>',
  team: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2a5 5 0 0 1 5 5"/>',
  phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M12 21s7-6.1 7-12a7 7 0 0 0-14 0c0 5.9 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  arrowUp: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  arrowDown: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  tool: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3 17.8V21h3.2l6.3-6.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  zoom: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4M11 8v6M8 11h6"/>',
  facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.5 10v6.5M7.5 7.2v.1M11 16.5V10M11 13a2.5 2.5 0 0 1 5 0v3.5"/>',
};

export function icon(name, { size = 24, cls = '', label } = {}) {
  const body = paths[name];
  if (!body) throw new Error(`Ikona "${name}" nuk ekziston`);
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"';
  return `<svg class="icon${cls ? ' ' + cls : ''}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ${a11y}>${body}</svg>`;
}

// Logo zyrtare e WhatsApp (e mbushur, jo lineare)
export const whatsappIcon = (size = 28) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75A12.95 12.95 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3zm0 23.62c-1.98 0-3.92-.53-5.61-1.54l-.4-.24-3.96 1.04 1.06-3.86-.26-.4A10.6 10.6 0 0 1 5.4 16c0-5.86 4.77-10.62 10.64-10.62 5.86 0 10.6 4.76 10.6 10.62 0 5.86-4.74 10.62-10.6 10.62zm5.82-7.95c-.32-.16-1.89-.93-2.18-1.04-.29-.1-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59a9.6 9.6 0 0 1-1.78-2.2c-.18-.33-.02-.5.14-.66.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.53-.72-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.14 3.09 1.3 3.3c.16.21 2.25 3.43 5.45 4.81.76.33 1.35.53 1.82.67.76.24 1.46.2 2 .12.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37z"/></svg>`;
