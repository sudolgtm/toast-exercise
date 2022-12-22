const waitFor = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

const retryWithBackoff = async (request, args, retries, maxRetries) => {
    try {
        if (retries > 0) {
            const timeToWait = (2 ** retries) * 100;
            await waitFor(timeToWait);
        }
        return await request(args);
    } catch (e) {
        console.error(e);
        if (retries < maxRetries) {
            return await retryWithBackoff(request, args, retries + 1, maxRetries);
        } else throw e;
    }
}

export default function withRetry(request, args) {
    let retries = 0;
    let maxRetries = 5;
    return retryWithBackoff(request, args, retries, maxRetries);
};