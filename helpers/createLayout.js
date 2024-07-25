import fs from 'fs';
import process from 'process';

const layoutName = process.argv[2];

if (!layoutName) {
  console.error('Необходимо указать имя папки layout.');
  process.exit(1);
}

const layoutPath = `./src/layout/${layoutName}`;

if (fs.existsSync(layoutPath)) {
  console.error(`layout "${layoutPath}" уже существует.`);
  process.exit(1);
}

fs.mkdirSync(layoutPath, { recursive: true });

const filesToCreate = ['pug', 'scss', 'js'];
filesToCreate.forEach((ext) => {
  const fileName = `${layoutPath}/${layoutName}.${ext}`;
  fs.writeFileSync(fileName, '');
  console.log(`Файл "${fileName}" успешно создан.`);
});

console.log(`Папка layout "${layoutPath}" успешно создана.`);