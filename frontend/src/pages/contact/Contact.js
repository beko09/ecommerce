import { FacebookOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons';
import MetaData from "../../container/commn/metaData/MetaData";

import "./contact.css"
const Contact = () => {
    return (
        <>
            <div className="container">
                <MetaData title={"تواصل معي "}  />
            <div className="contact">
                <h4>تواصل معي عبر : </h4>
                <div className="social">
                    <div className="icon">
                        <FacebookOutlined />
                    </div>
                    <div className="link">
                        <a href="https://www.facebook.com/abobakerhilal">ابوبكر هلال</a>
                    </div>
                </div>
                    <div className="social">
                        <div className="icon">
                            <LinkedinOutlined />
                        </div>
                        <div className="link">
                            <a href="https://www.linkedin.com/in/abobakerhilal/"> Abobaker Hilal</a>
                        </div>
                    </div>
                <div className="social">
                    <div className="icon">
                        <TwitterOutlined />
                    </div>
                    <div className="link">
                            <a href="https://twitter.com/abobakerhilal"> Abobaker Hilal</a>
                    </div>
                </div>
               
            </div>
            </div>
        </>
    )
}


export default Contact;