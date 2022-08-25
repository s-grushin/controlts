import React, { useCallback, useEffect } from 'react'
import { Card, Form, Spinner } from 'react-bootstrap'
import useCreateUpdate from '../../../hooks/useCreateUpdate'
import useInputChange from '../../../hooks/useInputChange'
import { createModel, updateModel, getModel, getBrand } from '../../../api/backend/vehiclesApi'
import Entity from '../../Entity/Entity'
import { useSearchParams } from 'react-router-dom'
import useHttp from '../../../hooks/useHttp'

const CreateUpdateModel = ({ isUpdateMode }) => {

    const initState = { brandId: '', brandName: '', name: '', weight: 0, isTruck: false }
    const [formData, setFormData, isLoading, saveAndCloseHandler, isSaving, error] = useCreateUpdate(initState, isUpdateMode, createModel, updateModel, getModel, onMountHandler)
    const [inputChangeHandler] = useInputChange(formData, setFormData)
    const [urlParams] = useSearchParams()
    const { request, loading: requestLoading, error: requestError } = useHttp()

    function onMountHandler(_formData) {
        setFormData({ ..._formData, brandName: _formData.brand.name })
    }


    useEffect(() => {

        const fetchBrand = async () => {
            const brandId = urlParams.get('brandid');
            const brand = await request(() => getBrand(brandId))
            setFormData({ ...formData, brandId, brandName: brand.name })
        }

        if (!isUpdateMode) {
            fetchBrand()
        }

    }, [])



    const createContext = () => {
        return {
            state: {
                isLoading,
                isSaving,
                error,
            },
            handlers: {
                saveAndCloseHandler
            }
        }
    }

    return (
        <>
            {
                error || requestError ? error || requestError :
                    requestLoading || isLoading ? <Spinner animation="border" variant="primary" /> :
                        <>
                            < Entity context={createContext()} >
                                <Card className='mt-2'>
                                    <Card.Body>
                                        <Form>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Марка ТС</Form.Label>
                                                <Form.Control size='sm' type="text" onChange={inputChangeHandler}
                                                    placeholder="Наименование марки ТС"
                                                    name="brandName"
                                                    value={formData.brandName}
                                                    disabled={true}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Наименование модели</Form.Label>
                                                <Form.Control size='sm' type="text" onChange={inputChangeHandler}
                                                    placeholder="Наименование модели"
                                                    name="name"
                                                    value={formData.name} />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Грузоподъемность</Form.Label>
                                                <Form.Control size='sm' type="number" onChange={inputChangeHandler}
                                                    placeholder="Грузоподъемность"
                                                    name="weight"
                                                    value={formData.weight} />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Check label='Грузовой' name='isTruck'
                                                    defaultChecked={formData.isTruck}
                                                    onChange={inputChangeHandler}
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Entity >
                        </>
            }
        </>
    )

}

export default CreateUpdateModel