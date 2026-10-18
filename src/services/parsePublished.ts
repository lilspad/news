/**
 * Parses the `published` field returned by Currents API to a valid ISO 
 * string and converts it to a Date object
 * 
 * @param raw - a raw `published` string as returned by the Currents API
 * @returns a Date object
 */
export function parsePublished(raw: string): Date {
  const [datePart, timePart, offset] = raw.split(' ');
  const offsetParsed = offset.slice(0, 3) + ':' + offset.slice(3);
  const isoString = `${datePart}T${timePart}${offsetParsed}`;

  return new Date(isoString);
}