import { TenantInvite } from '../../schemas';
import crypto from 'crypto';

const createInvite = async ({ tenantId, inviteEmail, createdBy, ttlHours = 48, meta }) => {
  const raw = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(raw).digest('hex');
  const expiresAt = new Date(Date.now() + ttlHours * 3600 * 1000);

  const invite = await TenantInvite.create({
    tenantId,
    inviteEmail,
    tokenHash,
    expiresAt,
    createdBy,
    meta
  });

  return { invite, rawToken: raw };
};

const findByTokenHash = async (tokenHash) => {
  return TenantInvite.findOne({ where: { tokenHash } });
};

const markUsed = async (id, usedBy) => {
  const invite = await TenantInvite.findByPk(id);
  if (!invite) return null;
  invite.used = true;
  invite.usedAt = new Date();
  await invite.save();
  return invite;
};

export const tenantInviteModel = { createInvite, findByTokenHash, markUsed };
