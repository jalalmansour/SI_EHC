// src/models/verificationToken.model.js


import {User, VerificationToken} from "../schemas";

/**
 * Finds a verification token by its value.
 * @param {string} token - The token string to search for.
 * @returns The verification token object including the user, or null if not found.
 */
const findByToken = async (token) => {
    return VerificationToken.findOne({
        where: { token },
        include: { model: User, as: "user" },
    });
};

/**
 * Creates a new verification token for a user.
 * @param {object} data - Token data including userId, token, type, expiresAt.
 * @returns The newly created verification token object including the user.
 */
const createVerificationToken = async (data) => {
    const { userId, token, type, expiresAt } = data;

    // 1️⃣ Create the token
    const verificationToken = await VerificationToken.create({
        userId,
        token,
        type,
        expiresAt,
    });

    // 2️⃣ Fetch it again including the user
    return await VerificationToken.findByPk(verificationToken.id, {
        include: { model: User, as: "user" },
    });
};

/**
 * Deletes expired tokens (optional utility).
 * @returns Number of deleted tokens
 */
const deleteExpired = async () => {
    const now = new Date();
    return await VerificationToken.destroy({
        where: {
            expiresAt: {$lt: now},
        },
    });
};

const verificationTokenModel = {
    findByToken,
    createVerificationToken,
    deleteExpired,
}

export default verificationTokenModel;