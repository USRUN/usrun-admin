import React from 'react';
import Toggle from 'react-toggle';

const ManageUserTableItem = props => {
    return (
        <tr>
            <td>{props.email}</td>
            <td>{props.name}</td>
            <td>{props.authType}</td>
            <td>
                <Toggle
                    defaultChecked={props.isEnabled}
                    onChange={props.banUser}
                    />
                <label htmlFor='cheese-status'></label></td>
        </tr>
    );
} 

export default ManageUserTableItem;