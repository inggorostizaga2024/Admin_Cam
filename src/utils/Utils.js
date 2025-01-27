import resolveConfig from 'tailwindcss/resolveConfig';

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig('./src/css/tailwind.config.js')
}

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) => Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(value);


/*** NODE MEDIA DASHBOARD ***/
export function bytesToSize(bytes) {
  if (bytes === 0) return '0 Byte';
  bytes = Number(bytes);
  let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

export function bytesToBand(bytes) {
  if (bytes === 0) return 0;
  let bits = Number(bytes) * 8;
  return Math.round(bits / Math.pow(1024, 2), 2);
};

export function secondsToDhms(seconds) {
  seconds = Number(seconds);
  let d = Math.floor(seconds / (3600 * 24));
  let h = Math.floor(seconds % (3600 * 24) / 3600);
  let m = Math.floor(seconds % 3600 / 60);
  let s = Math.floor(seconds % 60);

  let dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
  let hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
  let mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
  let sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

export function secondsToDhmsSimple(seconds) {
  seconds = Number(seconds);
  let d = Math.floor(seconds / (3600 * 24));
  let h = Math.floor(seconds % (3600 * 24) / 3600);
  let m = Math.floor(seconds % 3600 / 60);
  let s = Math.floor(seconds % 60);

  let dDisplay = d > 0 ? d + "d," : "";
  let hDisplay = h > 0 ? h + "h," : "";
  let mDisplay = m > 0 ? m + "m," : "";
  let sDisplay = s + "s";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}