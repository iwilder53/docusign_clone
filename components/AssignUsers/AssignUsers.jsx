'use client'

import React from 'react';
import Assign from '../Assign/Assign';
import Profile from '../Profile/Profile';
import { Provider } from 'react-redux';
import store from '../../app/store/store';

const AssignUsers = () => {
    return (
        <div>
            <Provider store={store}>
                <Profile />
                <Assign />
            </Provider>
        </div>
    );

}
export default AssignUsers