import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState,useEffect } from 'react'
import { Col, Row, Form,Modal } from 'react-bootstrap'
import { CardLayout } from '../../components/cards'
import { Box, Button } from '../../components/elements'
import IconSearchBar from '../../components/elements/IconSearchBar'
import { LabelField } from '../../components/fields'
import CalenderField from '../../components/fields/CalenderField'
import CusField from '../../components/fields/CusField'
import MultiSelectField from '../../components/fields/MultiSelectField'
import MultiSelectNoLabel from '../../components/fields/MultiSelectNoLabel'
import PageLayout from '../../layouts/PageLayout'
import axiosInstance from '../../api/baseUrl'; // Replace with the actual path

export default function SuppliesCreate() {
    const [isChecked, setIsChecked] = useState(false);
    const [AddOpen, setAddClose] = useState(false)
    const [showIng, setShowIng] = useState(false);
    
    const [show, setShow] = useState(false);

    const handleCloseGoods = () => setShow(false);
    const handleShowGoods = () => setShow(true);
    const handleCloseIng = () => setShowIng(false);
    const handleShowIng = () => setShowIng(true);

    const handleAdd = () => {
        setAddClose(!AddOpen)
    }

    useEffect(() => {
        console.log("we are here in create supplies")
        // Fetch supply data using axiosInstance when the component mounts
        // axiosInstance.get(`/md_supplies/${id}`)
        //   .then(response => {
        //     setSupplyData(response.data);
        //   })
        //   .catch(error => {
        //     console.error('Error fetching supply data', error);
        //   });
      });

    const handleSwitchToggle = () => {
        setIsChecked(!isChecked);
    };
    return (
        <div>
            <PageLayout>
                <Row>
                    <Col md={12}>
        
                            Supplies Create
                
                    </Col>
                    <Col md={12}>
    
                            <Row>
                                <Col md={8}>
                                    <Row>
                                        <Col md={6} >
                                            <MultiSelectField />
                                        </Col>
                                        <Col md={6} >
                                            <MultiSelectField />
                                        </Col>
                                        <Col md={6} className='cus-col-mt'>
                                            <MultiSelectField />
                                        </Col>
                                        <Col md={6} className='cus-col-mt'>
                                            <MultiSelectField />
                                        </Col>
                                        <Col md={6} className='cus-col-mt'>
                                            <CalenderField label={'Balance '}/>
                                        </Col>
                                        <Col md={6} className='cus-col-mt mfield'>
                                            <MultiSelectField />
                                        </Col>
                                        <Col md={6} className='cus-col-mt wfield'>
                                            <LabelField type={'number'} placeholder='0' label={'Invoice Number'} />
                                        </Col>
                                        <Col md={6} className='cus-col-mt wfield'>
                                            <LabelField type={'text'} placeholder='Description' label={'Description'} />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Box className={'product-add-box'}>
                                        <Box className={'product'}> Product</Box>
                                        <Box className={'Unit'}> Unit</Box>
                                        <Box className={'Qty'}> Qty</Box>
                                        <Box className={'Cost'}> Cost</Box>
                                        <Box className={'Discount'}> Discount (%)</Box>
                                        <Box className={'Tax'}> Tax (%)</Box>
                                        <Box className={'Total'}> Total</Box>
                                        <Box className={'Xmark'}>  </Box>
                                    </Box>
                                    <Box className={'product-add-boxes'}>
                                        <Box className={'product mfield'}> <MultiSelectNoLabel /></Box>
                                        <Box className={'Unit mfield'}> <MultiSelectNoLabel /></Box>
                                        <Box className={'Qty mfield '}> <CusField placeholder={'0'} type='number' /> </Box>
                                        <Box className={'Cost mfield'}> <CusField placeholder={'0'} type='number' /></Box>
                                        <Box className={'Discount mfield'}> <CusField placeholder={'Discount (%)'} type='number' /> </Box>
                                        <Box className={'Tax mfield'}> <CusField placeholder={'Tax (%)'} type='number' /></Box>
                                        <Box className={'Total mfield'}> <CusField placeholder={'0'} type='number' /></Box>
                                        <Box className={'Xmark mfield'}> <FontAwesomeIcon icon={faXmark} /> </Box>
                                    </Box>

                                </Col>
                                <Col md={12}>
                                    <Box className={'sc-box-main'}>
                                        <Box className={'sc-btn-box'}>
                                            <Button onClick={handleAdd} className='sc-add-btn'><FontAwesomeIcon icon={faPlus} /> Add</Button>
                                            {AddOpen ?

                                                <Box className={'sc-multiSelect-wrapper'}>
                                                    <Box className={'sc-multiSelect'}>
                                                        <Box className={'sc-iconSearch'}>
                                                            <IconSearchBar />
                                                        </Box>
                                                        <Box className={'sc-multiSelect-p'}>
                                                            <Box className={'sc-multiSelect-ingredients sc-multiSelect-w25'}>
                                                                Ingredient
                                                                <Box className={'sc-multiSelect-ingredients-c'}>
                                                                    <Box className={'sc-multiSelect-ingredients-c'}>
                                                                        <Box className={'sc-item-box'}>
                                                                            <Box className='lt-box'>
                                                                                <span className='lt-span'>AL Bread</span>
                                                                            </Box>
                                                                            <Box className='rt-items-quan-box'>
                                                                                <span className='rt-span-items-quan'>200 pcs</span>
                                                                            </Box>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <Box className='lt-box'>
                                                                                <span className='lt-span'>AL Bread</span>
                                                                            </Box>
                                                                            <Box className='rt-items-quan-box'>
                                                                                <span className='rt-span-items-quan'>200 pcs</span>
                                                                            </Box>
                                                                        </Box><Box className={'sc-item-box'}>
                                                                            <Box className='lt-box'>
                                                                                <span className='lt-span'>AL Bread</span>
                                                                            </Box>
                                                                            <Box className='rt-items-quan-box'>
                                                                                <span className='rt-span-items-quan'>200 pcs</span>
                                                                            </Box>
                                                                        </Box><Box className={'sc-item-box'}>
                                                                            <Box className='lt-box'>
                                                                                <span className='lt-span'>AL Bread</span>
                                                                            </Box>
                                                                            <Box className='rt-items-quan-box'>
                                                                                <span className='rt-span-items-quan'>200 pcs</span>
                                                                            </Box>
                                                                        </Box><Box className={'sc-item-box'}>
                                                                            <Box className='lt-box'>
                                                                                <span className='lt-span'>AL Bread</span>
                                                                            </Box>
                                                                            <Box className='rt-items-quan-box'>
                                                                                <span className='rt-span-items-quan'>200 pcs</span>
                                                                            </Box>
                                                                        </Box><Box className={'sc-item-box'}>
                                                                            <Box className='lt-box'>
                                                                                <span className='lt-span'>AL Bread</span>
                                                                            </Box>
                                                                            <Box className='rt-items-quan-box'>
                                                                                <span className='rt-span-items-quan'>200 pcs</span>
                                                                            </Box>
                                                                        </Box><Box className={'sc-item-box'}>
                                                                            <Box className='lt-box'>
                                                                                <span className='lt-span'>AL Bread</span>
                                                                            </Box>
                                                                            <Box className='rt-items-quan-box'>
                                                                                <span className='rt-span-items-quan'>200 pcs</span>
                                                                            </Box>
                                                                        </Box><Box className={'sc-item-box'}>
                                                                            <Box className='lt-box'>
                                                                                <span className='lt-span'>AL Bread</span>
                                                                            </Box>
                                                                            <Box className='rt-items-quan-box'>
                                                                                <span className='rt-span-items-quan'>200 pcs</span>
                                                                            </Box>
                                                                        </Box><Box className={'sc-item-box'}>
                                                                            <Box className='lt-box'>
                                                                                <span className='lt-span'>AL Bread</span>
                                                                            </Box>
                                                                            <Box className='rt-items-quan-box'>
                                                                                <span className='rt-span-items-quan'>200 pcs</span>
                                                                            </Box>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                            <Box className={'sc-multiSelect-goods sc-multiSelect-w25'}>
                                                                Goods
                                                                <Box className={'sc-multiSelect-ingredients-c'}>
                                                                    <Box className={'sc-multiSelect-ingredients-c'}>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                            <Box className={'sc-multiSelect-preparation sc-multiSelect-w25'}>
                                                                Preparation
                                                                <Box className={'sc-multiSelect-ingredients-c'}>
                                                                    <Box className={'sc-multiSelect-ingredients-c'}>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                            <Box className={'sc-multiSelect-dish sc-multiSelect-w25 br-r-none'}>
                                                                Dish
                                                                <Box className={'sc-multiSelect-ingredients-c'}>
                                                                    <Box className={'sc-multiSelect-ingredients-c'}>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                        <Box className={'sc-item-box'}>
                                                                            <span>Text</span>
                                                                            <span>Text</span>
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                        <Box className={'sc-btn-box-more'}>

                                                            <Box className={'lf-btns'}>
                                                                <Button onClick={handleShowGoods} className={'lf-btns-btn'}>Create Goods</Button>
                                                               
                                                                <Modal show={show} className={'goods-cre-model-wrapper'} onHide={handleCloseGoods}>
                                                                    <Modal.Header closeButton>
                                                                        <Modal.Title>Create Goods</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Box className={'cre-goods-body-wrap'}>
                                                                    <Modal.Body>
                                                                        <Row>
                                                                            <Col md={12}>
                                                                                <CusField type={'text'} placeholder='Name'/>
                                                                            </Col>
                                                                            <Col md={12}>
                                                                                <MultiSelectNoLabel/>
                                                                            </Col>
                                                                            <Col md={12}>
                                                                                <MultiSelectNoLabel/>
                                                                            </Col>
                                                                        </Row>
                                                                    </Modal.Body>
                                                                    </Box>
                                                                    <Modal.Footer className='model-footer'>
                                                                    <Button className={'model-f-btn'}  onClick={handleCloseGoods}>
                                                                            Save Changes
                                                                        </Button>
                                                                        <Button className={' model-f-btn '}  onClick={handleCloseGoods}>
                                                                            Close
                                                                        </Button>
                                                                        
                                                                    </Modal.Footer>
                                                                </Modal>
                                                                <Button onClick={handleShowIng} className={'lf-btns-btn'}>Create Ingredients</Button>
                                                                <Modal show={showIng} className={'goods-cre-model-wrapper'} onHide={handleCloseIng}>
                                                                    <Modal.Header closeButton>
                                                                        <Modal.Title>Create Ingredients</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Box className={'cre-goods-body-wrap'}>
                                                                    <Modal.Body>
                                                                        <Row>
                                                                            <Col md={12}>
                                                                                <CusField type={'text'} placeholder='Name'/>
                                                                            </Col>
                                                                            
                                                                        </Row>
                                                                    </Modal.Body>
                                                                    </Box>
                                                                    <Modal.Footer className='model-footer'>
                                                                    <Button className={'model-f-btn'}  onClick={handleCloseIng}>
                                                                            Save Changes
                                                                        </Button>
                                                                        <Button className={' model-f-btn '}  onClick={handleCloseIng}>
                                                                            Close
                                                                        </Button>
                                                                        
                                                                    </Modal.Footer>
                                                                </Modal>
                                                            </Box>
                                                            <Box className={'rt-btns'}>
                                                                <Box className={'rt-btns-box'}>
                                                                    <Button className={'rt-btns-btn'}>Select All</Button>
                                                                    <Button className={'rt-btns-btn cus-bg-color-sec'}>Save (0 / 500)</Button>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                : ""}
                                        </Box>
                                        <Box className={'sc-switch-box'}>

                                            <Form.Check
                                                type="switch"

                                                id="custom-switch"
                                                // label="Barcode"
                                                checked={isChecked}
                                                onChange={handleSwitchToggle}

                                            />
                                        </Box>
                                        <Box className={'sc-total-box'}>
                                            00.00 SAR
                                        </Box>
                                    </Box>
                                </Col>

                            </Row>
                        
                    </Col>
                </Row>
            </PageLayout>
        </div>
    )
}
