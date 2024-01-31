import React, { useMemo, useRef, useState } from 'react';
import {Empty, Select, SelectProps} from 'antd';
import debounce from 'lodash/debounce';

interface DebounceSelectProps<ValueType = any> {
    showSearch?: boolean;
    value?: ValueType;
    placeholder?: string;
    fetchOptions: (search: string) => Promise<ValueType[]>;
    onChange: (selected: ValueType) => void;
    debounceTimeout?: number;
    style?: React.CSSProperties;
}
const DebounceSelect: React.FC<DebounceSelectProps> = ({ fetchOptions, debounceTimeout = 800, ...props }) => {
    const [options, setOptions] = useState<SelectProps[]>([]);
    const fetchRef = useRef(0);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value : string) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            fetchOptions(value).then((newOptions : SelectProps[]) => {
                if (fetchId !== fetchRef.current) {
                    return;
                }
                setOptions(newOptions);
            });
        };
        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={ <Empty  description="Введіть дані!" image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            {...props}
            options={options}
        />
    );
};

export default DebounceSelect;