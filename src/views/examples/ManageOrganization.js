import React, { useState, useEffect } from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Row,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Button,
    InputGroup,
} from "reactstrap";
import ManageUserTableItem from "../../components/ManageUser/ManageUserTableItem";
import "../../assets/scss/usrun-custom/toggle.scss";
import organizationService from "services/OrganizationService";


// const getTableItems = (userList) => {
//     return userList.map((item, index) => (
//         <ManageUserTableItem
//             key={index}
//             userId={item["userId"]}
//             name={item["displayName"]}
//             email={item["email"]}
//             authType={item["authType"]}
//             isEnabled={item["enabled"]}
//             banUser={e => requestUserBan(item)}
//         ></ManageUserTableItem>
//     ));
// };

const ManageUser = () => {
    const [cur, setCur] = useState(0);
    const limit = 10;
    const [searchString, setSearchString] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [listOrganization, setListOrganization] = useState([]);

    const loadPage = async (offset, limit) => {
        const organizationList = await organizationService.listOrganization(offset, limit, searchString);
        setListOrganization(organizationList);
    };

    useEffect(() => {
        loadPage(cur, limit);
    }, []);

    const handlePaginationClick = async changeAmount => {
        await setCur(cur + changeAmount);
        loadPage(cur + changeAmount, limit);
    };

    // const handleUserSearch = async (e) => {
    //     if (searchString === null) return;
    //     if (searchString === "") {
    //         setIsSearching(false);
    //         setCur(1);
    //         loadPage(1, limit);
    //     }

    //     userList = await UserService.findUsers(searchString, 1, limit);

    //     if (userList != null) {
    //         setTableItems([].concat(getTableItems(userList)));
    //         setCur(1);
    //         setIsSearching(true);
    //     }
    // };

    return (
        <Container className="mt-3" fluid>
            <Row>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0 d-flex">
                            <h3 className="mb-0 d-inline-block my-auto">Quản lý tổ chức </h3>
                            <Form
                                className="form-inline my-auto ml-auto"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    // handleUserSearch(e);
                                }}
                            >
                                <FormGroup className="mb-0">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="fas fa-search" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Tìm kiếm tổ chức"
                                            type="text"
                                            onChange={(e) => {
                                                e.preventDefault();
                                                setSearchString(e.target.value);
                                            }}
                                            onSubmit={(e) => {
                                                console.log(e);
                                            }}
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Form>
                        </CardHeader>
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Ảnh đại diện</th>
                                    <th scope="col">Tên tổ chức</th>
                                    <th scope="col">Website</th>
                                    <th scope="col">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>{listOrganization && listOrganization.map(item => {
                                return (
                                    <tr>
                                        <td>{item.avatar}</td>
                                        <td>{item.name}</td>
                                        <td>{item.website}</td>
                                        <td>
                                            <Button><i class="fas fa-edit"></i></Button>
                                        </td>
                                    </tr>
                                )
                            })}</tbody>
                        </Table>
                        <CardFooter className="py-4">
                            <nav aria-label="...">
                                <Pagination
                                    className="pagination justify-content-end mb-0"
                                    listClassName="justify-content-end mb-0"
                                >
                                    <PaginationItem className={cur === 1 ? "disabled" : ""}>
                                        <PaginationLink
                                            href="#pablo"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePaginationClick(-1);
                                            }}
                                            tabIndex="-1"
                                        >
                                            <i className="fas fa-angle-left" />
                                            <span className="sr-only">Previous</span>
                                        </PaginationLink>
                                    </PaginationItem>{" "}
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#pablo"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePaginationClick(1);
                                            }}
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
};

export default ManageUser;
