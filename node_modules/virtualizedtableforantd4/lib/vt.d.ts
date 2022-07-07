import React from "react";
declare type CustomizeComponent = React.FC<any>;
export interface TableComponents {
    table?: CustomizeComponent;
    header?: {
        wrapper?: CustomizeComponent;
        row?: CustomizeComponent;
        cell?: CustomizeComponent;
    };
    body?: {
        wrapper?: CustomizeComponent;
        row?: CustomizeComponent;
        cell?: CustomizeComponent;
    };
}
export interface vt_opts {
    id?: number;
    /**
     * @default 5
     */
    overscanRowCount?: number;
    /**
     * this only needs the scroll.y
     */
    scroll: {
        y: number | string;
    };
    /**
     * wheel event(only works on native events).
     */
    onScroll?: ({ left, top, isEnd, }: {
        top: number;
        left: number;
        isEnd: boolean;
    }) => void;
    initTop?: number;
    /**
     * @default false
     */
    debug?: boolean;
    ref?: React.MutableRefObject<{
        scrollTo: (y: number) => void;
        scrollToIndex: (idx: number) => void;
    }>;
}
/**
 * `INIT` -> `LOADED` -> `RUNNING`
 */
declare enum e_VT_STATE {
    INIT = 1,
    LOADED = 2,
    RUNNING = 4
}
interface VT_CONTEXT extends vt_opts {
    _y: number;
    _raw_y: number | string;
    _vtcomponents: TableComponents;
    components: TableComponents;
    vt_state: e_VT_STATE;
    possible_hight_per_tr: number;
    re_computed: number;
    row_height: number[];
    row_count: number;
    prev_row_count: number;
    wrap_inst: React.RefObject<HTMLDivElement>;
    VTScroll?: (param?: {
        top: number;
        left: number;
    }) => {
        top: number;
        left: number;
    };
    _React_ptr: any;
    computed_h: number;
    WH: number;
    HND_PAINT: number;
    _offset_top: number;
    _offset_head: number;
    _offset_tail: number;
    top: number;
    left: number;
    evt: number;
    end: boolean;
    final_top: number;
    f_final_top: number;
    update_count: number;
}
export declare function _set_components(ctx: VT_CONTEXT, components: TableComponents): void;
export declare function init(fnOpts: () => vt_opts, deps: React.DependencyList): VT_CONTEXT;
export {};
