export function getThumbnail(url) {
  const results = url.match('[\\?&]v=([^&#]*)');
  const video = !results ? url : results[1];

  return 'http://img.youtube.com/vi/' + video + '/0.jpg';
}