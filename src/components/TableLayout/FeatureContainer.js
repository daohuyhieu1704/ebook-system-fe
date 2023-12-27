import React from 'react'
import { backgroundColor } from 'styled-system';

export default function FeatureContainer(props: {
    children?: JSX.Element;
}) {
    const { children } = props;
    return (
        <div style={{
            zIndex: 10,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
        }}>{children}</div>
    )
}
