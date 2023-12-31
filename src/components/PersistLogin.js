import { Outlet, Link } from "react-router-dom";
import { useRefreshMutation } from "../features/auth/authApiSlice";
import { selectCurrentToken } from "../features/auth/authSlice";
import usePersist from "../hooks/usePersist";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

const PersistLogin = () => {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);

    const [trueSuccess, setTrueSuccess] = useState(false);

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation();

    useEffect(() => {
        // React 18 strict mode
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token');
                try {
                    // const response = 
                    await refresh()
                    // const { accessToken } = response.data 
                    setTrueSuccess(true);
                } catch (error) {
                    console.log(error)
                }
            }

            if (!token && persist) {
                verifyRefreshToken();
            }
        }

        return () => effectRan.current = true;

        // eslint-disable-next-line
    }, []);

    let content;
    if (!persist) { // persist: no
        console.log('no persist');
        content = <Outlet />
    } else if (isLoading) { //persist: yes, token: no
        console.log('loading');
        content= <p>Loading...</p>
    } else if (isError) { // persist: yes, token: no
        console.log(error);
        content= (
            <p className="errMsg">
                {`${error.data?.message} - `}
                <Link to='/auth'>Please login again</Link>.
            </p>
        )
    } else if (isSuccess && trueSuccess) { // persist: yes, token: yes
        console.log('success');
        content = <Outlet />
    } else if (token && isUninitialized) {
        console.log('token and uninit');
        console.log(isUninitialized);
        content = <Outlet />
    }

    return content;
}

export default PersistLogin