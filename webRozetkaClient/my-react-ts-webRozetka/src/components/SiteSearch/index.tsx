import React from 'react';
import Search from "antd/es/input/Search";
import {Button} from "antd";
import {CloseOutlined} from "@ant-design/icons";

interface ISiteSearchProps {
    searchValue: string,
    setSearchValue: (searchValue: string) => void,
    handleSearch: (searchValue: string) => void,
    handleClearSearch: () => void,
}
const SiteSearch : React.FC<ISiteSearchProps> = (props) => {
    const { searchValue, setSearchValue, handleSearch, handleClearSearch } = props;

    return (
        <>
            <Search
                style={{width: 200}}
                placeholder="я шукаю..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onSearch={handleSearch}
                enterButton
            />
            {searchValue && searchValue.length > 0 && (
                <Button onClick={handleClearSearch} type="primary" icon={<CloseOutlined />} danger>
                    Скасувати
                </Button>
            )}
        </>
    );
};

export default SiteSearch;