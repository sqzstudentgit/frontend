import React from 'react';
import { Descriptions } from 'antd';

/**
 * This component is responsible for displaying the product parameters for a 
 * given HolyOake product 3D model. It will be wrapped within an Ant Design modal.
 * 
 * @param {object} metadata 3D model metadata retrieved from the /api/metadata/get endpoint 
 */
const ModelMetadata = ({ metadata }) => {
  return (
    <Descriptions bordered size="small" layout="horizontal" column={3}>
      {Object.entries(metadata).map(([param, value]) => {
          return (
            <Descriptions.Item key={param} label={param.replace(/##[\w]*/g, "")}>
              {value}
            </Descriptions.Item>
          )
        })
      }
    </Descriptions>
  )
}

export default ModelMetadata;