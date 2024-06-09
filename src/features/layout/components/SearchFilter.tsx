import { Input, Select } from 'antd';
import React, { startTransition, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { notHasSearchFilter } from '../../../constants/common';
import { useSearchTable } from '../../../hooks/useSearchTable';
import { selectSearchParams, selectStatusFilter, setSearchParams, setStatusFilter } from '../layoutSlice';

const { Search } = Input;

export default function SearchFilter({
    path
}: {
    path: string,
}) {
    const dispatch = useAppDispatch();
    const { optionsFilter } = useSearchTable(path);
    const filter = useAppSelector(selectStatusFilter);
    const onSearch = (value: string) => {
        startTransition(() => {
            dispatch(setSearchParams(value));
        });
    };
    return !`${notHasSearchFilter}`.includes(path) ?
        <>
            <Search
                placeholder='Tìm kiếm...'
                allowClear
                onSearch={onSearch}
                style={{ width: 200, marginLeft: '1rem' }}
                enterButton
                disabled={
                    filter === null && (filter === 'answered' ? true : false)
                }
            />
            <Select
                value={filter === null ? null : filter}
                style={{ width: 130, marginLeft: '1rem' }}
                allowClear
                options={optionsFilter}
                placeholder='Tìm theo...'
                onClear={() => {
                    dispatch(setStatusFilter(null));
                }}
                onSelect={(value: number) => {
                    dispatch(setStatusFilter(value));
                }}
            ></Select>
        </> :
        <></>
}
