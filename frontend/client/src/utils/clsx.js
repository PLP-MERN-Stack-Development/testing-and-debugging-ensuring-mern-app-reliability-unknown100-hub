export default function clsx(classes) {
  if (Array.isArray(classes)) {
    return classes.filter(Boolean).join(' ').trim();
  }
  if (typeof classes === 'string') {
    return classes.trim();
  }
  return '';
}
