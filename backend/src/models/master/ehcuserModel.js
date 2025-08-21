import EhcUser from "../../schemas/master/ehcuser";
import bcrypt from 'bcryptjs';

const findById = async (id) => {
  return await EhcUser.findByPk(id, { attributes: { exclude: ['password'] } });
};

const findByEmail = async (email) => {
  return await EhcUser.findOne({ where: { email } });
};

const createSuperadmin = async ({ username, email, password, meta }) => {
  const hash = await bcrypt.hash(password, 10);
  const user = await EhcUser.create({ username, email, password: hash, role: 'superadmin', meta });
  return { id: user.id, username: user.username, email: user.email };
};

const update = async (id, data) => {
  const user = await EhcUser.findByPk(id);
  if (!user) return null;
  if (data.password) data.password = await bcrypt.hash(data.password, 10);
  await user.update(data);
  return user;
};

const remove = async (id) => {
  const deleted = await EhcUser.destroy({ where: { id } });
  return deleted > 0;
};

export const ehcuserModel = {
  findById,
  findByEmail,
  createSuperadmin,
  update,
  remove,
};
