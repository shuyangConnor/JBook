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
          fs.writeFileSync(fullPath, JSON.stringify([{"content":"# JSNote-Connor\n\nThis is an interactive coding environment. You can write Javascript, see it executed, and write comprehensive documentation using markdown.\n\n- Click any text cell (**including this one**) to edit it\n- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell!\n- You can show any React component, string, number, or anything else by calling the `show` function. This is a function built into this environment. Call show multiple times to show multiple values\n- Re-order or delete cells using the buttons on the top right\n- Add new cells by hovering on the divider between each cell\n \nAll of your changes get saved to the file you opened JBook with. So if you ran `npx jsnote-connor serve test.js`, all of the text and code you write will be saved to the `test.js` file.","type":"text","id":"59tfp"},{"content":"import { useState } from 'react';\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setCount(count + 1)}>Click</button>\n      <h3>Count: {count}</h3>\n    </div>\n  );\n};\n\n// Display any variable or React Component by calling 'show'\nshow(<Counter />);","type":"code","id":"m5z99"},{"content":"const App = () => {\n  return (\n    <div>\n      <h3>App Says Hi!</h3>\n      <i>Counter component will be rendered below...</i>\n      <hr />\n      {/* \n        Counter was declared in an earlier cell - \n        we can reference it here! \n      */}\n      <Counter />\n    </div>\n  );\n};\n\nshow(<App />);","type":"code","id":"6z4xh"}]), "utf-8");
          res.send(JSON.stringify([{"content":"# JSNote-Connor\n\nThis is an interactive coding environment. You can write Javascript, see it executed, and write comprehensive documentation using markdown.\n\n- Click any text cell (**including this one**) to edit it\n- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell!\n- You can show any React component, string, number, or anything else by calling the `show` function. This is a function built into this environment. Call show multiple times to show multiple values\n- Re-order or delete cells using the buttons on the top right\n- Add new cells by hovering on the divider between each cell\n \nAll of your changes get saved to the file you opened JBook with. So if you ran `npx jsnote-connor serve test.js`, all of the text and code you write will be saved to the `test.js` file.","type":"text","id":"59tfp"},{"content":"import { useState } from 'react';\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setCount(count + 1)}>Click</button>\n      <h3>Count: {count}</h3>\n    </div>\n  );\n};\n\n// Display any variable or React Component by calling 'show'\nshow(<Counter />);","type":"code","id":"m5z99"},{"content":"const App = () => {\n  return (\n    <div>\n      <h3>App Says Hi!</h3>\n      <i>Counter component will be rendered below...</i>\n      <hr />\n      {/* \n        Counter was declared in an earlier cell - \n        we can reference it here! \n      */}\n      <Counter />\n    </div>\n  );\n};\n\nshow(<App />);","type":"code","id":"6z4xh"}]));
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
