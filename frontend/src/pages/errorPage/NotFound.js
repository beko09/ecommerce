
import { Result } from 'antd';
import { Link } from "react-router-dom";
const NotFound = () => {

    return (
        <Result
            status="404"
            title="404"
            subTitle="عزرا, هذه الصفحة التي زرتها غير موجودة"
            extra={<Link to="/" type="primary">الرجوع الي الريئسية</Link>}
        />
    )
}

export default NotFound;

