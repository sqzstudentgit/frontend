import React, { useState } from 'react';


import { withRouter } from 'react-router-dom';

// Components
import NavigationBar from '../components/navigation_bar';


// Ant design crap

import { Card, PageHeader, Row, Col, Input } from 'antd';

// Stats from antd
import { Statistic, Button, Table } from 'antd';

import { BarcodeOutlined, CloseOutlined } from '@ant-design/icons';


import { Typography } from 'antd';

const { Title, Text } = Typography;

import { InputNumber, Space, Descriptions, Divider } from 'antd';


// 3D Image Renderer
import { ThreeDModelPresenter } from '../components/3DModel/ThreeDModelPresenter';




function OrderPage(props) {

  const productDataSource = {
    "": "CFP - 600/12 Swirl Diffusers  with  Low Profile Plenum 250 Spigot",
    "URL##OTHER##": "http://www.holyoake.com",
    "Type Comments##OTHER##": " Holyoake Swirl Diffuser CFP-600/12 c/w Low Profile Plenum.",
    "Static Pressure Min##OTHER##": "2 Pa",
    "Static Pressure Max##OTHER##": "28 Pa",
    "Noise Level NC Min##OTHER##": "5 NC",
    "Noise Level NC Max##OTHER##": "32NC",
    "Model##OTHER##": "CFP-600/12 Low Profile complete with low profile plenum.",
    "Min Flow##HVAC_AIR_FLOW##LITERS_PER_SECOND": "25.000000000000",
    "Max Flow##HVAC_AIR_FLOW##LITERS_PER_SECOND": "200.000000000000",
    "Material Body##OTHER##": "Holyoake-Aluminium",
    "Material - Face##OTHER##": "Holyoake White",
    "Manufacturer##OTHER##": "Holyoake",
    "d_r##LENGTH##MILLIMETERS": "125.000000000000",
    "Inlet Spigot Diameter##LENGTH##MILLIMETERS": "250.000000000000",
    "Plenum Box Height##LENGTH##MILLIMETERS": "250.000000000000",
    "Holyoake Product Range##OTHER##": "Holyoake Swirl Diffusers.",
    "Flow Nom##HVAC_AIR_FLOW##LITERS_PER_SECOND": "112.500000000000",
    "Diffuser Width##LENGTH##MILLIMETERS": "595.000000000000",
    "Plenum Box Width##LENGTH##MILLIMETERS": "570.000000000000",
    "Description##OTHER##": " Radial Swirl Diffusers, Ceiling Fixed Pattern shall be Holyoake Model CFP-600/12.  Ceiling Radial Swirl Diffusers shall be designed for use in Variable Air Volume (VAV) systems with Highly Turbulent Radial  Air Flow Pattern and shall be suitable for ceiling heights of 2.4 to 4m. Ceiling Radial Swirl Diffusers shall maintain a COANDA effect at reduced air volumes and provide uniform temperature gradients throughout the occupied space. Diffusers shall be finished in powder coat and fitted with accessories and dampers where indicated as manufactured by Holyoake"
  }

  return (
    <div>
      <NavigationBar />

      {/* Upper sticky cart card */}
      <Row justify="center" gutter={[32, 32]}>
        <Col span={18}>
          <Card>
            <Row>
              <Col span={8}>
                <Title level={4}>Add Product</Title>
                <Input placeholder="Enter barcode" prefix={<BarcodeOutlined />} />
                <Button style={{ marginTop: 16 }} type="secondary">Scan</Button>
              </Col>
              <Col span={8} offset={8}>
                <Row>
                  <Col span={12}>
                    <Statistic 
                      title="Total Price (AUD)" value={50.50} prefix="$" precision={2} />
                  </Col>
                  <Col span={12}>
                    <Statistic title="GST" value={11} prefix="$" precision={2} />
                    <Button style={{ marginTop: 16 }} type="primary">
                      Checkout
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>




      {/* Note: use Space component for spacing b/w product cards */}

      <Row justify="center" gutter={[32, 32]}>
        <Col span={18}>
          <Card hoverable={true} extra={<Button type="danger" shape="circle" icon={<CloseOutlined />} />}>
            <Row>

              {/* 3D Images */}
              <Col span={12}>
                For images
              </Col>

              {/* Product details */}
              <Col span={6} offset={6}>
                <Title level={5}>Product ID</Title><Text>123456</Text>
                <Title level={5}>Product Name</Title><Text>CFP Radial Blade Swirl</Text>
                <Title level={5}>Price</Title><Text>$25.55</Text>
                <Divider />
                
                <Row>
                  <Col span={12}>
                    <Title level={5}>Quantity</Title>
                    <InputNumber min={1} max={100} defaultValue={1} />
                  </Col>
                  <Col span={12}>
                    <Title level={5}>Subtotal</Title>
                    <Statistic value={11} prefix="$" precision={2} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row justify="center">
        <Col span={18}>

        </Col>
      </Row>
      


      {/* Product 3D image metadata */}
      <Row justify="center">
        <Col span={18}>
          <Descriptions title="Product Parameters" bordered size="small" layout="horizontal" column={2}>
            {
              Object.entries(productDataSource).map(([param, value]) => {
                return (
                  <Descriptions.Item label={param.replace(/##[\w]*/g, "")}>
                    {value}
                  </Descriptions.Item>
                ) 
              })
            }
          </Descriptions>
        </Col>
      </Row>


    </div>

  )
}

export default withRouter(OrderPage);