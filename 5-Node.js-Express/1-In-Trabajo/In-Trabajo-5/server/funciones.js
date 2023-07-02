import fs from 'fs';

export async function bodyParser(request) {
    return new Promise((resolve, reject) => {
        let datosTotales = '';
        request
            .on('data', (chunk) => {
                datosTotales += chunk
            })
            .on('end', () => {
                request.body = JSON.parse(datosTotales);
                resolve()
            })
            .on('error', (err) => {
                console.log(err)
                reject()
            })
    })
}

// function para mostrar menu
export async function getMostrarMenu(req, res) {
    try {
        fs.readFile('../db/menu.json', 'utf-8', (err, json) => {
            if (err) throw err;
            let menu = JSON.parse(json)
            console.log(menu[0]);
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(json);
        });
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' })
        res.write('Data invalida');
        res.end();
    }
}

// function para agregar plato
export async function postAgregarPlato(req, res) {
    try {
        await bodyParser(req);
        fs.readFile('../db/menu.json', 'utf-8', (err, json) => {
            let data = req.body;
            let menu = JSON.parse(json)
            menu[0].almuerzos.push(data);
            let menustringify = JSON.stringify(menu)
            console.log(menu[0]);
            fs.writeFileSync('../db/menu.json', menustringify);
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(menustringify);
        })
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.write('Data invalidaaaaaaaaa');
        res.end();
    }
}

// function para eliminar plato
export async function deletePlato(req, res) {
    try {
        await bodyParser(req);
        fs.readFile('../db/menu.json', 'utf-8', (err, json) => {
            const { nombre } = req.body;
            const menu = JSON.parse(json);
            menu[0].almuerzos.map((plato, index) => {
                if (plato.nombre == nombre) {
                    menu[0].almuerzos.splice(index, 1)
                    console.log(menu[0]);
                    fs.writeFileSync('../db/menu.json', JSON.stringify(menu));
                }
            })
            res.end(JSON.stringify(menu));
        });
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.write('Data invalida');
        res.end();
    }
}