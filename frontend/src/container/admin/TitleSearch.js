
import { Input } from "antd";

const Search = Input.Search;

export const TitleSearch = ({ onSearch, ...props }) => (
    <div {...props}>
        <Search
            placeholder="ادخل الاسم"
            onSearch={onSearch}
             allowClear
            size="large"
           className="searchInput"
        />
    </div>
);
