import { Rate } from 'antd';
const desc = ['كريه', 'سيء', 'عادي', 'جيد', 'رائع'];

const Rater = ({ onChange = {}, value, disabled = false }) => {



    return (
        <span>
            <Rate allowHalf tooltips={desc} onChange={onChange} value={value} disabled={disabled} />
            {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
        </span>
    );

}


export default Rater;