import * as React from 'react';
import { ColumnsType, ColumnType, Key, GetRowKey, TriggerEventHandler, RenderExpandIcon } from '../interface';
/**
 * Parse `columns` & `children` into `columns`.
 */
declare function useColumns<RecordType>({ prefixCls, columns, children, expandable, expandedKeys, getRowKey, onTriggerExpand, expandIcon, rowExpandable, expandIconColumnIndex, }: {
    prefixCls?: string;
    columns?: ColumnsType<RecordType>;
    children?: React.ReactNode;
    expandable: boolean;
    expandedKeys: Set<Key>;
    getRowKey: GetRowKey<RecordType>;
    onTriggerExpand: TriggerEventHandler<RecordType>;
    expandIcon?: RenderExpandIcon<RecordType>;
    rowExpandable?: (record: RecordType) => boolean;
    expandIconColumnIndex?: number;
}, transformColumns: (columns: ColumnsType<RecordType>) => ColumnsType<RecordType>): [ColumnsType<RecordType>, ColumnType<RecordType>[]];
export default useColumns;
