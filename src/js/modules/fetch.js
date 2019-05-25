export default async function fetchData(url) {
  const data = await fetch(url);
  if (data.ok) {
    const parsedData = await data.json();
    return parsedData;
  }
  throw new Error(`fetch error, status: ${data.status}`);
}
