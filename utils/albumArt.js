/**
 * Album Art Utilities
 * Functions to fetch and display album artwork for music tracks
 */

/**
 * Generate a gradient placeholder image for album art
 * @param {string} trackName - Name of the track
 * @param {number} size - Size of the image (default: 300)
 * @returns {string} Data URL of the generated image
 */
export function generateAlbumArtPlaceholder(trackName, size = 300) {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Generate gradient based on track name
  const gradients = {
    'Prism': ['#FF6B6B', '#4ECDC4', '#45B7D1'],
    'Screamvillain': ['#667EEA', '#764BA2', '#F093FB'],
    'default': ['#FFA07A', '#98D8C8', '#F7DC6F']
  };

  const colors = gradients[trackName] || gradients['default'];
  
  // Create gradient
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.5, colors[1]);
  gradient.addColorStop(1, colors[2]);

  // Fill background
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Add track name text
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = 'bold 32px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Split long names
  const words = trackName.toUpperCase().split(' ');
  if (words.length > 1) {
    ctx.fillText(words[0], size / 2, size / 2 - 20);
    ctx.fillText(words.slice(1).join(' '), size / 2, size / 2 + 20);
  } else {
    ctx.fillText(trackName.toUpperCase(), size / 2, size / 2);
  }

  // Add "ALBUM ART" subtitle
  ctx.font = '16px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText('ALBUM ART', size / 2, size / 2 + 60);

  // Return data URL
  return canvas.toDataURL('image/png');
}

/**
 * Fetch album art from external API or generate placeholder
 * @param {string} trackName - Name of the track
 * @param {string} artist - Artist name (optional)
 * @returns {Promise<string>} URL or data URL of the album art
 */
export async function getAlbumArt(trackName, artist = '') {
  try {
    // Try to load from local files first
    const localPath = `/Music/${trackName}.jpg`;
    const response = await fetch(localPath, { method: 'HEAD' });
    
    if (response.ok) {
      return localPath;
    }
  } catch (error) {
    console.log('Local artwork not found, generating placeholder');
  }

  // Generate placeholder if no artwork found
  return generateAlbumArtPlaceholder(trackName);
}

/**
 * Preload album art for better performance
 * @param {Array} tracks - Array of track objects with name property
 * @returns {Promise<Object>} Object mapping track names to artwork URLs
 */
export async function preloadAlbumArt(tracks) {
  const artworkMap = {};
  
  await Promise.all(
    tracks.map(async (track) => {
      artworkMap[track.name] = await getAlbumArt(track.name);
    })
  );
  
  return artworkMap;
}

/**
 * Create album art from audio file metadata
 * @param {string} audioSrc - Path to audio file
 * @returns {Promise<string|null>} Data URL of embedded artwork or null
 */
export async function extractEmbeddedArt(audioSrc) {
  try {
    // This would require jsmediatags library
    // For now, return null and use placeholder
    return null;
  } catch (error) {
    console.error('Error extracting embedded artwork:', error);
    return null;
  }
}
