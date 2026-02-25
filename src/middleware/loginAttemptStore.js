const attempts = new Map();

function recordFailure(key) {
    const now = Date.now();

    if (!attempts.has(key)) {
        attempts.set(key, { count: 1, lastAttempt: now });
        return;
    }

    const data = attempts.get(key);

    // reset after 10 mins
    if (now - data.lastAttempt > 10 * 60 * 1000) {
        attempts.set(key, { count: 1, lastAttempt: now });
        return;
    }

    data.count += 1;
    data.lastAttempt = now;
    attempts.set(key, data);
}

function resetAttempts(key) {
    attempts.delete(key);
}

function isBlocked(key) {
    const data = attempts.get(key);
    if (!data) return false;

    if (data.count >= 5) {
        const now = Date.now();
        if (now - data.lastAttempt < 10 * 60 * 1000) {
            return true;
        }
        attempts.delete(key);
    }

    return false;
}

module.exports = { recordFailure, resetAttempts, isBlocked };