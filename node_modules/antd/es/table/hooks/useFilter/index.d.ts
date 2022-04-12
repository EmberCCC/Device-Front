import { TransformColumns, ColumnsType, ColumnType, Key, GetPopupContainer } from '../../interface';
export interface FilterState<RecordType> {
    column: ColumnType<RecordType>;
    key: Key;
    filteredKeys?: Key[] | null;
}
export declare function getFilterData<RecordType>(data: RecordType[], filterStates: FilterState<RecordType>[]): RecordType[];
interface FilterConfig<RecordType> {
    prefixCls: string;
    dropdownPrefixCls?: string;
    columns: ColumnsType<RecordType>;
    onFilterChange: (filters: Record<string, Key[] | null>, filterStates: FilterState<RecordType>[]) => void;
    getPopupContainer?: GetPopupContainer;
}
declare function useFilter<RecordType>({ prefixCls, dropdownPrefixCls, columns, onFilterChange, getPopupContainer, }: FilterConfig<RecordType>): [TransformColumns<RecordType>, FilterState<RecordType>[], () => Record<string, Key[] | null>];
export default useFilter;
