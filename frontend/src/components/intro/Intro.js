import { Carousel } from 'antd';
import image1 from "../../res/images/slider/7.jpg";
import image2 from "../../res/images/slider/5.jpg";
import image3 from "../../res/images/slider/10.jpg";
import image4 from "../../res/images/slider/8.jpg";
import image5 from "../../res/images/slider/9.jpg";

import "./intro.css";
const Intro = () => {

    return (
        <>
            <Carousel
                effect="scroll-x"
                autoplay
                dotPosition={'bottom'}
                className="carouselIntro"
                easing={'ease-in-out'}
            >
                <div className="mask">
                    <div className="overLay">
                        <h4>ميك اب</h4>
                    </div>
                    <img src={image1} alt="intro" className="carouselImage" />
                </div>
                <div className="mask">
                    <div className="overLay">
                        <h4>ملابس</h4>
                    </div>
                    <img src={image2} alt="intro" className="carouselImage" />
                </div>
                <div className="mask">
                    <div className="overLay">
                        <h4>اكسسورات</h4>
                    </div>
                    <img src={image3} alt="intro" className="carouselImage" />
                </div>
                <div className="mask">
                    <div className="overLay">
                        <h4>سماعات</h4>
                    </div>
                    <img src={image4} alt="intro" className="carouselImage" />
                </div>
                <div className="mask">
                    <div className="overLay">
                        <h4>الكترونيات</h4>
                    </div>
                    <img src={image5} alt="intro" className="carouselImage" />
                </div>

            </Carousel>
        </>
    )
}


export default Intro;