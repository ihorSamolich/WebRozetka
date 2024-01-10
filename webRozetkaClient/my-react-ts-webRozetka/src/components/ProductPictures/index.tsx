import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules';
import {Flex, Image} from "antd";
import {APP_ENV} from "env/index.ts";
import 'swiper/swiper-bundle.css';

interface IProductPicturesProps{
    photos: string[] | undefined
}

const ProductPictures: React.FC<IProductPicturesProps> = (props) => {
    const {photos} = props;

    return (
        <Swiper
            pagination={{
                dynamicBullets: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
        >
            {photos?.map((photo, index) => (
                <SwiperSlide key={index}>
                    <Flex style={{height: '100%'}} align={"center"} justify={'center'}>
                        <Image
                            height={'300px'}
                            preview={false}
                            src={`${APP_ENV.BASE_URL}images/${photo}`}
                        />
                    </Flex>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ProductPictures;