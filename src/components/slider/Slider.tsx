import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import {
	A11y,
	Autoplay,
	Navigation,
	Pagination,
	Scrollbar,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { SlideItem } from '../../types/slide-item'
import './Slider.scss'

type PropsType = {
	items: SlideItem[]
}

const Slider = ({ items }: PropsType) => {
	return (
		<Swiper
			className='swiper-wrapper'
			modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
			spaceBetween={50}
			centeredSlides={true}
			slidesPerView={1}
			loop={true}
			autoplay={{
				delay: 2000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			}}
			navigation={{
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			}}
			pagination={{ clickable: true }}
			scrollbar={{ draggable: true }}>
			{items.map((item, index) => (
				<SwiperSlide key={index}>
					<Link
						to={`product/${item.productId}`}
						className='swiper-image-wrapper'>
						<span
							style={{
								backgroundImage: `url("${item.image}")`,
								backgroundSize: 'cover',
								backgroundRepeat: 'no-repeat',
								backgroundPosition: 'center',
							}}
							className='swiper-image-blur'></span>
						<img
							className='swiper-image'
							alt='Slide'
							src={item.image}
						/>
					</Link>
				</SwiperSlide>
			))}
			<div className='slider-controller'>
				<div className='swiper-button-prev slider-arrow'>
					<IoIosArrowBack />
				</div>
				<div className='swiper-button-next slider-arrow'>
					<IoIosArrowForward />
				</div>
				<div className='swiper-pagination'></div>
			</div>
		</Swiper>
	)
}

export default Slider
