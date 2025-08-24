// Test utility for role-based routing
import { ROLES, getRoleDashboard, getRoleMenu, getRolePermissions } from './roleUtils';

export const testRoleRouting = () => {
  console.log('=== Testing Role-Based Routing ===');
  
  // Test role dashboard mapping
  console.log('Role Dashboard Mapping:');
  Object.values(ROLES).forEach(role => {
    const dashboard = getRoleDashboard(role);
    console.log(`${role}: ${dashboard}`);
  });
  
  // Test role menu
  console.log('\nRole Menu Items:');
  Object.values(ROLES).forEach(role => {
    const menu = getRoleMenu(role);
    console.log(`${role}: ${menu.length} menu items`);
    menu.forEach(item => {
      console.log(`  - ${item.label}: ${item.path}`);
    });
  });
  
  // Test role permissions
  console.log('\nRole Permissions:');
  Object.values(ROLES).forEach(role => {
    const permissions = getRolePermissions(role);
    console.log(`${role}: ${permissions.length} permissions`);
  });
  
  console.log('\n=== Role-Based Routing Test Complete ===');
};

// Test data for different roles
export const testUsers = [
  {
    email: 'rrh@ehc.com',
    password: 'rrh123',
    role: 'rrh',
    firstName: 'RRH',
    lastName: 'User'
  },
  {
    email: 'employee@ehc.com',
    password: 'employee123',
    role: 'employee',
    firstName: 'Employee',
    lastName: 'User'
  },
  {
    email: 'rf@ehc.com',
    password: 'rf123',
    role: 'rf',
    firstName: 'RF',
    lastName: 'User'
  },
  {
    email: 'manager@ehc.com',
    password: 'manager123',
    role: 'manager',
    firstName: 'Manager',
    lastName: 'User'
  },
  {
    email: 'formateur@ehc.com',
    password: 'formateur123',
    role: 'formateur',
    firstName: 'Formateur',
    lastName: 'User'
  },
  {
    email: 'admin@ehc.com',
    password: 'admin123',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'User'
  },
  {
    email: 'superadmin@ehc.com',
    password: 'superadmin12456783',
    role: 'superadmin',
    firstName: 'Super Admin',
    lastName: 'User'
  }
];

// Function to simulate login and test routing
export const simulateLogin = (user) => {
  console.log(`\n=== Simulating Login for ${user.role} ===`);
  console.log(`User: ${user.firstName} ${user.lastName}`);
  console.log(`Role: ${user.role}`);
  console.log(`Dashboard: ${getRoleDashboard(user.role)}`);
  
  const menu = getRoleMenu(user.role);
  console.log('Available menu items:');
  menu.forEach(item => {
    console.log(`  - ${item.label}: ${item.path}`);
  });
  
  return {
    user,
    dashboard: getRoleDashboard(user.role),
    menu: menu
  };
};

// Run tests
if (typeof window !== 'undefined') {
  // Only run in browser environment
  window.testRoleRouting = testRoleRouting;
  window.testUsers = testUsers;
  window.simulateLogin = simulateLogin;
}
