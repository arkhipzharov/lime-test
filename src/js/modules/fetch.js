export default async function fetchLoadCheckErrParseJSON(url) {
  try {
    const data = await fetch(url);
    if (data.ok) {
      const finalData = await data.json();
      return finalData;
    }
    throw new Error('fetch error, status: ' + data.status);
  } catch (err) {
    throw err;
  }
}
