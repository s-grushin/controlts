import { useRef } from "react"
import { useReactToPrint } from 'react-to-print'
import { Row, Col, Container, Stack } from "react-bootstrap"

const styles = {
  fontSize: '12px'
}

const PrintPass = () => {

  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'title',
    onAfterPrint: () => console.log('print success')
  })

  return (
    <>
      <div ref={componentRef} style={{ width: '100%', }}>

        <Container fluid style={styles} className='mt-2'>
          <Row >
            <Col xs={1} style={{ fontSize: '10px', position: 'relative' }}>
              <div
                style={{ writingMode: 'vertical-rl', position: 'absolute', top: 20, left: 0, bottom: 20, transform: 'rotate(180deg)' }}
                className='text-center'
              >
                Після в'їзду на терріторію терміналу Ви забов'язані, не пізніше ніж 3 години, звернутися з усіма документами на товар в кімнату №______та подати ці документи уповноваженій посадовій особі митниці. У разі порушення встановленого терміну Вас буде притягнуто до адміністративної відповідальності за Митним кодексом України.
                <br /> <span style={{ lineHeight: 2, fontSize: 11 }}> <b>Ознайомлений:________________________</b> </span>
              </div>
            </Col>

            <Col xs={11} className='border border-dark'>

              <Row>
                <Col xs={9}>
                  <div className='text-center'>
                    <b>РАЗОВА ПЕРЕПУСТКА № 123885</b>
                    <p>для в'їзду на територію <span className="text-decoration-underline">ВМО №3 Митного поста "Східний"</span></p>
                  </div>
                  <Stack direction="horizontal" gap={3}>
                    <b>Автомобіль марки:&nbsp;</b>
                    <Stack direction="vertical">
                      <span style={{ position: 'relative', top: 15 }}>Fiat</span>
                      <hr />
                      <span style={{ position: 'relative', bottom: 15, fontSize: '12px' }}>(вказується марка автомобіля)</span>
                    </Stack>
                    <Stack direction="vertical">
                      <span style={{ position: 'relative', top: 15 }}>WX3577A</span>
                      <hr />
                      <span style={{ position: 'relative', bottom: 15, fontSize: '12px' }}>№(тягача)</span>
                    </Stack>
                    <Stack direction="vertical">
                      <span style={{ position: 'relative', top: 15 }}>WX3577A</span>
                      <hr />
                      <span style={{ position: 'relative', bottom: 15, fontSize: '12px' }}>№(причепу)</span>
                    </Stack>
                  </Stack>

                  <Stack direction="horizontal" gap={3}>
                    <b>Контейнер:&nbsp;</b>
                    <Stack direction="vertical">
                      <span style={{ position: 'relative', top: 15 }}>АА555ВВ</span>
                      <hr className="w-50" />
                      <span style={{ position: 'relative', bottom: 15, fontSize: '12px' }}>(в разі наявності вказується номер контейнера)</span>
                    </Stack>
                  </Stack>

                  <Stack direction="horizontal" gap={3}>
                    <b>Вага:&nbsp;</b>
                    <Stack direction="vertical">
                      <span style={{ position: 'relative', top: 15 }}>45500</span>
                      <Stack direction="horizontal">
                        <hr className="w-25" />
                        &nbsp;<span style={{ position: 'relative', bottom: 5 }}>кг.</span>
                      </Stack>
                      <span style={{ position: 'relative', bottom: 15, fontSize: '12px' }}>(вказується вага автомобіля з причепом)</span>
                    </Stack>
                  </Stack>

                  <Stack direction="horizontal" gap={3}>
                    <b>Водій:&nbsp;</b>
                    <Stack direction="vertical">
                      <span style={{ position: 'relative', top: 15 }}>Ярмоленко В.І</span>
                      <hr className="w-50" />
                      <span style={{ position: 'relative', bottom: 15, fontSize: '12px' }}>(вказується прізвище та ініціали водія)</span>
                    </Stack>
                  </Stack>

                  Вище вказаний транспортний засіб (контейнер) зареєстрував та пропустив на територію місця прибуття диспетчер:
                  <Stack direction="horizontal" gap={3}>
                    <Stack direction="vertical">
                      <span className="ml-4" style={{ position: 'relative', top: 15 }}>Диспетчер І.Ф</span>
                      <hr className="w-75" />
                      <span style={{ position: 'relative', bottom: 15, fontSize: '12px' }}>(П.І.Б., підпис)</span>
                    </Stack>
                    <Stack direction="horizontal" gap={3} className='w-50'>
                      <span className="text-center">М.П.</span>
                    </Stack>
                  </Stack>



                </Col>

                <Col xs={3} className='text-center'>
                  <span className="text-decoration-underline">Частина для митниці</span>
                </Col>

              </Row>


              <Row>
                <Col>
                  Відмітки митниці:<br />
                  Документи на товар подані:_________годин_________хвилин

                  <Stack direction="horizontal">

                    <div className='w-50 p-4 border border-secondary'>
                      Місце штампу <br />
                      ПМК
                    </div>

                    <div className='w-50 p-2'>
                      Дата прибуття: <br />
                      <b>15.04.2020 11:03</b><br />
                      Стоянка:
                    </div>

                    <div className='w-50 border border-secondary p-3'>
                      Штрихкод
                    </div>

                  </Stack>
                </Col>
              </Row>



            </Col>

          </Row>
        </Container>

      </div >
      <button onClick={handlePrint}>Print pass</button>
    </>
  )
}

export default PrintPass