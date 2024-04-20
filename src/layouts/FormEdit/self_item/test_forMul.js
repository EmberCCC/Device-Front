import React, { useEffect } from "react";

const CustomComA = props => {
    const { schema } = props;
    if (schema.$id === '#') {
        return <div>111{props.children}</div>;
    }
    return (
        <div>
            {props.children}
        </div>
    );
};

export default CustomComA