module.exports = {
  apps: [
    { name: 'auth-service', script: 'auth-service/index.js' },
    { name: 'doctor-service', script: 'doctor-service/index.js' },
    { name: 'patient-service', script: 'patient-service/index.js' },
    { name: 'appointment-service', script: 'appointment-service/index.js' },
    { name: 'billing-service', script: 'billing-service/index.js' },
    { name: 'notification-service', script: 'notification-service/index.js' },
  ],
};
