const os = require('node:os');
const fs = require('node:fs');
const path = require('node:path');

// Отримання інформації про операційну систему
console.log('Platform:', os.platform());
console.log('Arch:', os.arch());
console.log('Release:', os.release());

// Отримання інформації про ядра
console.log('Number of CPUs:', os.cpus().length);
os.cpus().forEach((cpu, index) => {
    console.log(`CPU ${index + 1}:`);
    console.log(`  Model: ${cpu.model}`);
    console.log(`  Speed: ${cpu.speed} MHz`);
});

// Отримання загальної інформації про пам'ять
console.log('Total Memory:', formatBytes(os.totalmem()));
console.log('Free Memory:', formatBytes(os.freemem()));

// Функція для форматування байтів у зрозуміліші одиниці
function formatBytes(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
}