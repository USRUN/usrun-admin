
import React, { useState } from "react";

// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip
} from "reactstrap";
import Toggle from 'react-toggle'
import "../../assets/scss/usrun-custom/toggle.scss"


const ManageUser = () => {
    const [cur , setCur] = useState(true);

    const banUser = (e) => {
        console.log('change')
        setCur(!cur);
        console.log(e)
    }

    return (<Container className="mt-3" fluid>
        <Row>
            <div className="col">
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <h3 className="mb-0">Manage user</h3>
                    </CardHeader>
                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Name</th>
                                <th scope="col">Auth type</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="col">Username</td>
                                <td scope="col">Name</td>
                                <td scope="col">Auth type</td>
                                <td>
                                    <Toggle
                                        defaultChecked={cur}
                                        onChange={banUser} />
                                    <label htmlFor='cheese-status'></label>
                                </td>
                            </tr>
                            <tr>
                                <td scope="col">Username</td>
                                <td scope="col">Name</td>
                                <td scope="col">Auth type</td>
                                <td>
                                    <Toggle
                                        defaultChecked={false}
                                        onChange={banUser} />
                                    <label htmlFor='cheese-status'></label></td>
                            </tr>
                            <tr>
                                <td scope="col">Username</td>
                                <td scope="col">Name</td>
                                <td scope="col">Auth type</td>
                                <td>
                                    <Toggle
                                    defaultChecked={false}
                                    onChange={banUser} />
                                    <label htmlFor='cheese-status'></label></td>
                            </tr>
                            <tr>
                                <td scope="col">Username</td>
                                <td scope="col">Name</td>
                                <td scope="col">Auth type</td>
                                <td>
                                    <Toggle
                                    defaultChecked={false}
                                    onChange={banUser} />
                                    <label htmlFor='cheese-status'></label></td>
                            </tr>
                            <tr>
                                <td scope="col">Username</td>
                                <td scope="col">Name</td>
                                <td scope="col">Auth type</td>
                                <td>
                                    <Toggle
                                    defaultChecked={false}
                                    onChange={banUser} />
                                    <label htmlFor='cheese-status'></label></td>
                            </tr>
                            <tr>
                                <td scope="col">Username</td>
                                <td scope="col">Name</td>
                                <td scope="col">Auth type</td>
                                <td>
                                    <Toggle
                                    defaultChecked={false}
                                    onChange={banUser} />
                                    <label htmlFor='cheese-status'></label></td>
                            </tr>
                            <tr>
                                <td scope="col">Username</td>
                                <td scope="col">Name</td>
                                <td scope="col">Auth type</td>
                                <td>
                                    <Toggle
                                    defaultChecked={false}
                                    onChange={banUser} />
                                    <label htmlFor='cheese-status'></label></td>
                            </tr>
                            <tr>
                                <td scope="col">Username</td>
                                <td scope="col">Name</td>
                                <td scope="col">Auth type</td>
                                <td>
                                    <Toggle
                                    defaultChecked={false}
                                    onChange={banUser} />
                                    <label htmlFor='cheese-status'></label></td>
                            </tr>
                            <tr>
                                <td scope="col">Username</td>
                                <td scope="col">Name</td>
                                <td scope="col">Auth type</td>
                                <td>
                                    <Toggle
                                    defaultChecked={false}
                                    onChange={banUser} />
                                    <label htmlFor='cheese-status'></label></td>
                            </tr>
                            <tr>
                                <td scope="col">Username</td>
                                <td scope="col">Name</td>
                                <td scope="col">Auth type</td>
                                <td>
                                    <Toggle
                                    defaultChecked={false}
                                    onChange={banUser} />
                                    <label htmlFor='cheese-status'></label></td>
                            </tr>
                        </tbody>
                    </Table>
                    <CardFooter className="py-4">
                        <nav aria-label="...">
                            <Pagination
                                className="pagination justify-content-end mb-0"
                                listClassName="justify-content-end mb-0"
                            >
                                <PaginationItem className="disabled">
                                    <PaginationLink
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                        tabIndex="-1"
                                    >
                                        <i className="fas fa-angle-left" />
                                        <span className="sr-only">Previous</span>
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem className="active">
                                    <PaginationLink
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        1
                        </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        2 <span className="sr-only">(current)</span>
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        3
                        </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        <i className="fas fa-angle-right" />
                                        <span className="sr-only">Next</span>
                                    </PaginationLink>
                                </PaginationItem>
                            </Pagination>
                        </nav>
                    </CardFooter>
                </Card>
            </div>
        </Row>
    </Container>
    );
}

export default ManageUser;
