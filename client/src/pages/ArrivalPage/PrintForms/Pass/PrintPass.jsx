import { useState, useRef } from "react"
import { Row, Col, Container, Stack, Card } from "react-bootstrap"
import ReactToPrint, { PrintButton } from 'printForms/Pass/ReactToPrint'
import useHttp from "hooks/useHttp"
import { formatDate } from "utils/common"

const styles = {
  fontSize: '12px'
}

const PrintPass = ({ moveId }) => {

  const [contentReady, setContentReady] = useState(false)
  const printParams = useRef({})

  const { request, loading } = useHttp(false, 1000)

  const clickHandler = async () => {
    if (!moveId) {
      return
    }
    setContentReady(false)
    const data = await request(`vehicleMoves/getCheckoutPassPrintData?vehicleMoveId=${moveId}`)
    setContentReady(true)
    printParams.current = data
  }

  return (
    <>
      {
        contentReady ?
          <ReactToPrint title='Печать пропуска'
            contentReady={contentReady}
            onPrintFinished={() => setContentReady(false)}

          >
            <Container fluid style={styles}>
              <Form isFirst={true} params={printParams.current} />
              <hr style={{ borderTop: 'dotted 3px black' }} />
              <Form isFirst={false} params={printParams.current} />
            </Container>
          </ReactToPrint>
          :
          null
      }

      <PrintButton clickHandler={clickHandler} title='Печать пропуска' loading={loading} disabled={!moveId} />
    </>
  )
}

const Form = ({ isFirst, params }) => {

  const vehicleDetails = params?.vm?.vehicleDetails?.filter(item => item.moveKind === 0) || []

  const truck = vehicleDetails.find(item => item.vehicleType.progName === 'truck')
  const trailer = vehicleDetails.find(item => item.vehicleType.progName === 'trailer')
  const container = vehicleDetails.find(item => item.vehicleType.progName === 'container')

  const photos = params?.photos || []

  return (

    <Row className="mt-4">
      <Col xs={1} style={{ fontSize: '10px', position: 'relative' }}>

        {
          !isFirst
          &&
          <div
            style={{ writingMode: 'vertical-rl', position: 'absolute', top: 20, left: 0, bottom: 20, transform: 'rotate(180deg)' }}
            className='text-center'
          >
            Після в'їзду на терріторію терміналу Ви забов'язані, не пізніше ніж 3 години, звернутися з усіма документами на товар в кімнату №______та подати ці документи уповноваженій посадовій особі митниці. У разі порушення встановленого терміну Вас буде притягнуто до адміністративної відповідальності за Митним кодексом України.
            <br /> <span style={{ lineHeight: 1, fontSize: 8 }}> <b>Ознайомлений:________________________</b> </span>
          </div>
        }

      </Col>

      <Col xs={11} className='border border-dark'>

        <Row>
          <Col xs={9}>
            <div className='text-center'>
              <b>РАЗОВА ПЕРЕПУСТКА № {params?.vm?.ticket}</b>
              <p>для в'їзду на територію <span className="text-decoration-underline">{params?.customZone?.value}</span></p>
            </div>
            <Stack direction="horizontal" gap={3} >
              <b>Автомобіль марки:&nbsp;</b>
              <Stack direction="vertical">
                <span style={{ position: 'relative', top: 15 }}>{params?.vm?.brand?.name}</span>
                <hr />
                <span style={{ position: 'relative', bottom: 15, fontSize: '12px' }}>(вказується марка автомобіля)</span>
              </Stack>

              <Stack direction="vertical">
                <span style={{ position: 'relative', top: 15 }}>{truck?.number}</span>
                <hr />
                <span style={{ position: 'relative', bottom: 15, fontSize: '12px' }}>№(тягача)</span>
              </Stack>
              <Stack direction="vertical">
                <span style={{ position: 'relative', top: 15 }}>{trailer?.number}</span>
                <hr />
                <span style={{ position: 'relative', bottom: 15, fontSize: '12px' }}>№(причепу)</span>
              </Stack>
            </Stack>

            <Stack direction="horizontal" gap={3} >
              <b>Контейнер:&nbsp;</b>
              <Stack direction="vertical">
                <span style={{ position: 'relative', top: 15 }}>{container?.number}</span>
                <hr className="w-50" />
                <span style={{ position: 'relative', bottom: 15, fontSize: '12px' }}>(в разі наявності вказується номер контейнера)</span>
              </Stack>
            </Stack>

            <Stack direction="horizontal" gap={3} style={{ height: '50px' }}>
              <b>Вага:&nbsp;</b>
              <Stack direction="vertical">
                <span style={{ position: 'relative', top: 15 }}>{params?.vm?.weightIn}</span>
                <Stack direction="horizontal">
                  <hr className="w-25" />
                  &nbsp;<span style={{ position: 'relative', bottom: 5 }}>кг.</span>
                </Stack>
                <span style={{ position: 'relative', bottom: 15, fontSize: '12px' }}>(вказується вага автомобіля з причепом)</span>
              </Stack>
            </Stack>

            <Stack direction="horizontal" gap={3} >
              <b>Водій:&nbsp;</b>
              <Stack direction="vertical">
                <span style={{ position: 'relative', top: 15 }}>{params?.vm?.driver?.fullName}</span>
                <hr className="w-50" />
                <span style={{ position: 'relative', bottom: 15, fontSize: '12px' }}>(вказується прізвище та ініціали водія)</span>
              </Stack>
            </Stack>

            Вище вказаний транспортний засіб (контейнер) зареєстрував та пропустив на територію місця прибуття диспетчер:
            <Stack direction="horizontal" gap={3}>
              <Stack direction="vertical">
                <span className="ml-4" style={{ position: 'relative', top: 15 }}>{params?.vm?.userIn?.fullName}</span>
                <hr className="w-75" />
                <span style={{ position: 'relative', bottom: 15, fontSize: '12px' }}>(П.І.Б., підпис)</span>
              </Stack>
              <Stack direction="horizontal" gap={3} className='w-50'>
                <span className="text-center">М.П.</span>
              </Stack>
            </Stack>

          </Col>

          <Col xs={3} className='text-center'>
            <span className="text-decoration-underline">
              {
                isFirst
                  ?
                  <>Частина для митниці</>
                  :
                  <>Частина для власника території</>
              }
            </span>

            {
              photos.map(url => (
                <Card className="mt-2" key={url}>
                  <Card.Img variant="top" src={`${process.env.REACT_APP_SERVER}/${url}`} height='140px' width='140px' />
                </Card>
              ))
            }
          </Col>

        </Row>


        <Row>
          <Col>
            Відмітки митниці:<br />
            Документи на товар подані:_________годин_________хвилин

            <Stack direction="horizontal">

              <div className='w-50 p-3 border border-secondary'>
                Місце штампу <br />
                ПМК
              </div>

              <div className='w-50 p-1'>
                Дата прибуття: <br />
                <b>{formatDate(params?.vm?.dateIn)}</b><br />
                Стоянка: {params?.vm?.parking?.name}
              </div>

              <div className='w-50 border border-secondary p-4'>
                Штрихкод
              </div>

            </Stack>
          </Col>
        </Row>
      </Col>
    </Row>)
}

export default PrintPass