import Company from "../../schemas/master/company";

const findAll = async () => {
  return await Company.findAll({ order: [["id", "ASC"]] });
};

const findById = async (id) => {
  return await Company.findByPk(id);
};

const findByDbName = async (dbName) => {
  return await Company.findOne({ where: { db_name: dbName } });
};

const create = async (data) => {
  const {
    name,
    email,
    db_name,
    db_user,
    db_password,
    db_host,
    status,
    license_type,
    subscription_type,
    storage_limit_mb,
    owner_email,
    provisioned_by,
    provision_logs
  } = data;

  const company = await Company.create({
    name,
    email,
    db_name,
    db_user,
    db_password,
    db_host,
    status,
    license_type,
    subscription_type,
    storage_limit_mb,
    owner_email,
    provisioned_by,
    provision_logs
  });

  return company;
};

const update = async (id, data) => {
  const company = await Company.findByPk(id);
  if (!company) return null;
  await company.update(data);
  return company;
};

const remove = async (id) => {
  const deleted = await Company.destroy({ where: { id } });
  return deleted > 0;
};

export const companyModel = {
  findAll,
  findById,
  findByDbName,
  create,
  update,
  remove,
};
