import './resizable.css'
import { useEffect, useState } from 'react'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'

interface ResizableProps {
  direction: 'horizontal' | 'vertical'
  children?: React.ReactNode
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps
  const [innerHeight, setInnerHeight] = useState(window.innerHeight)
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [width, setWidth] = useState(window.innerWidth * 0.75)

  useEffect(() => {
    const resizeErrorListener = (e: ErrorEvent) => {
      //   prettier-ignore
      if (e.message ==="ResizeObserver loop completed with undelivered notifications.") {
              const resizeObserverErrDiv = document.getElementById("webpack-dev-server-client-overlay-div");
              const resizeObserverErr = document.getElementById("webpack-dev-server-client-overlay");
              if (resizeObserverErr) {
                resizeObserverErr.setAttribute("style", "display: none");
              }
              if (resizeObserverErrDiv) {
                resizeObserverErrDiv.setAttribute("style", "display: none");
              }
            }
    }
    window.addEventListener('error', resizeErrorListener)

    return () => window.removeEventListener('error', resizeErrorListener)
  }, [])

  useEffect(() => {
    let timer: any
    const listener = () => {
      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight)
        setInnerWidth(window.innerWidth)
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75)
        }
      }, 100)
    }
    window.addEventListener('resize', listener)

    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [width])

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width,
      resizeHandles: ['e'],
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      onResizeStop: (event, data) => {
        console.log(data.size.width)
        setWidth(data.size.width)
      },
    }
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 24],
    }
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>
}

export default Resizable
