import React from 'react';
import { color } from '../../constant/Color';
import { DotLoader } from 'react-spinners';

const DotLoaderCustom = () => {
    return (
        <div className="screen-center">
            <DotLoader
                color={color.purple}
                loading={true}
                size={50}
                //display center
                css={
                    'display: flex !important; ' +
                    'justify-content: center !important; ' +
                    'align-items: center !important; ' +
                    'height: 100vh !important; ' +
                    'width: 100% !important;'
                }
            />
        </div>
    );
};

export default DotLoaderCustom;
