const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const POSTS_DIR = path.join(__dirname, '../src/content/posts');

// Ensure posts directory exists
if (!fs.existsSync(POSTS_DIR)) {
    console.error(`Error: Posts directory not found at ${POSTS_DIR}`);
    process.exit(1);
}

rl.question('Título de la noticia: ', (title) => {
    if (!title) {
        console.error('El título es obligatorio.');
        rl.close();
        return;
    }

    // Generate slug
    const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove non-word chars
        .replace(/[\s_-]+/g, '-') // Replace spaces with dashes
        .replace(/^-+|-+$/g, ''); // Trim dashes

    const date = new Date().toISOString().split('T')[0];
    const filename = `${slug}.md`;
    const filePath = path.join(POSTS_DIR, filename);

    if (fs.existsSync(filePath)) {
        console.error(`Error: Ya existe un archivo con el nombre ${filename}`);
        rl.close();
        return;
    }

    const content = `---
title: '${title.replace(/'/g, "''")}'
pubDate: ${date}
description: ''
author: 'Cheito Díaz'
tags: []
---

Escribe aquí el contenido de tu noticia...
`;

    fs.writeFileSync(filePath, content);

    console.log(`\n✅ Noticia creada con éxito:`);
    console.log(`   ${filePath}`);
    console.log(`\nAhora puedes editar el archivo y añadir el contenido.`);

    rl.close();
});
