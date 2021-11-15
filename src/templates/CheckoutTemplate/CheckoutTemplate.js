import { Fragment, useEffect } from "react";
import { Redirect, Route } from "react-router";
import { USER_LOGIN } from "../../utils/settings/config";
import { SweetAlertWarning } from "../../utils/SweetAlert/SweetAlert";



const CheckoutTemplate = (props) => {
    const { Component, ...restParams } = props;
    useEffect(() => {
        window.scrollTo(0, 0);
    })

    if (!localStorage.getItem(USER_LOGIN)) {
        SweetAlertWarning('Please login before booking!')
        return <Redirect to="/login" />
    }

    return <Route {...restParams} render={(propsRoute) => {
        return <Fragment>
            <Component {...propsRoute} />
        </Fragment>
    }} />
}

export default CheckoutTemplate;