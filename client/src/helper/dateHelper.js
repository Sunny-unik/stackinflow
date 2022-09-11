export default function handleDate(params) {
  const t2 = new Date().getTime();
  const t1 = new Date(params).getTime();

  return parseInt((t2 - t1) / (24 * 3600 * 1000));
}
