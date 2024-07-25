import fs from 'fs';
import process from 'process';

const componentName = process.argv[2];

if (!componentName) {
  console.error('Необходимо указать имя папки компонента.');
  process.exit(1);
}

const componentPath = `./src/components/${componentName}`;

if (fs.existsSync(componentPath)) {
  console.error(`Компонент "${componentPath}" уже существует.`);
  process.exit(1);
}

fs.mkdirSync(componentPath, { recursive: true });

const filesToCreate = ['pug', 'scss', 'js'];
filesToCreate.forEach((ext) => {
  const fileName = `${componentPath}/${componentName}.${ext}`;
  fs.writeFileSync(fileName, '');
  console.log(`Файл "${fileName}" успешно создан.`);
});

console.log(`Папка компонента "${componentPath}" успешно создана.`);