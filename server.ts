import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { Houses } from './src/app/interfaces/houses';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);
  server.use(express.json())

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  let houses : Houses[] = [
    {
      id: 1,
      name: "Kosan Pak H.Iqbal",
      location: "Jakarta Selatan",
      roomAvailable : 5,
      price: 1500000,
      imageLink: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 2,
      name: "Kosan Abah Aji",
      location: "Jakarta Utara",
      roomAvailable : 4,
      price: 2000000,
      imageLink: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 3,
      name: "Kosan Bli Ary",
      location: "Bali",
      roomAvailable : 3,
      price: 2500000,
      imageLink: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ]
  
  const generateId = () => {
    const lastHouse = houses[houses.length - 1];
    
    if (!lastHouse) {
        return 1;
    }
    
    return lastHouse.id !== undefined ? lastHouse.id + 1 : 1;
}

  server.get('/api/houses', (req, res)=> {
    res.send(houses)
  })

  server.post('/api/houses', (req, res)=>{
    const newHouse = req.body;
    newHouse.id = generateId();
    houses.push(newHouse);
    res.status(201).send();
  })

  server.put('/api/houses/:id', (req, res)=>{
    const {id} = req.params;
  
    const updatedHouse = req.body;

    const index = houses.findIndex(house => house.id === +id);
    if (index === -1) {
        res.status(404).send('House not found');
    }else{
      houses[index] = { ...houses[index], ...updatedHouse };
      res.status(200).send();
    }

  });

  server.delete('/api/houses/:id', (req, res)=>{
    const {id} = req.params;
    const index = houses.findIndex(house => house.id === +id);
    if (index === -1) {
        res.status(404).send('House not found');
    }else{
      houses.splice(index, 1);
      res.status(204).send();
    }

  });

  




  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}



function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
