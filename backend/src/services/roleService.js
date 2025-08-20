// src/services/role.service.ts
import {roleModel} from "@models/roleModel";

const getRole = async (id) => {
    const role = await roleModel.findById(id);
    if (!role) {
        throw new Error("Role not found");
    }
    return role;
};

const getRoles = async () => {
    return await roleModel.findAll();
};

const roleService = {
    getRole,
    getRoles
}

export default roleService;