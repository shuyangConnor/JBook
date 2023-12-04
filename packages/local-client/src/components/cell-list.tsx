import './cell-list.css'
import { Fragment } from 'react'
import { useTypedSelector as useSelector } from '../hooks/use-typed-selector'
import CellListItem from './cell-list-item'
import AddCell from './add-cell'

const CellList: React.FC = () => {
  const cells = useSelector(({ cells: { order, data } }) => {
    return order.map((id) => {
      return data[id]
    })
  })

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell}></CellListItem>
      <AddCell previousCellId={cell.id}></AddCell>
    </Fragment>
  ))

  return (
    <div className="cell-list">
      <AddCell
        forceVisible={cells.length === 0}
        previousCellId={null}></AddCell>
      {renderedCells}
    </div>
  )
}

export default CellList
