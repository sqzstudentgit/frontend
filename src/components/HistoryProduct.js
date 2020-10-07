import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

// Ant Design Components
import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Image,
  InputNumber,
  Modal,
  Row,
  Spin,
  Statistic,
  Typography
} from 'antd';

// Ant Design Icons
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  ProfileOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';

// Ant Design Sub-Components
const { Title, Text } = Typography;

// 3D Image Rendering Component
import ThreeDModelPresenter from '../components/3DModel/ThreeDModelPresenter';


const HistoryProduct = ({ history, line }) => {
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const { productCode } = line;

    const fetchProduct = async () => {
      const response = await axios.get('/api/product', {
        params: {
          sessionKey: sessionStorage.getItem('sessionKey'),
          productCode: productCode
        }
      }, {
        headers: { 'Content-Type': 'application/JSON; charset=UTF-8' }
      })
      console.log(response);
      setProduct({ ...response.data.data, ...line });
      setLoading(false);
    }

    try {
      fetchProduct();
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  }, []);



  // const { keyProductId, productName, quantity, totalPrice, productCode } = product;
  const readdButton = <Button icon={<ShoppingCartOutlined />} type="secondary">Add To Cart</Button>

  if (!loading) {
    return (
      <Row justify="center" gutter={[32, 32]}>
        <Col span={24}>
          <Card title={product.productName} style={{ borderRadius: '1.25rem'}} extra={readdButton} loading={loading} hoverable>
            <Row>
              {/* Product image */}
              <Col span={12}>
                <Row justify="center" align="middle">
                  {
                    // If product is PJ SAS, display 2D image, otherwise render HolyOakes 3D image
                    product.barcode ? (
                      <Image
                        width={256}
                        src={product.imageList ? product.imageList.largeImageLocation : null}
                        alt="HolySAS Product"
                        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                      /> 
                    ) : (
                      <Col span={18}>
                        <div style={{ height: 300 }}>
                          {/* TODO: Make modelURL dynamic */}
                          <ThreeDModelPresenter modelUrl="https://holysas-3d-images.s3.amazonaws.com/model1.glb" />
                        </div>
                      </Col>
                    )
                  }
                </Row>
              </Col>

              {/* Product details, specification, quantity and subtotal */}
              <Col span={10} offset={2}>
                <Row gutter={[0, 32]}>
                  <Col span={12}>
                    <Title level={5}>Key Product ID</Title>
                    <Text>{product.keyProductId}</Text>
                  </Col>
                  <Col offset={1}>
                    <Title level={5}>Price (ex GST)</Title>
                    <div style={{ textAlign: 'end' }}>
                      <Text>${Number(product.totalPriceExTax).toFixed(2)}</Text>
                    </div>
                  </Col>
                </Row>

                {!product.barcode ? (
                  <Row gutter={[0, 16]}>
                    <Button type="secondary" onClick={() => setShowModal(true)} icon={<ProfileOutlined />}>
                      Product Specifications
                    </Button>
                  </Row>
                ) : (
                  null
                )}
                <Divider />
                <Row>
                  <Col span={12}>
                    <Title level={5}>Quantity</Title>
                    <Text>{product.quantity}</Text>
                  </Col>
                  <Col>
                    <Title level={5}>Subtotal (ex GST)</Title>
                    <div style={{ textAlign: 'end'}}>
                      <Statistic value={product.totalPrice} prefix="$" precision={2} />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Modal for 3D image parameter data */}
        <Modal 
          title="Product Specifications" 
          visible={showModal}
          centered={true}
          closable={false}
          footer={<Button type="secondary" onClick={() => setShowModal(false)}>Close</Button>}
          style={{ top: 20 }}
          width="80vw"
          maskClosable={true}
        >
          <Descriptions bordered size="small" layout="horizontal" column={2}>
            {Object.entries(productDataSource).map(([param, value]) => {
                return (
                  <Descriptions.Item key={param} label={param.replace(/##[\w]*/g, "")}>
                    {value}
                  </Descriptions.Item>
                )
              })
            }
          </Descriptions>
        </Modal>
      </Row>
    )
  }

  return (
    <Row justify="center">
      <Spin size="large" />
    </Row>
  );
}

// Mock parameter data for products
const productDataSource = {
  "Name": "CFP - 600/12 Swirl Diffusers  with  Low Profile Plenum 250 Spigot",
  "URL##OTHER##": "http://www.holyoake.com",
  "Type Comments##OTHER##": " Holyoake Swirl Diffuser CFP-600/12 c/w Low Profile Plenum.",
  "Static Pressure Min##OTHER##": "2 Pa",
  "Static Pressure Max##OTHER##": "28 Pa",
  "Noise Level NC Min##OTHER##": "5 NC",
  "Noise Level NC Max##OTHER##": "32NC",
  "Model##OTHER##": "CFP-600/12 Low Profile complete with low profile plenum.",
  "Min Flow##HVAC_AIR_FLOW##LITERS_PER_SECOND": "25.00",
  "Max Flow##HVAC_AIR_FLOW##LITERS_PER_SECOND": "200.00",
  "Material Body##OTHER##": "Holyoake-Aluminium",
  "Material - Face##OTHER##": "Holyoake White",
  "Manufacturer##OTHER##": "Holyoake",
  "d_r##LENGTH##MILLIMETERS": "125.00",
  "Inlet Spigot Diameter##LENGTH##MILLIMETERS": "250.00",
  "Plenum Box Height##LENGTH##MILLIMETERS": "250.00",
  "Holyoake Product Range##OTHER##": "Holyoake Swirl Diffusers.",
  "Flow Nom##HVAC_AIR_FLOW##LITERS_PER_SECOND": "112.50",
  "Diffuser Width##LENGTH##MILLIMETERS": "595.00",
  "Plenum Box Width##LENGTH##MILLIMETERS": "570.00",
  "Description##OTHER##": " Radial Swirl Diffusers, Ceiling Fixed Pattern shall be Holyoake Model CFP-600/12.  Ceiling Radial Swirl Diffusers shall be designed for use in Variable Air Volume (VAV) systems with Highly Turbulent Radial  Air Flow Pattern and shall be suitable for ceiling heights of 2.4 to 4m. Ceiling Radial Swirl Diffusers shall maintain a COANDA effect at reduced air volumes and provide uniform temperature gradients throughout the occupied space. Diffusers shall be finished in powder coat and fitted with accessories and dampers where indicated as manufactured by Holyoake"
}


export default withRouter(HistoryProduct);