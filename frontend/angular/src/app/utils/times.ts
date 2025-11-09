export function toTimestamp(
  value: string | number | Date | null | undefined
): number {
  if (value == null || value === '') return 0;

  if (typeof value === 'number') return value;
  if (value instanceof Date) return value.getTime();

  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function parseDateString(dateStr: string): Date | null {
  if (!dateStr) return null;

  // Розділяємо дату і час
  const [day, month, yearAndTime] = dateStr.split(".");
  if (!day || !month || !yearAndTime) return null;

  const [year, time] = yearAndTime.trim().split(" ");
  if (!year || !time) return null;

  // Формуємо ISO-рядок
  const isoString = `${year}-${month}-${day}T${time}`;
  const date = new Date(isoString);

  return isNaN(date.getTime()) ? null : date;
}
