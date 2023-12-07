import './cell-list.css'
import { Fragment, useEffect } from 'react'
import { useTypedSelector as useSelector } from '../hooks/use-typed-selector'
import CellListItem from './cell-list-item'
import AddCell from './add-cell'
import { useActions } from '../hooks/use-actions'

const CellList: React.FC = () => {
  const cells = useSelector(({ cells: { order, data } }) => {
    return order.map((id) => {
      return data[id]
    })
  })
  const { fetchCells, saveCells } = useActions()

  useEffect(() => {
    fetchCells()
  }, [])

  // useEffect(() => {
  //   saveCells()
  // }, [JSON.stringify(cells)])

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
