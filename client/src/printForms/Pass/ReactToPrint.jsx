import { useEffect, useRef } from "react"
import { useReactToPrint } from 'react-to-print'
import Button from "../../components/Button"
import { Printer } from 'react-bootstrap-icons'

const ReactToPrint = ({ children, title, contentReady, onPrintFinished }) => {

  const contentToPrint = useRef()

  const startPrint = useReactToPrint({
    content: () => contentToPrint.current,
    documentTitle: title,
    onAfterPrint: onPrintFinished,
  })

  useEffect(() => {
    if (!contentReady) {
      return
    }

    startPrint()

  }, [contentReady, startPrint])


  return (
    <>
      <div style={{ display: 'none' }}>
        <div ref={contentToPrint} style={{ width: '99%' }}>

          {children}

        </div >
      </div>
    </>
  )
}

export const PrintButton = ({ clickHandler, title, loading }) => {

  return (
    <Button onClick={clickHandler}
      variant='outline-secondary'
      title=''
      loading={loading}
      withSpinner={true}
    >
      <Printer />
      &nbsp;
      {title}
    </Button>
  )
}

ReactToPrint.defaultProps = {
  onClick: () => { }
}

export default ReactToPrint