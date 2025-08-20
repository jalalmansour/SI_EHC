import crypto from "crypto";

/**
 * Generate a strong random password
 * @param {number} length - total length of the password (default 12)
 * @returns {string} - secure password
 */
export function generatePassword(length = 12) {
    const digits = "0123456789";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

    const allChars = digits + upper + lower + symbols;

    // Ensure at least one of each type
    let password = [
        digits[crypto.randomInt(digits.length)],
        upper[crypto.randomInt(upper.length)],
        lower[crypto.randomInt(lower.length)],
        symbols[crypto.randomInt(symbols.length)],
    ];

    // Fill the rest
    for (let i = password.length; i < length; i++) {
        password.push(allChars[crypto.randomInt(allChars.length)]);
    }

    // Shuffle the array
    password = password.sort(() => crypto.randomInt(0, 2) - 1);

    return password.join("");
}

/**
 * Generate a secure random verification token
 * @param {number} length - total length of the token (default 32)
 * @returns {string} - secure token
 */
export function generateToken(length = 32) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const tokenBytes = crypto.randomBytes(length);
    let token = "";

    for (let i = 0; i < length; i++) {
        token += charset[tokenBytes[i] % charset.length];
    }

    return token;
}
