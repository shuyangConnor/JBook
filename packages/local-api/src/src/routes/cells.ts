import express from 'express'
import fs from 'fs'
import path = require('path')

interface Cell {
  id: string,
  content: string,
  type: 'text' | 'code'
}

interface LocalApiError {
  code: string;
}

export const createCellsRouter = (filename: string, dir: string)=> {
  const router = express.Router()
  router.use(express.json());

  const fullPath = path.join(dir, filename)

router.get('/cells', (req,res)=>{
  const isLocalApiError = (err: any): err is LocalApiError => {
    return typeof err.code === "string";
  };
  try {
  // Read the file
    const result = fs.readFileSync(fullPath, { encoding: 'utf-8' });
    res.send(JSON.parse(result))
  } catch (err) {
    if (isLocalApiError(err)) {
      if (err.code === "ENOENT") {
        fs.writeFileSync(fullPath, "[]", "utf-8");
        res.send([]);
      }
    } else {
      throw err;
    }
  }
})

router.post('/cells', (req,res)=> {
  // Take the list of cells from the request obj
  // Serialize them
  const { cells }: {cells: Cell[]} = req.body

  // Write the cells into the file
  fs.writeFileSync(fullPath, JSON.stringify(cells), 'utf-8')

  res.send({status: 'success'})
})

return router
}
