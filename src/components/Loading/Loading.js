import React from 'react';
import { useSelector } from 'react-redux';

export default function Loading() {
    const { isLoading } = useSelector(state => state.LoadingReducers);
    if (!isLoading) {
        return "";
    }

    return (
        <div className="flex items-center justify-center" style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,1)', zIndex: 99 }}>
            <div>
                <img src={require("../../assets/images/loading.gif").default} alt="loading" />
            </div>
        </div>
    )
}
