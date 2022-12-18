const waitFor = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

const retryWithBackoff = async (request, retries) => {
    try {
        const timeToWait = 2 ** retries * 100;
        await waitFor(timeToWait);
        return await request();
    } catch (e) {
        console.error(e);
        return await retryWithBackoff(request, retries + 1);
    }
}

export default function retry(request) {
    let retries = 1;
    retryWithBackoff(request, retries);
};